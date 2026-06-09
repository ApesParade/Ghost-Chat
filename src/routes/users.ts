import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from './auth';

const prisma = new PrismaClient();
const router = Router();

// GET /api/users/search?username=...
router.get('/search', verifyToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { username } = req.query;
    if (!username || typeof username !== 'string' || username.trim().length === 0) {
      return res.status(400).json({ error: 'Parametro username richiesto' });
    }
    const users = await prisma.user.findMany({
      where: {
        username: { contains: username.trim() },
        id: { not: userId }
      },
      select: {
        id: true,
        username: true,
        language_code: true,
        flag: true,
        has_api_key: true,
        avatar: true
      },
      take: 10
    });
    res.json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore del server' });
  }
});

// GET /:id – dati pubblici di un utente (lingua, flag, username, avatar, has_api_key)
router.get('/:id', verifyToken, async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id as string },
      select: { id: true, username: true, language_code: true, flag: true, avatar: true, has_api_key: true },
    });
    if (!user) return res.status(404).json({ error: 'Utente non trovato' });
    res.json(user);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Errore' });
  }
});

// GET /:id/key – chiave pubblica E2E di un utente
router.get('/:id/key', verifyToken, async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id as string },
      select: { id: true, public_key: true },
    });
    if (!user) return res.status(404).json({ error: 'Utente non trovato' });
    res.json({ public_key: user.public_key });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Errore' });
  }
});

export default router;