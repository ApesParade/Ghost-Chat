import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from './auth';

const router = Router();
const prisma = new PrismaClient();

// GET /api/notifications/unread
router.get('/unread', verifyToken, async (req: any, res: Response) => {
  const userId = req.userId;

  const recipients = await prisma.adminNotificationRecipient.findMany({
    where: {
      userId: userId,
      isRead: false
    },
    include: {
      notification: {
        include: {
          translations: true
        }
      }
    },
    orderBy: {
      notification: {
        createdAt: 'desc'
      }
    }
  });

  const userLanguage = (req as any).user?.language_code || 'it-IT';

  const notifications = recipients.map(recipient => {
    const translation = recipient.notification.translations.find(
      t => t.languageCode === userLanguage
    ) || recipient.notification.translations.find(t => t.languageCode === 'it-IT');
    return {
      recipientId: recipient.id,
      translatedText: translation ? translation.translatedText : 'Messaggio non disponibile',
      createdAt: recipient.notification.createdAt
    };
  });

  res.json({ notifications });
});

// POST /api/notifications/mark-read
router.post('/mark-read', verifyToken, async (req: any, res: Response) => {
  const userId = req.userId;
  const { recipientIds } = req.body;

  if (!Array.isArray(recipientIds) || recipientIds.length === 0) {
    return res.status(400).json({ error: 'Lista recipientIds richiesta' });
  }

  await prisma.adminNotificationRecipient.updateMany({
    where: {
      id: { in: recipientIds },
      userId: userId
    },
    data: {
      isRead: true,
      readAt: new Date()
    }
  });

  res.json({ success: true });
});

export default router;