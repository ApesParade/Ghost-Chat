import { Router, Request, Response } from 'express';
import { verifyToken } from './auth';
import { generateFileKey, generatePresignedUploadUrl, isStorageConfigured } from '../services/storage';

const router = Router();

/**
 * POST /api/upload/request
 * Richiede un URL firmato per caricare un file direttamente dal client
 * Body: { type: 'image'|'video'|'audio', mimeType: string, messageId?: string }
 * Restituisce: { uploadUrl: string, fileKey: string }
 */
router.post('/request', verifyToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { type, mimeType, messageId } = req.body;

    if (!type || !mimeType) {
      return res.status(400).json({ error: 'type e mimeType sono obbligatori' });
    }

    const validTypes = ['image', 'video', 'audio'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ error: 'type deve essere image, video o audio' });
    }

    if (!isStorageConfigured()) {
      return res.status(500).json({ error: 'Storage non configurato' });
    }

    // Genera chiave univoca per il file
    const fileKey = generateFileKey(userId, mimeType);

    // Genera URL firmato valido 60 secondi
    const uploadUrl = await generatePresignedUploadUrl(fileKey, mimeType, 60);

    res.json({
      uploadUrl,
      fileKey,
      expiresIn: 60,
    });
  } catch (err: any) {
    console.error('[UPLOAD REQUEST ERROR]', err);
    res.status(500).json({ error: 'Errore nella generazione dell\'URL di upload' });
  }
});

export default router;