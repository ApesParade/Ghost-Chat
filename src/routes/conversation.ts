import { Router, Request, Response } from 'express';
import multer from 'multer';
import { verifyToken } from './auth';
import { PrismaClient } from '@prisma/client';
import { translateWithGemini } from '../services/gemini';
import { Server as SocketIOServer } from 'socket.io';
import { activeChats, userVisibility } from '../index';

const router = Router();
const prisma = new PrismaClient();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

let io: SocketIOServer;
export function setSocketIO(socketio: SocketIOServer) {
  io = socketio;
}

// Calcola expires_at in base alle regole
// Se expiry_hours è già presente (da lettura), lo rispetta; altrimenti usa il valore di default
function computeExpiresAtFromHours(hours: number | null | undefined): Date | null {
  if (hours === 0 || hours === null || hours === undefined) return null; // nessuna scadenza
  return new Date(Date.now() + hours * 3600000);
}

async function resolveExpiryHours(senderId: string, recipientId: string): Promise<number | null> {
  // 1. Preferenza specifica per il contatto
  const pref = await prisma.messageExpiryPreference.findUnique({
    where: { user_id_contact_id: { user_id: senderId, contact_id: recipientId } },
  });
  if (pref) {
    if (pref.expiry_hours === 0) return null; // esplicitamente nessuna scadenza
    if (pref.expiry_hours !== null && pref.expiry_hours !== undefined) {
      return pref.expiry_hours;
    }
  }

  // 2. Timer globale del mittente
  const sender = await prisma.user.findUnique({ where: { id: senderId } });
  return sender?.global_expiry_hours ?? null;
}

