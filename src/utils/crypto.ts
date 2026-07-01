import crypto from 'crypto';

const algorithm = 'aes-256-cbc';

function getKey(): Buffer {
  const keyHex = process.env.ENCRYPTION_KEY;
  if (!keyHex) {
    throw new Error(
      '❌ ENCRYPTION_KEY mancante. Assicurati che il file .env sia presente e che dotenv sia stato configurato.'
    );
  }
  return Buffer.from(keyHex, 'hex');
}

function getIV(): Buffer {
  const ivHex = process.env.ENCRYPTION_IV;
  if (!ivHex) {
    throw new Error(
      '❌ ENCRYPTION_IV mancante. Assicurati che il file .env sia presente e che dotenv sia stato configurato.'
    );
  }
  return Buffer.from(ivHex, 'hex');
}

export function encrypt(text: string): string {
  const cipher = crypto.createCipheriv(algorithm, getKey(), getIV());
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

export function decrypt(encrypted: string): string {
  const decipher = crypto.createDecipheriv(algorithm, getKey(), getIV());
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}