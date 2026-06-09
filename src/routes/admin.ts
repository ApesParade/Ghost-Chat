import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from './auth';
import { Server as SocketIOServer } from 'socket.io';

let io: SocketIOServer;
export function setAdminSocketIO(socketio: SocketIOServer) {
  io = socketio;
}

const router = Router();
const prisma = new PrismaClient();

// GET /api/admin/users
router.get('/users', verifyToken, async (req: any, res: Response) => {
  if (!req.user.isAdmin) return res.status(403).json({ error: 'Accesso negato' });
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = (req.query.search as string) || '';
  const filterInactive = req.query.filterInactive === 'true';
  const skip = (page - 1) * limit;

  const whereClause: any = { isAdmin: false };
  if (search) whereClause.username = { contains: search, mode: 'insensitive' };
  if (filterInactive) whereClause.isActive = false;

  const [users, totalCount] = await Promise.all([
    prisma.user.findMany({
      where: whereClause,
      orderBy: { created_at: 'desc' },
      skip, take: limit,
      select: {
        id: true,
        username: true,
        isActive: true,
        adminNote: true,
        created_at: true,
        language_code: true,
        flag: true
      }
    }),
    prisma.user.count({ where: whereClause })
  ]);
  res.json({ users, totalPages: Math.ceil(totalCount / limit), currentPage: page });
});

// PATCH /api/admin/users/:id
router.patch('/users/:id', verifyToken, async (req: any, res: Response) => {
  if (!req.user.isAdmin) return res.status(403).json({ error: 'Accesso negato' });
  const { isActive, adminNote } = req.body;
  const userId = req.params.id;
  const oldUser = await prisma.user.findUnique({ where: { id: userId } });
  if (!oldUser) return res.status(404).json({ error: 'Utente non trovato' });
  const wasActive = oldUser.isActive;

  await prisma.user.update({
    where: { id: userId },
    data: { isActive, adminNote: adminNote?.slice(0, 30) }
  });

  if (isActive === true && wasActive === false) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user?.push_subscription) {
      try {
        const { sendPushNotification } = await import('../services/push');
        const { pushTranslations } = await import('../locales/pushNotifications');
        const userLang = user.language_code || 'it-IT';
        const translation = pushTranslations[userLang]?.account_activated || pushTranslations['en-US'].account_activated;
        await sendPushNotification(user.push_subscription, {
          title: translation.title,
          body: translation.body,
        });
      } catch (pushErr) { console.error(pushErr); }
    }
  }
  res.json({ success: true });
});

// DELETE /api/admin/users/:id
router.delete('/users/:id', verifyToken, async (req: any, res: Response) => {
  if (!req.user.isAdmin) return res.status(403).json({ error: 'Accesso negato' });
  const userId = req.params.id;
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return res.status(404).json({ error: 'Utente non trovato' });
  if (user.isAdmin) return res.status(403).json({ error: 'Non puoi eliminare un amministratore' });
  await prisma.user.delete({ where: { id: userId } });
  res.json({ success: true });
});

// POST /api/admin/notify-all
router.post('/notify-all', verifyToken, async (req: any, res: Response) => {
  if (!req.user.isAdmin) return res.status(403).json({ error: 'Accesso negato' });
  const { message } = req.body;
  if (!message?.trim()) return res.status(400).json({ error: 'Testo della notifica richiesto' });

  const existingCount = await prisma.adminNotification.count();
  if (existingCount >= 5) {
    const toDelete = await prisma.adminNotification.findMany({ orderBy: { createdAt: 'asc' }, take: existingCount - 4, select: { id: true } });
    if (toDelete.length) await prisma.adminNotification.deleteMany({ where: { id: { in: toDelete.map(n => n.id) } } });
  }

  const notification = await prisma.adminNotification.create({ data: { senderId: req.userId } });
  const adminUser = await prisma.user.findUnique({ where: { id: req.userId }, select: { api_key: true } });
  if (!adminUser?.api_key) {
    await prisma.adminNotification.delete({ where: { id: notification.id } });
    return res.status(400).json({ error: "L'amministratore deve configurare una chiave API nel proprio profilo per inviare notifiche multilingua." });
  }

  const { translateMultilingual } = await import('../services/gemini');
  let translations: Record<string, string>;
  try {
    translations = await translateMultilingual(message.trim(), adminUser.api_key, req.userId);
  } catch (err: any) {
    await prisma.adminNotification.delete({ where: { id: notification.id } });
    return res.status(500).json({ error: `Traduzione fallita: ${err.message}` });
  }

  await prisma.adminNotificationTranslation.createMany({
    data: Object.entries(translations).map(([lang, text]) => ({ notificationId: notification.id, languageCode: lang, translatedText: text }))
  });

  const users = await prisma.user.findMany({ where: { isActive: true, push_subscription: { not: null } }, select: { id: true, push_subscription: true } });
  if (users.length) {
    await prisma.adminNotificationRecipient.createMany({
      data: users.map(u => ({ notificationId: notification.id, userId: u.id, isRead: false }))
    });
  }

  const { sendPushNotification } = await import('../services/push');
  let successCount = 0, failureCount = 0;
  for (const user of users) {
    if (!user.push_subscription) continue;
    const result = await sendPushNotification(user.push_subscription, { title: '📢 Service message', body: 'New announcement from admin', page: 'admin-requests' });
    if (result) successCount++; else failureCount++;
  }
  res.json({ success: true, successCount, failureCount, notificationId: notification.id });
});

