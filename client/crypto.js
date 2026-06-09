// client/crypto.js – Ponte verso il Web Worker E2E

let e2eWorker;
try {
  e2eWorker = new Worker('e2e-worker.js');
} catch (e) {
  console.warn('Web Worker non supportato, la crittografia userà il thread principale (possibili rallentamenti)');
}

const pending = new Map();

function workerCall(action, payload) {
  return new Promise((resolve, reject) => {
    if (!e2eWorker) {
      // Fallback: esegui nel thread principale? Non implementato per brevità; assume che il worker esista.
      reject(new Error('Worker non disponibile'));
      return;
    }
    const id = crypto.randomUUID();
    pending.set(id, { resolve, reject });
    e2eWorker.postMessage({ id, action, payload });
  });
}

e2eWorker?.addEventListener('message', (e) => {
  const { id, result, error } = e.data;
  const handler = pending.get(id);
  if (!handler) return;
  pending.delete(id);
  if (error) handler.reject(new Error(error));
  else handler.resolve(result);
});

async function generateKeyPair() {
  return workerCall('generateKeyPair');
}

async function exportPublicKey(keyId) {
  return workerCall('exportPublicKey', { keyId });
}

async function exportPrivateKey(keyId) {
  return workerCall('exportPrivateKey', { keyId });
}

async function importPublicKey(jwkString) {
  return workerCall('importPublicKey', { jwk: jwkString });
}

async function importPrivateKey(jwkString) {
  return workerCall('importPrivateKey', { jwk: jwkString });
}

async function encryptMessage(text, myPrivateKeyId, recipientPublicKeyId) {
  return workerCall('encryptMessage', { text, myPrivateKeyId, recipientPublicKeyId });
}

async function decryptMessage(encryptedPayload, myPrivateKeyId) {
  return workerCall('decryptMessage', { encryptedPayload, myPrivateKeyId });
}

async function encryptAudio(audioBuffer, myPrivateKeyId, recipientPublicKeyId) {
  // Converti ArrayBuffer in base64 per il trasferimento
  const bytes = new Uint8Array(audioBuffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
  const base64 = btoa(binary);
  return workerCall('encryptAudio', { audioBase64: base64, myPrivateKeyId, recipientPublicKeyId });
}

async function decryptAudio(encryptedPayload, myPrivateKeyId) {
  const base64 = await workerCall('decryptAudio', { encryptedPayload, myPrivateKeyId });
  // Converti base64 in ArrayBuffer
  const binary = atob(base64);
  const buffer = new ArrayBuffer(binary.length);
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return buffer;
}

async function getPublicKeyFingerprint(keyId) {
  return workerCall('getPublicKeyFingerprint', { keyId });
}

// Le funzioni localStorage rimangono nel thread principale
function savePrivateKey(privateJwk) {
  localStorage.setItem('ecdh_private_key', privateJwk);
}
function getPrivateKey() {
  return localStorage.getItem('ecdh_private_key');
}
function clearPrivateKey() {
  localStorage.removeItem('ecdh_private_key');
}