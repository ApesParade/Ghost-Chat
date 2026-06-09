import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { verifyToken } from './auth';
import { Server as SocketIOServer } from 'socket.io';

let io: SocketIOServer;
export function setContactsSocketIO(socketio: SocketIOServer) {
  io = socketio;
}

const router = Router();

// GET /api/contacts
router.get('/', verifyToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const contacts = await prisma.contact.findMany({
      where: {
        OR: [
          { user_id: userId },
          { contact_id: userId }
        ]
      }
    });

    const enriched = await Promise.all(
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
            avatar: true
          }
        });
        return {
          id: c.id,
          user_id: c.user_id,
          contact_id: c.contact_id,
          status: c.status,
          requested_by: c.requested_by,
          other_user: {
            ...otherUser
          }
        };
      })
    );

    res.json({ contacts: enriched });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore del server' });
  }
});

// POST /api/contacts/add
router.post('/add', verifyToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ errorCode: 'USERNAME_REQUIRED' });
    }

    const target = await prisma.user.findUnique({ where: { username } });
    if (!target) {
      return res.status(404).json({ errorCode: 'USER_NOT_FOUND' });
    }
    if (target.id === userId) {
      return res.status(400).json({ errorCode: 'CANT_ADD_SELF' });
    }
    const existing = await prisma.contact.findFirst({
      where: {
        OR: [
          { user_id: userId, contact_id: target.id },
          { user_id: target.id, contact_id: userId }
        ]
      }
    });
    if (existing) {
      return res.status(409).json({ errorCode: 'CONTACT_ALREADY_EXISTS', contactId: existing.id });
    }

    const me = await prisma.user.findUnique({ where: { id: userId } });
    const iAmKeyHolder = me?.has_api_key || false;
    const targetIsKeyHolder = target.has_api_key;
    const sameLanguage = me?.language_code === target.language_code;

    // Tutte le richieste vanno in pending (accettazione manuale)
    const status = 'pending';
    const requested_by = userId;
    let warning = null;

    // Regole di blocco: guest non può aggiungere utenti di lingua diversa
    if (!iAmKeyHolder && !sameLanguage) {
      return res.status(403).json({ errorCode: 'GUEST_DIFF_LANGUAGE' });
    }
    // Avviso per keyholder che aggiunge guest di lingua diversa
    if (iAmKeyHolder && !targetIsKeyHolder && !sameLanguage) {
      warning = 'Il contatto che stai aggiungendo è un account guest ed è di lingua diversa dalla tua. Tutte le chat tra di voi saranno tradotte usando le tue chiavi API di Gemini.';
    }

    const contact = await prisma.contact.create({
      data: {
        user_id: userId,
        contact_id: target.id,
        status,
        requested_by
      }
    });

    // Notifica socket (sempre pending)
    if (io) {
      const targetSockets = io.sockets.adapter.rooms.get(`user_${target.id}`);
      if (targetSockets && targetSockets.size > 0) {
        io.to(`user_${target.id}`).emit('contact_request', {
          contactId: contact.id,
          from: userId,
          fromUsername: me?.username
        });
      }
    }

    const responseBody: any = {
      contact: {
        id: contact.id,
        status: contact.status,
        requested_by: contact.requested_by,
        other_user: {
          id: target.id,
          username: target.username,
          language_code: target.language_code,
          flag: target.flag,
          has_api_key: target.has_api_key,
          avatar: target.avatar
        }
      }
    };
    if (warning) responseBody.warning = warning;
    res.status(201).json(responseBody);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorCode: 'SERVER_ERROR' });
  }
});

// PUT /api/contacts/accept/:contact_id
router.put('/accept/:contact_id', verifyToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const contactId = parseInt(req.params.contact_id as string);

    const contact = await prisma.contact.findUnique({ where: { id: contactId } });
    if (!contact) {
      return res.status(404).json({ error: 'Contatto non trovato' });
    }
    if (contact.contact_id !== userId) {
      return res.status(403).json({ error: 'Solo il destinatario può accettare la richiesta' });
    }
    if (contact.status !== 'pending') {
      return res.status(400).json({ error: 'Richiesta già gestita' });
    }

    const updated = await prisma.contact.update({
      where: { id: contactId },
      data: { status: 'accepted' }
    });

    // Notifica il richiedente
    if (io) {
      const requesterId = contact.requested_by;
      const requesterSockets = io.sockets.adapter.rooms.get(`user_${requesterId}`);
      if (requesterSockets && requesterSockets.size > 0) {
        io.to(`user_${requesterId}`).emit('contact_accepted', {
          contactId: contact.id,
          by: userId
        });
      }
    }

    res.json({ contact: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore del server' });
  }
});

