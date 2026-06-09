import { Router, Request, Response } from 'express';
import multer from 'multer';
import { verifyToken } from './auth';
import { translateWithGemini } from '../services/gemini';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

// POST /audio – Traduzione istantanea effimera (non salva messaggi)
router.post('/audio', verifyToken, upload.single('audio'), async (req: Request, res: Response) => {
  try {
    const userId: string = (req as any).userId;
    if (!userId) return res.status(401).json({ error: 'Utente non autenticato' });

    const sourceLang: string = req.body.sourceLang;
    const includeOriginal: boolean = req.body.includeOriginal !== 'false'; // default true
    const targetLang: string = req.body.targetLang;
    const audioFile = req.file;

    if (!sourceLang || !targetLang || !audioFile) {
      return res.status(400).json({ error: 'sourceLang, targetLang e file audio richiesti' });
    }

    const audioBase64: string = audioFile.buffer.toString('base64');

    const result = await translateWithGemini(
      audioBase64,
      null,
      sourceLang,
      targetLang,
      includeOriginal,
      null,
      userId
    );

    const response: any = { translated: result.translated };
    if (includeOriginal) {
      response.original = result.original;
    }
    res.json(response);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Errore durante la traduzione' });
  }
});

// POST /text – Traduzione testuale lato client (E2E cross‑language)
router.post('/text', verifyToken, async (req: Request, res: Response) => {
  try {
    const userId: string = (req as any).userId;
    if (!userId) return res.status(401).json({ error: 'Utente non autenticato' });

    const { text, sourceLang, targetLang } = req.body;
    if (!text || !sourceLang || !targetLang) {
      return res.status(400).json({ error: 'text, sourceLang e targetLang richiesti' });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ error: 'Utente non trovato' });

    if (!user.has_api_key || !user.api_key) {
      return res.status(403).json({ error: 'Aggiungi una chiave API per tradurre' });
    }

    try {
      const result = await translateWithGemini(
        null,
        text,
        sourceLang,
        targetLang,
        false,
        user.api_key,
        undefined
      );
      res.json({ translatedText: result.translated });
    } catch (err: any) {
      console.error('[TRANSLATE TEXT]', err.message);
      if (err.message === 'API_KEY_INVALID') {
        return res.status(403).json({ error: 'Chiave API non valida. Aggiornala nel profilo.' });
      }
      res.status(500).json({ error: 'Errore durante la traduzione' });
    }
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Errore durante la traduzione' });
  }
});

export default router;