// DELETE /api/admin/users/batch
router.delete('/users/batch', verifyToken, async (req: any, res: Response) => {
  if (!req.user.isAdmin) return res.status(403).json({ error: 'Accesso negato' });
  const { userIds } = req.body;
  if (!Array.isArray(userIds) || userIds.length === 0) return res.status(400).json({ error: 'Lista di userIds richiesta' });
  const adminUsers = await prisma.user.findMany({ where: { id: { in: userIds }, isAdmin: true } });
  if (adminUsers.length) return res.status(403).json({ error: 'Non puoi eliminare amministratori' });
  const result = await prisma.user.deleteMany({ where: { id: { in: userIds }, isAdmin: false } });
  res.json({ deletedCount: result.count });
});

// POST /api/admin/notify-same-language
router.post('/notify-same-language', verifyToken, async (req: any, res: Response) => {
  if (!req.user.isAdmin) return res.status(403).json({ error: 'Accesso negato' });
  const { message } = req.body;
  if (!message?.trim()) return res.status(400).json({ error: 'Testo della notifica richiesto' });

  const existingCount = await prisma.adminNotification.count();
  if (existingCount >= 5) {
    const toDelete = await prisma.adminNotification.findMany({ orderBy: { createdAt: 'asc' }, take: existingCount - 4, select: { id: true } });
    if (toDelete.length) await prisma.adminNotification.deleteMany({ where: { id: { in: toDelete.map(n => n.id) } } });
  }

  const adminUser = await prisma.user.findUnique({ where: { id: req.userId }, select: { language_code: true } });
  const adminLang = adminUser?.language_code || 'it-IT';
  const notification = await prisma.adminNotification.create({ data: { senderId: req.userId } });
  await prisma.adminNotificationTranslation.create({ data: { notificationId: notification.id, languageCode: adminLang, translatedText: message.trim() } });

  const users = await prisma.user.findMany({ where: { isActive: true, push_subscription: { not: null }, language_code: adminLang }, select: { id: true, push_subscription: true } });
  if (users.length) {
    await prisma.adminNotificationRecipient.createMany({ data: users.map(u => ({ notificationId: notification.id, userId: u.id, isRead: false })) });
  }

  const { sendPushNotification } = await import('../services/push');
  let successCount = 0, failureCount = 0;
  for (const user of users) {
    if (!user.push_subscription) continue;
    const result = await sendPushNotification(user.push_subscription, { title: '📢 Service message', body: 'New announcement from admin', page: 'admin-requests' });
    if (result) successCount++; else failureCount++;
  }
  res.json({ success: true, successCount, failureCount, notificationId: notification.id });
});

// POST /api/admin/force-add-contact
router.post('/force-add-contact', verifyToken, async (req: any, res: Response) => {
  if (!req.user.isAdmin) return res.status(403).json({ error: 'Accesso negato' });
  const { targetUserId } = req.body;
  if (!targetUserId) return res.status(400).json({ error: 'targetUserId richiesto' });
  if (targetUserId === req.userId) return res.status(400).json({ error: 'Non puoi aggiungere te stesso' });

  const target = await prisma.user.findUnique({ where: { id: targetUserId } });
  if (!target) return res.status(404).json({ error: 'Utente non trovato' });

  let contact = await prisma.contact.findFirst({
    where: {
      OR: [
        { user_id: req.userId, contact_id: targetUserId },
        { user_id: targetUserId, contact_id: req.userId }
      ]
    }
  });

  if (contact) {
    contact = await prisma.contact.update({
      where: { id: contact.id },
      data: { status: 'accepted', user_chat_active: true, contact_chat_active: true }
    });
  } else {
    contact = await prisma.contact.create({
      data: {
        user_id: req.userId,
        contact_id: targetUserId,
        status: 'accepted',
        requested_by: req.userId,
        user_chat_active: true,
        contact_chat_active: true
      }
    });
  }

  if (io) {
    io.to(`user_${targetUserId}`).emit('contact_accepted', {
      contactId: contact.id,
      by: req.userId
    });
  }

  const otherUser = await prisma.user.findUnique({
    where: { id: targetUserId },
    select: { id: true, username: true, language_code: true, flag: true, has_api_key: true, avatar: true }
  });

  res.json({
    contact: {
      id: contact.id,
      status: contact.status,
      user_chat_active: contact.user_chat_active,
      contact_chat_active: contact.contact_chat_active,
      other_user: otherUser
    }
  });
});

export default router;