// DELETE /api/contacts/:contact_id
router.delete('/:contact_id', verifyToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const contactId = parseInt(req.params.contact_id as string);

    const contact = await prisma.contact.findUnique({ where: { id: contactId } });
    if (!contact) {
      return res.status(404).json({ error: 'Contatto non trovato' });
    }
    if (contact.user_id !== userId && contact.contact_id !== userId) {
      return res.status(403).json({ error: 'Non autorizzato' });
    }

    const otherUserId = contact.user_id === userId ? contact.contact_id : contact.user_id;
    const conversationId = [userId, otherUserId].sort().join('_');

    await prisma.message.deleteMany({
      where: { conversation_id: conversationId },
    });
    await prisma.messageExpiryPreference.deleteMany({
      where: {
        OR: [
          { user_id: userId, contact_id: otherUserId },
          { user_id: otherUserId, contact_id: userId },
        ],
      },
    });
    await prisma.contact.delete({ where: { id: contactId } });

    if (io) {
      const otherSockets = io.sockets.adapter.rooms.get(`user_${otherUserId}`);
      if (otherSockets && otherSockets.size > 0) {
        io.to(`user_${otherUserId}`).emit('contact_deleted', {
          contactId: contactId,
          deletedBy: userId,
          otherUserId: userId,
        });
        io.to(`user_${otherUserId}`).emit('chat_deleted', {
          contactId: userId,
          deletedBy: userId,
        });
      }
    }
    // Emetti anche chat_deleted per chiudere la conversazione in tempo reale
    if (io) {
      io.to(`user_${otherUserId}`).emit('chat_deleted', {
        contactId: userId,
        deletedBy: userId,
      });
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore del server' });
  }
});

// GET /api/contacts/:contact_id/my-expiry
router.get('/:contact_id/my-expiry', verifyToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const contactIdParam: string = req.params.contact_id as string;

    const contactExists = await prisma.contact.findFirst({
      where: {
        OR: [
          { user_id: userId, contact_id: contactIdParam },
          { user_id: contactIdParam, contact_id: userId },
        ],
      },
    });
    if (!contactExists) {
      return res.status(404).json({ error: 'Contatto non trovato' });
    }

    const pref = await prisma.messageExpiryPreference.findUnique({
      where: { user_id_contact_id: { user_id: userId, contact_id: contactIdParam } },
    });

    res.json({ expiry_hours: pref?.expiry_hours ?? null });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore del server' });
  }
});

// PUT /api/contacts/:contact_id/my-expiry
router.put('/:contact_id/my-expiry', verifyToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const contactIdParam: string = req.params.contact_id as string;
    const { expiry_hours } = req.body;

    const contactExists = await prisma.contact.findFirst({
      where: {
        OR: [
          { user_id: userId, contact_id: contactIdParam },
          { user_id: contactIdParam, contact_id: userId },
        ],
      },
    });
    if (!contactExists) {
      return res.status(404).json({ error: 'Contatto non trovato' });
    }

    let parsed: number | null = null;
    if (expiry_hours !== null && expiry_hours !== undefined) {
      parsed = Number(expiry_hours);
      if (isNaN(parsed) || parsed < 0) {
        return res.status(400).json({ error: 'expiry_hours deve essere un numero positivo o 0' });
      }
    }

    const pref = await prisma.messageExpiryPreference.upsert({
      where: {
        user_id_contact_id: { user_id: userId, contact_id: contactIdParam },
      },
      create: {
        user_id: userId,
        contact_id: contactIdParam,
        expiry_hours: parsed,
      },
      update: {
        expiry_hours: parsed,
      },
    });

    res.json({ success: true, expiry_hours: pref.expiry_hours });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore del server' });
  }
});

export default router;