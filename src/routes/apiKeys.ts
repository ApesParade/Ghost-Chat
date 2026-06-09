import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from './auth';
import { encrypt } from '../utils/crypto';
import { translateWithGemini } from '../services/gemini';

const prisma = new PrismaClient();
const router = Router();

// GET /api/auth/keys – elenco chiavi (solo last_8)
router.get('/keys', verifyToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const keys = await prisma.apiKey.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' },
      select: { id: true, last_8: true },
    });
    res.json({ keys });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore del server' });
  }
});

// POST /api/auth/keys – aggiungi una nuova chiave (validazione Gemini)
router.post('/keys', verifyToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { api_key } = req.body;
    if (!api_key || typeof api_key !== 'string') {
      return res.status(400).json({ error: 'Chiave API mancante' });
    }

    // Test immediato della chiave con una richiesta fittizia a Gemini
    let testPassed = false;
    let testError = null;
    try {
      await translateWithGemini(
        null,
        'test',
        'it',
        'en',
        false,
        encrypt(api_key),
        undefined
      );
      testPassed = true;
    } catch (err: any) {
      testError = err;
      // Se l'errore è "API_KEY_INVALID" allora la chiave è proprio sbagliata
      if (err.message === 'API_KEY_INVALID') {
        return res.status(400).json({ error: 'Chiave API non valida' });
      }
      // Per tutti gli altri errori (incluso 429 quota exceeded) accettiamo la chiave
      // ma registriamo l'errore per informare l'utente
      console.warn(`[API Keys] Test fallito per nuova chiave (${api_key.slice(-8)}): ${err.message}. La chiave viene comunque salvata.`);
    }

    // Anche se il test non è passato a causa di errori di quota/rete, procediamo
    // (ma se testError è diverso da null, mostriamo un avviso)

    const encrypted = encrypt(api_key);
    const last_8 = api_key.slice(-8);

    const key = await prisma.apiKey.create({
      data: {
        user_id: userId,
        encrypted_key: encrypted,
        last_8,
      },
    });

    const responseData: any = { id: key.id, last_8: key.last_8 };
    if (testError && !testPassed) {
      responseData.warning = `Chiave salvata ma verifica fallita: ${testError.message}. Potrebbe essere dovuta a limiti di quota di Gemini.`;
    }
    res.status(201).json(responseData);

    // Sincronizza il campo api_key dell'utente con questa chiave (ultima inserita)
    await prisma.user.update({
      where: { id: userId },
      data: {
        api_key: encrypted,
        has_api_key: true,
      },
    });

    res.status(201).json({ id: key.id, last_8: key.last_8 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore del server' });
  }
});

// DELETE /api/auth/keys/:id – rimuovi una chiave
router.delete('/keys/:id', verifyToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const keyId = req.params.id as string;

    const key = await prisma.apiKey.findFirst({
      where: { id: keyId, user_id: userId },
    });
    if (!key) {
      return res.status(404).json({ error: 'Chiave non trovata' });
    }

    await prisma.apiKey.delete({ where: { id: keyId } });

    // Se non ci sono più chiavi, imposta has_api_key = false
    const remaining = await prisma.apiKey.count({ where: { user_id: userId } });
    if (remaining === 0) {
      await prisma.user.update({
        where: { id: userId },
        data: { api_key: null, has_api_key: false },
      });
    } else {
      // Imposta api_key con l'ultima chiave rimasta (la più recente)
      const lastKey = await prisma.apiKey.findFirst({
        where: { user_id: userId },
        orderBy: { created_at: 'desc' },
      });
      if (lastKey) {
        await prisma.user.update({
          where: { id: userId },
          data: { api_key: lastKey.encrypted_key, has_api_key: true },
        });
      }
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore del server' });
  }
});

export default router;