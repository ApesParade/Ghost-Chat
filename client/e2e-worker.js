// e2e-worker.js – Web Worker per crittografia E2E

const ECDH_ALGORITHM = { name: 'ECDH', namedCurve: 'P-256' };
const AES_ALGORITHM = { name: 'AES-GCM', length: 256 };
const HKDF_HASH = 'SHA-256';
const IV_LENGTH = 12;

const keyStore = new Map(); // id -> CryptoKey

function base64ToArrayBuffer(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

async function deriveAESKey(sharedSecret, salt) {
  const baseKey = await crypto.subtle.importKey('raw', sharedSecret, { name: 'HKDF' }, false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'HKDF', hash: HKDF_HASH, salt, info: new Uint8Array(0) },
    baseKey,
    AES_ALGORITHM,
    false,
    ['encrypt', 'decrypt']
  );
}

async function handleMessage({ id, action, payload }) {
  try {
    let result;
    switch (action) {
      case 'generateKeyPair': {
        const keyPair = await crypto.subtle.generateKey(ECDH_ALGORITHM, true, ['deriveBits']);
        const pubId = crypto.randomUUID();
        const privId = crypto.randomUUID();
        keyStore.set(pubId, keyPair.publicKey);
        keyStore.set(privId, keyPair.privateKey);
        result = { publicKey: pubId, privateKey: privId };
        break;
      }
      case 'exportPublicKey': {
        const key = keyStore.get(payload.keyId);
        if (!key) throw new Error('Chiave non trovata');
        const jwk = await crypto.subtle.exportKey('jwk', key);
        result = JSON.stringify(jwk);
        break;
      }
      case 'exportPrivateKey': {
        const key = keyStore.get(payload.keyId);
        if (!key) throw new Error('Chiave non trovata');
        const jwk = await crypto.subtle.exportKey('jwk', key);
        result = JSON.stringify(jwk);
        break;
      }
      case 'importPublicKey': {
        const jwk = JSON.parse(payload.jwk);
        const key = await crypto.subtle.importKey('jwk', jwk, ECDH_ALGORITHM, true, []);
        const id = crypto.randomUUID();
        keyStore.set(id, key);
        result = id;
        break;
      }
      case 'importPrivateKey': {
        const jwk = JSON.parse(payload.jwk);
        const key = await crypto.subtle.importKey('jwk', jwk, ECDH_ALGORITHM, true, ['deriveBits']);
        const id = crypto.randomUUID();
        keyStore.set(id, key);
        result = id;
        break;
      }
      case 'encryptMessage': {
        const { text, myPrivateKeyId, recipientPublicKeyId } = payload;
        const myPriv = keyStore.get(myPrivateKeyId);
        const recipPub = keyStore.get(recipientPublicKeyId);
        if (!myPriv || !recipPub) throw new Error('Chiave mancante');
        const ephemeral = await crypto.subtle.generateKey(ECDH_ALGORITHM, true, ['deriveBits']);
        const sharedSecret = await crypto.subtle.deriveBits(
          { name: 'ECDH', public: recipPub },
          ephemeral.privateKey,
          256
        );
        const salt = crypto.getRandomValues(new Uint8Array(16));
        const aesKey = await deriveAESKey(sharedSecret, salt);
        const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
        const encoded = new TextEncoder().encode(text);
        const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, aesKey, encoded);
        const ephemeralJwk = await crypto.subtle.exportKey('jwk', ephemeral.publicKey);
        result = JSON.stringify({
          ciphertext: arrayBufferToBase64(ciphertext),
          iv: arrayBufferToBase64(iv.buffer),
          salt: arrayBufferToBase64(salt.buffer),
          ephemeralPublicKey: JSON.stringify(ephemeralJwk),
        });
        break;
      }
      case 'decryptMessage': {
        const { encryptedPayload, myPrivateKeyId } = payload;
        const myPriv = keyStore.get(myPrivateKeyId);
        if (!myPriv) throw new Error('Chiave privata mancante');
        let parsedPayload = typeof encryptedPayload === 'string' ? JSON.parse(encryptedPayload) : encryptedPayload;
        const { ciphertext, iv, salt, ephemeralPublicKey } = parsedPayload;
        const ephemeralPub = await crypto.subtle.importKey('jwk', JSON.parse(ephemeralPublicKey), ECDH_ALGORITHM, true, []);
        const sharedSecret = await crypto.subtle.deriveBits(
          { name: 'ECDH', public: ephemeralPub },
          myPriv,
          256
        );
        const aesKey = await deriveAESKey(sharedSecret, base64ToArrayBuffer(salt));
        const decrypted = await crypto.subtle.decrypt(
          { name: 'AES-GCM', iv: base64ToArrayBuffer(iv) },
          aesKey,
          base64ToArrayBuffer(ciphertext)
        );
        result = new TextDecoder().decode(decrypted);
        break;
      }
      case 'encryptAudio': {
        const { audioBase64, myPrivateKeyId, recipientPublicKeyId } = payload;
        const myPriv = keyStore.get(myPrivateKeyId);
        const recipPub = keyStore.get(recipientPublicKeyId);
        if (!myPriv || !recipPub) throw new Error('Chiave mancante');
        const audioBuffer = base64ToArrayBuffer(audioBase64);
        const ephemeral = await crypto.subtle.generateKey(ECDH_ALGORITHM, true, ['deriveBits']);
        const sharedSecret = await crypto.subtle.deriveBits(
          { name: 'ECDH', public: recipPub },
          ephemeral.privateKey,
          256
        );
        const salt = crypto.getRandomValues(new Uint8Array(16));
        const aesKey = await deriveAESKey(sharedSecret, salt);
        const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
        const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, aesKey, audioBuffer);
        const ephemeralJwk = await crypto.subtle.exportKey('jwk', ephemeral.publicKey);
        result = JSON.stringify({
          ciphertext: arrayBufferToBase64(ciphertext),
          iv: arrayBufferToBase64(iv.buffer),
          salt: arrayBufferToBase64(salt.buffer),
          ephemeralPublicKey: JSON.stringify(ephemeralJwk),
        });
        break;
      }
      case 'decryptAudio': {
        const { encryptedPayload, myPrivateKeyId } = payload;
        const myPriv = keyStore.get(myPrivateKeyId);
        if (!myPriv) throw new Error('Chiave privata mancante');
        const parsedPayload = JSON.parse(encryptedPayload);
        const { ciphertext, iv, salt, ephemeralPublicKey } = parsedPayload;
        const ephemeralPub = await crypto.subtle.importKey('jwk', JSON.parse(ephemeralPublicKey), ECDH_ALGORITHM, true, []);
        const sharedSecret = await crypto.subtle.deriveBits(
          { name: 'ECDH', public: ephemeralPub },
          myPriv,
          256
        );
        const aesKey = await deriveAESKey(sharedSecret, base64ToArrayBuffer(salt));
        const decrypted = await crypto.subtle.decrypt(
          { name: 'AES-GCM', iv: base64ToArrayBuffer(iv) },
          aesKey,
          base64ToArrayBuffer(ciphertext)
        );
        // Restituisci base64 per trasferimento
        result = arrayBufferToBase64(decrypted);
        break;
      }
      case 'getPublicKeyFingerprint': {
        const key = keyStore.get(payload.keyId);
        if (!key) throw new Error('Chiave non trovata');
        const jwk = await crypto.subtle.exportKey('jwk', key);
        const encoded = new TextEncoder().encode(JSON.stringify(jwk));
        const hashBuffer = await crypto.subtle.digest('SHA-256', encoded);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hex = hashArray.slice(0, 4).map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
        result = hex.match(/.{1,2}/g).join(' ');
        break;
      }
      default:
        throw new Error('Azione sconosciuta');
    }
    postMessage({ id, result });
  } catch (error) {
    postMessage({ id, error: error.message });
  }
}

self.onmessage = (e) => handleMessage(e.data);