// POST /send - audio
router.post('/send', verifyToken, upload.single('audio'), async (req: Request, res: Response) => {
  try {
    const userId: string = (req as any).userId;
    if (!userId) return res.status(401).json({ error: 'Utente non autenticato' });
    const recipientId: string = req.body.recipientId;
    const audioFile = req.file;

    if (!recipientId || !audioFile) {
      return res.status(400).json({ error: 'recipientId e file audio richiesti' });
    }

    const contact = await prisma.contact.findFirst({
      where: {
        OR: [
          { user_id: userId, contact_id: recipientId },
          { user_id: recipientId, contact_id: userId },
        ],
      },
    });
    if (!contact) return res.status(403).json({ error: 'Contatto non trovato' });

    const sender = await prisma.user.findUnique({ where: { id: userId } });
    const recipient = await prisma.user.findUnique({ where: { id: recipientId } });
    if (!sender || !recipient) return res.status(404).json({ error: 'Utente non trovato' });

    const isSenderKeyHolder = sender.has_api_key;
    if (!isSenderKeyHolder && contact.status !== 'accepted') {
      return res.status(403).json({ error: 'Devi attendere che il contatto accetti la richiesta' });
    }

    const audioBase64 = audioFile.buffer.toString('base64');

    const result = await translateWithGemini(
      audioBase64,
      null,
      sender.language_code,
      recipient.language_code,
      false,
      sender.api_key,
      isSenderKeyHolder ? undefined : recipientId
    );

    const conversationId = [userId, recipientId].sort().join('_');
    let expiryHours = await resolveExpiryHours(userId, recipientId);
    const message = await prisma.message.create({
      data: {
        conversation_id: conversationId,
        sender_id: userId,
        recipient_id: recipientId,
        translated_text: result.translated,
        original_text: null,
        original_language: sender.language_code,
        expiry_hours: expiryHours,
        expires_at: null,
      },
    });

    // Riattiva i flag della chat se erano stati spenti da una cancellazione precedente
    await prisma.contact.updateMany({
      where: {
        OR: [
          { user_id: userId, contact_id: recipientId },
          { user_id: recipientId, contact_id: userId },
        ],
      },
      data: {
        user_chat_active: true,
        contact_chat_active: true,
      },
    });

    // Emetti evento Socket.IO se il destinatario è connesso
    const sendPush = shouldSendPush(recipientId, userId);
    if (sendPush && recipient.push_subscription) {
      try {
        const { sendPushNotification } = await import('../services/push');
        const { pushTranslations } = await import('../locales/pushNotifications');
        const recipientLang = recipient.language_code || 'it-IT';
        const t = pushTranslations[recipientLang]?.message_audio || pushTranslations['en-US'].message_audio;
        const title = t.title.replace('{{sender}}', sender.username);
        const body = t.body;
        await sendPushNotification(recipient.push_subscription, {
          title,
          body,
          senderId: userId,
          senderName: sender.username,
        });
      } catch (e: any) {
        console.error('[PUSH ERROR]', e.message);
      }
    }

    // Invia sempre evento socket se il destinatario è online
    if (io.sockets.adapter.rooms.get(`user_${recipientId}`)?.size > 0) {
      io.to(`user_${recipientId}`).emit('new_message', {
        senderId: userId,
        senderName: sender.username,
        translated: result.translated,
        original: undefined,
        timestamp: message.created_at,
        messageId: message.id,
        expiresAt: null,
        is_encrypted: false,
        type: 'audio',
      });
    }

    const estimatedExpiresAt = expiryHours
      ? new Date(Date.now() + expiryHours * 3600000).toISOString()
      : null;
    res.json({
      success: true,
      translated: result.translated,
      messageId: message.id,
      expiresAt: estimatedExpiresAt,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Errore durante l'invio" });
  }
});

function shouldSendPush(recipientId: string, senderId: string): boolean {
  const recipientSockets = io.sockets.adapter.rooms.get(`user_${recipientId}`);
  const isOnline = recipientSockets && recipientSockets.size > 0;
  if (!isOnline) return true;

  const activeChat = activeChats.get(recipientId);
  if (activeChat === senderId) return false;

  const isVisible = userVisibility.get(recipientId) === true;
  return !isVisible;
}

// POST /send-text
router.post('/send-text', verifyToken, async (req: Request, res: Response) => {
  try {
    const userId: string = (req as any).userId;
    if (!userId) return res.status(401).json({ error: 'Utente non autenticato' });
    const recipientId: string = req.body.recipientId;
    const text: string = req.body.text;
    if (!recipientId) return res.status(400).json({ error: 'Destinatario mancante' });
    if (!text && !req.body.encryptedPayload)
      return res.status(400).json({ error: 'Testo o payload cifrato mancante' });

    const contact = await prisma.contact.findFirst({
      where: {
        OR: [
          { user_id: userId, contact_id: recipientId },
          { user_id: recipientId, contact_id: userId },
        ],
      },
    });
    if (!contact) return res.status(403).json({ error: 'Contatto non trovato' });

    const sender = await prisma.user.findUnique({ where: { id: userId } });
    const recipient = await prisma.user.findUnique({ where: { id: recipientId } });
    if (!sender || !recipient) return res.status(404).json({ error: 'Utente non trovato' });

    if (!sender.has_api_key && contact.status !== 'accepted') {
      return res.status(403).json({ error: 'Devi attendere che il contatto accetti la richiesta' });
    }

    let result: { translated: string; original?: string };
    let encryptedPayload: any = null;

    // Ora accettiamo sempre encryptedPayload, la traduzione è gestita dal client
    if (req.body.encryptedPayload) {
      encryptedPayload = req.body.encryptedPayload;
      result = {
        translated: '', // il client decifrerà e tradurrà se necessario
        original: encryptedPayload,
      };
    } else if (text) {
      // Fallback per vecchi messaggi in chiaro (non dovrebbe più accadere)
      result = await translateWithGemini(
        null,
        text,
        sender.language_code,
        recipient.language_code,
        false,
        sender.api_key,
        sender.has_api_key ? undefined : recipientId
      );
    } else {
      return res.status(400).json({ error: 'Payload cifrato o testo mancante' });
    }

    const conversationId = [userId, recipientId].sort().join('_');
    let expiryHours = await resolveExpiryHours(userId, recipientId);
    console.log(
      '[TEST EXPIRY] sender:',
      sender.language_code,
      'recipient:',
      recipient.language_code,
      'expiryHours:',
      expiryHours,
      'expires_at:',
      expiryHours ? new Date(Date.now() + expiryHours * 3600000).toISOString() : 'nessuna'
    );

    const message = await prisma.message.create({
      data: {
        conversation_id: conversationId,
        sender_id: userId,
        recipient_id: recipientId,
        translated_text: result.translated,
        original_text: result.original || null,
        original_language: sender.language_code,
        expiry_hours: expiryHours,
        expires_at: null,
        is_encrypted: !!encryptedPayload,
        type: 'text',
      },
    });

    // Riattiva i flag della chat se erano stati spenti da una cancellazione precedente
    await prisma.contact.updateMany({
      where: {
        OR: [
          { user_id: userId, contact_id: recipientId },
          { user_id: recipientId, contact_id: userId },
        ],
      },
      data: {
        user_chat_active: true,
        contact_chat_active: true,
      },
    });

    // Riattiva i flag della chat se erano stati spenti da una cancellazione precedente
    await prisma.contact.updateMany({
      where: {
        OR: [
          { user_id: userId, contact_id: recipientId },
          { user_id: recipientId, contact_id: userId },
        ],
      },
      data: {
        user_chat_active: true,
        contact_chat_active: true,
      },
    });

    // Emetti evento Socket.IO
    const shouldPush = shouldSendPush(recipientId, userId);
    if (shouldPush && recipient.push_subscription) {
      try {
        const { sendPushNotification } = await import('../services/push');
        const { pushTranslations } = await import('../locales/pushNotifications');
        const recipientLang = recipient.language_code || 'it-IT';
        let t = pushTranslations[recipientLang]?.message_text || pushTranslations['en-US'].message_text;
        let preview = result.translated || '';
        if (encryptedPayload) {
          const typeT = pushTranslations[recipientLang]?.message_types?.encrypted || pushTranslations['en-US']?.message_types?.encrypted || '🔒 Messaggio cifrato';
          preview = typeT;
          t = { title: t.title, body: preview }; // override body
        } else if (preview.length > 30) {
          preview = preview.substring(0, 30) + '…';
        }
        const title = t.title.replace('{{sender}}', sender.username);
        const body = t.body.replace('{{preview}}', preview);
        await sendPushNotification(recipient.push_subscription, {
          title,
          body,
          senderId: userId,
          senderName: sender.username,
        });
      } catch (e: any) {
        console.error('[PUSH ERROR]', e.message);
      }
    }

    // Invia sempre evento socket se il destinatario è online
    if (io.sockets.adapter.rooms.get(`user_${recipientId}`)?.size > 0) {
      io.to(`user_${recipientId}`).emit('new_message', {
        senderId: userId,
        senderName: sender.username,
        translated: result.translated,
        original: result.original || undefined,
        timestamp: message.created_at,
        messageId: message.id,
        expiresAt: null,
        is_encrypted: !!encryptedPayload,
        type: 'text',
      });
    }
    // Se shouldPush è false e siamo qui, significa chat attiva: non fare nulla

    const estimatedExpiresAt = expiryHours
      ? new Date(Date.now() + expiryHours * 3600000).toISOString()
      : null;
    res.json({
      success: true,
      translated: result.translated,
      original: result.original || undefined,
      is_encrypted: !!encryptedPayload,
      messageId: message.id,
      expiresAt: estimatedExpiresAt,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Errore durante l'invio" });
  }
});

// GET /messages/:contact_id – cronologia messaggi con paginazione
router.get('/messages/:contact_id', verifyToken, async (req: Request, res: Response) => {
  try {
    const userId: string = (req as any).userId;
    if (!userId) return res.status(401).json({ error: 'Utente non autenticato' });
    const contactId = req.params.contact_id as string;
    if (!contactId) return res.status(400).json({ error: 'ID contatto mancante' });

    const limit = Math.min(Math.max(parseInt(req.query.limit as string) || 30, 1), 100);
    let before: Date | undefined;
    if (req.query.before) {
      before = new Date(req.query.before as string);
      if (isNaN(before.getTime()))
        return res.status(400).json({ error: 'Parametro before non valido' });
    }

    const contact = await prisma.contact.findFirst({
      where: {
        OR: [
          { user_id: userId, contact_id: contactId },
          { user_id: contactId, contact_id: userId },
        ],
      },
    });
    if (!contact) return res.status(404).json({ error: 'Contatto non trovato' });

    let clearedAt: Date | null = null;
    if (contact.user_id === userId) {
      clearedAt = contact.user_cleared_at;
    } else {
      clearedAt = contact.contact_cleared_at;
    }

    const conversationId = [userId, contactId].sort().join('_');
    const now = new Date();

    const where: any = {
      conversation_id: conversationId,
      OR: [{ expires_at: null }, { expires_at: { gt: now } }],
      ...(clearedAt ? { created_at: { gt: clearedAt } } : {}),
    };
    if (before) {
      where.created_at = {
        ...(where.created_at || {}),
        lt: before,
      };
    }

    // Prendi un messaggio in più per determinare hasMore
    const messages = await prisma.message.findMany({
      where,
      orderBy: { created_at: 'desc' },
      take: limit + 1,
    });

    const hasMore = messages.length > limit;
    if (hasMore) messages.pop(); // rimuove il messaggio extra

    // Inverti per ordine cronologico crescente
    messages.reverse();

    // Marca come letti i messaggi ricevuti non ancora letti in questo batch
    const messagesToMark = messages.filter((m) => m.recipient_id === userId && m.read_at === null);
    if (messagesToMark.length > 0) {
      const updates = messagesToMark.map((m) => {
        const expiryDate = m.expiry_hours ? new Date(Date.now() + m.expiry_hours * 3600000) : null;
        return prisma.message.update({
          where: { id: m.id },
          data: { read_at: now, expires_at: expiryDate },
        });
      });
      await Promise.all(updates);

      const senderId = messagesToMark[0].sender_id;
      io.to(`user_${senderId}`).emit('messages_read', {
        readerId: userId,
        messageIds: messagesToMark.map((m) => m.id),
      });
    }

    // Ricarica i messaggi aggiornati (per avere read_at corretto)
    const updatedMessages = await prisma.message.findMany({
      where: { id: { in: messages.map((m) => m.id) } },
      orderBy: { created_at: 'asc' },
    });

    const formatted = updatedMessages.map((m) => ({
      id: m.id,
      translated: m.translated_text,
      original: m.is_encrypted ? m.original_text : undefined,
      is_encrypted: m.is_encrypted,
      direction: m.sender_id === userId ? 'sent' : 'received',
      timestamp: m.created_at,
      expiresAt: m.expires_at,
      read_at: m.read_at,
      type: m.type || 'text',
      file_key: m.file_key,
      video_data: m.type === 'video' ? m.video_data : undefined,
      audio_data: m.type === 'voice_note' ? m.audio_data : undefined,
      encryptedPayload: m.encryptedPayload,
      reactions: m.reactions,
    }));

    res.json({ messages: formatted, hasMore });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Errore nel recupero messaggi' });
  }
});

// DELETE /message/:id – cancella un messaggio inviato (solo se non ancora letto)
router.delete('/message/:id', verifyToken, async (req: Request, res: Response) => {
  try {
    const userId: string = (req as any).userId;
    const messageId = req.params.id as string;
    if (!messageId) return res.status(400).json({ error: 'ID messaggio mancante' });

    const message = await prisma.message.findUnique({ where: { id: messageId } });
    if (!message) return res.status(404).json({ error: 'Messaggio non trovato' });

    if (message.sender_id !== userId) {
      return res.status(403).json({ error: 'Puoi cancellare solo i tuoi messaggi' });
    }

    await prisma.message.delete({ where: { id: messageId } });

    // Notifica il destinatario via socket se connesso
    const recipientSockets = io.sockets.adapter.rooms.get(`user_${message.recipient_id}`);
    if (recipientSockets && recipientSockets.size > 0) {
      io.to(`user_${message.recipient_id}`).emit('message_deleted', { messageId });
    }

    res.json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Errore durante la cancellazione' });
  }
});

// PUT /clear-chat/:contact_id – imposta il timestamp di cancellazione chat per l'utente
router.put('/clear-chat/:contact_id', verifyToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const contactId: string = String(req.params.contact_id);

    const contact = await prisma.contact.findFirst({
      where: {
        OR: [
          { user_id: userId, contact_id: contactId as string },
          { user_id: contactId as string, contact_id: userId },
        ],
      },
    });
    if (!contact) return res.status(404).json({ error: 'Contatto non trovato' });

    const now = new Date();
    if (contact.user_id === userId) {
      // L'utente corrente è il "user" del contatto
      await prisma.contact.update({
        where: { id: contact.id },
        data: { user_cleared_at: now },
      });
    } else {
      // L'utente corrente è il "contact" del contatto
      await prisma.contact.update({
        where: { id: contact.id },
        data: { contact_cleared_at: now },
      });
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore' });
  }
});

// POST /send-voice-note – messaggio vocale non tradotto (solo stessa lingua, E2E obbligatoria)
router.post('/send-voice-note', verifyToken, async (req: Request, res: Response) => {
  try {
    const userId: string = (req as any).userId;
    if (!userId) return res.status(401).json({ error: 'Utente non autenticato' });
    const recipientId: string = req.body.recipientId;
    const encryptedPayload: any = req.body.encryptedPayload;

    if (!recipientId) return res.status(400).json({ error: 'Destinatario mancante' });
    if (!encryptedPayload) return res.status(400).json({ error: 'Payload cifrato mancante' });

    const sender = await prisma.user.findUnique({ where: { id: userId } });
    const recipient = await prisma.user.findUnique({ where: { id: recipientId } });
    if (!sender || !recipient) return res.status(404).json({ error: 'Utente non trovato' });

    const conversationId = [userId, recipientId].sort().join('_');
    let expiryHours = await resolveExpiryHours(userId, recipientId);
    console.log(`[EXPIRY] ${req.path} expiryHours: ${expiryHours}`);
    const estimatedExpiresAt = expiryHours
      ? new Date(Date.now() + expiryHours * 3600000).toISOString()
      : null;
    const message = await prisma.message.create({
      data: {
        conversation_id: conversationId,
        sender_id: userId,
        recipient_id: recipientId,
        translated_text: '',
        original_text: null,
        original_language: sender.language_code,
        expiry_hours: expiryHours,
        expires_at: null,
        is_encrypted: true,
        type: 'voice_note',
        encryptedPayload: req.body.encryptedPayload,
      },
    });

    // Riattiva i flag della chat se erano stati spenti da una cancellazione precedente
    await prisma.contact.updateMany({
      where: {
        OR: [
          { user_id: userId, contact_id: recipientId },
          { user_id: recipientId, contact_id: userId },
        ],
      },
      data: {
        user_chat_active: true,
        contact_chat_active: true,
      },
    });

    // Emetti evento socket
    const sendPush = shouldSendPush(recipientId, userId);
    if (sendPush && recipient.push_subscription) {
      try {
        const { sendPushNotification } = await import('../services/push');
        const { pushTranslations } = await import('../locales/pushNotifications');
        const recipientLang = recipient.language_code || 'it-IT';
        const t = pushTranslations[recipientLang]?.message_voice || pushTranslations['en-US'].message_voice;
        const title = t.title.replace('{{sender}}', sender.username);
        const body = t.body;
        await sendPushNotification(recipient.push_subscription, {
          title,
          body,
          senderId: userId,
          senderName: sender.username,
        });
      } catch (e: any) {
        console.error('[PUSH ERROR]', e.message);
      }
    }

    // Invia sempre evento socket se il destinatario è online
    if (io.sockets.adapter.rooms.get(`user_${recipientId}`)?.size > 0) {
      io.to(`user_${recipientId}`).emit('new_message', {
        senderId: userId,
        senderName: sender.username,
        translated: '',
        original: undefined,
        timestamp: message.created_at,
        messageId: message.id,
        expiresAt: null,
        is_encrypted: true,
        type: 'voice_note',
        encryptedPayload: req.body.encryptedPayload,
      });
    }

    res.json({
      success: true,
      messageId: message.id,
      expiresAt: estimatedExpiresAt,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Errore durante l'invio del messaggio vocale" });
  }
});

// PUT /message/:id/react – aggiungi/rimuovi una reazione emoji
router.put('/message/:id/react', verifyToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const messageId: string = req.params.id as string;
    const { emoji } = req.body; // es. "👍"

    if (!emoji || typeof emoji !== 'string' || emoji.length > 2) {
      return res.status(400).json({ error: 'Emoji non valida' });
    }

    const message = await prisma.message.findUnique({ where: { id: messageId } });
    if (!message) return res.status(404).json({ error: 'Messaggio non trovato' });

    // Solo il destinatario può reagire
    if (message.recipient_id !== userId) {
      return res.status(403).json({ error: 'Solo il destinatario può reagire' });
    }

    let reactions: { emoji: string; userId: string }[] = [];
    if (message.reactions) {
      try {
        reactions = JSON.parse(message.reactions);
      } catch {
        /* mantieni array vuoto */
      }
    }

    const existing = reactions.find((r) => r.emoji === emoji && r.userId === userId);
    if (existing) {
      // Rimuovi la reazione (toggle)
      reactions = reactions.filter((r) => !(r.emoji === emoji && r.userId === userId));
    } else {
      reactions.push({ emoji, userId });
    }

    const updated = await prisma.message.update({
      where: { id: messageId },
      data: { reactions: JSON.stringify(reactions) },
    });

    // Notifica l'altro utente
    const otherUserId = message.sender_id === userId ? message.recipient_id : message.sender_id;
    io.to(`user_${otherUserId}`).emit('message_reaction', {
      messageId,
      reactions: updated.reactions,
    });

    res.json({ success: true, reactions: updated.reactions });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Errore aggiornamento reazione' });
  }
});

// POST /send-image – invio immagine ridimensionata (cifrata se stessa lingua)
router.post('/send-image', verifyToken, async (req: Request, res: Response) => {
  try {
    const userId: string = (req as any).userId;
    if (!userId) return res.status(401).json({ error: 'Utente non autenticato' });
    const recipientId: string = req.body.recipientId;
    const encryptedPayload: any = req.body.encryptedPayload;
    const imageBase64: string = req.body.imageBase64;

    if (!recipientId) return res.status(400).json({ error: 'Destinatario mancante' });
    if (!encryptedPayload && !imageBase64)
      return res.status(400).json({ error: 'Immagine mancante' });

    const sender = await prisma.user.findUnique({ where: { id: userId } });
    const recipient = await prisma.user.findUnique({ where: { id: recipientId } });
    if (!sender || !recipient) return res.status(404).json({ error: 'Utente non trovato' });

    let isEncrypted = false;
    let imageData: string;

    if (encryptedPayload) {
      isEncrypted = true;
      imageData = JSON.stringify(encryptedPayload);
    } else if (imageBase64) {
      // Retrocompatibilità: vecchi messaggi in chiaro
      imageData = imageBase64;
    } else {
      return res.status(400).json({ error: 'Payload cifrato o immagine in chiaro mancante' });
    }

    const conversationId = [userId, recipientId].sort().join('_');
    let expiryHours = await resolveExpiryHours(userId, recipientId);
    const message = await prisma.message.create({
      data: {
        conversation_id: conversationId,
        sender_id: userId,
        recipient_id: recipientId,
        translated_text: '',
        original_text: null,
        original_language: sender.language_code,
        expiry_hours: expiryHours,
        expires_at: null,
        is_encrypted: true,
        type: 'image',
        encryptedPayload: req.body.encryptedPayload,
        file_key: req.body.fileKey || null, // manterremo per retrocompatibilità?
        // NOTA: volendo possiamo già eliminare file_key e usare solo encryptedPayload
        // ma per sicurezza teniamo file_key per ora, poi in fase 5 rimuoveremo
      },
    });

    // Riattiva i flag della chat se erano stati spenti da una cancellazione precedente
    await prisma.contact.updateMany({
      where: {
        OR: [
          { user_id: userId, contact_id: recipientId },
          { user_id: recipientId, contact_id: userId },
        ],
      },
      data: {
        user_chat_active: true,
        contact_chat_active: true,
      },
    });

    // Emetti evento socket
    const sendPush = shouldSendPush(recipientId, userId);
    if (sendPush && recipient.push_subscription) {
      try {
        const { sendPushNotification } = await import('../services/push');
        const { pushTranslations } = await import('../locales/pushNotifications');
        const recipientLang = recipient.language_code || 'it-IT';
        const t = pushTranslations[recipientLang]?.message_image || pushTranslations['en-US'].message_image;
        const title = t.title.replace('{{sender}}', sender.username);
        const body = t.body;
        await sendPushNotification(recipient.push_subscription, {
          title,
          body,
          senderId: userId,
          senderName: sender.username,
        });
      } catch (e: any) {
        console.error('[PUSH ERROR]', e.message);
      }
    }

    // Invia sempre evento socket se il destinatario è online
    if (io.sockets.adapter.rooms.get(`user_${recipientId}`)?.size > 0) {
      io.to(`user_${recipientId}`).emit('new_message', {
        senderId: userId,
        senderName: sender.username,
        translated: '',
        original: undefined,
        timestamp: message.created_at,
        messageId: message.id,
        expiresAt: null,
        is_encrypted: true,
        type: 'image',
        encryptedPayload: req.body.encryptedPayload,
        fileKey: req.body.fileKey || undefined, // per retrocompatibilità
      });
    }

    const estimatedExpiresAt = expiryHours
      ? new Date(Date.now() + expiryHours * 3600000).toISOString()
      : null;
    res.json({ success: true, messageId: message.id, expiresAt: estimatedExpiresAt });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Errore durante l'invio dell'immagine" });
  }
});

// POST /send-video – invio video con thumbnail (cifrato E2E obbligatorio)
router.post('/send-video', verifyToken, async (req: Request, res: Response) => {
  try {
    const userId: string = (req as any).userId;
    if (!userId) return res.status(401).json({ error: 'Utente non autenticato' });
    const recipientId: string = req.body.recipientId;
    const encryptedPayload: any = req.body.encryptedPayload;

    if (!recipientId) return res.status(400).json({ error: 'Destinatario mancante' });
    if (!encryptedPayload || typeof encryptedPayload !== 'string') {
      return res.status(400).json({ error: 'Payload cifrato mancante o non valido' });
    }

    const sender = await prisma.user.findUnique({ where: { id: userId } });
    const recipient = await prisma.user.findUnique({ where: { id: recipientId } });
    if (!sender || !recipient) return res.status(404).json({ error: 'Utente non trovato' });

    const conversationId = [userId, recipientId].sort().join('_');
    let expiryHours = await resolveExpiryHours(userId, recipientId);
    const estimatedExpiresAt = expiryHours
      ? new Date(Date.now() + expiryHours * 3600000).toISOString()
      : null;

    const message = await prisma.message.create({
      data: {
        conversation_id: conversationId,
        sender_id: userId,
        recipient_id: recipientId,
        translated_text: '',
        original_text: null,
        original_language: sender.language_code,
        expiry_hours: expiryHours,
        expires_at: null,
        is_encrypted: true,
        type: 'video',
        encryptedPayload: req.body.encryptedPayload,
      },
    });

    // Riattiva i flag della chat
    await prisma.contact.updateMany({
      where: {
        OR: [
          { user_id: userId, contact_id: recipientId },
          { user_id: recipientId, contact_id: userId },
        ],
      },
      data: {
        user_chat_active: true,
        contact_chat_active: true,
      },
    });

    // Emetti evento socket
    const sendPush = shouldSendPush(recipientId, userId);
    if (sendPush && recipient.push_subscription) {
      try {
        const { sendPushNotification } = await import('../services/push');
        const { pushTranslations } = await import('../locales/pushNotifications');
        const recipientLang = recipient.language_code || 'it-IT';
        const t = pushTranslations[recipientLang]?.message_video || pushTranslations['en-US'].message_video;
        const title = t.title.replace('{{sender}}', sender.username);
        const body = t.body;
        await sendPushNotification(recipient.push_subscription, {
          title,
          body,
          senderId: userId,
          senderName: sender.username,
        });
      } catch (e: any) {
        console.error('[PUSH ERROR]', e.message);
      }
    }

    if (io.sockets.adapter.rooms.get(`user_${recipientId}`)?.size > 0) {
      io.to(`user_${recipientId}`).emit('new_message', {
        senderId: userId,
        senderName: sender.username,
        translated: '',
        original: undefined,
        timestamp: message.created_at,
        messageId: message.id,
        expiresAt: null,
        is_encrypted: true,
        type: 'video',
        encryptedPayload: req.body.encryptedPayload,
      });
    }

    res.json({
      success: true,
      messageId: message.id,
      expiresAt: estimatedExpiresAt,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Errore durante l'invio del video" });
  }
});

export default router;
