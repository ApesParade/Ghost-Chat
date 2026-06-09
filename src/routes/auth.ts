import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { encrypt } from '../utils/crypto';

const prisma = new PrismaClient();
const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret';

function generateTokens(userId: string) {
  const accessToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
  const refreshToken = jwt.sign({ userId }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
  return { accessToken, refreshToken };
}

export function verifyToken(req: Request, res: Response, next: Function) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token mancante' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    (req as any).userId = decoded.userId;
    // Verifica che l'utente sia attivo
    prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { isActive: true, isAdmin: true }
    })
      .then(user => {
        if (!user || !user.isActive) {
          return res.status(403).json({ error: 'Account non attivo o inesistente' });
        }
        (req as any).user = user;
        next();
      })
      .catch(() => res.status(500).json({ error: 'Errore del server' }));
  } catch (err) {
    return res.status(401).json({ error: 'Token non valido' });
  }
}

// POST /api/auth/register
router.post(
  '/register',
  body('username')
    .trim()
    .isLength({ min: 3, max: 15 })
    .withMessage('Username tra 3 e 15 caratteri'),
  body('password').isLength({ min: 4 }).withMessage('Password di almeno 4 caratteri'),
  body('language_code')
    .matches(/^[a-z]{2}-[A-Z]{2}$/)
    .withMessage('Formato lingua non valido (es. it-IT)'),
  body('flag').notEmpty().withMessage('Flag richiesto'),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { username, password, language_code, flag, api_key } = req.body;
      if (!username || !password || !language_code || !flag) {
        return res.status(400).json({ error: 'Campi obbligatori mancanti' });
      }
      const existing = await prisma.user.findUnique({ where: { username } });
      if (existing) {
        return res.status(409).json({ error: 'Username già in uso' });
      }
      const password_hash = await bcrypt.hash(password, 10);
      let has_api_key = false;
      if (api_key) {
        has_api_key = true;
      }
      const user = await prisma.user.create({
        data: {
          username,
          password_hash,
          name: username,
          language_code,
          flag,
          api_key: api_key ? encrypt(api_key) : null,
          has_api_key,
          isActive: false,
          isAdmin: false,
        },
      });

      // Invia notifica push all'amministratore
      try {
        const admin = await prisma.user.findFirst({ where: { isAdmin: true } });
        if (admin && admin.push_subscription) {
          // Importa le traduzioni
          const { pushTranslations } = await import('../locales/pushNotifications');
          const adminLang = admin.language_code || 'it-IT';
          const translation = pushTranslations[adminLang]?.new_registration || pushTranslations['en-US'].new_registration;
          const { sendPushNotification } = await import('../services/push');
          const bodyText = translation.body.replace('{{username}}', user.username);
          await sendPushNotification(admin.push_subscription, {
            title: translation.title,
            body: bodyText,
            page: 'admin-requests'
          });
        }
      } catch (pushErr) {
        console.error('Push admin fallita:', pushErr);
      }

      res.status(201).json({ message: 'Registrazione completata. Attendi l\'approvazione dell\'amministratore.' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Errore del server' });
    }
  }
);

// POST /api/auth/login
router.post(
  '/login',
  body('username').trim().notEmpty().withMessage('Username richiesto'),
  body('password').notEmpty().withMessage('Password richiesta'),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ error: 'Username e password richiesti' });
      }
      const user = await prisma.user.findUnique({ where: { username } });
      if (!user) {
        return res.status(401).json({ error: 'Credenziali non valide' });
      }
      const valid = await bcrypt.compare(password, user.password_hash);
      if (!valid) {
        return res.status(401).json({ error: 'Credenziali non valide' });
      }
      if (!user.isActive) {
        return res.status(403).json({ error: 'Account in attesa di approvazione' });
      }      
      const tokens = generateTokens(user.id);
      res.json({
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
          language_code: user.language_code,
          flag: user.flag,
          has_api_key: user.has_api_key,
          preferred_voice: user.preferred_voice,
        },
        ...tokens,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Errore del server' });
    }
  }
);

// GET /api/auth/me
router.get('/me', verifyToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: 'Utente non trovato' });
    }
    res.json({
      id: user.id,
      username: user.username,
      name: user.name,
      language_code: user.language_code,
      flag: user.flag,
      has_api_key: user.has_api_key,
      isAdmin: user.isAdmin,
      preferred_voice: user.preferred_voice,
      public_key: user.public_key,
      push_subscription: user.push_subscription,
      avatar: user.avatar,
      global_expiry_hours: user.global_expiry_hours,
      recording_beep: user.recording_beep,
      ephemeralDefault: user.ephemeralDefault,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore del server' });
  }
});

// PUT /api/auth/push-subscription
router.put('/push-subscription', verifyToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { subscription } = req.body;

    if (!subscription) {
      return res.status(400).json({ error: 'Subscription mancante' });
    }

    await prisma.user.update({
      where: { id: userId },
      data: { push_subscription: JSON.stringify(subscription) },
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore del server' });
  }
});

