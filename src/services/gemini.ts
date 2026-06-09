import { decrypt } from '../utils/crypto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface TranslationResult {
  translated: string;
  original?: string;
}

// Helper: chiamata a Gemini con retry interni sulla stessa chiave (per 429/503)
async function callGeminiWithRetry(apiKey: string, contents: any[]): Promise<any> {
  const fetchGemini = async () => {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents }),
      }
    );
    return response;
  };

  let response = await fetchGemini();

  if (!response.ok) {
    const errorBody = await response.text();
    console.error('[GEMINI] Risposta errore:', response.status, errorBody);
    if (response.status === 400 && errorBody.includes('API_KEY_INVALID')) {
      throw new Error('API_KEY_INVALID');
    }

    const retryableStatuses = [503, 429];
    if (retryableStatuses.includes(response.status)) {
      for (let attempt = 1; attempt <= 3; attempt++) {
        console.log(`[GEMINI] ${response.status} ricevuto, tentativo ${attempt}/3...`);
        const delayMs = response.status === 429 ? 5000 * attempt : 2000 * attempt;
        await new Promise((r) => setTimeout(r, delayMs));
        const retryRes = await fetchGemini();
        if (retryRes.ok) {
          const retryJson = await retryRes.json();
          const retryRaw = retryJson?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (!retryRaw) throw new Error('Risposta vuota da Gemini');
          const retryCleaned = retryRaw.replace(/```json|```/g, '').trim();
          return JSON.parse(retryCleaned);
        }
      }
    }
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const json = await response.json();
  const raw = json?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!raw) throw new Error('Risposta vuota da Gemini');
  const cleaned = raw.replace(/```json|```/g, '').trim();
  return JSON.parse(cleaned);
}

// Helper: chiamata multilingue con backoff e retry interni
async function callGeminiMultilingualWithRetry(apiKey: string, prompt: string): Promise<Record<string, string>> {
  const delays = [0, 15000, 30000, 60000, 120000];
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= delays.length; attempt++) {
    try {
      if (attempt > 0 && delays[attempt - 1] > 0) {
        console.log(`[GEMINI Multilingual] Attesa ${delays[attempt - 1] / 1000}s prima del tentativo ${attempt + 1}...`);
        await new Promise(r => setTimeout(r, delays[attempt - 1]));
      }

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
        }
      );

      if (response.ok) {
        const json = await response.json();
        const raw = json?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!raw) throw new Error('Risposta vuota da Gemini');
        const cleaned = raw.replace(/```json|```/g, '').trim();
        const parsed = JSON.parse(cleaned);
        // Verifica lingue (opzionale, lo fa già il chiamante)
        return parsed;
      }

      const errorBody = await response.text();
      const isRetryable = response.status === 429 || response.status === 503 || response.status === 500;
      if (!isRetryable) throw new Error(`Gemini API error: ${response.status} - ${errorBody}`);
      lastError = new Error(`Gemini API error: ${response.status} - ${errorBody}`);
      console.log(`[GEMINI Multilingual] Tentativo ${attempt + 1}/${delays.length + 1} fallito con status ${response.status}, ${attempt < delays.length ? 'riprovo...' : 'fine tentativi'}`);
    } catch (err: any) {
      lastError = err;
      if (attempt === delays.length) break;
      console.log(`[GEMINI Multilingual] Tentativo ${attempt + 1}/${delays.length + 1} errore: ${err.message}, ${attempt < delays.length ? 'riprovo...' : 'fine tentativi'}`);
    }
  }
  throw new Error(`Traduzione fallita dopo ${delays.length + 1} tentativi. Ultimo errore: ${lastError?.message}`);
}

// Helper: rotazione tra più chiavi API per un dato utente
async function tryGeminiRequest<T>(
  userId: string,
  requestFn: (apiKey: string) => Promise<T>
): Promise<T> {
  const keys = await prisma.apiKey.findMany({
    where: { user_id: userId },
    orderBy: { created_at: 'desc' }
  });
  if (keys.length === 0) {
    throw new Error('Nessuna chiave API disponibile per la traduzione.');
  }

  let lastError: Error | null = null;
  for (const key of keys) {
    try {
      const decrypted = decrypt(key.encrypted_key);
      const result = await requestFn(decrypted);
      // Successo: aggiorna il campo api_key dell'utente con questa chiave
      await prisma.user.update({
        where: { id: userId },
        data: { api_key: key.encrypted_key, has_api_key: true }
      });
      return result;
    } catch (err: any) {
      lastError = err;
      const isRetryable = err.message === 'API_KEY_INVALID' ||
                          err.message.includes('429') ||
                          err.message.includes('503') ||
                          err.message.includes('500');
      if (!isRetryable) {
        throw err; // errore non recuperabile, esci subito
      }
      console.log(`[Gemini] Chiave ${key.last_8} fallita con errore ${err.message}, passo alla prossima`);
      // continua con la prossima chiave
    }
  }
  throw lastError || new Error('Tutte le chiavi hanno fallito');
}

