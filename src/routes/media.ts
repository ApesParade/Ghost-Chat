import { Router, Request, Response } from 'express';
import { verifyToken } from './auth';
import { getFileUrl, isStorageConfigured } from '../services/storage';

const router = Router();

/**
 * GET /api/media/:fileKey
 * Restituisce un URL firmato (valido 60 secondi) per scaricare il file
 */
router.get('/:fileKey', verifyToken, async (req: Request, res: Response) => {
  try {
    const fileKey = req.params.fileKey as string;
    if (!fileKey || typeof fileKey !== 'string') {
    return res.status(400).json({ error: 'fileKey non valido' });
    }
    if (!fileKey) {
      return res.status(400).json({ error: 'fileKey mancante' });
    }

    if (!isStorageConfigured()) {
      return res.status(500).json({ error: 'Storage non configurato' });
    }

    const url = await getFileUrl(fileKey, 60);
    res.json({ url });
  } catch (err: any) {
    console.error('[MEDIA ERROR]', err);
    res.status(500).json({ error: 'Errore nel generare URL firmato' });
  }
});

export default router;