// PUT /api/auth/me
router.put(
  '/me',
  verifyToken,
  body('username')
    .optional()
    .trim()
    .isLength({ min: 3, max: 15 })
    .withMessage('Username tra 3 e 15 caratteri'),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const userId = (req as any).userId;
      const { username, name, language_code, flag, api_key, preferred_voice, avatar } = req.body;
      const updateData: any = {};

      // Gestione username
      if (username !== undefined) {
        if (username === '') {
          return res.status(400).json({ error: 'Username non può essere vuoto' });
        }
        // Verifica unicità escludendo l'utente corrente
        const existing = await prisma.user.findFirst({
          where: {
            username,
            id: { not: userId },
          },
        });
        if (existing) {
          return res.status(409).json({ error: 'Username già in uso da un altro utente' });
        }
        updateData.username = username;
        updateData.name = username; // name sincronizzato
      }

      if (name) updateData.name = name;
      if (language_code) updateData.language_code = language_code;
      if (flag) updateData.flag = flag;
      if (preferred_voice !== undefined) updateData.preferred_voice = preferred_voice;
      if (req.body.recording_beep !== undefined) {
        const allowedBeeps = ['pop', 'chime', 'double', null, ''];
        if (!allowedBeeps.includes(req.body.recording_beep)) {
          return res.status(400).json({ error: 'recording_beep deve essere pop, chime, double o null' });
        }
        updateData.recording_beep = req.body.recording_beep || null;
      }
      if (req.body.public_key !== undefined) {
        updateData.public_key = req.body.public_key || null;
      }
      if (req.body.ephemeralDefault !== undefined) {
        if (typeof req.body.ephemeralDefault !== 'boolean') {
          return res.status(400).json({ error: 'ephemeralDefault deve essere true o false' });
        }
        updateData.ephemeralDefault = req.body.ephemeralDefault;
      }
      if (req.body.global_expiry_hours !== undefined) {
        const val = req.body.global_expiry_hours;
        if (val !== null) {
          const num = Number(val);
          if (isNaN(num) || num < 0) {
            return res
              .status(400)
              .json({ error: 'global_expiry_hours deve essere un numero positivo o 0' });
          }
          updateData.global_expiry_hours = num === 0 ? null : num;
        } else {
          updateData.global_expiry_hours = null;
        }
      }
      if (avatar !== undefined) {
        if (avatar !== null && avatar !== '') {
          if (!avatar.startsWith('data:image/')) {
            return res.status(400).json({ error: 'Formato avatar non valido' });
          }
          if (avatar.length > 200000) {
            return res.status(400).json({ error: 'Avatar troppo grande (max 200KB)' });
          }
        }
        updateData.avatar = avatar || null;
      }
      if (api_key !== undefined) {
        if (api_key) {
          updateData.api_key = encrypt(api_key);
          updateData.has_api_key = true;
        } else {
          updateData.api_key = null;
          updateData.has_api_key = false;
        }
      }

      const user = await prisma.user.update({
        where: { id: userId },
        data: updateData,
      });

      const response: any = {
        id: user.id,
        username: user.username,
        name: user.name,
        language_code: user.language_code,
        flag: user.flag,
        has_api_key: user.has_api_key,
        preferred_voice: user.preferred_voice,
        public_key: user.public_key,
        avatar: user.avatar,
        global_expiry_hours: user.global_expiry_hours,
        recording_beep: user.recording_beep,
        ephemeralDefault: user.ephemeralDefault,
      };

      // Se l'username è cambiato, emetti nuovi token
      if (updateData.username) {
        const tokens = generateTokens(user.id);
        response.accessToken = tokens.accessToken;
        response.refreshToken = tokens.refreshToken;
      }

      res.json(response);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Errore del server' });
    }
  }
);

// GET /api/auth/vapid-public-key (non autenticato, serve al SW)
router.get('/vapid-public-key', (req: Request, res: Response) => {
  res.json({ publicKey: process.env.VAPID_PUBLIC_KEY || '' });
});

// POST /api/auth/pending-subscription – salva subscription per utente in attesa (senza autenticazione)
router.post('/pending-subscription', async (req: Request, res: Response) => {
  try {
    const { username, subscription } = req.body;
    if (!username || !subscription) {
      return res.status(400).json({ error: 'Username e subscription richiesti' });
    }
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: 'Utente non trovato' });
    }
    if (user.isActive) {
      return res.status(403).json({ error: 'Account già attivo, usa il metodo normale' });
    }
    await prisma.user.update({
      where: { id: user.id },
      data: { push_subscription: JSON.stringify(subscription) },
    });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore salvataggio subscription' });
  }
});

// POST /api/auth/refresh
router.post('/refresh', async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ error: 'Refresh token mancante' });
  }
  try {
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as { userId: string };
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user) {
      return res.status(401).json({ error: 'Utente non trovato' });
    }
    // Genera solo un nuovo access token (refresh token rimane valido)
    const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '15m' });
    res.json({ accessToken });
  } catch (err) {
    return res.status(401).json({ error: 'Refresh token non valido o scaduto' });
  }
});

// DELETE /api/auth/me – cancella account
router.delete('/me', verifyToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    // Elimina prima le relazioni
    await prisma.contact.deleteMany({
      where: {
        OR: [{ user_id: userId }, { contact_id: userId }],
      },
    });

    await prisma.message.deleteMany({
      where: {
        OR: [{ sender_id: userId }, { recipient_id: userId }],
      },
    });

    // Infine elimina l'utente
    await prisma.user.delete({ where: { id: userId } });

    res.json({ success: true, message: 'Account eliminato con successo' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Errore durante l'eliminazione dell'account" });
  }
});

// POST /api/auth/change-password
router.post(
  '/change-password',
  verifyToken,
  body('currentPassword').notEmpty().withMessage('Password attuale richiesta'),
  body('newPassword')
    .isLength({ min: 4 })
    .withMessage('Nuova password di almeno 4 caratteri'),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const userId = (req as any).userId;
      const { currentPassword, newPassword } = req.body;

      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        return res.status(404).json({ error: 'Utente non trovato' });
      }

      const valid = await bcrypt.compare(currentPassword, user.password_hash);
      if (!valid) {
        return res.status(401).json({ error: 'Password attuale non valida' });
      }

      const password_hash = await bcrypt.hash(newPassword, 10);
      await prisma.user.update({
        where: { id: userId },
        data: { password_hash },
      });

      res.json({ success: true, message: 'Password aggiornata con successo' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Errore del server' });
    }
  }
);

export default router;