// Funzione principale per traduzione audio/testo (con rotazione se fallbackUserId è fornito)
export async function translateWithGemini(
  audioBase64: string | null,
  text: string | null,
  sourceLang: string,
  targetLang: string,
  includeOriginal: boolean,
  apiKeyEncrypted?: string | null,
  fallbackUserId?: string
): Promise<TranslationResult> {
  // Caso 1: uso di una chiave specifica (senza rotazione)
  if (apiKeyEncrypted) {
    const apiKey = decrypt(apiKeyEncrypted);
    const sourceLangBase = sourceLang.split('-')[0];
    const targetLangBase = targetLang.split('-')[0];
    const prompt = includeOriginal
      ? `Traduci il seguente contenuto da ${sourceLangBase} a ${targetLangBase}. Restituisci un JSON con le chiavi: "translated" (testo tradotto) e "original" (testo originale esatto).`
      : `Traduci il seguente contenuto da ${sourceLangBase} a ${targetLangBase}. Restituisci un JSON con la chiave: "translated".`;

    const contents: any[] = [];
    if (audioBase64) {
      contents.push({ parts: [{ text: prompt }, { inlineData: { mimeType: 'audio/webm', data: audioBase64 } }] });
    } else if (text) {
      contents.push({ parts: [{ text: prompt + '\n' + text }] });
    } else {
      throw new Error('Nessun contenuto da tradurre');
    }

    const parsed = await callGeminiWithRetry(apiKey, contents);
    return {
      translated: parsed.translated,
      original: parsed.original,
    };
  }

  // Caso 2: rotazione tramite fallbackUserId
  if (fallbackUserId) {
    const result = await tryGeminiRequest(fallbackUserId, async (apiKey) => {
      const sourceLangBase = sourceLang.split('-')[0];
      const targetLangBase = targetLang.split('-')[0];
      const prompt = includeOriginal
        ? `Traduci il seguente contenuto da ${sourceLangBase} a ${targetLangBase}. Restituisci un JSON con le chiavi: "translated" (testo tradotto) e "original" (testo originale esatto).`
        : `Traduci il seguente contenuto da ${sourceLangBase} a ${targetLangBase}. Restituisci un JSON con la chiave: "translated".`;

      const contents: any[] = [];
      if (audioBase64) {
        contents.push({ parts: [{ text: prompt }, { inlineData: { mimeType: 'audio/webm', data: audioBase64 } }] });
      } else if (text) {
        contents.push({ parts: [{ text: prompt + '\n' + text }] });
      } else {
        throw new Error('Nessun contenuto da tradurre');
      }
      return await callGeminiWithRetry(apiKey, contents);
    });
    return {
      translated: result.translated,
      original: result.original,
    };
  }

  throw new Error('Nessuna chiave API disponibile per la traduzione.');
}

// Traduzione multilingue per notifiche admin (con rotazione se userId è fornito)
export async function translateMultilingual(
  text: string,
  apiKeyEncrypted: string,
  userId?: string
): Promise<Record<string, string>> {
  // Se viene passato userId, usa la rotazione (ignora apiKeyEncrypted)
  if (userId) {
    const languages = [
      'it-IT', 'en-US', 'es-ES', 'fr-FR', 'de-DE', 'ru-RU', 'zh-CN', 'ar-SA',
      'ja-JP', 'ko-KR', 'pt-BR', 'nl-NL', 'pl-PL', 'tr-TR', 'hi-IN'
    ];
    const languagesList = languages.join(', ');
    const prompt = `Sei un traduttore professionista. Traduci il seguente testo dall'italiano a ciascuna delle seguenti lingue: ${languagesList}. 
Restituisci SOLO un oggetto JSON valido con chiavi pari ai codici delle lingue (es. "it-IT", "en-US", ...) e come valore il testo tradotto in quella lingua. 
Il testo da tradurre è: "${text.replace(/"/g, '\\"')}". 
Non aggiungere spiegazioni, solo il JSON.`;

    const result = await tryGeminiRequest(userId, async (apiKey) => {
      return await callGeminiMultilingualWithRetry(apiKey, prompt);
    });
    // Verifica la presenza di tutte le lingue
    for (const lang of languages) {
      if (!result[lang]) throw new Error(`Lingua ${lang} mancante nella risposta`);
    }
    return result;
  }

  // Comportamento originale (senza rotazione)
  const apiKey = decrypt(apiKeyEncrypted);
  if (!apiKey) throw new Error('Chiave API non valida');

  const languages = [
    'it-IT', 'en-US', 'es-ES', 'fr-FR', 'de-DE', 'ru-RU', 'zh-CN', 'ar-SA',
    'ja-JP', 'ko-KR', 'pt-BR', 'nl-NL', 'pl-PL', 'tr-TR', 'hi-IN'
  ];
  const languagesList = languages.join(', ');
  const prompt = `Sei un traduttore professionista. Traduci il seguente testo dall'italiano a ciascuna delle seguenti lingue: ${languagesList}. 
Restituisci SOLO un oggetto JSON valido con chiavi pari ai codici delle lingue (es. "it-IT", "en-US", ...) e come valore il testo tradotto in quella lingua. 
Il testo da tradurre è: "${text.replace(/"/g, '\\"')}". 
Non aggiungere spiegazioni, solo il JSON.`;

  const result = await callGeminiMultilingualWithRetry(apiKey, prompt);
  for (const lang of languages) {
    if (!result[lang]) throw new Error(`Lingua ${lang} mancante`);
  }
  return result;
}