import { Router, Request, Response } from 'express';
import { Server as SocketIOServer } from 'socket.io';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from './auth';

let io: SocketIOServer;
export function setChatsSocketIO(socketio: SocketIOServer) {
  io = socketio;
}
const router = Router();
const prisma = new PrismaClient();

// GET /api/chats – elenco delle chat attive dell'utente
router.get('/', verifyToken, async (req: Request, res: Response) => {
  try {
    const userId: string = (req as any).userId;
    if (!userId) return res.status(401).json({ error: 'Utente non autenticato' });

    // Trova tutti i contatti accettati in cui l'utente ha la chat attiva
    const contacts = await prisma.contact.findMany({
      where: {
        status: 'accepted',
        OR: [
          { user_id: userId, user_chat_active: true },
          { contact_id: userId, contact_chat_active: true },
        ],
      },
    });

    const chats = await Promise.all(
      contacts.map(async (c) => {
        const otherUserId = c.user_id === userId ? c.contact_id : c.user_id;
        const otherUser = await prisma.user.findUnique({
          where: { id: otherUserId },
          select: {
            id: true,
            username: true,
            language_code: true,
            flag: true,
            has_api_key: true,
            avatar: true,
          },
        });

        // Ultimo messaggio (per anteprima futura)
        const conversationId = [userId, otherUserId].sort().join('_');
        const lastMessage = await prisma.message.findFirst({
          where: {
            conversation_id: conversationId,
            OR: [
              { expires_at: null },
              { expires_at: { gt: new Date() } },
            ],
          },
          orderBy: { created_at: 'desc' },
          select: {
            translated_text: true,
            original_text: true,
            is_encrypted: true,
            type: true,
            created_at: true,
            sender_id: true,
          },
        });

        return {
          id: c.id,
          contact_id: otherUserId,
          other_user: otherUser,
          last_message: lastMessage
            ? {
                text: lastMessage.translated_text,
                original_text: lastMessage.original_text,
                is_encrypted: lastMessage.is_encrypted,
                type: lastMessage.type,
                timestamp: lastMessage.created_at,
                is_mine: lastMessage.sender_id === userId,
              }
            : null,
        };
      })
    );

    res.json({ chats });
  } catch (err) {
    console.error('Errore recupero chat:', err);
    res.status(500).json({ error: 'Errore del server' });
  }
});

// DELETE /api/chats/:contact_id – elimina definitivamente la conversazione per entrambi
router.delete('/:contact_id', verifyToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const contactIdParam = req.params.contact_id as string;

    const contact = await prisma.contact.findFirst({
      where: {
        OR: [
          { user_id: userId, contact_id: contactIdParam },
          { user_id: contactIdParam, contact_id: userId },
        ],
        status: 'accepted',
      },
    });
    if (!contact) return res.status(404).json({ error: 'Contatto non trovato' });

    const otherUserId = contact.user_id === userId ? contact.contact_id : contact.user_id;
    const conversationId = [userId, otherUserId].sort().join('_');

    // Elimina tutti i messaggi della conversazione
    await prisma.message.deleteMany({
      where: { conversation_id: conversationId },
    });

    // Elimina le preferenze di scadenza
    await prisma.messageExpiryPreference.deleteMany({
      where: {
        OR: [
          { user_id: userId, contact_id: otherUserId },
          { user_id: otherUserId, contact_id: userId },
        ],
      },
    });

    // Disattiva i flag per entrambi gli utenti
    await prisma.contact.update({
      where: { id: contact.id },
      data: {
        user_chat_active: false,
        contact_chat_active: false,
      },
    });

    // Notifica l'altro partecipante
    if (io) {
      io.to(`user_${otherUserId}`).emit('chat_deleted', {
        contactId: userId, // l'ID di chi ha cancellato, per far capire all'altro chi è sparito
        deletedBy: userId,
      });
    }

    res.json({ success: true });
  } catch (err) {
    console.error('Errore eliminazione chat:', err);
    res.status(500).json({ error: 'Errore del server' });
  }
});

export default router;