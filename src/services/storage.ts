import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import crypto from 'crypto';

// Configurazione dal .env
const endpoint = process.env.S3_ENDPOINT;
const region = process.env.S3_REGION || 'auto';
const accessKeyId = process.env.S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
const bucket = process.env.S3_BUCKET;

let s3Client: S3Client | null = null;

function getS3Client(): S3Client {
  if (!s3Client) {
    if (!endpoint || !accessKeyId || !secretAccessKey || !bucket) {
      throw new Error('Configurazione S3 mancante. Verifica S3_ENDPOINT, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_BUCKET');
    }
    s3Client = new S3Client({
      endpoint,
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      forcePathStyle: true, // Necessario per MinIO e R2
    });
  }
  return s3Client;
}

/**
 * Genera una chiave univoca per un file
 * Formato: media/{userId}/{timestamp}-{random}.{extension}
 */
export function generateFileKey(userId: string, mimeType: string): string {
  const ext = mimeType.split('/')[1] || 'bin';
  const timestamp = Date.now();
  const random = crypto.randomBytes(8).toString('hex');
  return `media/${userId}/${timestamp}-${random}.${ext}`;
}

/**
 * Carica un file direttamente su S3 (usato dal backend)
 */
export async function uploadFile(
  buffer: Buffer,
  mimeType: string,
  userId: string,
  messageId: string
): Promise<string> {
  const client = getS3Client();
  const fileKey = generateFileKey(userId, mimeType);
  
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: fileKey,
      Body: buffer,
      ContentType: mimeType,
    })
  );
  
  return fileKey;
}

/**
 * Genera un URL firmato (presigned) per il download
 * Scadenza: 60 secondi (modificabile)
 */
export async function getFileUrl(fileKey: string, expiresInSeconds: number = 60): Promise<string> {
  const client = getS3Client();
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: fileKey,
  });
  
  return getSignedUrl(client, command, { expiresIn: expiresInSeconds });
}

/**
 * Genera un URL firmato per l'upload diretto dal client
 * Scadenza: 60 secondi
 */
export async function generatePresignedUploadUrl(
  fileKey: string,
  mimeType: string,
  expiresInSeconds: number = 60
): Promise<string> {
  const client = getS3Client();
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: fileKey,
    ContentType: mimeType,
  });
  
  return getSignedUrl(client, command, { expiresIn: expiresInSeconds });
}

/**
 * Elimina un file dallo storage
 */
export async function deleteFile(fileKey: string): Promise<void> {
  const client = getS3Client();
  await client.send(
    new DeleteObjectCommand({
      Bucket: bucket,
      Key: fileKey,
    })
  );
}

/**
 * Verifica se la configurazione S3 è presente
 */
export function isStorageConfigured(): boolean {
  return !!(process.env.S3_ENDPOINT && process.env.S3_ACCESS_KEY_ID && process.env.S3_SECRET_ACCESS_KEY && process.env.S3_BUCKET);
}