const API_URL = '/api';

// Cache per lingua utenti (evita chiamate ripetute)
const userLanguageCache = new Map();
async function fetchUserLanguage(userId) {
  if (userLanguageCache.has(userId)) return userLanguageCache.get(userId);
  try {
    const res = await apiCall(`/users/${userId}`);
    if (!res.ok) throw new Error();
    const data = await res.json();
    userLanguageCache.set(userId, data.language_code);
    return data.language_code;
  } catch (e) {
    return null;
  }
}

/**
 * Appende un messaggio al contenitore specificato.
 * @param {Object} opts
 * @param {string} opts.containerId - ID del contenitore
 * @param {string} opts.direction - 'sent' | 'received' | 'system'
 * @param {string|null} opts.messageId
 * @param {string|null} opts.expiresAt
 * @param {string|null} opts.senderName - nome mittente per messaggi ricevuti nei gruppi
 * @param {string} opts.contentHTML - HTML interno del corpo del messaggio
 * @param {string} [opts.extraClasses] - classi aggiuntive (es. 'ephemeral')
 * @param {string} [opts.metaHTML] - HTML extra per la barra meta (es. speaker icon, expiry)
 */
function appendMessageToContainer({
  containerId,
  direction,
  messageId,
  expiresAt,
  senderName,
  contentHTML,
  extraClasses = '',
  metaHTML = '',
  isEncrypted = false,
}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const now = new Date();
  const time = formatTime();

  const msgDiv = document.createElement('div');
  let cls = `message-item ${direction}`;
  if (extraClasses) cls += ' ' + extraClasses;
  msgDiv.className = cls;
  if (messageId) msgDiv.dataset.messageId = messageId;
  if (expiresAt) msgDiv.dataset.expiresAt = expiresAt;
  if (isEncrypted) msgDiv.dataset.isEncrypted = 'true';

  let senderLabel = '';
  if (direction === 'received' && senderName) {
    senderLabel = `<span class="sender-label">${escapeHtml(senderName)}</span> `;
  }

  const meta = metaHTML || '';
  msgDiv.innerHTML = `${senderLabel}${contentHTML}<div class="msg-meta"><span>${time}</span>${meta}</div>`;

  container.appendChild(msgDiv);

  const mediaElements = msgDiv.querySelectorAll('img, video');
  let loadedCount = 0;
  const totalMedia = mediaElements.length;

  function scrollToBottom() {
    container.scrollTop = container.scrollHeight;
    const placeholder = container.querySelector('p');
    if (placeholder) placeholder.remove();
    if (containerId === 'messages-list') {
      const msgDisplay = document.getElementById('message-display');
      if (msgDisplay) msgDisplay.style.display = 'none';
    }
  }

  if (totalMedia === 0) {
    scrollToBottom();
  } else {
    const onMediaLoad = () => {
      loadedCount++;
      if (loadedCount >= totalMedia) {
        scrollToBottom();
      }
    };
    mediaElements.forEach(el => {
      if (el.tagName === 'IMG' && el.complete) {
        onMediaLoad();
      } else {
        el.addEventListener('load', onMediaLoad, { once: true });
        el.addEventListener('error', onMediaLoad, { once: true });
        setTimeout(onMediaLoad, 3000);
      }
    });
  }
}

function formatTime(timestamp) {
  const date = timestamp ? new Date(timestamp) : new Date();
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function showNetworkError(key = 'error_network_generic') {
  alert(t(key));
}

function renderAvatarHtml(user) {
  if (user.avatar) {
    return `<img src="${escapeHtml(user.avatar)}" class="avatar-small" alt="" />`;
  }
  return `<span class="avatar-placeholder">
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18" cy="18" r="17" stroke="var(--text-secondary)" stroke-width="2"/>
      <circle cx="18" cy="13" r="5" fill="var(--text-secondary)"/>
      <path d="M7 31c2-6 7-9 11-9s9 3 11 9" stroke="var(--text-secondary)" stroke-width="2" stroke-linecap="round"/>
    </svg>
  </span>`;
}

function formatDisplayName(name, maxLength = 10) {
  if (!name) return '';
  return name.length > maxLength ? name.substring(0, maxLength) + '…' : name;
}

function getOnlineClass(userId) {
  return onlineContacts.has(userId) ? 'online' : 'offline';
}

async function handleMediaFile(file, target = null) {
  if (!target && !currentChatContactId) {
    alert(t('alert_open_chat_first'));
    return;
  }
  try {
    if (file.type.startsWith('image/')) {
      const imageBase64 = await resizeAndCompressImage(file, 1280, 0.7);
      await sendImageMessage(imageBase64, target);
    } else if (file.type.startsWith('video/')) {
      const MAX_SIZE = 50 * 1024 * 1024;
      if (file.size > MAX_SIZE) {
        alert(t('alert_video_too_large'));
        return;
      }
      const videoBase64 = await readVideoAsBase64(file);
      const duration = await getVideoDuration(videoBase64);
      if (duration > 60) {
        alert(t('alert_video_too_long'));
        return;
      }
      await sendVideoMessage(videoBase64, target);
    } else {
      alert(t('alert_unsupported_format'));
    }
  } catch (err) {
    alert(t('alert_file_processing_error'));
  }
}

const languageFlags = {
  'it-IT': '🇮🇹',
  'en-US': '🇺🇸',
  'es-ES': '🇪🇸',
  'fr-FR': '🇫🇷',
  'de-DE': '🇩🇪',
  'ru-RU': '🇷🇺',
  'zh-CN': '🇨🇳',
  'ar-SA': '🇸🇦',
  'ja-JP': '🇯🇵',
  'ko-KR': '🇰🇷',
  'pt-BR': '🇧🇷',
  'nl-NL': '🇳🇱',
  'pl-PL': '🇵🇱',
  'tr-TR': '🇹🇷',
  'hi-IN': '🇮🇳',
};

const SPEAK_LABELS = {
  'it-IT': { speak: 'Parla', send: 'Invia' },
  'en-US': { speak: 'Speak', send: 'Send' },
  'es-ES': { speak: 'Habla', send: 'Enviar' },
  'fr-FR': { speak: 'Parle', send: 'Envoyer' },
  'de-DE': { speak: 'Sprechen', send: 'Senden' },
  'ru-RU': { speak: 'Говори', send: 'Отправить' },
  'zh-CN': { speak: '说话', send: '发送' },
  'ar-SA': { speak: 'تحدث', send: 'إرسال' },
  'ja-JP': { speak: '話す', send: '送信' },
  'ko-KR': { speak: '말하기', send: '보내기' },
  'pt-BR': { speak: 'Falar', send: 'Enviar' },
  'nl-NL': { speak: 'Spreek', send: 'Verzenden' },
  'pl-PL': { speak: 'Mów', send: 'Wyślij' },
  'tr-TR': { speak: 'Konuş', send: 'Gönder' },
  'hi-IN': { speak: 'बोलें', send: 'भेजें' },
};

// Imposta la lingua UI di default se non presente
(function initUILanguage() {
  if (!localStorage.getItem('ui_language')) {
    const defaultLang = (navigator.language || 'en').split('-')[0];
    setUILanguage(defaultLang);
  }
})();

const LANGUAGES = [
  { code: 'it-IT', name: 'Italiano', flag: '🇮🇹' },
  { code: 'en-US', name: 'English', flag: '🇺🇸' },
  { code: 'es-ES', name: 'Español', flag: '🇪🇸' },
  { code: 'fr-FR', name: 'Français', flag: '🇫🇷' },
  { code: 'de-DE', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ru-RU', name: 'Русский', flag: '🇷🇺' },
  { code: 'zh-CN', name: '中文', flag: '🇨🇳' },
  { code: 'ar-SA', name: 'العربية', flag: '🇸🇦' },
  { code: 'ja-JP', name: '日本語', flag: '🇯🇵' },
  { code: 'ko-KR', name: '한국어', flag: '🇰🇷' },
  { code: 'pt-BR', name: 'Português', flag: '🇧🇷' },
  { code: 'nl-NL', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'pl-PL', name: 'Polski', flag: '🇵🇱' },
  { code: 'tr-TR', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'hi-IN', name: 'हिन्दी', flag: '🇮🇳' },
];

window.addEventListener('online', () => {
  document.getElementById('offline-banner').style.display = 'none';
  enableSendButtons(true);
});
window.addEventListener('offline', () => {
  document.getElementById('offline-banner').style.display = 'block';
  enableSendButtons(false);
});

function enableSendButtons(enabled) {
  document.getElementById('record-btn').disabled = !enabled;
  document.getElementById('send-text-btn').disabled = !enabled;
}

const EMOJI_LIST = [
  '❤️','😭','🔥','🥹','🤗','😇',
  '🙏','👌','👍','🤣','😅','😜',
  '🤑','😱','🥰','🚽','🥵','🤩',
  '☠️','😵','🫣','💩','😈',
  '🎃','🤟','🤙','🤮','🚑','🆘',
  '⚠️','🥳','😋','😂','🥶','🤡',
  '💪','👊','💎','👀','👏'
];

// DOM Elements
const authScreen = document.getElementById('auth-screen');
const mainScreen = document.getElementById('main-screen');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const showRegisterLink = document.getElementById('show-register');
const showLoginLink = document.getElementById('show-login');
const navContacts = document.getElementById('nav-contacts');
const navProfile = document.getElementById('nav-profile');
const navTranslate = document.getElementById('nav-translate');
const navChats = document.getElementById('nav-chats');
// New Chat Modal
const newChatModal = document.getElementById('new-chat-modal');
const newChatList = document.getElementById('new-chat-list');
const closeNewChatModalBtn = document.getElementById('close-new-chat-modal');
// Nuovi pulsanti header
const newChatBtn = document.getElementById('new-chat-btn');
const contactsManageBtn = document.getElementById('contacts-manage-btn');

// Settings elements
const settingsUsername = document.getElementById('settings-username');
const settingsLanguage = document.getElementById('settings-language');
const settingsApiKey = document.getElementById('settings-apikey');
const settingsVoice = document.getElementById('settings-voice');
const saveSettingsBtn = document.getElementById('save-settings');
const settingsError = document.getElementById('settings-error');
const settingsSuccess = document.getElementById('settings-success');
// Avatar elements
const avatarPreview = document.getElementById('avatar-preview');
const avatarInput = document.getElementById('avatar-input');
const avatarUploadBtn = document.getElementById('avatar-upload-btn');
const avatarRemoveBtn = document.getElementById('avatar-remove-btn');

// State
let currentUser = null;
let currentChatContactLanguage = null;
let currentChatContactPublicKey = null;
let ecdhPrivateKey = null; // ID della chiave privata nel worker
let socket = null;
let currentChatContactId = null;
let currentGroupId = null;
let currentGroupMembers = [];
let groupInvites = new Map(); // groupId -> { from, members }
let currentChatContactName = null;
let mediaRecorder = null;
let audioChunks = [];
let isRecording = false;
let onlineContacts = new Set(); // userId degli utenti attualmente online
let typingTimeout = null; // per gestire il timeout di digitazione
let voiceNoteRecorder = null; // MediaRecorder per messaggio vocale
let voiceNoteChunks = [];
let isRecordingVoiceNote = false;
let voiceNoteLongPressTimer = null;
let voiceNoteStream = null;
let translateRecorder = null;
let translateAudioChunks = [];
let isTranslateRecording = false;
let activeTranslateSide = null; // 'left' o 'right'
let translateStream = null;
let sentAudioCache = new Map(); // messageId -> base64 string della messaggio vocale (per mittente)
let receivedAudioCache = new Map(); // messageId -> audio_data (JSON string)
let sentImageCache = new Map(); // messageId -> base64 string dell'immagine (per mittente)
let receivedImageCache = new Map(); // messageId -> image_data (JSON string se cifrato, base64 se chiaro)
let sentVideoCache = new Map(); // messageId -> base64 string del video (per mittente)
let receivedVideoCache = new Map(); // messageId -> video_data (JSON string se cifrato, base64 se chiaro)
let receivedVideoThumbnailCache = new Map(); // messageId -> base64 della thumbnail decifrata
// LRU helpers per limitare la memoria
function lruGet(map, key) {
  if (!map.has(key)) return undefined;
  const val = map.get(key);
  map.delete(key);
  map.set(key, val);
  return val;
}

function lruSet(map, key, value, maxSize) {
  if (map.has(key)) {
    map.delete(key);
  } else if (map.size >= maxSize) {
    const oldestKey = map.keys().next().value;
    map.delete(oldestKey);
  }
  map.set(key, value);
}
let currentChatExpiryHours = null; // timer della chat corrente (null/0 = nessuno)
let ephemeralMode = false; // modalità effimera attiva
let hasMoreMessages = true;
let oldestMessageDate = null;
let isLoadingMore = false;
const translationCache = new Map(); // chiave: "messageId:targetLang" -> testo tradotto
const TRANSLATION_CACHE_KEY = 'gotyou_translations';
const TRANSLATION_CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 giorni

let translationPersistentCache = {};

function loadTranslationCache() {
  try {
    const raw = localStorage.getItem(TRANSLATION_CACHE_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      const now = Date.now();
      for (const key in data) {
        if (data[key].timestamp && now - data[key].timestamp > TRANSLATION_CACHE_TTL) {
          delete data[key];
        }
      }
      translationPersistentCache = data;
      for (const key in data) {
        translationCache.set(key, data[key].translatedText);
      }
    }
  } catch (e) {
    translationPersistentCache = {};
  }
}

function saveTranslationCache() {
  const data = {};
  for (const [key, translatedText] of translationCache.entries()) {
    const existing = translationPersistentCache[key];
    data[key] = {
      translatedText,
      timestamp: existing ? existing.timestamp : Date.now(),
    };
  }
  try {
    localStorage.setItem(TRANSLATION_CACHE_KEY, JSON.stringify(data));
  } catch (e) {
    /* ignora */
  }
}

async function loadPrivateKeyIntoMemory() {
  const jwk = getPrivateKey();
  if (jwk) {
    try {
      ecdhPrivateKey = await importPrivateKey(jwk);
    } catch (e) {
      console.error('Errore importazione chiave privata', e);
      ecdhPrivateKey = null;
    }
  } else {
    ecdhPrivateKey = null;
  }
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Cache per lingue utenti
async function fetchUserLanguage(userId) {
  if (userLanguageCache.has(userId)) return userLanguageCache.get(userId);
  try {
    const res = await apiCall(`/users/${userId}`);
    if (!res.ok) throw new Error();
    const data = await res.json();
    userLanguageCache.set(userId, data.language_code);
    return data.language_code;
  } catch (e) {
    return null;
  }
}

function formatMessageText(text) {
  if (!text) return '';
  // 1. Escape HTML
  let safe = escapeHtml(text);
  // 2. Converti i newline in <br>
  safe = safe.replace(/\n/g, '<br>');
  // 3. Rendi gli URL cliccabili
  return linkify(safe);
}

function linkify(text) {
  // text è già escapato, quindi i caratteri speciali sono entità HTML
  const urlRegex = /(https?:\/\/[^\s<]+)/g;
  return text.replace(urlRegex, function (url) {
    return '<a href="' + url + '" target="_blank" rel="noopener noreferrer">' + url + '</a>';
  });
}

// Auth events
showRegisterLink.addEventListener('click', (e) => {
  e.preventDefault();
  loginForm.classList.add('hidden');
  registerForm.classList.remove('hidden');
  // Pulisci il campo API key per evitare autofill residuo
  document.getElementById('reg-api-key').value = '';
});
showLoginLink.addEventListener('click', (e) => {
  e.preventDefault();
  registerForm.classList.add('hidden');
  loginForm.classList.remove('hidden');
});

function saveTokens(accessToken, refreshToken) {
  localStorage.setItem('accessToken', accessToken);
  if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
}
function getAccessToken() {
  return localStorage.getItem('accessToken');
}

function showMainScreen() {
  const auth = document.getElementById('auth-screen');
  const main = document.getElementById('main-screen');
  loadTranslationCache();
  buildEmojiMenu();
  auth.style.display = '';
  main.style.display = '';
  auth.classList.remove('active');
  main.classList.add('active');

  loadCurrentUser().then(() => {
    // Rileva se siamo arrivati tramite notifica admin (hash o search)
    const isAdminDeepLink = (window.location.hash === '#admin-panel') || window.location.search.includes('page=admin-requests');
    
    checkHashForAdminPanel();
    applySavedTheme();
    handleDeepLink(); // gestisce page=admin-requests (search)
    
    // Già gestito da checkHashForAdminPanel o handleDeepLink, ma assicuriamoci
    if (isAdminDeepLink && currentUser?.isAdmin) {
      showAdminPanel();
      // Pulisce URL per evitare ripristino successivo
      if (window.location.hash === '#admin-panel') {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }
    
    initSocket();
    renderContacts();
    
    // Solo se non siamo in un deep link admin, ripristina lo stato UI salvato
    if (!isAdminDeepLink) {
      const savedState = loadUIState();
      if (savedState) {
        if (savedState.view === 'group' && savedState.groupId && savedState.members) {
          currentGroupId = savedState.groupId;
          currentGroupMembers = savedState.members;
          showGroupChatUI(savedState.groupId, savedState.members);
          if (socket && socket.connected) {
            socket.emit('join_group', { groupId: savedState.groupId });
          }
        } else if (savedState.view === 'chat' && savedState.contactId && savedState.contactName) {
          openChat(savedState.contactId, savedState.contactName);
        } else if (savedState.view === 'profile') {
          navProfile.click();
        } else if (savedState.view === 'chats') {
          showChatsList();
        } else if (savedState.view === 'contacts') {
          showContactsList();
        } else if (savedState.view === 'translator') {
          document.getElementById('nav-translate').click();
        } else {
          showChatsList();
        }
      } else {
        const firstAccessDone = localStorage.getItem('gotyou_first_access_done');
        if (!firstAccessDone) {
          showContactsList();
          localStorage.setItem('gotyou_first_access_done', 'true');
        } else {
          showChatsList();
        }
      }
    } else {
      // Se siamo in deep link admin, assicuriamoci che l'admin panel sia visibile
      if (currentUser?.isAdmin) {
        showAdminPanel();
      } else {
        showChatsList();
      }
    }
    
    enableSendButtons(navigator.onLine);
    initPushNotifications();
    setupAdminNotificationListener();
    checkUnreadAdminNotifications(); 
    setupChatInputListeners('');
  });
}

function hideAllPanels() {
  document.getElementById('contacts-list').style.display = 'none';
  document.getElementById('chats-list').style.display = 'none';
  document.getElementById('chat-container').style.display = 'none';
  document.getElementById('group-chat-container').style.display = 'none';
  document.getElementById('profile-panel').style.display = 'none';
  document.getElementById('translate-panel').style.display = 'none';
  document.getElementById('admin-requests-panel').style.display = 'none';
}

function notifyChatClosed() {
  if (!socket || !socket.connected) return;
  if (currentChatContactId) {
    socket.emit('chat_closed');
    currentChatContactId = null;
  }
  if (currentGroupId) {
    socket.emit('group_chat_closed');
    currentGroupId = null;
    currentGroupMembers = [];
  }
}

function showContactsList() {
  notifyChatClosed();
  document.getElementById('main-content').style.display = '';
  hideAllPanels();
  document.getElementById('contacts-list').style.display = 'block';
  currentChatContactId = null;
  navContacts.classList.add('active');
  navProfile.classList.remove('active');
  navTranslate.classList.remove('active');
  navChats.classList.remove('active');
  requestOnlineStatus();
  renderContacts();
  showFab();
  setTimeout(() => startTour('contacts'), 400);
  saveUIState({ view: 'contacts' });
}

function showChatsList() {
  notifyChatClosed();
  document.getElementById('main-content').style.display = '';
  hideAllPanels();
  document.getElementById('chats-list').style.display = 'flex';
  currentChatContactId = null;
  navChats.classList.add('active');
  navContacts.classList.remove('active');
  navProfile.classList.remove('active');
  navTranslate.classList.remove('active');
  renderChats();
  showFab();
  setTimeout(() => startTour('chats'), 600);
  saveUIState({ view: 'chats' });
}

async function renderChats() {
  try {
    const res = await apiCall('/chats');
    if (!res.ok) throw new Error('Errore');
    const data = await res.json();
    const chats = data.chats || [];
    // Decifra anteprime di testo ricevute e cifrate
    await Promise.all(chats.map(async (chat) => {
      if (chat.last_message && !chat.last_message.is_mine && chat.last_message.type === 'text' && chat.last_message.is_encrypted && chat.last_message.original_text) {
        const plain = await decryptPreviewText(chat.last_message.original_text);
        if (plain !== null) {
          chat.last_message.text = plain;
        } else {
          chat.last_message.text = '🔒 Messaggio cifrato';
        }
      }
    }));
    const container = document.getElementById('chats-list-inner');
    if (!container) return;

    if (chats.length === 0) {
      container.innerHTML = `<p style="text-align:center;color:var(--text-secondary);padding:20px;">${t('no_chats')}</p>`;
      return;
    }

    container.innerHTML = chats.map(chat => renderChatBanner(chat)).join('');

    container.querySelectorAll('.chat-item').forEach((item) => {
      item.addEventListener('click', () => {
        const id = item.dataset.contactId;
        const name = item.dataset.contactName;
        if (id && name) {
          openChat(id, name);
        }
      });
    });
  } catch (err) {
    const container = document.getElementById('chats-list-inner');
    if (container) container.innerHTML = `<p class="error">${t('error_loading_chats')}</p>`;
  }
}

// ─── Filtro ricerca contatti e chat ─────────────────────────
function setupSearchFilter(inputId, listId, renderCallback) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    const items = document.querySelectorAll(`#${listId} .contact-item, #${listId} .chat-item`);
    items.forEach(item => {
      const name = (item.dataset.contactName || '').toLowerCase();
      if (query === '' || name.startsWith(query)) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
}

// ─── FAB (Floating Action Button) ────────────────────────────
const fab = document.getElementById('fab-overlay');

function showFab() {
  if (fab) fab.style.display = 'block';
}
function hideFab() {
  if (fab) fab.style.display = 'none';
}

// Gestione click sul FAB
fab.addEventListener('click', () => {
  if (document.getElementById('chats-list').style.display !== 'none') {
    // Pagina Chat: apri il modale opzioni chat
    openChatOptionsModal();
  } else if (document.getElementById('contacts-list').style.display !== 'none') {
    // Pagina Contatti: apri la modale multi-contatto
    openAddContactMultiModal();
  }
});

// ─── Modale opzioni chat ────────────────────────────────────
function openChatOptionsModal() {
  document.getElementById('chat-options-modal').classList.remove('hidden');
}

document.getElementById('close-chat-options-modal').addEventListener('click', () => {
  document.getElementById('chat-options-modal').classList.add('hidden');
});

// Chiudi il modale cliccando fuori (opzionale)
document.getElementById('chat-options-modal').addEventListener('click', (e) => {
  if (e.target === document.getElementById('chat-options-modal')) {
    document.getElementById('chat-options-modal').classList.add('hidden');
  }
});

document.getElementById('modal-individual-chat').addEventListener('click', () => {
  document.getElementById('chat-options-modal').classList.add('hidden');
  openNewChatModal(); // già esistente
});

document.getElementById('modal-group-chat').addEventListener('click', () => {
  document.getElementById('chat-options-modal').classList.add('hidden');
  openGroupChatModal(); // già esistente
});

// ─── Modale multi‑contatto ─────────────────────────────────
function openAddContactMultiModal() {
  document.getElementById('add-contact-multi-modal').classList.remove('hidden');
  document.getElementById('multi-search-username').value = '';
  document.getElementById('multi-search-results').innerHTML = '';
  document.getElementById('multi-search-username').focus();
}

document.getElementById('multi-cancel-btn').addEventListener('click', () => {
  document.getElementById('add-contact-multi-modal').classList.add('hidden');
});

document.getElementById('multi-send-btn').addEventListener('click', async () => {
  const checkboxes = document.querySelectorAll('#multi-search-results input[type="checkbox"]:checked');
  const usernames = Array.from(checkboxes).map(cb => cb.value);
  if (usernames.length === 0) {
    alert(t('select_at_least_one'));
    return;
  }
  for (const username of usernames) {
    try {
      const res = await apiCall('/contacts/add', {
        method: 'POST',
        body: JSON.stringify({ username }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.errorCode === 'GUEST_DIFF_LANGUAGE') {
          alert(t('error_guest_diff_language'));
        } else {
          console.warn(`Errore nell'aggiungere ${username}:`, data.errorCode || data.error);
        }
      } else if (data.warning) {
        alert(data.warning);
      }
    } catch (err) {
      console.error(err);
    }
  }
  document.getElementById('add-contact-multi-modal').classList.add('hidden');
  renderContacts();
});

// Ricerca dinamica nella modale multi-contatto
document.getElementById('multi-search-username').addEventListener('input', async (e) => {
  const query = e.target.value.trim();
  const resultsDiv = document.getElementById('multi-search-results');
  if (query.length === 0) {
    resultsDiv.innerHTML = '';
    return;
  }
  try {
    const res = await apiCall(`/users/search?username=${encodeURIComponent(query)}`);
    if (!res.ok) return;
    const data = await res.json();
    resultsDiv.innerHTML = data.users
      .map(u => `
        <div class="search-result-item">
          <input type="checkbox" value="${escapeHtml(u.username)}" id="chk_${u.username}" />
          <label for="chk_${u.username}">${u.flag || ''} ${escapeHtml(u.username)} · ${u.has_api_key ? t('role_keyholder') : t('role_guest')}</label>
        </div>
      `)
      .join('');
  } catch (err) {
    // ignore
  }
});

function showGroupChatUI(groupId, members) {
  // Verifica che il container esista
  const container = document.getElementById('group-chat-container');
  document.getElementById('main-content').style.display = '';
  if (!container) {
    console.error('group-chat-container mancante nel DOM');
    return;
  }

  hideAllPanels();
  hideFab();
  document.querySelector('.bottom-nav').style.display = 'none';
  const mainContent = document.getElementById('main-content');
  mainContent.dataset.originalPaddingBottom = mainContent.style.paddingBottom || getComputedStyle(mainContent).paddingBottom;
  mainContent.style.paddingBottom = '0px';
  const headerHeight = document.querySelector('header')?.offsetHeight || 56;
  container.style.display = 'flex';

  // Pulisce e popola la lista messaggi
  const msgList = document.getElementById('group-messages-list');
  if (msgList) msgList.innerHTML = '';

  const titleEl = document.getElementById('group-chat-title');
  if (titleEl) titleEl.textContent = t('group_chat_title', { count: members.length });

  // Imposta etichetta pulsante registrazione (se esiste)
  const recordBtn = document.getElementById('group-record-btn');
  if (recordBtn) recordBtn.innerHTML = t('record_btn_speak');

  // Navigazione
  navContacts.classList.remove('active');
  navProfile.classList.remove('active');
  navTranslate.classList.remove('active');
  navChats.classList.add('active');
  currentChatContactId = null;
  setupChatInputListeners('group-');
  saveUIState({ view: 'group', groupId, members });
  setTimeout(() => startTour('group-chat'), 600);
}

function leaveGroupChatUI() {
  notifyChatClosed();
  document.getElementById('group-chat-container').style.display = 'none';
  document.querySelector('.bottom-nav').style.display = '';
  const mainContent = document.getElementById('main-content');
  if (mainContent.dataset.originalPaddingBottom) {
    mainContent.style.paddingBottom = mainContent.dataset.originalPaddingBottom;
  } else {
    mainContent.style.paddingBottom = '';
  }
  currentGroupId = null;
  currentGroupMembers = [];
  if (socket && socket.connected) {
    socket.emit('group_chat_closed');
  }
  hideAllPanels();
  document.getElementById('contacts-list').style.display = 'block';
  navContacts.classList.add('active');
  navProfile.classList.remove('active');
  navTranslate.classList.remove('active');
  saveUIState({ view: 'chats' });
  requestOnlineStatus();
  renderContacts();
}

function initSocket() {
  const token = getAccessToken();
  if (!token) return;
  if (socket) socket.disconnect();
  const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
  socket = io(window.location.origin, { auth: { token } });
  socket.on('connect', () => {
    // Invia stato di visibilità all'avvio
    socket.emit('visibility_status', { visible: document.visibilityState === 'visible' });
    // Se c'era un gruppo attivo prima della disconnessione, prova a rientrare
    if (currentGroupId && currentGroupMembers.length > 0) {
      socket.emit('join_group', { groupId: currentGroupId });
      console.log('[GRUPPO] Richiesto rientro automatico nel gruppo', currentGroupId);
    }
  });
  socket.on('new_message', async (data) => {
      
      const name = data.senderName || data.senderId;
      const isChatOpen = currentChatContactId === data.senderId;
      
      // Funzione helper per aggiornare il banner se visibile
      const updateBannerIfVisible = () => {
          if (document.getElementById('chats-list').style.display !== 'none') {
              renderChats().catch(() => {});
          }
      };

      // Se la chat è aperta, ricarica i messaggi (così il server restituisce expires_at corretto)
      if (isChatOpen) {
          loadMessages(currentChatContactId).catch(() => {});
          return;
      }

      // Chat non aperta: aggiorna banner e mostra confirm per qualsiasi tipo
      updateBannerIfVisible();

      if (data.type === 'voice_note') {
          if (confirm(t('voice_note_confirm', { name }))) {
              openChat(data.senderId, name);
          }
      } else if (data.type === 'image') {
          if (confirm(t('confirm_image_message', { name }))) {
              openChat(data.senderId, name);
          }
      } else if (data.type === 'video') {
          if (confirm(t('confirm_video_message', { name }))) {
              openChat(data.senderId, name);
          }
      } else {
          // Testo
          let displayText = data.translated;
          if (data.is_encrypted && data.original) {
              try {
                  const decrypted = await tryDecryptMessage(data.original, true);
                  displayText = decrypted.displayText || t('encrypted_message');
              } catch (e) {
                  console.error('Decifratura testo fallita', e);
                  displayText = t('encrypted_message');
              }
          }
          if (confirm(t('message_sent_confirm', { name, text: displayText }))) {
              openChat(data.senderId, name);
          }
      }
  });
  socket.on('ephemeral_message', async (data) => {
    let displayData = null;
    const type = data.type || 'text';
    if (data.encryptedPayload && ecdhPrivateKey) {
      try {
        if (type === 'voice_note') {
          const audioBuffer = await decryptAudio(data.encryptedPayload, ecdhPrivateKey);
          const blob = new Blob([audioBuffer], { type: 'audio/webm' });
          displayData = URL.createObjectURL(blob);
        } else {
          displayData = await decryptMessage(data.encryptedPayload, ecdhPrivateKey);
        }
      } catch (e) {
        console.error('Decifratura messaggio effimero fallita', e);
        displayData = type === 'text' ? '[Decifratura fallita]' : null;
      }
    } else {
    }
    if (currentChatContactId === data.senderId) {
      if (displayData) {
        displayEphemeralMessage('received', data.messageId, type, displayData);
      }
    }
  });
  socket.on('ephemeral_error', (data) => {
    // Se c'è un messaggio effimero temporaneo già visualizzato, rimuovilo
    const tempMsg = document.querySelector('.message-item.ephemeral');
    if (tempMsg) tempMsg.remove();
    alert(data.message || t('error_ephemeral_message'));
  });
  socket.on('ephemeral_sent', (data) => {
    console.log('Messaggio effimero inviato', data.messageId);
  });

  // --- Gruppi ---
  socket.on('group_invite', (data) => {
    const { groupId, from, members } = data;
    // Evita doppia gestione dello stesso invito
    if (groupInvites.has(groupId)) return;
    groupInvites.set(groupId, { from, members });
    const senderName = data.fromName || data.from;
    if (
      confirm(t('group_invite_title') + ' da ' + senderName + '. ' + t('group_invite_accept') + '?')
    ) {
      setTimeout(() => {
        socket.emit('join_group', { groupId });
        currentGroupId = groupId;
        currentGroupMembers = members;
        showGroupChatUI(groupId, members);
      }, 200);
    } else {
      groupInvites.delete(groupId);
    }
  });

  socket.on('group_created', (data) => {
    currentGroupId = data.groupId;
    currentGroupMembers = data.members;
    showGroupChatUI(data.groupId, data.members);
    displayMessage(
      t('group_notification_created'),
      'system',
      null,
      null,
      null,
      'group-messages-list'
    );
  });

  socket.on('group_user_joined', (data) => {
    if (data.groupId === currentGroupId) {
      const name = data.userName || data.userId;
      displayMessage(
        name + ' ' + t('group_user_joined'),
        'system',
        null,
        null,
        null,
        'group-messages-list'
      );
    }
  });

  socket.on('group_user_left', (data) => {
    if (data.groupId === currentGroupId) {
      const name = data.userName || data.userId;
      displayMessage(
        name +
          ' ' +
          t('group_user_left') +
          (data.reason === 'timeout' ? t('group_user_timeout') : ''),
        'system',
        null,
        null,
        null,
        'group-messages-list'
      );
      currentGroupMembers = currentGroupMembers.filter((id) => id !== data.userId);
      document.getElementById('group-chat-title').textContent = t('group_chat_title', {
        count: currentGroupMembers.length,
      });
      if (currentGroupMembers.length <= 1) {
        displayMessage(t('group_empty_message'), 'system', null, null, null, 'group-messages-list');
      }
    }
  });

  socket.on('group_user_reconnected', (data) => {
    if (data.groupId === currentGroupId) {
      const name = data.userName || data.userId;
      displayMessage(
        name + ' ' + t('group_reconnected'),
        'system',
        null,
        null,
        null,
        'group-messages-list'
      );
    }
  });

  socket.on('group_error', (data) => {
    let message = '';
    if (data.errorCode === 'GUEST_GROUP_MULTILINGUAL') {
      message = t('error_guest_group_multilingual');
    } else {
      message = data.message || t('error_generic');
    }
    alert(message);
  });

  socket.on('group_message', async (data) => {
    if (data.groupId !== currentGroupId) return;
    const senderName = data.senderName || data.senderId;
    const type = data.type || 'text';
    try {
      if (!ecdhPrivateKey) await loadPrivateKeyIntoMemory();
      if (!ecdhPrivateKey) {
        displayMessage(
          '[Chiave privata mancante]',
          'received',
          null,
          null,
          data.messageId,
          'group-messages-list',
          senderName
        );
        return;
      }

      if (type === 'text') {
        // Decifra payload testo
        let displayText = '';
        if (data.encryptedPayload && typeof data.encryptedPayload === 'object') {
          displayText = await decryptMessage(data.encryptedPayload, ecdhPrivateKey);
        } else if (typeof data.encryptedPayload === 'string') {
          displayText = data.encryptedPayload; // retrocompatibilità
        } else {
          displayText = '[cifrato]';
        }
        displayMessage(
          displayText,
          'received',
          null,
          null,
          data.messageId,
          'group-messages-list',
          senderName
        );
      } else if (type === 'voice_note') {
        // Normalizza encryptedPayload: potrebbe arrivare come stringa JSON dal server
        let payloadObj = data.encryptedPayload;
        if (typeof payloadObj === 'string') {
          try {
            payloadObj = JSON.parse(payloadObj);
          } catch (e) {
            console.error('Errore parsing encryptedPayload per voice_note', e);
            payloadObj = null;
          }
        }
        let myPayload = null;
        if (payloadObj && typeof payloadObj === 'object' && payloadObj[currentUser.id]) {
          // Caso 1: oggetto con chiavi per ogni membro
          myPayload = payloadObj[currentUser.id];
        } else if (payloadObj && typeof payloadObj === 'string') {
          // Caso 2: stringa già pronta per la decifratura
          myPayload = payloadObj;
        } else if (payloadObj && typeof payloadObj === 'object' && !payloadObj[currentUser.id]) {
          // Caso 3: oggetto payload diretto (es. { ciphertext, iv }), non un multi‑utente
          myPayload = payloadObj;
        }

        if (myPayload) {
          receivedAudioCache.set(data.messageId, JSON.stringify(myPayload));
        } else {
          console.error('Payload audio non trovato per utente corrente');
        }
        displayVoiceNoteMessage(
          'received',
          data.messageId,
          null,
          'group-messages-list',
          senderName
        );
      } else if (type === 'image') {
        receivedImageCache.set(data.messageId, JSON.stringify(data.encryptedPayload));
        displayImageMessage(
          'received',
          data.messageId,
          null,
          'group-messages-list',
          senderName,
          true
        );
      } else if (type === 'video') {
        receivedVideoCache.set(data.messageId, JSON.stringify(data.encryptedPayload));
        displayVideoMessage(
          'received',
          data.messageId,
          null,
          'group-messages-list',
          senderName,
          true
        );
      } else {
        // Tipo sconosciuto: mostra come testo
        displayMessage(
          '[Tipo messaggio non supportato]',
          'received',
          null,
          null,
          data.messageId,
          'group-messages-list',
          senderName
        );
      }
    } catch (e) {
      console.error('Decifratura gruppo fallita', e);
      displayMessage(
        '[Decifratura fallita]',
        'received',
        null,
        null,
        data.messageId,
        'group-messages-list',
        senderName
      );
    }
  });

  // Presenza
  socket.on('contact_online', (data) => {
    onlineContacts.add(data.userId);
    if (currentChatContactId === data.userId) {
      updateContactStatus();
    }
    if (document.getElementById('contacts-list').style.display !== 'none') {
      renderContacts();
    }
  });
  socket.on('contact_accepted', (data) => {
    renderChats();
    if (document.getElementById('contacts-list').style.display !== 'none') {
      renderContacts();
    } else {
      sessionStorage.removeItem('uiState');
    }
  });
  socket.on('contact_request', (data) => {
    // Aggiorna la lista contatti in ogni caso (se la rubrica è visibile, aggiorna subito)
    if (document.getElementById('contacts-list').style.display !== 'none') {
      renderContacts();
    } else {
      // Se la rubrica non è visibile, mostra un alert e imposta un flag per aggiornare al prossimo accesso
      alert(t('new_contact_request', { name: data.fromUsername || data.from }));
      // Forza il refresh della prossima visualizzazione della rubrica
      sessionStorage.removeItem('uiState');
    }
  });
  socket.on('contact_offline', (data) => {
    onlineContacts.delete(data.userId);
    if (currentChatContactId === data.userId) {
      updateContactStatus();
    }
    if (document.getElementById('contacts-list').style.display !== 'none') {
      renderContacts();
    }
  });

  socket.on('chat_deleted', (data) => {
    console.log('[SOCKET] chat_deleted', data);
    const deletedContactId = data.contactId || data.deletedBy;
    clearChatCaches(deletedContactId);
    if (currentChatContactId === deletedContactId) {
      closeChatAndReturnToList();
      alert(t('chat_deleted_by_other'));
    } else if (document.getElementById('chats-list').style.display !== 'none') {
      renderChats();
    }
  });

  socket.on('contact_deleted', (data) => {
    const deletedBy = data.otherUserId || data.deletedBy;
    clearChatCaches(deletedBy);
    if (currentChatContactId === deletedBy) {
      closeChatAndReturnToList();
      alert(t('contact_deleted_by_other'));
    }
    if (document.getElementById('contacts-list').style.display !== 'none') {
      renderContacts();
    }
    if (document.getElementById('chats-list').style.display !== 'none') {
      renderChats();
    }
  });

  // Digitazione
  socket.on('typing_start', (data) => {
    if (currentChatContactId === data.senderId) {
      const indicator = document.getElementById('typing-indicator');
      if (indicator) indicator.style.display = 'block';
    }
  });
  socket.on('typing_stop', (data) => {
    if (currentChatContactId === data.senderId) {
      const indicator = document.getElementById('typing-indicator');
      if (indicator) indicator.style.display = 'none';
    }
  });

  // Spunte di lettura
  socket.on('messages_read', (data) => {
    if (data.messageIds && data.messageIds.length) {
      data.messageIds.forEach((msgId) => {
        // Cerca l'elemento tra i messaggi inviati (classe .sent)
        const msgEl = document.querySelector(
          `#messages-list .message-item[data-message-id="${msgId}"]`
        );
        if (msgEl && msgEl.classList.contains('sent')) {
          msgEl.classList.add('read');
          // Aggiorna la spunta visiva
          const statusSpan = msgEl.querySelector('.read-status');
          if (statusSpan) {
            statusSpan.textContent = t('sent_read_status');
            statusSpan.className = 'read-status read';
          } else {
            // Se non esiste, la aggiungiamo
            const metaSpan = msgEl.querySelector('.msg-meta span:last-child');
            if (metaSpan) {
              metaSpan.insertAdjacentHTML(
                'beforeend',
                ' <span class="read-status read">' + t('sent_read_status') + '</span>'
              );
            }
          }
        }
      });
    }
  });
  socket.on('message_deleted', (data) => {
    const { messageId } = data;
    const msgElement = document.querySelector(
      `#messages-list .message-item[data-message-id="${messageId}"]`
    );
    if (msgElement) msgElement.remove();
  });
  socket.on('message_reaction', (data) => {
    updateMessageReactions(data.messageId, data.reactions);
  });
  // Ascolta cambi di visibilità della pagina
  document.addEventListener('visibilitychange', () => {
    if (socket && socket.connected) {
      socket.emit('visibility_status', { visible: document.visibilityState === 'visible' });
    }
  });
}

// ========== PUSH NOTIFICATIONS ==========

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

async function initPushNotifications() {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    console.log('Push non supportate');
    return;
  }

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') {
    console.log('Permesso notifiche negato');
    return;
  }

  const registration = await navigator.serviceWorker.ready;

  let subscription = await registration.pushManager.getSubscription();

  if (!subscription) {
    try {
      const res = await fetch(`${API_URL}/auth/vapid-public-key`);
      const data = await res.json();
      const publicKey = data.publicKey;
      if (!publicKey) return;

      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlB64ToUint8Array(publicKey),
      });
    } catch (err) {
      console.error('Errore sottoscrizione push:', err);
      return;
    }
  }

  // Salva la sottoscrizione sul server
  try {
    await apiCall('/auth/push-subscription', {
      method: 'PUT',
      body: JSON.stringify({ subscription }),
    });
    console.log('Push subscription salvata');
  } catch (err) {
    console.error('Errore salvataggio subscription:', err);
  }
}

async function openChat(contactId, contactName) {
  currentChatContactId = contactId;
  document.getElementById('main-content').style.display = '';
  if (socket && socket.connected) {
    socket.emit('chat_opened', { contactId });
  }
  receivedAudioCache.clear();
  receivedImageCache.clear();
  receivedVideoCache.clear();
  receivedVideoThumbnailCache.clear();
  currentChatContactName = contactName;
  await loadPrivateKeyIntoMemory();
  document.getElementById('contacts-list').style.display = 'none';
  document.getElementById('chats-list').style.display = 'none';
  document.querySelector('.bottom-nav').style.display = 'none';
  const mainContent = document.getElementById('main-content');
  mainContent.dataset.originalPaddingBottom = mainContent.style.paddingBottom || getComputedStyle(mainContent).paddingBottom;
  mainContent.style.paddingBottom = '0px';
  const headerHeight = document.querySelector('header')?.offsetHeight || 56;
  hideFab();
  const chatContainer = document.getElementById('chat-container');
  chatContainer.style.display = 'flex';

  // Popola avatar e username nell'header
  const avatarEl = document.getElementById('chat-avatar');
  const usernameEl = document.getElementById('chat-username');
  // Usa i dati del contatto recuperati dopo (verranno aggiornati sotto)
  // Intanto mostriamo un placeholder
  avatarEl.innerHTML = renderAvatarHtml({ avatar: null }); // placeholder
  usernameEl.textContent = contactName;
  document.getElementById('message-display').style.display = 'none';
  document.getElementById('messages-list').style.display = 'flex';
  document.getElementById('original-display').textContent = '';
  navContacts.classList.remove('active');
  navProfile.classList.remove('active');
  navTranslate.classList.remove('active');
  navChats.classList.add('active');

  // Mostra stato online
  updateContactStatus();

  // Recupera lingua e chiave pubblica del contatto
  try {
    const res = await apiCall(`/users/${contactId}`);
    if (res.ok) {
      const contactUser = await res.json();
      currentChatContactLanguage = contactUser.language_code;
      const sameLanguage = currentUser.language_code === currentChatContactLanguage;
      // Se l'utente è guest e le lingue sono diverse, blocca l'apertura della chat
      if (!currentUser.has_api_key && !sameLanguage) {
        alert(t('error_guest_diff_language'));
        // Torna alla lista chat
        document.getElementById('back-to-contacts').click();
        return;
      }
      // Aggiorna avatar e nome nell'header
      const avatarEl = document.getElementById('chat-avatar');
      if (avatarEl) {
        avatarEl.innerHTML = renderAvatarHtml({ avatar: contactUser.avatar });
      }
      const usernameEl = document.getElementById('chat-username');
      if (usernameEl) {
        usernameEl.textContent = contactUser.username;
      }
      // Recupera chiave pubblica E2E
      currentChatContactPublicKey = await fetchContactPublicKey(contactId);
      if (currentChatContactPublicKey) {
        try {
          currentContactPublicKeyId = await importPublicKey(currentChatContactPublicKey);
        } catch (e) {
          currentContactPublicKeyId = null;
        }
      } else {
        currentContactPublicKeyId = null;
      }
    }
  } catch (e) {
    currentChatContactLanguage = null;
    currentChatContactPublicKey = null;
  }

  // Aggiorna etichetta pulsante microfono in base alla modalità
  const sameLanguage = currentUser.language_code === currentChatContactLanguage;
  const recordBtn = document.getElementById('record-btn');
  if (recordBtn) {
    recordBtn.innerHTML = t('record_btn_dictate');
    recordBtn.disabled = false;
  }

  hasMoreMessages = true;
  oldestMessageDate = null;
  isLoadingMore = false;
  if (currentUser.ephemeralDefault) {
    ephemeralMode = true;
    const checkbox = document.getElementById('ephemeral-checkbox');
    if (checkbox) checkbox.checked = true;
    const expirySel = document.getElementById('chat-expiry-select');
    const expiryLabel = document.querySelector('label[for="chat-expiry-select"]');
    if (expirySel) expirySel.style.display = 'none';
    if (expiryLabel) expiryLabel.style.display = 'none';
  } else {
    resetEphemeralMode();
  }
  loadMessages(contactId);
  loadChatExpiry(contactId);
  if (window.timerInterval) clearInterval(window.timerInterval);
  window.timerInterval = setInterval(updateTimers, 1000);
  saveUIState({ view: 'chat', contactId, contactName });
  setTimeout(() => startTour('chat'), 600);
}

function checkMediaExpiryWarning() {
  const hasExplicitTimer =
    (currentChatExpiryHours && currentChatExpiryHours > 0) ||
    (currentUser?.global_expiry_hours && currentUser.global_expiry_hours > 0);
  if (!hasExplicitTimer && !localStorage.getItem('media_expiry_warning_shown')) {
    alert(t('media_expiry_default_warning'));
    localStorage.setItem('media_expiry_warning_shown', 'true');
  }
}

function resetEphemeralMode() {
  ephemeralMode = false;
  const checkbox = document.getElementById('ephemeral-checkbox');
  if (checkbox) checkbox.checked = false;
  const expirySel = document.getElementById('chat-expiry-select');
  const expiryLabel = document.querySelector('label[for="chat-expiry-select"]');
  if (expirySel) expirySel.style.display = '';
  if (expiryLabel) expiryLabel.style.display = '';
}

function setupTranslatePanel() {
  console.log('setupTranslatePanel chiamata');
  const selectLeft = document.getElementById('translate-lang-left');
  const selectRight = document.getElementById('translate-lang-right');
  if (!selectLeft || !selectRight) return;

  const optionsHTML = LANGUAGES.map(
    (l) => `<option value="${l.code}">${l.flag} ${l.name}</option>`
  ).join('');
  selectLeft.innerHTML = optionsHTML;
  selectRight.innerHTML = optionsHTML;

  if (currentUser) {
    selectLeft.value = currentUser.language_code;
  }
  selectRight.value = 'en-US';

  updateTranslateButton('left');
  updateTranslateButton('right');

  selectLeft.addEventListener('change', () => updateTranslateButton('left'));
  selectRight.addEventListener('change', () => updateTranslateButton('right'));

  document
    .getElementById('translate-btn-left')
    .addEventListener('click', () => handleTranslateButton('left'));
  document
    .getElementById('translate-btn-right')
    .addEventListener('click', () => handleTranslateButton('right'));
}

setupTermsModal();

function updateTranslateButton(side) {
  const langCode = document.getElementById(`translate-lang-${side}`).value;
  const labels = SPEAK_LABELS[langCode] || SPEAK_LABELS['en-US'];
  const btn = document.getElementById(`translate-btn-${side}`);
  if (!btn) return;
  const flagSpan = btn.querySelector('.btn-flag');
  const labelSpan = btn.querySelector('.btn-label');
  if (flagSpan) flagSpan.textContent = languageFlags[langCode] || '🏴‍☠️';
  if (labelSpan) labelSpan.textContent = labels.speak;
}

async function handleTranslateButton(side) {
  if (isTranslateRecording) {
    await stopTranslateRecording();
  } else {
    await startTranslateRecording(side);
  }
}

async function startTranslateRecording(side) {
  if (!navigator.mediaDevices) {
    alert(t('error_recording_unsupported'));
    return;
  }
  try {
    translateStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    translateRecorder = new MediaRecorder(translateStream, { mimeType: 'audio/webm' });
    translateAudioChunks = [];
    translateRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) translateAudioChunks.push(e.data);
    };
    translateRecorder.start();
    isTranslateRecording = true;
    activeTranslateSide = side;

    const btn = document.getElementById(`translate-btn-${side}`);
    if (btn) {
      btn.classList.add('recording');
      const labelSpan = btn.querySelector('.btn-label');
      const langCode = document.getElementById(`translate-lang-${side}`).value;
      const labels = SPEAK_LABELS[langCode] || SPEAK_LABELS['en-US'];
      if (labelSpan) labelSpan.textContent = labels.send;
    }
    const otherSide = side === 'left' ? 'right' : 'left';
    document.getElementById(`translate-btn-${otherSide}`).disabled = true;
  } catch (err) {
    alert(t('error_mic_access'));
  }
}

async function stopTranslateRecording() {
  if (translateRecorder && translateRecorder.state === 'recording') {
    translateRecorder.stop();
    isTranslateRecording = false;
    translateRecorder.onstop = async () => {
      const audioBlob = new Blob(translateAudioChunks, { type: 'audio/webm' });
      const side = activeTranslateSide;
      const sourceLang = document.getElementById(`translate-lang-${side}`).value;
      const targetLang = document.getElementById(
        `translate-lang-${side === 'left' ? 'right' : 'left'}`
      ).value;
      resetTranslateUI();
      await sendTranslateAudio(audioBlob, sourceLang, targetLang);
    };
  }
}

function resetTranslateUI() {
  const leftBtn = document.getElementById('translate-btn-left');
  const rightBtn = document.getElementById('translate-btn-right');
  if (leftBtn) {
    leftBtn.classList.remove('recording');
    leftBtn.disabled = false;
  }
  if (rightBtn) {
    rightBtn.classList.remove('recording');
    rightBtn.disabled = false;
  }
  updateTranslateButton('left');
  updateTranslateButton('right');
  activeTranslateSide = null;
  if (translateStream) {
    translateStream.getTracks().forEach((t) => t.stop());
    translateStream = null;
  }
}

async function sendTranslateAudio(audioBlob, sourceLang, targetLang) {
  const formData = new FormData();
  formData.append('audio', audioBlob, 'audio.webm');
  formData.append('sourceLang', sourceLang);
  formData.append('targetLang', targetLang);

  const showOriginalCheckbox = document.getElementById('show-original-checkbox');
  const includeOriginal = showOriginalCheckbox ? showOriginalCheckbox.checked : true;
  formData.append('includeOriginal', includeOriginal ? 'true' : 'false');

  const outputDiv = document.getElementById('translate-output');
  if (outputDiv) {
    outputDiv.innerHTML = '<div class="spinner"></div>';
  }

  try {
    const res = await fetch('/api/translate/audio', {
      method: 'POST',
      headers: { Authorization: `Bearer ${getAccessToken()}` },
      body: formData,
    });
    if (!res.ok) throw new Error('Traduzione fallita');
    const data = await res.json();
    if (outputDiv) {
      if (data.original && includeOriginal) {
        outputDiv.innerHTML = `<em>${escapeHtml(data.original)}</em><br><strong>${escapeHtml(data.translated)}</strong>`;
      } else {
        outputDiv.innerHTML = `<strong>${escapeHtml(data.translated)}</strong>`;
      }
    }
  } catch (err) {
    if (outputDiv) {
      outputDiv.innerHTML = '<span class="error">Traduzione non riuscita</span>';
    }
  }
}

function updateContactStatus() {
  const statusEl = document.getElementById('contact-status');
  if (statusEl) {
    const onlineClass = getOnlineClass(currentChatContactId);
    if (onlineClass === 'online') {
      statusEl.textContent = t('contact_online');
      statusEl.className = 'contact-status online';
    } else {
      statusEl.textContent = t('contact_offline');
      statusEl.className = 'contact-status offline';
    }
  }
}

function displayMessage(
  translated,
  direction,
  original = null,
  expiresAt = null,
  messageId = null,
  containerId = 'messages-list',
  senderName = null
) {
  // Gestione messaggi di sistema
  if (direction === 'system') {
    appendMessageToContainer({
      containerId,
      direction: 'system',
      messageId,
      expiresAt,
      senderName,
      contentHTML: `<div class="msg-text">${formatMessageText(translated)}</div>`,
      metaHTML: '',
    });
    return;
  }

  const escapedOriginal = original ? escapeHtml(original) : null;
  const originalPart = escapedOriginal
    ? `<div class="msg-original">Orig: ${escapedOriginal}</div>`
    : '';

  const expiryInfo = direction === 'received' ? formatExpiryInfo(expiresAt) : '';
  const readStatusSpan = renderReadStatus(direction, null);
  const metaHTML = `<span class="speaker-icon" title="Ascolta"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style="width:1em; height:1em; vertical-align:middle;"><path d="M16.881 4.345A23.112 23.112 0 0 1 8.25 6H7.5a5.25 5.25 0 0 0-.88 10.427 21.593 21.593 0 0 0 1.378 3.94c.464 1.004 1.674 1.32 2.582.796l.657-.379c.88-.508 1.165-1.593.772-2.468a17.116 17.116 0 0 1-.628-1.607c1.918.258 3.76.75 5.5 1.446A21.727 21.727 0 0 0 18 11.25c0-2.414-.393-4.735-1.119-6.905ZM18.26 3.74a23.22 23.22 0 0 1 1.24 7.51 23.22 23.22 0 0 1-1.41 7.992.75.75 0 1 0 1.409.516 24.555 24.555 0 0 0 1.415-6.43 2.992 2.992 0 0 0 .836-2.078c0-.807-.319-1.54-.836-2.078a24.65 24.65 0 0 0-1.415-6.43.75.75 0 1 0-1.409.516c.059.16.116.321.17.483Z" /></svg></span><span>${expiryInfo} ${readStatusSpan}</span>`;

  appendMessageToContainer({
    containerId,
    direction,
    messageId,
    expiresAt,
    senderName,
    contentHTML: `<div class="msg-text">${formatMessageText(translated)}</div>${originalPart}`,
    metaHTML,
  });
}

function buildEmojiMenu() {
  const menu = document.getElementById('emoji-menu');
  if (!menu || menu.children.length > 0) return; // già costruito
  EMOJI_LIST.forEach(emoji => {
    const span = document.createElement('span');
    span.className = 'emoji-option';
    span.dataset.emoji = emoji;
    span.textContent = emoji;
    menu.appendChild(span);
  });
}

/**
 * Calcola la posizione di un popup ancorato a un elemento target.
 * @param {DOMRect} targetRect - getBoundingClientRect() del target
 * @param {number} popupWidth - larghezza del popup
 * @param {number} popupHeight - altezza del popup
 * @param {string} preferredSide - 'top', 'bottom', 'left', 'right'
 * @returns {{left: number, top: number}}
 */
function positionPopup(targetRect, popupWidth, popupHeight, preferredSide = 'top') {
  const margin = 8;
  let left, top;

  // Calcolo base sinistra centrata (per top/bottom)
  const centeredLeft = targetRect.left + targetRect.width / 2 - popupWidth / 2;

  if (preferredSide === 'top') {
    top = targetRect.top - popupHeight - margin;
    left = centeredLeft;
    if (top < margin) {
      top = targetRect.bottom + margin;
    }
  } else if (preferredSide === 'bottom') {
    top = targetRect.bottom + margin;
    left = centeredLeft;
    if (top + popupHeight > window.innerHeight - margin) {
      top = targetRect.top - popupHeight - margin;
    }
  } else if (preferredSide === 'left') {
    left = targetRect.left - popupWidth - margin;
    top = targetRect.top + (targetRect.height - popupHeight) / 2;
    if (left < margin) {
      left = targetRect.right + margin;
    }
  } else if (preferredSide === 'right') {
    left = targetRect.right + margin;
    top = targetRect.top + (targetRect.height - popupHeight) / 2;
    if (left + popupWidth > window.innerWidth - margin) {
      left = targetRect.left - popupWidth - margin;
    }
  }

  // Vincoli orizzontali
  if (left + popupWidth > window.innerWidth - margin) {
    left = window.innerWidth - popupWidth - margin;
  }
  if (left < margin) {
    left = margin;
  }

  // Vincoli verticali
  if (top < margin) {
    top = margin;
  }
  if (top + popupHeight > window.innerHeight - margin) {
    top = window.innerHeight - popupHeight - margin;
  }

  return { left, top };
}

function showEmojiMenu(messageElement, messageId) {
  if (messageElement.classList.contains('sent')) return;
  const menu = document.getElementById('emoji-menu');
  if (!menu) return;

  // Mostra temporaneamente per misurare
  menu.style.display = 'grid';
  menu.style.visibility = 'hidden';
  const menuWidth = menu.offsetWidth;
  const menuHeight = menu.offsetHeight;

  const rect = messageElement.getBoundingClientRect();
  const pos = positionPopup(rect, menuWidth, menuHeight, 'top');

  menu.style.left = pos.left + 'px';
  menu.style.top = pos.top + 'px';
  menu.style.visibility = 'visible';
  menu.dataset.currentMessageId = messageId;

  const closeMenu = (e) => {
    if (!menu.contains(e.target)) {
      menu.style.display = 'none';
      document.removeEventListener('click', closeMenu);
      document.removeEventListener('touchstart', closeMenu);
    }
  };
  setTimeout(() => {
    document.addEventListener('click', closeMenu);
    document.addEventListener('touchstart', closeMenu);
  }, 10);
}

// Listener per le emoji nel menu
document.getElementById('emoji-menu').addEventListener('click', (e) => {
  const option = e.target.closest('.emoji-option');
  if (!option) return;
  const emoji = option.dataset.emoji;
  const messageId = document.getElementById('emoji-menu').dataset.currentMessageId;
  if (emoji && messageId) {
    sendReaction(messageId, emoji);
    document.getElementById('emoji-menu').style.display = 'none';
  }
});

async function sendReaction(messageId, emoji) {
  try {
    const res = await apiCall(`/conversation/message/${messageId}/react`, {
      method: 'PUT',
      body: JSON.stringify({ emoji }),
    });
    if (!res.ok) return;
    const data = await res.json();
    // Aggiorna le reazioni locali
    updateMessageReactions(messageId, data.reactions);
  } catch (err) {
    console.error('Errore invio reazione', err);
  }
}

function updateMessageReactions(messageId, reactionsJson) {
  const msgEl = document.querySelector(`.message-item[data-message-id="${messageId}"]`);
  if (!msgEl) return;
  let reactionsContainer = msgEl.querySelector('.message-reactions');
  if (!reactionsContainer) {
    reactionsContainer = document.createElement('div');
    reactionsContainer.className = 'message-reactions';
    msgEl.appendChild(reactionsContainer);
  }
  try {
    const reactions = typeof reactionsJson === 'string' ? JSON.parse(reactionsJson) : reactionsJson;
    // Conta le occorrenze per ogni emoji
    const counts = {};
    reactions.forEach(r => { counts[r.emoji] = (counts[r.emoji] || 0) + 1; });
    reactionsContainer.innerHTML = Object.entries(counts)
      .map(([emoji, count]) => `<span class="reaction-badge">${emoji}${count > 1 ? ` ${count}` : ''}</span>`)
      .join('');
  } catch (e) { /* ignore */ }
}

/**
 * Configura i listener delegati su una lista messaggi (chat singola o gruppo).
 * @param {string} listId - ID dell'elemento lista (es. 'messages-list' o 'group-messages-list')
 */
function setupMessageListListeners(listId) {
  const list = document.getElementById(listId);
  if (!list || list.dataset.msgListeners === 'true') return;
  list.dataset.msgListeners = 'true';

  // Click su speaker per leggere il testo
  list.addEventListener('click', (e) => {
    const speaker = e.target.closest('.speaker-icon');
    if (!speaker) return;
    e.stopPropagation();
    const messageItem = speaker.closest('.message-item');
    if (messageItem) {
      const msgText = messageItem.querySelector('.msg-text');
      if (msgText) speakText(msgText.textContent);
    }
  });

  // Click su play nota vocale
  list.addEventListener('click', async (e) => {
    const playBtn = e.target.closest('.voice-note-play');
    if (!playBtn) return;
    e.stopPropagation();
    const msgId = playBtn.dataset.messageId;
    if (!msgId) return;
    await playReceivedVoiceNote(msgId);
  });

  // Apertura lightbox per immagini/video/placeholder
  list.addEventListener('click', async (e) => {
    const img = e.target.closest('img.message-image');
    const imagePlaceholder = e.target.closest('.image-placeholder');
    const videoEl = e.target.closest('video.message-video');
    const videoPlaceholder = e.target.closest('.video-placeholder');

    if (img) {
      showLightbox(img.src, 'image');
    } else if (videoEl) {
      showLightbox(videoEl.querySelector('source')?.src || videoEl.src, 'video');
    } else if (e.target.closest('.video-thumbnail-wrapper')) {
      // Click sull'anteprima video: decifra il video completo e apri il lightbox
      const wrapper = e.target.closest('.video-thumbnail-wrapper');
      const messageItem = wrapper.closest('.message-item');
      if (!messageItem) return;
      const msgId = messageItem.dataset.messageId;
      if (!msgId) return;
      const data = lruGet(receivedVideoCache, msgId);
      if (!data) {
        alert(t('alert_data_not_available'));
        return;
      }
      try {
        let payload;
        try {
          payload = JSON.parse(data);
        } catch {
          alert(t('alert_decryption_failed'));
          return;
        }
        const videoCipher = payload.video;
        if (!videoCipher) {
          alert(t('alert_data_not_available'));
          return;
        }
        if (!ecdhPrivateKey) await loadPrivateKeyIntoMemory();
        if (!ecdhPrivateKey) {
          alert(t('error_private_key_missing'));
          return;
        }
        const decryptedVideo = await decryptMessage(videoCipher, ecdhPrivateKey);
        showLightbox(decryptedVideo, 'video');
      } catch (err) {
        console.error(err);
        alert(t('alert_decryption_failed'));
      }
    } else if (videoPlaceholder) {
      // Fallback per vecchi placeholder testuali (non più utilizzati nei nuovi messaggi)
      const messageItem = videoPlaceholder.closest('.message-item');
      if (!messageItem) return;
      const msgId = messageItem.dataset.messageId;
      if (!msgId) return;
      const data = lruGet(receivedVideoCache, msgId);
      if (!data) {
        alert(t('alert_data_not_available'));
        return;
      }
      // Prova a decifrare il video e mostra in lightbox (vecchia logica semplificata)
      try {
        const payload = JSON.parse(data);
        const videoCipher = payload.video || payload;
        if (!ecdhPrivateKey) await loadPrivateKeyIntoMemory();
        if (!ecdhPrivateKey) {
          alert(t('error_private_key_missing'));
          return;
        }
        const decrypted = await decryptMessage(videoCipher, ecdhPrivateKey);
        showLightbox(decrypted, 'video');
      } catch (err) {
        console.error(err);
        alert(t('alert_decryption_failed'));
      }
    }
  });

  // Menu emoji (long‑press / contextmenu)
  list.addEventListener('contextmenu', (e) => {
    const msgItem = e.target.closest('.message-item');
    if (!msgItem) return;
    e.preventDefault();
    const messageId = msgItem.dataset.messageId;
    if (!messageId) return;
    if (msgItem.classList.contains('sent')) {
      handleDeleteMessage(messageId, msgItem);
    } else {
      showEmojiMenu(msgItem, messageId);
    }
  });

  // Long‑press per emoji (touch)
  let emojiPressTimer = null;
  list.addEventListener(
    'touchstart',
    (e) => {
      const msgItem = e.target.closest('.message-item');
      if (
        msgItem &&
        msgItem.classList.contains('received') &&
        !msgItem.classList.contains('ephemeral') &&
        !e.target.closest('button, .speaker-icon, .voice-note-play, audio')
      ) {
        emojiPressTimer = setTimeout(() => {
          const messageId = msgItem.dataset.messageId;
          if (messageId) showEmojiMenu(msgItem, messageId);
          emojiPressTimer = null;
        }, 500);
      }
    },
    { passive: true }
  );
  list.addEventListener('touchend', () => {
    if (emojiPressTimer) {
      clearTimeout(emojiPressTimer);
      emojiPressTimer = null;
    }
  });
  list.addEventListener('touchmove', () => {
    if (emojiPressTimer) {
      clearTimeout(emojiPressTimer);
      emojiPressTimer = null;
    }
  });
}

// Swipe per cancellare messaggi inviati (da sinistra a destra) + long‑press per emoji
function enableSwipeAndEmojiOnMessages() {
  const container = document.getElementById('messages-list');
  if (!container) return;

  let touchStartX = 0,
    touchStartY = 0;
  let swipeTarget = null;
  const SWIPE_THRESHOLD = 50;
  const VERTICAL_THRESHOLD = 30;

  // === Long press per menu emoji (su qualsiasi messaggio) ===
  let emojiPressTimer = null;
  container.addEventListener(
    'touchstart',
    (e) => {
      const msgItem = e.target.closest('.message-item');
      if (!msgItem) return;
      // Salva coordinate per swipe
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      swipeTarget = msgItem;

      // Avvia timer per long‑press emoji solo su messaggi ricevuti e non su pulsanti/icone
      if (
        msgItem.classList.contains('received') &&
        !msgItem.classList.contains('ephemeral') &&
        !e.target.closest('button, .speaker-icon, .voice-note-play, audio')
      ) {
        emojiPressTimer = setTimeout(() => {
          const messageId = msgItem.dataset.messageId;
          if (messageId) {
            showEmojiMenu(msgItem, messageId);
          }
          emojiPressTimer = null;
        }, 500);
      }
    },
    { passive: true }
  );

  container.addEventListener('touchend', (e) => {
    if (emojiPressTimer) {
      clearTimeout(emojiPressTimer);
      emojiPressTimer = null;
    }

    if (!swipeTarget) return;
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const diffX = endX - touchStartX;
    const diffY = Math.abs(endY - touchStartY);

    // Swipe verso destra (da sinistra a destra) su messaggio inviato
    if (
      diffX > SWIPE_THRESHOLD &&
      diffY < VERTICAL_THRESHOLD &&
      swipeTarget.classList.contains('sent') &&
      !swipeTarget.classList.contains('ephemeral')
    ) {
      const messageId = swipeTarget.dataset.messageId;
      if (messageId) {
        handleDeleteMessage(messageId, swipeTarget);
      }
    }
    swipeTarget = null;
  });

  container.addEventListener('touchmove', () => {
    if (emojiPressTimer) {
      clearTimeout(emojiPressTimer);
      emojiPressTimer = null;
    }
  });

  // Contextmenu per desktop (apre menu emoji)
  container.addEventListener('contextmenu', (e) => {
    const msgItem = e.target.closest('.message-item');
    if (!msgItem) return;
    e.preventDefault();
    const messageId = msgItem.dataset.messageId;
    if (messageId) {
      showEmojiMenu(msgItem, messageId);
    }
  });
}

async function handleDeleteMessage(messageId, element) {
  if (!confirm(t('confirm_delete_message'))) return;

  try {
    const res = await apiCall(`/conversation/message/${messageId}`, { method: 'DELETE' });
    if (!res.ok) {
      if (res.status === 404) {
        // già cancellato, rimuovi dal DOM senza allarmi
        element.remove();
        return;
      }
      const data = await res.json();
      alert(data.error || t('error_delete_message'));
      return;
    }
    element.remove();
  } catch (err) {
    showNetworkError('error_network_generic');
  }
}

function updateTimers() {
  const items = document.querySelectorAll('#messages-list .message-item[data-expires-at]');
  items.forEach((item) => {
    const expiresAtRaw = item.dataset.expiresAt;
    if (!expiresAtRaw) return; // ← ignora messaggi senza scadenza (attributo vuoto)

    const expiresAt = new Date(expiresAtRaw);
    if (isNaN(expiresAt.getTime())) return;
    const info = formatExpiryInfo(expiresAtRaw);
    if (info === '' || info === '⏳ scaduto') {
      item.remove();
    } else {
      const span = item.querySelector('.msg-meta span:last-child');
      if (span) span.textContent = info;
    }
  });
}

// Pulsante Indietro dalla chat
document.getElementById('clear-chat-btn').addEventListener('click', async () => {
  if (!currentChatContactId) return;
  try {
    await apiCall(`/conversation/clear-chat/${currentChatContactId}`, { method: 'PUT' });
  } catch (e) {
    // Se fallisce, svuotiamo comunque localmente
    console.error('Errore clear chat', e);
  }
  const container = document.getElementById('messages-list');
  if (container) container.innerHTML = '';
});

document.getElementById('back-to-contacts').addEventListener('click', () => {
  // Riproduce il suono di uscita dalla chat
  try {
    const exitSound = new Audio('/sounds/chat-exit.mp3');
    exitSound.volume = 0.4; // volume moderato per non essere invadente
    exitSound.play().catch(e => console.log('Errore riproduzione suono uscita:', e));
  } catch(e) {
    console.log('Errore creazione audio uscita:', e);
  }
  notifyChatClosed();
  forceEndTour();
  resetEphemeralMode();
  saveUIState({ view: 'contacts' });
  document.getElementById('chat-container').style.display = 'none';
  document.querySelector('.bottom-nav').style.display = '';
  const mainContent = document.getElementById('main-content');
  if (mainContent.dataset.originalPaddingBottom) {
    mainContent.style.paddingBottom = mainContent.dataset.originalPaddingBottom;
  } else {
    mainContent.style.paddingBottom = '';
  }
  document.getElementById('messages-list').innerHTML = '';
  document.getElementById('messages-list').style.display = 'none';
  if (window.timerInterval) {
    clearInterval(window.timerInterval);
    window.timerInterval = null;
  }
  showChatsList(); // gestisce anche il riavvio del tour
});

document.getElementById('admin-back-btn').addEventListener('click', () => {
  // Reset filtri (copiato dal secondo listener)
  const searchInput = document.getElementById('admin-search-input');
  const filterCheckbox = document.getElementById('admin-filter-inactive');
  if (searchInput) searchInput.value = '';
  if (filterCheckbox) filterCheckbox.checked = false;
  adminCurrentSearch = '';
  adminFilterInactive = false;
  adminHasMore = true;
  adminCurrentPage = 1;
  loadAdminUsers(true);
  
  // Chiudi pannello e torna al profilo
  hideAdminPanel();
  navProfile.click();
});

// Registrazione audio / Dettatura
let isDictating = false;
let dictationSupported = true; // flag: false se il riconoscimento vocale ha fallito in modo permanente
let recognition = null;
let activeRecordBtn = null;

const recordBtn = document.getElementById('record-btn');
setupRecordButton(recordBtn);

function startLongPressTimer() {
  if (!currentChatContactId && !currentGroupId) return;
  voiceNoteLongPressTimer = setTimeout(() => {
    startVoiceNoteRecording();
    voiceNoteLongPressTimer = null;
  }, 500);
}

function clearLongPressTimer() {
  if (voiceNoteLongPressTimer) {
    clearTimeout(voiceNoteLongPressTimer);
    voiceNoteLongPressTimer = null;
  }
}

// Funzione unica per configurare un pulsante microfono (chat singola o gruppo)
function setupRecordButton(btn) {
  if (!btn || btn.dataset.recordSetup === 'true') return;
  btn.dataset.recordSetup = 'true';

  // Coordinate iniziali per calcolare lo spostamento durante il touch
  let touchStartX = 0;
  let touchStartY = 0;
  const MOVE_THRESHOLD = 10; // pixel di tolleranza per i micro-movimenti

  btn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    activeRecordBtn = btn;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    startLongPressTimer();
  });

  btn.addEventListener('touchend', (e) => {
    activeRecordBtn = btn;
    if (voiceNoteLongPressTimer) {
      clearLongPressTimer();
      handleRecordTap();
    } else if (isRecordingVoiceNote) {
      stopVoiceNoteRecording();
    }
  });

  btn.addEventListener('touchmove', (e) => {
    const dx = Math.abs(e.touches[0].clientX - touchStartX);
    const dy = Math.abs(e.touches[0].clientY - touchStartY);
    if (dx > MOVE_THRESHOLD || dy > MOVE_THRESHOLD) {
      clearLongPressTimer();
    }
  });

  btn.addEventListener('touchcancel', () => {
    clearLongPressTimer();
    if (isRecordingVoiceNote) stopVoiceNoteRecording();
  });

  btn.addEventListener('mousedown', (e) => {
    e.preventDefault();
    activeRecordBtn = btn;
    startLongPressTimer();
  });

  btn.addEventListener('mouseup', (e) => {
    activeRecordBtn = btn;
    if (voiceNoteLongPressTimer) {
      clearLongPressTimer();
      handleRecordTap();
    } else if (isRecordingVoiceNote) {
      stopVoiceNoteRecording();
    }
  });

  btn.addEventListener('mouseleave', () => {
    clearLongPressTimer();
    if (isRecordingVoiceNote) stopVoiceNoteRecording();
  });
}

// Gestione tap breve (comportamento originale)
/**
 * Configura i pulsanti di input per una chat (singola o di gruppo).
 * @param {string} prefix - '' per chat singola, 'group-' per chat di gruppo
 */
function setupChatInputListeners(prefix) {
  const textInput = document.getElementById(prefix + 'text-input');
  const sendBtn = document.getElementById(prefix + 'send-text-btn');
  const mediaBtn = document.getElementById(prefix + 'media-upload-btn');
  const mediaInput = document.getElementById(prefix + 'media-input');
  const recordBtn = document.getElementById(prefix + 'record-btn');

  if (!sendBtn || sendBtn.dataset.inputSetup === 'true') return;
  sendBtn.dataset.inputSetup = 'true';

  // Invio testo
  sendBtn.addEventListener('click', async () => {
    const text = textInput.value.trim();
    if (!text) return;
    sendBtn.disabled = true;
    try {
      const target =
        prefix === 'group-' ? { groupId: currentGroupId, members: currentGroupMembers } : null;
      await sendTextMessage(text, target);
      textInput.value = '';
    } finally {
      sendBtn.disabled = false;
    }
  });

  // Upload media
  mediaBtn.addEventListener('click', () => mediaInput.click());
  mediaInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const target =
      prefix === 'group-' ? { groupId: currentGroupId, members: currentGroupMembers } : null;
    await handleMediaFile(file, target);
    e.target.value = '';
  });

  // Registrazione vocale
  setupRecordButton(recordBtn);

  // Auto‑resize textarea
  textInput.addEventListener('input', () => {
    textInput.style.height = 'auto';
    textInput.style.height = Math.min(textInput.scrollHeight, 160) + 'px';
  });
}

function handleRecordTap() {
  if (!currentChatContactId && !currentGroupId) return;
  if (!dictationSupported) {
    alert(t('error_dictation_blocked'));
    return;
  }
  if (isDictating) {
    stopDictation();
  } else {
    startDictation();
  }
}

// Dettatura vocale
function startDictation() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    dictationSupported = false;
    alert(t('error_dictation_blocked'));
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = currentUser.language_code;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.trim();
    if (transcript) {
      if (currentGroupId) {
        sendTextMessage(transcript, { groupId: currentGroupId, members: currentGroupMembers });
      } else if (currentChatContactId) {
        sendTextMessage(transcript);
      }
    }
  };

  recognition.onerror = (event) => {
    console.error('SpeechRecognition error:', event.error);
    stopDictation();
    if (
      event.error === 'not-allowed' ||
      event.error === 'network' ||
      event.error === 'service-not-allowed' ||
      event.error === 'language-not-supported'
    ) {
      dictationSupported = false;
      alert(t('error_dictation_blocked'));
    } else {
      alert(t('error_dictation_generic', { error: event.error }));
    }
  };

  recognition.onend = () => {
    stopDictation();
  };

  try {
    recognition.start();
    isDictating = true;
    if (activeRecordBtn) activeRecordBtn.innerHTML = t('record_btn_listening');
  } catch (e) {
    console.error('Errore avvio SpeechRecognition:', e);
    alert(t('error_dictation_blocked'));
    stopDictation();
  }
}

function stopDictation() {
  if (recognition) {
    recognition.stop();
    recognition = null;
  }
  isDictating = false;
  if (activeRecordBtn) {
    if (currentGroupId) {
      activeRecordBtn.innerHTML = t('record_btn_speak');
    } else {
      activeRecordBtn.innerHTML = t('record_btn_dictate');
    }
  }
}

// Suono inizio registrazione (selezionabile nel profilo)
function playRecordingBeep() {
  const beepType = currentUser?.recording_beep || 'pop';
  let ctx;
  try {
    ctx = new AudioContext();
  } catch (e) {
    return; // AudioContext non disponibile
  }

  if (beepType === 'chime') {
    // Suono 2: "Chime" cristallino (due note)
    [0, 0.03].forEach(startTime => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = startTime === 0 ? 900 : 1400;
      gain.gain.setValueAtTime(0.25, ctx.currentTime + startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startTime + 0.1);
      osc.connect(gain).connect(ctx.destination);
      osc.start(ctx.currentTime + startTime);
      osc.stop(ctx.currentTime + startTime + 0.1);
    });
  } else if (beepType === 'double') {
    // Suono 4: "Double ping"
    [0, 0.07].forEach(startTime => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = startTime === 0 ? 1200 : 1600;
      gain.gain.setValueAtTime(0.2, ctx.currentTime + startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startTime + 0.07);
      osc.connect(gain).connect(ctx.destination);
      osc.start(ctx.currentTime + startTime);
      osc.stop(ctx.currentTime + startTime + 0.07);
    });
  } else {
    // Default "pop"
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  }
}

function playBeep(ctx) {
  const now = ctx.currentTime;
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();
  osc1.type = 'sine';
  osc2.type = 'sine';
  osc1.frequency.value = 880;  // primo tono
  osc2.frequency.value = 1760; // secondo tono (ottava)
  gain.gain.value = 0.2;
  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(ctx.destination);
  osc1.start();
  osc2.start();
  gain.gain.exponentialRampToValueAtTime(0.00001, now + 0.15);
  osc1.stop(now + 0.15);
  osc2.stop(now + 0.15);
}

async function startVoiceNoteRecording() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    alert(t('error_recording_unsupported'));
    return;
  }
  try {
    voiceNoteStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    voiceNoteRecorder = new MediaRecorder(voiceNoteStream, { mimeType: 'audio/webm;codecs=opus' });
    voiceNoteChunks = [];
    voiceNoteRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) voiceNoteChunks.push(e.data);
    };
    voiceNoteRecorder.start();
    playRecordingBeep();
    isRecordingVoiceNote = true;
    if (activeRecordBtn) {
      const sameLanguage = (currentUser && currentChatContactLanguage === currentUser.language_code) || !currentChatContactId;
      const btnText = sameLanguage ? t('record_btn_dictate') : t('record_btn_speak');
      activeRecordBtn.innerHTML = btnText;
      activeRecordBtn.classList.add('recording');
    }
  } catch (err) {
    alert(t('error_mic_access'));
  }
}

function stopVoiceNoteRecording() {
  if (voiceNoteRecorder && voiceNoteRecorder.state === 'recording') {
    voiceNoteRecorder.stop();
    voiceNoteRecorder.onstop = async () => {
      const audioBlob = new Blob(voiceNoteChunks, { type: 'audio/webm' });
      const target = currentGroupId
        ? { groupId: currentGroupId, members: currentGroupMembers }
        : null;
      await sendVoiceNote(audioBlob, target);
      if (voiceNoteStream) {
        voiceNoteStream.getTracks().forEach((t) => t.stop());
        voiceNoteStream = null;
      }
    };
    isRecordingVoiceNote = false;
    if (activeRecordBtn) {
      if (currentGroupId) {
        activeRecordBtn.innerHTML = t('record_btn_speak');
      } else {
        activeRecordBtn.innerHTML = t('record_btn_dictate');
      }
      activeRecordBtn.classList.remove('recording');
    }
  }
}

// ─── Registrazione vocale per gruppo ───

async function sendVoiceNote(audioBlob, target = null) {
  // ─────────── INVIO IN GRUPPO ───────────
  if (target && target.groupId && target.members) {
    const groupId = target.groupId;
    const members = target.members;
    if (!groupId || members.length === 0) return;
    // Controllo per guest in gruppo multilingua
    if (currentUser && !currentUser.has_api_key) {
      const memberLanguages = await Promise.all([currentUser.language_code, ...members.map(m => fetchUserLanguage(m))]);
      const uniqueLangs = new Set(memberLanguages);
      if (uniqueLangs.size > 1) {
        alert(t('error_guest_group_multilingual'));
        return;
      }
    }
    checkMediaExpiryWarning();
    const arrayBuffer = await audioBlob.arrayBuffer();
    const encryptedPayload = {};
    for (const memberId of members) {
      if (memberId === currentUser.id) continue;
      const pubKeyJwk = await fetchContactPublicKey(memberId);
      if (!pubKeyJwk) {
        alert(t('error_missing_public_key', { memberId }));
        return;
      }
      const recipientPubKey = await importPublicKey(pubKeyJwk);
      if (!ecdhPrivateKey) await loadPrivateKeyIntoMemory();
      if (!ecdhPrivateKey) {
        alert(t('error_private_key_missing'));
        return;
      }
      encryptedPayload[memberId] = await encryptAudio(arrayBuffer, ecdhPrivateKey, recipientPubKey);
    }
    const messageId = 'gmsg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    socket.emit('group_message', { groupId, encryptedPayload, messageId, type: 'voice_note' });

    // Salva in cache il blob per la riproduzione futura (se il gruppo la supporta)
    const reader = new FileReader();
    reader.onloadend = () => {
      sentAudioCache.set(messageId, reader.result);
    };
    reader.readAsDataURL(audioBlob);

    // Mostra il messaggio inviato nel contenitore del gruppo
    displayVoiceNoteMessage('sent', messageId, null, 'group-messages-list');
    return;
  }

  // ─────────── INVIO SINGOLO (codice originale) ───────────
  if (!currentChatContactId) return;
  checkMediaExpiryWarning();
  // Controllo per guest con lingua diversa (chat singola)
  if (currentUser && !currentUser.has_api_key && currentChatContactLanguage && currentChatContactLanguage !== currentUser.language_code) {
    alert(t('error_guest_diff_language'));
    return;
  }
  if (ephemeralMode) {
    const recipientPubKey = await prepareEphemeralPayload(currentChatContactId);
    if (!recipientPubKey) return;
    const arrayBuffer = await audioBlob.arrayBuffer();
    const encryptedPayload = await encryptAudio(arrayBuffer, ecdhPrivateKey, recipientPubKey);
    const tempId = 'eph_' + Date.now();
    socket.emit('ephemeral_message', {
      recipientId: currentChatContactId,
      encryptedPayload,
      messageId: tempId,
      type: 'voice_note',
    });
    const audioUrl = URL.createObjectURL(audioBlob);
    displayEphemeralMessage('sent', tempId, 'voice_note', audioUrl);
    return;
  }

  try {
    const contactPublicKey = await fetchContactPublicKey(currentChatContactId);
    if (!contactPublicKey) {
      alert(t('error_voice_note_e2e'));
      return;
    }
    if (!ecdhPrivateKey) await loadPrivateKeyIntoMemory();
    if (!ecdhPrivateKey) {
      alert(t('error_private_key_missing'));
      return;
    }

    const recipientPubKey = await importPublicKey(contactPublicKey);
    const arrayBuffer = await audioBlob.arrayBuffer();
    const encryptedPayload = await encryptAudio(arrayBuffer, ecdhPrivateKey, recipientPubKey);

    const res = await apiCall('/conversation/send-voice-note', {
      method: 'POST',
      body: JSON.stringify({ recipientId: currentChatContactId, encryptedPayload }),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      alert(errData.error || t('error_voice_note_send_failed'));
      return;
    }
    const data = await res.json();

    const reader = new FileReader();
    reader.onloadend = () => {
      sentAudioCache.set(data.messageId, reader.result);
    };
    reader.readAsDataURL(audioBlob);

    displayVoiceNoteMessage('sent', data.messageId, data.expiresAt);
  } catch (err) {
    showNetworkError('error_voice_note_network');
  }
}

function displayVoiceNoteMessage(
  direction,
  messageId,
  expiresAt = null,
  containerId = 'messages-list',
  senderName = null
) {
  let content = '';
  if (direction === 'sent') {
    const cachedAudio = sentAudioCache.get(messageId);
    if (cachedAudio) {
      content = `<audio controls src="${cachedAudio}" style="max-width:100%;height:36px;"></audio>`;
    } else {
      content = t('voice_note_sent');
    }
  } else {
    content = `<span class="voice-note-play" data-message-id="${messageId}">${t('voice_note_listen')}</span>`;
  }

  const readStatusSpan = renderReadStatus(direction, null);
  const metaHTML = `<span>${readStatusSpan}</span>`;

  appendMessageToContainer({
    containerId,
    direction,
    messageId,
    expiresAt,
    senderName,
    contentHTML: content,
    metaHTML,
  });
}

async function playReceivedVoiceNote(messageId) {
  const audioDataStr = receivedAudioCache.get(messageId);
  if (!audioDataStr) {
    alert(t('error_audio_data_unavailable'));
    return;
  }
  try {
    const encryptedPayload = JSON.parse(audioDataStr);
    if (!ecdhPrivateKey) await loadPrivateKeyIntoMemory();
    if (!ecdhPrivateKey) {
      alert(t('error_private_key_missing'));
      return;
    }
    const audioBuffer = await decryptAudio(encryptedPayload, ecdhPrivateKey);
    const blob = new Blob([audioBuffer], { type: 'audio/webm' });
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.play();
  } catch (err) {
    console.error(err);
    alert(t('error_audio_decrypt'));
  }
}

function displayEphemeralMessage(direction, messageId, type, data) {
  let content = '';
  if (type === 'text') {
    content = `<div class="msg-text">${formatMessageText(data)}</div>`;
  } else if (type === 'image') {
    content = `<img src="${escapeHtml(data)}" class="message-image" alt="${t('lightbox_image_alt')}" />`;
  } else if (type === 'video') {
    content = `<video controls src="${escapeHtml(data)}" class="message-video" style="max-width:200px; max-height:200px;"></video>`;
  } else if (type === 'voice_note') {
    content = `<audio controls src="${escapeHtml(data)}" style="max-width:100%;height:36px;"></audio>`;
  }

  appendMessageToContainer({
    containerId: 'messages-list',
    direction,
    messageId,
    expiresAt: null,
    senderName: null,
    contentHTML: content,
    extraClasses: 'ephemeral',
    metaHTML:
      '<span class="speaker-icon" title="Ascolta" style="display:none"></span><span>👻</span>',
  });
}

async function sendAudio(audioBlob) {
  const formData = new FormData();
  formData.append('audio', audioBlob, 'audio.webm');
  formData.append('recipientId', currentChatContactId);
  const trySend = async (fd) => {
    const res = await fetch(`${API_URL}/conversation/send`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${getAccessToken()}` },
      body: fd,
    });
    if (!res.ok) throw new Error('Invio fallito');
    return await res.json();
  };
  try {
    const data = await trySend(formData);
    displayMessage(data.translated, 'sent', undefined, data.expiresAt, data.messageId);
  } catch (err) {
    // retry dopo 2 secondi
    setTimeout(async () => {
      try {
        const data = await trySend(formData);
        displayMessage(data.translated, 'sent', undefined, data.expiresAt, data.messageId);
      } catch (e) {
        alert(t('error_send_retry'));
      }
    }, 2000);
  }
}

// Funzione centralizzata per l'invio di testo (usata da input testo e dettatura)
async function sendTextMessage(text, target = null) {
  if (!text) return;
  const tempId = 'temp_' + Date.now();
  localStorage.setItem('msg_' + tempId, text);

  // ─────────── INVIO IN GRUPPO ───────────
  if (target && target.groupId && target.members) {
    const groupId = target.groupId;
    const members = target.members;
    if (!groupId || members.length === 0) return;
    // Controllo per guest in gruppo multilingua
    if (currentUser && !currentUser.has_api_key) {
      const memberLanguages = await Promise.all([currentUser.language_code, ...members.map(m => fetchUserLanguage(m))]);
      const uniqueLangs = new Set(memberLanguages);
      if (uniqueLangs.size > 1) {
        alert(t('error_guest_group_multilingual'));
        return;
      }
    }
    const encryptedPayload = {};
    for (const memberId of members) {
      if (memberId === currentUser.id) continue;
      const pubKeyJwk = await fetchContactPublicKey(memberId);
      if (!pubKeyJwk) {
        alert(t('error_cannot_get_public_key', { memberId }));
        return;
      }
      const recipientPubKey = await importPublicKey(pubKeyJwk);
      if (!ecdhPrivateKey) await loadPrivateKeyIntoMemory();
      if (!ecdhPrivateKey) {
        alert(t('error_private_key_missing'));
        return;
      }
      encryptedPayload[memberId] = await encryptMessage(text, ecdhPrivateKey, recipientPubKey);
    }
    const messageId = 'gmsg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    socket.emit('group_message', {
      groupId,
      encryptedPayload,
      messageId,
      type: 'text',
    });
    // Usa displayMessage unificata con container di gruppo e nome mittente
    displayMessage(
      text,
      'sent',
      undefined,
      null,
      messageId,
      'group-messages-list',
      currentUser.username
    );
    return;
  }

  // ─────────── INVIO SINGOLO ───────────
  if (!currentChatContactId) {
    localStorage.removeItem('msg_' + tempId);
    return;
  }
  // Controllo per guest con lingua diversa (chat singola)
  if (currentUser && !currentUser.has_api_key && currentChatContactLanguage && currentChatContactLanguage !== currentUser.language_code) {
    alert(t('error_guest_diff_language'));
    return;
  }
  if (ephemeralMode) {
    const recipientPubKey = await prepareEphemeralPayload(currentChatContactId);
    if (!recipientPubKey) { localStorage.removeItem('msg_' + tempId); return; }
    const encryptedPayload = await encryptMessage(text, ecdhPrivateKey, recipientPubKey);
    const ephId = 'eph_' + Date.now();
    socket.emit('ephemeral_message', {
      recipientId: currentChatContactId,
      encryptedPayload,
      messageId: ephId,
    });
    displayEphemeralMessage('sent', ephId, 'text', text);
    localStorage.removeItem('msg_' + tempId);
    localStorage.setItem('msg_' + ephId, text);
    return;
  }

  const doSend = async () => {
    const contactPublicKey = await fetchContactPublicKey(currentChatContactId);
    if (!contactPublicKey) {
      throw new Error('E2E_REQUIRED');
    }
    if (!ecdhPrivateKey) {
      throw new Error('PRIVATE_KEY_MISSING');
    }
    const recipientPubKey = await importPublicKey(contactPublicKey);
    const encryptedPayload = await encryptMessage(text, ecdhPrivateKey, recipientPubKey);
    const bodyObj = { recipientId: currentChatContactId, encryptedPayload };

    const res = await apiCall('/conversation/send-text', {
      method: 'POST',
      body: JSON.stringify(bodyObj),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || 'Invio fallito');
    }
    return await res.json();
  };

  try {
    const data = await doSend();
    localStorage.removeItem('msg_' + tempId);
    localStorage.setItem('msg_' + data.messageId, text);
    displayMessage(text, 'sent', undefined, data.expiresAt, data.messageId);
  } catch (err) {
    localStorage.removeItem('msg_' + tempId);
    if (err.message === 'E2E_REQUIRED') {
      alert(t('error_text_e2e_required'));
      return;
    }
    if (err.message === 'PRIVATE_KEY_MISSING') {
      alert(t('error_private_key_missing'));
      return;
    }
    console.error('Errore invio testo:', err);
    await new Promise((r) => setTimeout(r, 2000));
    try {
      const data = await doSend();
      localStorage.removeItem('msg_' + tempId);
      localStorage.setItem('msg_' + data.messageId, text);
      displayMessage(text, 'sent', undefined, data.expiresAt, data.messageId);
    } catch (err2) {
      localStorage.removeItem('msg_' + tempId);
      alert(t('error_send_text_failed'));
    }
  }
}

function linkify(text) {
  const urlRegex = /(https?:\/\/[^\s<]+)/g;
  return text.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
}

function speakText(text) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = currentUser?.language_code || 'it-IT';
    // Usa la voce preferita se selezionata nel profilo
    if (currentUser?.preferred_voice) {
      const voices = speechSynthesis.getVoices();
      const preferredVoice = voices.find((v) => v.name === currentUser.preferred_voice);
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
    }
    window.speechSynthesis.speak(utterance);
  }
}

function showAuthScreen() {
  forceEndTour();
  const auth = document.getElementById('auth-screen');
  const main = document.getElementById('main-screen');
  auth.style.display = '';
  main.style.display = '';
  main.classList.remove('active');
  auth.classList.add('active');
}

function populateLanguageSelect(selectElement, selectedCode) {
  selectElement.innerHTML = '';
  LANGUAGES.forEach((lang) => {
    const option = document.createElement('option');
    option.value = lang.code;
    option.textContent = `${lang.flag} ${lang.name}`;
    if (lang.code === selectedCode) option.selected = true;
    selectElement.appendChild(option);
  });
}
function populateVoiceSelect(selectedVoice, languageCode) {
  settingsVoice.innerHTML = '';
  const voices = speechSynthesis.getVoices();
  if (voices.length === 0) {
    speechSynthesis.addEventListener(
      'voiceschanged',
      () => populateVoiceSelect(selectedVoice, languageCode),
      { once: true }
    );
    return;
  }
  // Filtra solo voci che corrispondono alla lingua selezionata
  const filtered = voices.filter((v) => {
    if (!languageCode) return true;
    const baseLang = languageCode.split('-')[0].toLowerCase(); // es. 'it'
    return v.lang.toLowerCase().startsWith(baseLang);
  });
  // Se non ci sono voci per la lingua, mostrale tutte (fallback)
  const list = filtered.length > 0 ? filtered : voices;
  list.forEach((voice) => {
    const option = document.createElement('option');
    option.value = voice.name;
    option.textContent = `${voice.name} (${voice.lang})`;
    if (voice.name === selectedVoice) option.selected = true;
    settingsVoice.appendChild(option);
  });
}

async function refreshAccessToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) return null;
  try {
    const res = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.accessToken) {
      localStorage.setItem('accessToken', data.accessToken);
      // Aggiorna il token del socket e forza la riconnessione
      if (socket) {
        socket.auth = { token: data.accessToken };
        socket.disconnect().connect();
      }
      return data.accessToken;
    }
  } catch (e) {
    // errore di rete
  }
  return null;
}

async function apiCall(endpoint, options = {}) {
  let token = getAccessToken();
  if (!token) throw new Error('Non autenticato');

  const makeRequest = (tk) =>
    fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${tk}`,
        'Content-Type': 'application/json',
      },
    });

  let res = await makeRequest(token);
  if (res.status === 401) {
    // Prova a fare refresh
    const newToken = await refreshAccessToken();
    if (newToken) {
      res = await makeRequest(newToken); // riprova con nuovo token
    } else {
      // refresh fallito, logout
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      showAuthScreen();
      throw new Error('Sessione scaduta');
    }
  }
  return res;
}

// ========== CRONOLOGIA MESSAGGI ==========

async function translateAndUpdateMessage(messageId, originalText, sourceLang, targetLang) {
  // Non tentare la traduzione se mancano i parametri
  if (!sourceLang || !targetLang) {
    console.warn('translateAndUpdateMessage: sourceLang o targetLang mancanti');
    return;
  }

  // Se l'utente non ha una chiave API, mostra subito l'avviso
  if (!currentUser || !currentUser.has_api_key) {
    const el = document.querySelector(`.msg-translation[data-message-id="${messageId}"]`);
    if (el) {
      el.textContent = t('error_translation_api_key');
    }
    return;
  }

  try {
    const translated = await translateMessageText(messageId, originalText, sourceLang, targetLang);
    const el = document.querySelector(`.msg-translation[data-message-id="${messageId}"]`);
    if (el) {
      el.textContent = translated;
      el.classList.remove('msg-translation');
      el.classList.add('msg-translated');
    }
  } catch (e) {
    const el = document.querySelector(`.msg-translation[data-message-id="${messageId}"]`);
    if (el) {
      el.textContent = t('error_translation_failed');
      if (e.message === 'API_KEY_REQUIRED') {
        el.textContent = t('error_translation_api_key');
      }
    }
  }
}

async function loadMessages(contactId, before = null) {
  try {
    await ensureFreshToken();
    let url = `/conversation/messages/${contactId}?limit=30`;
    if (before) url += `&before=${encodeURIComponent(before)}`;
    const res = await apiCall(url);
    if (!res.ok) throw new Error('Errore');
    const data = await res.json();

    // Popola cache audio ricevuti
    (data.messages || []).forEach((m) => {
      if (m.type === 'voice_note' && m.direction === 'received' && m.audio_data) {
        receivedAudioCache.set(m.id, m.audio_data);
      }
      if (m.type === 'image' && m.direction === 'received' && m.image_data) {
        receivedImageCache.set(m.id, m.image_data);
      }
      if (m.type === 'video' && m.direction === 'received' && m.video_data) {
        lruSet(receivedVideoCache, m.id, m.video_data, 5);
      }
    });

    const decryptedMessages = await Promise.all(
      (data.messages || []).map(async (m) => {
        if (m.is_encrypted) {
          if (m.direction === 'received' && m.original) {
            try {
              if (!ecdhPrivateKey) throw new Error('Chiave privata non caricata');
              const encryptedPayload = JSON.parse(m.original);
              const decryptedText = await decryptMessage(encryptedPayload, ecdhPrivateKey);
              return { ...m, translated: decryptedText, original: undefined };
            } catch (decErr) {
              console.error('Decifratura fallita per', m.id, decErr);
              const reason = !ecdhPrivateKey
                ? '[Chiave privata mancante – rigenera le chiavi E2E]'
                : '[Messaggio cifrato non decifrabile]';
              return { ...m, translated: reason, original: undefined };
            }
          } else if (m.direction === 'sent') {
            const cached = localStorage.getItem(`msg_${m.id}`);
            if (cached) {
              return { ...m, translated: cached, original: undefined };
            } else {
              return { ...m, translated: '🔒 Messaggio non disponibile', original: undefined };
            }
          }
        }
        return m;
      })
    );

    // Se è la prima richiesta (before null), renderizza normalmente
    if (!before) {
      hasMoreMessages = data.hasMore;
      if (decryptedMessages.length > 0) {
        oldestMessageDate = decryptedMessages[0].timestamp; // il più vecchio del batch (ordinamento crescente)
      }
      renderMessages(decryptedMessages);
      // Avvia traduzioni cross‑language
      decryptedMessages.forEach((m) => {
        if (
          m.direction === 'received' &&
          currentChatContactLanguage &&
          currentUser.language_code &&
          currentChatContactLanguage !== currentUser.language_code
        ) {
          const sourceLang = currentChatContactLanguage;
          const targetLang = currentUser.language_code;
          translateAndUpdateMessage(m.id, m.translated, sourceLang, targetLang);
        }
      });
    } else {
      // Caricamento all'indietro: prependi i messaggi
      hasMoreMessages = data.hasMore;
      if (decryptedMessages.length > 0) {
        oldestMessageDate = decryptedMessages[0].timestamp;
      }
      prependMessages(decryptedMessages);
      decryptedMessages.forEach((m) => {
        if (
          m.direction === 'received' &&
          currentChatContactLanguage &&
          currentUser.language_code &&
          currentChatContactLanguage !== currentUser.language_code
        ) {
          translateAndUpdateMessage(
            m.id,
            m.translated,
            currentChatContactLanguage,
            currentUser.language_code
          );
        }
      });
    }
  } catch (e) {
    console.error('❌ DECRIPT FAIL per', m.id, decErr);
    console.error('loadMessages fallita:', e);
    if (!before) {
      const container = document.getElementById('messages-list');
      if (container && container.children.length === 0) {
        container.innerHTML = '<p class="error">' + t('load_error') + '</p>';
      }
    }
  }
}

async function loadChatExpiry(contactId) {
  try {
    const res = await apiCall(`/contacts/${contactId}/my-expiry`);
    if (!res.ok) return;
    const data = await res.json();
    const select = document.getElementById('chat-expiry-select');
    if (select) {
      currentChatExpiryHours = data.expiry_hours ?? null;
      if (data.expiry_hours !== null && data.expiry_hours !== undefined) {
        select.value = String(data.expiry_hours);
        currentChatExpiryHours = data.expiry_hours;
      } else {
        const globalHours = currentUser?.global_expiry_hours;
        select.value =
          globalHours !== null && globalHours !== undefined ? String(globalHours) : '0';
        currentChatExpiryHours =
          globalHours !== null && globalHours !== undefined ? globalHours : null;
      }
    }
  } catch (e) {
    /* ignore */
  }
}

function renderReactions(reactionsJson) {
  if (!reactionsJson) return '';
  try {
    const reactions = typeof reactionsJson === 'string' ? JSON.parse(reactionsJson) : reactionsJson;
    if (!reactions.length) return '';
    const counts = {};
    reactions.forEach(r => { counts[r.emoji] = (counts[r.emoji] || 0) + 1; });
    return (
      `<div class="message-reactions">` +
      Object.entries(counts)
        .map(([emoji, count]) => `<span class="reaction-badge">${emoji}${count > 1 ? ` ${count}` : ''}</span>`)
        .join('') +
      `</div>`
    );
  } catch (e) {
    return '';
  }
}

function renderMessages(messages) {
  const container = document.getElementById('messages-list');
  if (!container) return;

  if (messages.length === 0) {
    if (container.children.length > 0 && container.querySelector('.message-item')) {
      return;
    }
    container.innerHTML =
      '<p style="text-align:center;color:var(--text-secondary);padding:20px;">' +
      t('no_messages') +
      '</p>';
    return;
  }

  console.log('[DEBUG] messages count:', messages.length);
  console.log('[DEBUG] messages HTML:', messages.map(m => m.id).join(', '));
  container.innerHTML = messages
    .map((m) => {
      const cls = m.direction === 'sent' ? 'sent' : 'received';
      const time = formatTime(m.timestamp);
      const expiryInfo = m.direction === 'received' ? formatExpiryInfo(m.expiresAt) : '';
      const readStatus = renderReadStatus(m.direction, m.read_at);
      const readClass = m.read_at ? 'read' : '';

      if (m.type === 'video') {
        let videoContent = '';
        if (m.direction === 'sent') {
          const cached = sentVideoCache.get(m.id);
          if (cached) {
            videoContent = `<video controls src="${escapeHtml(cached)}" class="message-video" style="max-width:200px; max-height:200px;"></video>`;
          } else {
            const thumb = sessionStorage.getItem('thumb_' + m.id);
            if (thumb) {
              videoContent = `<div class="video-thumbnail-wrapper" data-message-id="${m.id}">
                                <img src="${thumb}" alt="Video thumbnail" style="display:block;" />
                                <div class="play-overlay">
                                  <svg viewBox="0 0 48 48" width="36" height="36">
                                    <circle cx="24" cy="24" r="22" fill="rgba(var(--shadow-dark-rgb), 0.45)" stroke="var(--text)" stroke-width="1.5"/>
                                    <polygon points="19,15 19,33 33,24" fill="var(--text)"/>
                                  </svg>
                                </div>
                              </div>`;
            } else {
              videoContent = t('video_sent');
            }
          }
        } else {
          if (m.video_data) {
            lruSet(receivedVideoCache, m.id, m.video_data, 5);
            videoContent = `
              <div class="video-thumbnail-wrapper" data-message-id="${m.id}">
                <img src="" alt="Video thumbnail" style="display:none;" />
                <div class="play-overlay">
                  <svg viewBox="0 0 48 48" width="36" height="36">
                    <circle cx="24" cy="24" r="22" fill="rgba(var(--shadow-dark-rgb), 0.45)" stroke="var(--text)" stroke-width="1.5"/>
                    <polygon points="19,15 19,33 33,24" fill="var(--text)"/>
                  </svg>
                </div>
              </div>`;
          } else {
            videoContent = t('video_generic');
          }
        }
        return `
        <div class="message-item ${cls} ${readClass}" data-expires-at="${m.expiresAt || ''}" data-message-id="${m.id}" data-is-encrypted="${m.is_encrypted ? 'true' : 'false'}">
          ${videoContent}
          ${renderReactions(m.reactions)}
          <div class="msg-meta">
            <span>${time}</span>
            <span>${expiryInfo} ${readStatus}</span>
            <span class="speaker-icon" title="Ascolta"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style="width:1em; height:1em; vertical-align:middle;"><path d="M16.881 4.345A23.112 23.112 0 0 1 8.25 6H7.5a5.25 5.25 0 0 0-.88 10.427 21.593 21.593 0 0 0 1.378 3.94c.464 1.004 1.674 1.32 2.582.796l.657-.379c.88-.508 1.165-1.593.772-2.468a17.116 17.116 0 0 1-.628-1.607c1.918.258 3.76.75 5.5 1.446A21.727 21.727 0 0 0 18 11.25c0-2.414-.393-4.735-1.119-6.905ZM18.26 3.74a23.22 23.22 0 0 1 1.24 7.51 23.22 23.22 0 0 1-1.41 7.992.75.75 0 1 0 1.409.516 24.555 24.555 0 0 0 1.415-6.43 2.992 2.992 0 0 0 .836-2.078c0-.807-.319-1.54-.836-2.078a24.65 24.65 0 0 0-1.415-6.43.75.75 0 1 0-1.409.516c.059.16.116.321.17.483Z" /></svg></span>
          </div>
        </div>
      `;
      }

      if (m.type === 'image') {
        let imageContent = '';
        if (m.direction === 'sent') {
          const cached = sentImageCache.get(m.id);
          if (cached) {
            imageContent = `<img src="${escapeHtml(cached)}" class="message-image" alt="${t('lightbox_image_alt')}" />`;
          } else {
            imageContent = t('image_sent');
          }
        } else {
          if (m.image_data && !m.is_encrypted) {
            receivedImageCache.set(m.id, m.image_data);
            imageContent = `<img src="${escapeHtml(m.image_data)}" class="message-image" alt="${t('lightbox_image_alt')}" />`;
          } else if (m.is_encrypted && m.image_data) {
            receivedImageCache.set(m.id, m.image_data);
            imageContent = `
              <div class="encrypted-image-wrapper" data-message-id="${m.id}">
                <img src="" alt="${t('lightbox_image_alt')}" class="message-image" style="display:none;" />
                <div class="spinner"></div>
              </div>`;
          } else {
            imageContent = t('image_generic');
          }
        }
        return `
        <div class="message-item ${cls} ${readClass}" data-expires-at="${m.expiresAt || ''}" data-message-id="${m.id}" data-is-encrypted="${m.is_encrypted ? 'true' : 'false'}">
          ${imageContent}
          ${renderReactions(m.reactions)}
          <div class="msg-meta">
            <span>${time}</span>
            <span>${expiryInfo} ${readStatus}</span>
            <span class="speaker-icon" title="Ascolta"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style="width:1em; height:1em; vertical-align:middle;"><path d="M16.881 4.345A23.112 23.112 0 0 1 8.25 6H7.5a5.25 5.25 0 0 0-.88 10.427 21.593 21.593 0 0 0 1.378 3.94c.464 1.004 1.674 1.32 2.582.796l.657-.379c.88-.508 1.165-1.593.772-2.468a17.116 17.116 0 0 1-.628-1.607c1.918.258 3.76.75 5.5 1.446A21.727 21.727 0 0 0 18 11.25c0-2.414-.393-4.735-1.119-6.905ZM18.26 3.74a23.22 23.22 0 0 1 1.24 7.51 23.22 23.22 0 0 1-1.41 7.992.75.75 0 1 0 1.409.516 24.555 24.555 0 0 0 1.415-6.43 2.992 2.992 0 0 0 .836-2.078c0-.807-.319-1.54-.836-2.078a24.65 24.65 0 0 0-1.415-6.43.75.75 0 1 0-1.409.516c.059.16.116.321.17.483Z" /></svg></span>
          </div>
        </div>
      `;
      }

      if (m.type === 'voice_note') {
        let voiceContent = '';
        if (m.direction === 'sent') {
          const cached = sentAudioCache.get(m.id);
          if (cached) {
            voiceContent = `<audio controls src="${escapeHtml(cached)}" style="max-width:100%;height:36px;"></audio>`;
          } else {
            voiceContent = t('voice_note_sent');
          }
        } else {
          voiceContent = `<span class="voice-note-play" data-message-id="${m.id}">${t('voice_note_listen')}</span>`;
        }
        return `
        <div class="message-item ${cls} ${readClass}" data-expires-at="${m.expiresAt || ''}" data-message-id="${m.id}">
          ${voiceContent}
          ${renderReactions(m.reactions)}
          <div class="msg-meta">
            <span>${time}</span>
            <span>${expiryInfo} ${readStatus}</span>
            <span class="speaker-icon" title="Ascolta"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style="width:1em; height:1em; vertical-align:middle;"><path d="M16.881 4.345A23.112 23.112 0 0 1 8.25 6H7.5a5.25 5.25 0 0 0-.88 10.427 21.593 21.593 0 0 0 1.378 3.94c.464 1.004 1.674 1.32 2.582.796l.657-.379c.88-.508 1.165-1.593.772-2.468a17.116 17.116 0 0 1-.628-1.607c1.918.258 3.76.75 5.5 1.446A21.727 21.727 0 0 0 18 11.25c0-2.414-.393-4.735-1.119-6.905ZM18.26 3.74a23.22 23.22 0 0 1 1.24 7.51 23.22 23.22 0 0 1-1.41 7.992.75.75 0 1 0 1.409.516 24.555 24.555 0 0 0 1.415-6.43 2.992 2.992 0 0 0 .836-2.078c0-.807-.319-1.54-.836-2.078a24.65 24.65 0 0 0-1.415-6.43.75.75 0 1 0-1.409.516c.059.16.116.321.17.483Z" /></svg></span>
          </div>
        </div>
      `;
      }

      // Messaggio di testo normale
      let displayText;
      let showOriginal = false;
      let originalText = '';

      if (
        m.direction === 'received' &&
        currentChatContactLanguage &&
        currentUser.language_code &&
        currentChatContactLanguage !== currentUser.language_code
      ) {
        // Cross-language: mostra originale + traduzione
        originalText = m.translated; // testo originale decifrato
        showOriginal = true;
        displayText = `<span class="msg-translation" data-message-id="${m.id}" data-original="${escapeHtml(originalText)}"><span class="spinner"></span> ${t('translating_placeholder')}</span>`;
      } else {
        displayText = formatMessageText(m.translated);
      }

      const safeText = displayText;
      const originalPart = showOriginal
        ? `<div class="msg-original">${escapeHtml(originalText)}</div>`
        : '';

      return `
      <div class="message-item ${cls} ${readClass}" data-expires-at="${m.expiresAt || ''}" data-message-id="${m.id}">
        ${originalPart}
        <div class="msg-text">${safeText}</div>
        ${renderReactions(m.reactions)}
        <div class="msg-meta">
          <span>${time}</span>
          <span>${expiryInfo} ${readStatus}</span>
          <span class="speaker-icon" title="Ascolta"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style="width:1em; height:1em; vertical-align:middle;"><path d="M16.881 4.345A23.112 23.112 0 0 1 8.25 6H7.5a5.25 5.25 0 0 0-.88 10.427 21.593 21.593 0 0 0 1.378 3.94c.464 1.004 1.674 1.32 2.582.796l.657-.379c.88-.508 1.165-1.593.772-2.468a17.116 17.116 0 0 1-.628-1.607c1.918.258 3.76.75 5.5 1.446A21.727 21.727 0 0 0 18 11.25c0-2.414-.393-4.735-1.119-6.905ZM18.26 3.74a23.22 23.22 0 0 1 1.24 7.51 23.22 23.22 0 0 1-1.41 7.992.75.75 0 1 0 1.409.516 24.555 24.555 0 0 0 1.415-6.43 2.992 2.992 0 0 0 .836-2.078c0-.807-.319-1.54-.836-2.078a24.65 24.65 0 0 0-1.415-6.43.75.75 0 1 0-1.409.516c.059.16.116.321.17.483Z" /></svg></span>
        </div>
      </div>
    `;
    })
    .join('');
  // Avvia decifratura automatica per le immagini ricevute
  container.querySelectorAll('.encrypted-image-wrapper').forEach(wrapper => {
    const msgId = wrapper.dataset.messageId;
    if (msgId) decryptAndShowImage(msgId);
  });
  // Carica le thumbnail dei video ricevuti (asincrono)
  container.querySelectorAll('.video-thumbnail-wrapper').forEach(wrapper => {
    const msgId = wrapper.dataset.messageId;
    if (msgId) loadVideoThumbnail(msgId);
  });
  // Doppio rAF + setTimeout per garantire il completamento del layout
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      setTimeout(() => {
        container.scrollTop = container.scrollHeight;
      }, 0);
    });
  });
}

function prependMessages(messages) {
  const container = document.getElementById('messages-list');
  if (!container) return;
  const oldHeight = container.scrollHeight;
  const html = messages
    .map((m) => {
      const cls = m.direction === 'sent' ? 'sent' : 'received';
      const time = formatTime(m.timestamp);
      const expiryInfo = m.direction === 'received' ? formatExpiryInfo(m.expiresAt) : '';
      const readStatus = renderReadStatus(m.direction, m.read_at);
      const readClass = m.read_at ? 'read' : '';
      let content = '';
      if (m.type === 'voice_note') {
        if (m.direction === 'sent') {
          const cached = sentAudioCache.get(m.id);
          content = cached
            ? `<audio controls src="${escapeHtml(cached)}" style="max-width:100%;height:36px;"></audio>`
            : t('voice_note_sent');
        } else {
          content = `<span class="voice-note-play" data-message-id="${m.id}">${t('voice_note_listen')}</span>`;
        }
      } else if (m.type === 'video') {
        if (m.direction === 'sent') {
          const cached = sentVideoCache.get(m.id);
          if (cached) {
            content = `<video controls src="${escapeHtml(cached)}" class="message-video" style="max-width:200px; max-height:200px;"></video>`;
          } else {
            const thumb = sessionStorage.getItem('thumb_' + m.id);
            if (thumb) {
              content = `<div class="video-thumbnail-wrapper" data-message-id="${m.id}">
                           <img src="${thumb}" alt="Video thumbnail" style="display:block;" />
                           <div class="play-overlay">
                             <svg viewBox="0 0 48 48" width="36" height="36">
                               <circle cx="24" cy="24" r="22" fill="rgba(var(--shadow-dark-rgb), 0.45)" stroke="var(--text)" stroke-width="1.5"/>
                               <polygon points="19,15 19,33 33,24" fill="var(--text)"/>
                             </svg>
                           </div>
                         </div>`;
            } else {
              content = t('video_sent');
            }
          }
        } else {
          lruSet(receivedVideoCache, m.id, m.video_data, 5);
            content = `
              <div class="video-thumbnail-wrapper" data-message-id="${m.id}">
                <img src="" alt="Video thumbnail" style="display:none;" />
                <div class="play-overlay">
                  <svg viewBox="0 0 48 48" width="36" height="36">
                    <circle cx="24" cy="24" r="22" fill="rgba(var(--shadow-dark-rgb), 0.45)" stroke="var(--text)" stroke-width="1.5"/>
                    <polygon points="19,15 19,33 33,24" fill="var(--text)"/>
                  </svg>
                </div>
              </div>`;
        }
      } else {
        let displayText;
        let showOriginal = false;
        let originalText = '';
        if (
          m.direction === 'received' &&
          currentChatContactLanguage &&
          currentUser.language_code &&
          currentChatContactLanguage !== currentUser.language_code
        ) {
          originalText = m.translated;
          showOriginal = true;
          displayText = `<span class="msg-translation" data-message-id="${m.id}" data-original="${escapeHtml(originalText)}"><span class="spinner"></span> ${t('translating_placeholder')}</span>`;
        } else {
          displayText = formatMessageText(m.translated);
        }
        content = showOriginal
          ? `<div class="msg-original">${escapeHtml(originalText)}</div><div class="msg-text">${displayText}</div>`
          : `<div class="msg-text">${displayText}</div>`;
      }
      const reactionsHtml = renderReactions(m.reactions);
      return `
      <div class="message-item ${cls} ${readClass}" data-expires-at="${m.expiresAt || ''}" data-message-id="${m.id}">
        ${content}
        ${reactionsHtml}
        <div class="msg-meta">
          <span>${time}</span>
          <span>${expiryInfo} ${readStatus}</span>
          <span class="speaker-icon" title="Ascolta"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style="width:1em; height:1em; vertical-align:middle;"><path d="M16.881 4.345A23.112 23.112 0 0 1 8.25 6H7.5a5.25 5.25 0 0 0-.88 10.427 21.593 21.593 0 0 0 1.378 3.94c.464 1.004 1.674 1.32 2.582.796l.657-.379c.88-.508 1.165-1.593.772-2.468a17.116 17.116 0 0 1-.628-1.607c1.918.258 3.76.75 5.5 1.446A21.727 21.727 0 0 0 18 11.25c0-2.414-.393-4.735-1.119-6.905ZM18.26 3.74a23.22 23.22 0 0 1 1.24 7.51 23.22 23.22 0 0 1-1.41 7.992.75.75 0 1 0 1.409.516 24.555 24.555 0 0 0 1.415-6.43 2.992 2.992 0 0 0 .836-2.078c0-.807-.319-1.54-.836-2.078a24.65 24.65 0 0 0-1.415-6.43.75.75 0 1 0-1.409.516c.059.16.116.321.17.483Z" /></svg></span>
        </div>
      </div>
    `;
    })
    .join('');
  console.log('PREPEND MESSAGES HTML LENGTH:', html.length);
  container.insertAdjacentHTML('afterbegin', html);
  // Carica le thumbnail per i video prependuti
  container.querySelectorAll('.video-thumbnail-wrapper').forEach(wrapper => {
    const msgId = wrapper.dataset.messageId;
    if (msgId) loadVideoThumbnail(msgId);
  });
  const newHeight = container.scrollHeight;
  container.scrollTop = newHeight - oldHeight;
}

// Listener cambio timer chat
document.getElementById('chat-expiry-select').addEventListener('change', async (e) => {
  if (!currentChatContactId) return;
  const val = e.target.value;
  const expiry_hours = val === '' ? null : Number(val);
  try {
    await apiCall(`/contacts/${currentChatContactId}/my-expiry`, {
      method: 'PUT',
      body: JSON.stringify({ expiry_hours }),
    });
    currentChatExpiryHours = expiry_hours;
  } catch (err) {
    console.error(err);
  }
});

async function loadCurrentUser() {
  try {
    const res = await apiCall('/auth/me');
    if (!res.ok) return;
    const data = await res.json();
    currentUser = data;
    await loadPrivateKeyIntoMemory();
    // Se l'utente non ha ancora una lingua UI impostata, usa la sua lingua madre
    if (!localStorage.getItem('ui_language')) {
      const uiLang = data.language_code.split('-')[0];
      setUILanguage(uiLang);
    }
    // Applica le traduzioni dopo aver determinato la lingua UI
    applyTranslations();
    document.getElementById('text-input').placeholder = t('text_input_placeholder');
    // Verifica coerenza chiavi E2E e rigenera automaticamente se necessario
    const storedPrivateJwk = getPrivateKey();
    if (storedPrivateJwk && data.public_key) {
      try {
        const privJwk = JSON.parse(storedPrivateJwk);
        const pubJwk = JSON.parse(data.public_key);
        const coherent = privJwk.x === pubJwk.x && privJwk.y === pubJwk.y;
        if (!coherent) {
          console.warn('[E2E] Chiavi incoerenti – rigenerazione automatica');
          clearPrivateKey();
          ecdhPrivateKey = null;
        }
      } catch (e) {
        console.warn('[E2E] Errore verifica coerenza chiavi – rigenerazione forzata');
        clearPrivateKey();
        ecdhPrivateKey = null;
      }
    }
    if (!getPrivateKey() || !data.public_key) {
      console.log(
        '[E2E] Generazione chiavi necessaria (privata:',
        !!getPrivateKey(),
        'pubblica:',
        !!data.public_key,
        ')'
      );
      try {
        const keyPair = await generateKeyPair();
        const privateJwk = await exportPrivateKey(keyPair.privateKey);
        savePrivateKey(privateJwk);
        const publicJwk = await exportPublicKey(keyPair.publicKey);
        await apiCall('/auth/me', {
          method: 'PUT',
          body: JSON.stringify({ public_key: publicJwk }),
        });
        await loadPrivateKeyIntoMemory();
        console.log('[E2E] Chiavi generate con successo');
      } catch (e) {
        console.error('[E2E] Errore generazione chiavi', e);
      }
    }
  } catch (e) {
    // ignore
  }
}

// Avatar upload logic
let avatarDataUrl = null; // tiene traccia dell'avatar corrente (base64)
let originalAvatar = null; // avatar salvato, per confronto

async function resizeImage(file) {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(bitmap, 0, 0, 128, 128);
  bitmap.close(); // rilascia memoria
  return canvas.toDataURL('image/jpeg', 0.8);
}

avatarUploadBtn.addEventListener('click', () => {
  avatarInput.click();
});

avatarInput.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    const dataUrl = await resizeImage(file);
    avatarDataUrl = dataUrl;
    avatarPreview.src = dataUrl;
    avatarPreview.style.display = 'block';
    avatarRemoveBtn.style.display = 'inline-block';
  } catch (err) {
    alert(t('avatar_upload_error') + ': ' + err.message);
  } finally {
    avatarInput.value = ''; // ← RESET per permettere ricarica stesso file
  }
});

avatarRemoveBtn.addEventListener('click', () => {
  avatarDataUrl = null;
  avatarPreview.src = '';
  avatarPreview.style.display = 'none';
  avatarRemoveBtn.style.display = 'none';
  avatarInput.value = '';
});

function resizeAndCompressImage(file, maxWidth, quality) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      let width = img.width;
      let height = img.height;
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

function readVideoAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Genera una thumbnail JPEG dal video base64.
 * @param {string} videoBase64 - data-URL del video
 * @param {number} maxWidth - larghezza massima (default 320)
 * @param {number} quality - qualità JPEG (default 0.6)
 * @returns {Promise<string>} data-URL JPEG della thumbnail
 */
function generateVideoThumbnail(videoBase64, maxWidth = 320, quality = 0.6) {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.muted = true;
    video.playsInline = true;
    video.crossOrigin = 'anonymous';
    
    video.onloadeddata = () => {
      video.currentTime = Math.min(1, video.duration || 1);
    };
    
    video.onseeked = () => {
      const canvas = document.createElement('canvas');
      const ratio = Math.min(maxWidth / video.videoWidth, 1);
      canvas.width = Math.round(video.videoWidth * ratio);
      canvas.height = Math.round(video.videoHeight * ratio);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const thumbBase64 = canvas.toDataURL('image/jpeg', quality);
      URL.revokeObjectURL(video.src);
      resolve(thumbBase64);
    };
    
    video.onerror = () => {
      URL.revokeObjectURL(video.src);
      reject(new Error('Errore generazione thumbnail'));
    };
    
    video.src = videoBase64;
  });
}

function getVideoDuration(dataUrl) {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = () => {
      resolve(video.duration);
      URL.revokeObjectURL(video.src);
    };
    video.onerror = reject;
    video.src = dataUrl;
  });
}

async function sendImageMessage(imageBase64, target = null) {
  // ─────────── INVIO IN GRUPPO ───────────
  if (target && target.groupId && target.members) {
    const groupId = target.groupId;
    const members = target.members;
    if (!groupId || members.length === 0) return;
    // Controllo per guest in gruppo multilingua
    if (currentUser && !currentUser.has_api_key) {
      const memberLanguages = await Promise.all([currentUser.language_code, ...members.map(m => fetchUserLanguage(m))]);
      const uniqueLangs = new Set(memberLanguages);
      if (uniqueLangs.size > 1) {
        alert(t('error_guest_group_multilingual'));
        return;
      }
    }
    checkMediaExpiryWarning();
    const encryptedPayload = {};
    for (const memberId of members) {
      if (memberId === currentUser.id) continue;
      const pubKeyJwk = await fetchContactPublicKey(memberId);
      if (!pubKeyJwk) {
        alert(t('error_missing_public_key', { memberId }));
        return;
      }
      const recipientPubKey = await importPublicKey(pubKeyJwk);
      if (!ecdhPrivateKey) await loadPrivateKeyIntoMemory();
      if (!ecdhPrivateKey) {
        alert(t('error_private_key_missing'));
        return;
      }
      encryptedPayload[memberId] = await encryptMessage(
        imageBase64,
        ecdhPrivateKey,
        recipientPubKey
      );
    }
    const messageId = 'gmsg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    socket.emit('group_message', { groupId, encryptedPayload, messageId, type: 'image' });

    // Salva in cache e mostra nel contenitore del gruppo
    sentImageCache.set(messageId, imageBase64);
    displayImageMessage('sent', messageId, null, 'group-messages-list');
    return;
  }

  // ─────────── INVIO SINGOLO (codice originale) ───────────
  if (!currentChatContactId) return;
  checkMediaExpiryWarning();
  // Controllo per guest con lingua diversa (chat singola)
  if (currentUser && !currentUser.has_api_key && currentChatContactLanguage && currentChatContactLanguage !== currentUser.language_code) {
    alert(t('error_guest_diff_language'));
    return;
  }
  if (ephemeralMode) {
    const recipientPubKey = await prepareEphemeralPayload(currentChatContactId);
    if (!recipientPubKey) return;
    const encryptedPayload = await encryptMessage(imageBase64, ecdhPrivateKey, recipientPubKey);
    const tempId = 'eph_' + Date.now();
    socket.emit('ephemeral_message', {
      recipientId: currentChatContactId,
      encryptedPayload,
      messageId: tempId,
      type: 'image',
    });
    displayEphemeralMessage('sent', tempId, 'image', imageBase64);
    return;
  }

  try {
    const contactPublicKey = await fetchContactPublicKey(currentChatContactId);
    if (!contactPublicKey) {
      alert(t('error_text_e2e_required'));
      return;
    }
    if (!ecdhPrivateKey) await loadPrivateKeyIntoMemory();
    if (!ecdhPrivateKey) {
      alert(t('error_private_key_missing'));
      return;
    }
    const recipientPubKey = await importPublicKey(contactPublicKey);
    const encryptedPayload = await encryptMessage(imageBase64, ecdhPrivateKey, recipientPubKey);

    const body = { recipientId: currentChatContactId, encryptedPayload };
    const res = await apiCall('/conversation/send-image', {
      method: 'POST',
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      alert(errData.error || t('error_image_send_failed'));
      return;
    }
    const data = await res.json();
    sentImageCache.set(data.messageId, imageBase64);
    displayImageMessage('sent', data.messageId, data.expiresAt);
  } catch (err) {
    showNetworkError('error_network_image');
  }
}

async function sendVideoMessage(videoBase64, target = null) {
  // 1. Genera la thumbnail (prima di ogni cifratura)
  let thumbnailBase64 = null;
  try {
    thumbnailBase64 = await generateVideoThumbnail(videoBase64);
  } catch (e) {
    console.warn('Thumbnail non generata, si procede senza', e);
  }

  // 2. Funzione helper per cifrare entrambi i campi e restituire payload JSON
  const encryptVideoPayload = async (recipientPubKey) => {
    if (!ecdhPrivateKey) await loadPrivateKeyIntoMemory();
    if (!ecdhPrivateKey) throw new Error('PRIVATE_KEY_MISSING');
    const encryptedVideo = await encryptMessage(videoBase64, ecdhPrivateKey, recipientPubKey);
    let encryptedThumbnail = null;
    if (thumbnailBase64) {
      encryptedThumbnail = await encryptMessage(thumbnailBase64, ecdhPrivateKey, recipientPubKey);
    }
    return { video: encryptedVideo, thumbnail: encryptedThumbnail };
  };

  // ─────────── INVIO IN GRUPPO ───────────
  if (target && target.groupId && target.members) {
    const groupId = target.groupId;
    const members = target.members;
    if (!groupId || members.length === 0) return;
    // Controllo per guest in gruppo multilingua
    if (currentUser && !currentUser.has_api_key) {
      const memberLanguages = await Promise.all([currentUser.language_code, ...members.map(m => fetchUserLanguage(m))]);
      const uniqueLangs = new Set(memberLanguages);
      if (uniqueLangs.size > 1) {
        alert(t('error_guest_group_multilingual'));
        return;
      }
    }
    checkMediaExpiryWarning();
    const encryptedPayload = {};
    for (const memberId of members) {
      if (memberId === currentUser.id) continue;
      const pubKeyJwk = await fetchContactPublicKey(memberId);
      if (!pubKeyJwk) {
        alert(t('error_missing_public_key', { memberId }));
        return;
      }
      const recipientPubKey = await importPublicKey(pubKeyJwk);
      if (!ecdhPrivateKey) await loadPrivateKeyIntoMemory();
      if (!ecdhPrivateKey) {
        alert(t('error_private_key_missing'));
        return;
      }
      encryptedPayload[memberId] = await encryptVideoPayload(recipientPubKey);
    }

    const messageId = 'gmsg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

    console.log('📤 [TEST1] emit group_message video:', {
      messageId,
      groupId,
      type: 'video',
      encryptedPayloadKeys: Object.keys(encryptedPayload),
      socketConnected: socket?.connected,
    });

    socket.emit('group_message', { groupId, encryptedPayload, messageId, type: 'video' });

    // Salva in cache e mostra nel contenitore del gruppo
    sentVideoCache.set(messageId, videoBase64);
    // Opzionalmente potremmo salvare anche la thumbnail in chiaro per il mittente,
    // ma per ora non serve perché il mittente vede ancora il player video.
    if (thumbnailBase64) {
      sessionStorage.setItem('thumb_' + messageId, thumbnailBase64);
    }
    displayVideoMessage('sent', messageId, null, 'group-messages-list');
    return;
  }

  // ─────────── INVIO SINGOLO (codice originale) ───────────
  if (!currentChatContactId) return;
  checkMediaExpiryWarning();
  // Controllo per guest con lingua diversa (chat singola)
  if (currentUser && !currentUser.has_api_key && currentChatContactLanguage && currentChatContactLanguage !== currentUser.language_code) {
    alert(t('error_guest_diff_language'));
    return;
  }
  if (ephemeralMode) {
    const recipientPubKey = await prepareEphemeralPayload(currentChatContactId);
    if (!recipientPubKey) return;
    const encryptedPayload = await encryptVideoPayload(recipientPubKey);
    const tempId = 'eph_' + Date.now();
    console.log('📤 [EFFEMERO-MITTENTE] emit ephemeral_message video, size:', videoBase64.length);
    socket.emit('ephemeral_message', {
      recipientId: currentChatContactId,
      encryptedPayload,
      messageId: tempId,
      type: 'video',
    });
    if (thumbnailBase64) {
      sessionStorage.setItem('thumb_' + tempId, thumbnailBase64);
    }
    displayEphemeralMessage('sent', tempId, 'video', videoBase64);
    return;
  }

  try {
    // Genera un ID temporaneo per associare la thumbnail prima di conoscere il messageId
    const tempId = 'temp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    if (thumbnailBase64) {
      sessionStorage.setItem('thumb_' + tempId, thumbnailBase64);
    }

    const contactPublicKey = await fetchContactPublicKey(currentChatContactId);
    if (!contactPublicKey) {
      alert(t('error_text_e2e_required'));
      sessionStorage.removeItem('thumb_' + tempId);
      return;
    }
    if (!ecdhPrivateKey) await loadPrivateKeyIntoMemory();
    if (!ecdhPrivateKey) {
      alert(t('error_private_key_missing'));
      sessionStorage.removeItem('thumb_' + tempId);
      return;
    }
    const recipientPubKey = await importPublicKey(contactPublicKey);
    const encryptedPayload = await encryptVideoPayload(recipientPubKey);

    const body = { recipientId: currentChatContactId, encryptedPayload, clientTempId: tempId };
    const res = await apiCall('/conversation/send-video', {
      method: 'POST',
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      alert(errData.error || t('error_video_send_failed'));
      sessionStorage.removeItem('thumb_' + tempId);
      return;
    }
    const data = await res.json();
    sentVideoCache.set(data.messageId, videoBase64);
    // Trasferisci la thumbnail dalla chiave temporanea a quella definitiva
    if (thumbnailBase64) {
      const tempKey = 'thumb_' + tempId;
      const permKey = 'thumb_' + data.messageId;
      const saved = sessionStorage.getItem(tempKey);
      if (saved) {
        sessionStorage.setItem(permKey, saved);
        sessionStorage.removeItem(tempKey);
      }
    }
    displayVideoMessage('sent', data.messageId, data.expiresAt);
  } catch (err) {
    showNetworkError('error_network_video');
  }
}

async function decryptAndShowImage(messageId) {
  const wrapper = document.querySelector(`.encrypted-image-wrapper[data-message-id="${messageId}"]`);
  if (!wrapper) return;
  const img = wrapper.querySelector('img');
  if (!img) return;

  const data = receivedImageCache.get(messageId);
  if (!data) return;

  try {
    let imageUrl;
    if (typeof data === 'string' && data.startsWith('data:image/')) {
      // già in chiaro
      imageUrl = data;
    } else {
      const encryptedPayload = JSON.parse(data);
      if (!ecdhPrivateKey) await loadPrivateKeyIntoMemory();
      if (!ecdhPrivateKey) return;
      imageUrl = await decryptMessage(encryptedPayload, ecdhPrivateKey);
      // Aggiorna cache con la versione decifrata
      receivedImageCache.set(messageId, imageUrl);
    }
    // Mostra l'immagine e nasconde lo spinner
    img.src = imageUrl;
    img.style.display = 'block';
    const spinner = wrapper.querySelector('.spinner');
    if (spinner) spinner.style.display = 'none';
  } catch (e) {
    console.error('Decifratura immagine fallita', e);
    const spinner = wrapper.querySelector('.spinner');
    if (spinner) spinner.textContent = 'Errore';
  }
}

function displayVideoMessage(
  direction,
  messageId,
  expiresAt = null,
  containerId = 'messages-list',
  senderName = null,
  isEncrypted = false
) {
  let content = '';
  if (direction === 'sent') {
    const cached = sentVideoCache.get(messageId);
    if (cached) {
      content = `<video controls src="${cached}" class="message-video" style="max-width:200px; max-height:200px;"></video>`;
      } else {
        // Prova a recuperare la thumbnail persistente
        const thumb = sessionStorage.getItem('thumb_' + messageId);
        if (thumb) {
          content = `<div class="video-thumbnail-wrapper" data-message-id="${messageId}">
                       <img src="${thumb}" alt="Video thumbnail" style="display:block;" />
                       <div class="play-overlay">
                         <svg viewBox="0 0 48 48" width="36" height="36">
                           <circle cx="24" cy="24" r="22" fill="rgba(var(--shadow-dark-rgb), 0.45)" stroke="var(--text)" stroke-width="1.5"/>
                           <polygon points="19,15 19,33 33,24" fill="var(--text)"/>
                         </svg>
                       </div>
                     </div>`;
        } else {
          content = t('video_sent');
        }
      }
  } else {
          // Ricevuto: crea wrapper per thumbnail (l'immagine verrà caricata in modo asincrono)
      content = `
        <div class="video-thumbnail-wrapper" data-message-id="${messageId}">
          <img src="" alt="Video thumbnail" style="display:none;" />
          <div class="play-overlay">
            <svg viewBox="0 0 48 48" width="36" height="36">
              <circle cx="24" cy="24" r="22" fill="rgba(var(--shadow-dark-rgb), 0.45)" stroke="var(--text)" stroke-width="1.5"/>
              <polygon points="19,15 19,33 33,24" fill="var(--text)"/>
            </svg>
          </div>
        </div>`;
  }

  const expiryInfo = direction === 'received' ? formatExpiryInfo(expiresAt) : '';
  const readStatusSpan = renderReadStatus(direction, null);
  const metaHTML = `<span class="speaker-icon" title="Ascolta" style="display:none"></span><span>${expiryInfo} ${readStatusSpan}</span>`;

  appendMessageToContainer({
    containerId,
    direction,
    messageId,
    expiresAt,
    senderName,
    contentHTML: content,
    metaHTML,
    isEncrypted: isEncrypted,
  });

  // Per i messaggi ricevuti, avvia il caricamento asincrono della thumbnail
  if (direction === 'received') {
    loadVideoThumbnail(messageId);
  }
}

/**
 * Carica in modo asincrono la thumbnail di un video ricevuto e la mostra nel wrapper.
 * Se la thumbnail non è disponibile, mostra un fallback con sfondo scuro.
 * @param {string} messageId 
 */
async function loadVideoThumbnail(messageId) {
  const wrapper = document.querySelector(`.video-thumbnail-wrapper[data-message-id="${messageId}"]`);
  if (!wrapper) return;

  const img = wrapper.querySelector('img');
  if (!img) return;

  // Se già in cache, mostra subito
  const cachedThumb = lruGet(receivedVideoThumbnailCache, messageId);
  if (cachedThumb) {
    img.src = cachedThumb;
    img.style.display = 'block';
    return;
  }

  // Recupera il payload cifrato (oggetto {video, thumbnail})
  const data = lruGet(receivedVideoCache, messageId);
  if (!data) return;

  try {
    let payload;
    try {
      payload = JSON.parse(data);
    } catch {
      // Vecchio formato? Non dovrebbe più capitare, ma gestiamo
      console.warn('Payload video non è un JSON oggetto per', messageId);
      return;
    }

    if (payload.thumbnail) {
      // Decifra la thumbnail
      if (!ecdhPrivateKey) await loadPrivateKeyIntoMemory();
      if (!ecdhPrivateKey) return;
      const decryptedThumb = await decryptMessage(payload.thumbnail, ecdhPrivateKey);
      // Salva in cache
      lruSet(receivedVideoThumbnailCache, messageId, decryptedThumb, 5);
      // Mostra l'immagine
      img.src = decryptedThumb;
      img.style.display = 'block';
    } else {
      // Nessuna thumbnail generata: mostra un'icona di fallback
      wrapper.classList.add('no-thumbnail');
      const overlay = wrapper.querySelector('.play-overlay');
      if (overlay) overlay.style.background = 'rgba(0,0,0,0.7)';
    }
  } catch (e) {
    console.error('Errore caricamento thumbnail per', messageId, e);
    // Fallback silenzioso: rimane l'overlay senza immagine
    wrapper.classList.add('no-thumbnail');
  }
}

async function autoDecryptAndShowVideo(messageId) {
  const data = lruGet(receivedVideoCache, messageId);
  if (!data) return;

  // Se il dato è già un base64 decifrato (es. vecchio formato già processato), mostralo
  if (typeof data === 'string' && data.startsWith('data:video/')) {
    const placeholder = document.querySelector(
      `.message-item[data-message-id="${messageId}"] .video-placeholder`
    );
    if (placeholder) {
      const videoEl = document.createElement('video');
      videoEl.src = data;
      videoEl.controls = true;
      videoEl.className = 'message-video';
      videoEl.style.maxWidth = '200px';
      videoEl.style.maxHeight = '200px';
      placeholder.replaceWith(videoEl);
    }
    return;
  }

  try {
    // Prova a parsare il payload come JSON (nuovo formato {video, thumbnail})
    let parsed;
    try {
      parsed = JSON.parse(data);
    } catch {
      // Vecchio formato: stringa direttamente cifrata
      parsed = data;
    }

    // Se è un oggetto con il campo 'thumbnail', significa che abbiamo una thumbnail.
    // In questa fase NON decifrare il video; lascia il placeholder.
    // La visualizzazione della thumbnail sarà implementata nella Fase 4.
    if (typeof parsed === 'object' && parsed.thumbnail) {
      // Per ora non fare nulla: il placeholder rimane.
      // In Fase 4 sostituiremo il placeholder con l'anteprima dell'immagine.
      return;
    }

    // Se non c'è thumbnail (vecchio formato), procedi come prima decifrando il video
    let videoCiphertext = parsed;
    if (typeof parsed === 'object' && parsed.video) {
      // payload oggetto ma senza thumbnail? Caso anomalo, estrai il video
      videoCiphertext = parsed.video;
    }

    if (!ecdhPrivateKey) await loadPrivateKeyIntoMemory();
    if (!ecdhPrivateKey) return;

    const decrypted = await decryptMessage(videoCiphertext, ecdhPrivateKey);
    lruSet(receivedVideoCache, messageId, decrypted, 5);

    const placeholder = document.querySelector(
      `.message-item[data-message-id="${messageId}"] .video-placeholder`
    );
    if (placeholder) {
      const videoEl = document.createElement('video');
      videoEl.src = decrypted;
      videoEl.controls = true;
      videoEl.className = 'message-video';
      videoEl.style.maxWidth = '200px';
      videoEl.style.maxHeight = '200px';
      placeholder.replaceWith(videoEl);
    }
  } catch (e) {
    console.error('Decifratura automatica video fallita per', messageId, e);
  }
}

function displayImageMessage(
  direction,
  messageId,
  expiresAt = null,
  containerId = 'messages-list',
  senderName = null,
  isEncrypted = false
) {
  let content = '';
  if (direction === 'sent') {
    const cached = sentImageCache.get(messageId);
    if (cached) {
      content = `<img src="${escapeHtml(cached)}" class="message-image" alt="${t('lightbox_image_alt')}" />`;
    } else {
      content = t('image_sent');
    }
  } else {
    // Ricevuto: wrapper con spinner, l'immagine verrà decifrata subito dopo
    content = `
      <div class="encrypted-image-wrapper" data-message-id="${messageId}">
        <img src="" alt="${t('lightbox_image_alt')}" class="message-image" style="display:none;" />
        <div class="spinner"></div>
      </div>`;
  }

  const expiryInfo = direction === 'received' ? formatExpiryInfo(expiresAt) : '';
  const readStatusSpan = renderReadStatus(direction, null);
  const metaHTML = `<span class="speaker-icon" title="Ascolta">🔊</span><span>${expiryInfo} ${readStatusSpan}</span>`;

  appendMessageToContainer({
    containerId,
    direction,
    messageId,
    expiresAt,
    senderName,
    contentHTML: content,
    metaHTML,
    isEncrypted: isEncrypted,
  });

  // Se è un messaggio ricevuto, avvia la decifratura automatica dell'immagine
  if (direction === 'received') {
    decryptAndShowImage(messageId);
  }
}

async function loadProfile() {
  saveUIState({ view: 'profile' });
  document.getElementById('main-content').style.display = '';
  hideFab();
  if (window.timerInterval) {
    clearInterval(window.timerInterval);
    window.timerInterval = null;
  }
  try {
    const res = await apiCall('/auth/me');
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Errore');
    currentUser = data;
    settingsUsername.value = data.username;
    populateLanguageSelect(settingsLanguage, data.language_code);

    // Avatar
    originalAvatar = data.avatar;
    if (data.avatar) {
      avatarDataUrl = data.avatar;
      avatarPreview.src = data.avatar;
      avatarPreview.style.display = 'block';
      avatarRemoveBtn.style.display = 'inline-block';
    } else {
      avatarDataUrl = null;
      avatarPreview.src = '';
      avatarPreview.style.display = 'none';
      avatarRemoveBtn.style.display = 'none';
    }
    populateVoiceSelect(data.preferred_voice || '', data.language_code);
    const currentTheme = getCurrentTheme();
    const themeSelect = document.getElementById('settings-theme');
    if (themeSelect) themeSelect.value = currentTheme;
    const beepSelect = document.getElementById('settings-beep');
    const ephemeralDefaultCheckbox = document.getElementById('settings-ephemeral-default');
    if (ephemeralDefaultCheckbox) {
      ephemeralDefaultCheckbox.checked = currentUser.ephemeralDefault || false;
    }
    if (beepSelect) {
      beepSelect.value = data.recording_beep || 'pop';
    }

    // Mostra fingerprint E2E
    const fingerprintEl = document.getElementById('e2e-fingerprint-self');
    if (fingerprintEl && data.public_key) {
      try {
        const tempPubId = await importPublicKey(data.public_key);
        const fp = await getPublicKeyFingerprint(tempPubId);
        fingerprintEl.textContent = t('e2e_fingerprint_self') + ' ' + fp;
        fingerprintEl.style.display = 'block';
      } catch (e) {
        fingerprintEl.style.display = 'none';
      }
    } else if (fingerprintEl) {
      fingerprintEl.style.display = 'none';
    }

    // Mostra il pannello profilo dentro main-content
    document.getElementById('contacts-list').style.display = 'none';
    document.getElementById('chat-container').style.display = 'none';
    document.getElementById('profile-panel').style.display = 'block';
    document.getElementById('profile-panel').scrollTop = 0;
    // Mostra il pulsante admin se l'utente è amministratore
    const adminPanelGroup = document.getElementById('admin-panel-group');
    if (adminPanelGroup) {
      adminPanelGroup.style.display = data.isAdmin ? 'flex' : 'none';
    }
  } catch (e) {
    if (e.message !== 'Sessione scaduta') {
      alert(t('error_profile_load'));
    }
  }
    const changePasswordBtn = document.getElementById('change-password-btn');
  if (changePasswordBtn) {
    // Rimuovi eventuali listener precedenti per evitare duplicati
    const newBtn = changePasswordBtn.cloneNode(true);
    changePasswordBtn.parentNode.replaceChild(newBtn, changePasswordBtn);
    newBtn.addEventListener('click', () => {
      document.getElementById('change-password-modal').classList.remove('hidden');
      document.getElementById('current-password').value = '';
      document.getElementById('new-password').value = '';
      document.getElementById('confirm-password').value = '';
      document.getElementById('change-password-error').textContent = '';
      document.getElementById('change-password-success').textContent = '';
      document.getElementById('change-password-success').style.display = 'none';
    });
  }
}

settingsLanguage.addEventListener('change', () => {
  const newLang = settingsLanguage.value;
  // Resetta la selezione voce e ripopola con le voci della nuova lingua
  settingsVoice.value = '';
  populateVoiceSelect('', newLang);
});

document.getElementById('settings-theme').addEventListener('change', (e) => {
  setTheme(e.target.value);
});

async function checkAuth() {
  const token = getAccessToken();
  if (!token) {
    showAuthScreen();
    return;
  }

  // Prova a contattare il server con il token esistente
  let res = await fetch(`${API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  // Se 401, tenta il refresh
  if (res.status === 401) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      res = await fetch(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${newToken}` },
      });
    }
  }

  if (res && res.ok) {
    showMainScreen();
  } else {
    // Refresh fallito o token invalido: cancella e mostra login
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    showAuthScreen();
  }
}

// Login
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      alert(data.error || t('error_login_failed'));
      return;
    }
    saveTokens(data.accessToken, data.refreshToken);
    sessionStorage.removeItem('uiState'); // ← forza atterraggio su rubrica
    showMainScreen();
  } catch (err) {
    alert(t('error_network'));
  }
});

// Navigation
navChats.addEventListener('click', () => {
  if (window.timerInterval) {
    clearInterval(window.timerInterval);
    window.timerInterval = null;
  }
  showChatsList();
});

navContacts.addEventListener('click', () => {
  if (window.timerInterval) {
    clearInterval(window.timerInterval);
    window.timerInterval = null;
  }
  showContactsList();
});

navProfile.addEventListener('click', () => {
  notifyChatClosed();
  if (window.timerInterval) {
    clearInterval(window.timerInterval);
    window.timerInterval = null;
  }
  navProfile.classList.add('active');
  navContacts.classList.remove('active');
  navTranslate.classList.remove('active');
  navChats.classList.remove('active');
  hideAllPanels();
  document.getElementById('profile-panel').style.display = 'block';
  loadProfile();
  setTimeout(() => startTour('profile'), 400);
});

document.getElementById('nav-translate').addEventListener('click', () => {
  if (window.timerInterval) {
    clearInterval(window.timerInterval);
    window.timerInterval = null;
  }
  navTranslate.classList.add('active');
  navContacts.classList.remove('active');
  navProfile.classList.remove('active');
  navChats.classList.remove('active');
  hideAllPanels();
  document.getElementById('main-content').style.display = 'none';
  hideFab();
  document.getElementById('translate-panel').style.display = 'flex';
  setupTranslatePanel();
  saveUIState({ view: 'translator' });
  setTimeout(() => startTour('translator'), 400);
});

// Settings

saveSettingsBtn.addEventListener('click', async () => {
  settingsError.textContent = '';
  settingsSuccess.textContent = '';
  const newUsername = settingsUsername.value.trim();
  const language_code = settingsLanguage.value;
  const flag = LANGUAGES.find((l) => l.code === language_code).flag;
  const preferred_voice = settingsVoice.value;

  const body = { language_code, flag, preferred_voice };
  body.ephemeralDefault = document.getElementById('settings-ephemeral-default').checked;
  if (avatarDataUrl !== originalAvatar) {
    body.avatar = avatarDataUrl || null;
  }
  body.recording_beep = document.getElementById('settings-beep').value;

  if (newUsername !== currentUser.username) {
    body.username = newUsername;
  }

  try {
    const res = await apiCall('/auth/me', {
      method: 'PUT',
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) {
      if (data.errors && Array.isArray(data.errors)) {
        settingsError.textContent = data.errors.map((e) => e.msg).join(', ');
      } else {
        settingsError.textContent = data.error || 'Errore salvataggio';
      }
      return;
    }
    if (data.accessToken && data.refreshToken) {
      saveTokens(data.accessToken, data.refreshToken);
    }
    const previousLanguage = currentUser.language_code;
    currentUser = {
      ...currentUser,
      username: data.username,
      name: data.name,
      language_code: data.language_code,
      flag: data.flag,
      has_api_key: data.has_api_key,
      preferred_voice: data.preferred_voice,
      avatar: data.avatar,
      recording_beep: data.recording_beep,
    };
    if (data.language_code !== previousLanguage) {
      const uiLang = data.language_code.split('-')[0];
      setUILanguage(uiLang);
      applyTranslations();
      await loadProfile();
    }
    document.getElementById('nav-chats').click();
    return;
  } catch (err) {
    settingsError.textContent = err.message;
  }
});

document.getElementById('close-change-password-modal').addEventListener('click', () => {
  document.getElementById('change-password-modal').classList.add('hidden');
});

document.getElementById('submit-change-password').addEventListener('click', async () => {
  const currentPassword = document.getElementById('current-password').value;
  const newPassword = document.getElementById('new-password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  const errorEl = document.getElementById('change-password-error');
  const successEl = document.getElementById('change-password-success');

  errorEl.textContent = '';
  successEl.textContent = '';
  successEl.style.display = 'none';

  if (!currentPassword || !newPassword || !confirmPassword) {
    errorEl.textContent = 'Tutti i campi sono obbligatori';
    return;
  }
  if (newPassword !== confirmPassword) {
    errorEl.textContent = 'Le nuove password non coincidono';
    return;
  }
  if (newPassword.length < 4) {
    errorEl.textContent = 'Nuova password di almeno 4 caratteri';
    return;
  }

  try {
    const res = await apiCall('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    const data = await res.json();
    if (!res.ok) {
      if (data.errors && Array.isArray(data.errors)) {
        errorEl.textContent = data.errors.map((e) => e.msg).join(', ');
      } else {
        errorEl.textContent = data.error || 'Errore cambio password';
      }
      return;
    }
    successEl.textContent = 'Password aggiornata con successo';
    successEl.style.display = 'block';
    setTimeout(() => {
      document.getElementById('change-password-modal').classList.add('hidden');
    }, 1500);
  } catch (err) {
    errorEl.textContent = 'Errore di rete';
  }
});

document.getElementById('delete-account').addEventListener('click', async () => {
  if (
    !confirm(
      'Sei sicuro di voler eliminare definitivamente il tuo account? Questa azione è irreversibile.'
    )
  )
    return;

  try {
    const res = await apiCall('/auth/me', { method: 'DELETE' });
    const data = await res.json();
    if (!res.ok) {
      alert(data.error || t('error_delete_account'));
      return;
    }
    alert(data.message);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    showAuthScreen();
  } catch (err) {
    alert(t('error_network'));
  }
});

document.getElementById('regenerate-keys-btn').addEventListener('click', async () => {
  if (!confirm(t('confirm_regenerate_keys'))) return;
  try {
    clearPrivateKey();
    const keyPair = await generateKeyPair();
    const privateJwk = await exportPrivateKey(keyPair.privateKey);
    savePrivateKey(privateJwk);
    const publicJwk = await exportPublicKey(keyPair.publicKey);
    await apiCall('/auth/me', {
      method: 'PUT',
      body: JSON.stringify({ public_key: publicJwk }),
    });
    alert(t('keys_regenerated'));
    await loadPrivateKeyIntoMemory();
    // Ricarica il profilo per mostrare il nuovo fingerprint
    await loadProfile();
  } catch (e) {
    alert(t('error_key_regeneration'));
  }
});

// ========== CONTACTS ==========

async function fetchContacts() {
  const res = await apiCall('/contacts');
  if (!res.ok) throw new Error('Errore caricamento contatti');
  const data = await res.json();
  return data.contacts;
}

async function renderContacts() {
  try {
    const contacts = await fetchContacts();
    const accepted = contacts.filter((c) => c.status === 'accepted');
    const pendingIn = contacts.filter(
      (c) => c.status === 'pending' && String(c.contact_id) === String(currentUser?.id)
    );
    const pendingOut = contacts.filter(
      (c) => c.status === 'pending' && String(c.requested_by) === String(currentUser?.id)
    );

    const container = document.getElementById('contacts-list-inner');
    if (!container) return;
    container.innerHTML = `
      ${
        pendingIn.length > 0
          ? `
        <div class="section-title">${t('requests_in')}</div>
        ${pendingIn.map((c) => renderContactItem(c, true)).join('')}
      `
          : ''
      }
      ${
        pendingOut.length > 0
          ? `
        <div class="section-title">${t('requests_out')}</div>
        ${pendingOut.map((c) => renderContactItem(c, false)).join('')}
      `
          : ''
      }
        ${accepted.length > 0 ? accepted.map((c) => renderContactItem(c, false)).join('') : '<p style="text-align:center;color:var(--text-secondary);padding:20px;">' + t('no_contacts') + '</p>'}
    `;

    applyTranslations();
    document.querySelectorAll('#contacts-list-inner .btn-accept').forEach((btn) => {
      btn.addEventListener('click', acceptContact);
    });
  } catch (e) {
    console.error('Errore in renderContacts:', e);
    if (e.message !== 'Sessione scaduta') {
      const container = document.getElementById('contacts-list-inner');
      if (container) container.innerHTML = '<p class="error">' + t('error_contact_load') + '</p>';
    }
  }
}

async function acceptContact(e) {
  const id = e.target.dataset.id;
  try {
    const res = await apiCall(`/contacts/accept/${id}`, { method: 'PUT' });
    if (!res.ok) {
      const data = await res.json();
      alert(data.error);
      return;
    }
    renderContacts();
  } catch (err) {
    alert(t('error_generic'));
  }
}

function formatPreview(lastMessage) {
  if (!lastMessage) return '';
  switch (lastMessage.type) {
    case 'image':
      return `<span class="chat-preview"><span class="chat-preview-icon">🖼️</span>Immagine</span>`;
    case 'video':
      return `<span class="chat-preview"><span class="chat-preview-icon">🎬</span>Video</span>`;
    case 'voice_note':
      return `<span class="chat-preview"><span class="chat-preview-icon"></span>${t('local_notification_voice_note')}</span>`;
    default:
      const text = lastMessage.text || '';
      const truncated = text.length > 30 ? text.substring(0, 30) + '…' : text;
      return `<span class="chat-preview">${escapeHtml(truncated)}</span>`;
  }
}

async function decryptPreviewText(encryptedPayload) {
  if (!ecdhPrivateKey) await loadPrivateKeyIntoMemory();
  if (!ecdhPrivateKey) return null;
  try {
    const decrypted = await decryptMessage(JSON.parse(encryptedPayload), ecdhPrivateKey);
    return decrypted;
  } catch (e) {
    console.error('Preview decryption failed', e);
    return null;
  }
}

function renderChatBanner(chat) {
  const other = chat.other_user;
  const avatarHtml = renderAvatarHtml(other);
  const safeUsername = escapeHtml(other.username);
  const displayName = formatDisplayName(safeUsername);
  const safeFlag = other.flag || '🏴‍☠️';
  const role = other.has_api_key ? t('role_keyholder') : t('role_guest');
  const onlineClass = getOnlineClass(other.id);
  const showPreview = chat.last_message && !chat.last_message.is_mine;
  const previewHtml = showPreview ? formatPreview(chat.last_message) : '';

  return `
    <div class="contact-item chat-item" data-contact-id="${other.id}" data-contact-name="${safeUsername}">
      <div class="contact-info">
        ${avatarHtml}
        <span class="presence-dot ${onlineClass}"></span>
        <div class="contact-details">
          <div class="contact-name-row">
            <span class="contact-name" title="${safeUsername}">${displayName}</span>
            <span class="contact-role">${role}</span>
          </div>
          ${previewHtml}
        </div>
        <span class="contact-flag">${safeFlag}</span>
      </div>
    </div>
  `;
}

function renderContactItem(contact, isPendingIn) {
  const other = contact.other_user;
  const role = other.has_api_key ? t('role_keyholder') : t('role_guest');
  let actions = '';
  if (isPendingIn) {
    actions =
      `<button class="btn-small btn-accept" data-id="${contact.id}">` +
      t('btn_accept') +
      `</button>`;
  }

  const badge =
    contact.status === 'pending' && !isPendingIn
      ? ' <span class="pending-badge">' + t('pending_badge') + '</span>'
      : '';

  const avatarHtml = renderAvatarHtml(other);
  const safeUsername = escapeHtml(other.username);
  const displayName = formatDisplayName(safeUsername);
  const safeFlag = other.flag || '🏴‍☠️';

  const onlineClass = getOnlineClass(other.id);

  return `
    <li class="contact-item" data-contact-id="${other.id}" data-relation-id="${contact.id}" data-contact-name="${safeUsername}" data-status="${contact.status}">
      <div class="contact-info">
        ${avatarHtml}
        <span class="presence-dot ${onlineClass}"></span>
        <div class="contact-details">
          <div class="contact-name-row">
            <span class="contact-name" title="${safeUsername}">${displayName}</span>
            <span class="contact-role">${role}</span>
            ${badge}
          </div>
        </div>
        <span class="contact-flag">${safeFlag}</span>
      </div>
      <div class="contact-actions">${actions}</div>
    </li>
  `;
}

// ========== NEW CHAT & CONTACTS MODALS ==========

function renderContactListForModal(container, contacts) {
  container.innerHTML = '';
  if (contacts.length === 0) {
    container.innerHTML = `<p style="text-align:center;color:var(--text-secondary);padding:20px;">${t('no_contacts')}</p>`;
    return;
  }
  contacts.forEach((contact) => {
    const other = contact.other_user;
    const role = other.has_api_key ? t('role_keyholder') : t('role_guest');
    const avatarHtml = renderAvatarHtml(other);
    const safeUsername = escapeHtml(other.username);
    const displayName = formatDisplayName(safeUsername);
    const safeFlag = other.flag || '🏴‍☠️';
    const safeLanguageCode = escapeHtml(other.language_code);
    const onlineClass = getOnlineClass(other.id);
    const item = document.createElement('div');
    item.className = 'modal-contact-item';
    item.dataset.contactId = other.id;
    item.dataset.relationId = contact.id;
    item.dataset.contactName = other.username;
    item.innerHTML = `
      <div class="contact-info">
        ${avatarHtml}
        <span class="presence-dot ${onlineClass}"></span>
        <div class="contact-details">
          <div class="contact-name-row">
            <span class="contact-name" title="${safeUsername}">${displayName}</span>
            <span class="contact-flag">${safeFlag}</span>
          </div>
          <span class="contact-role">${role} · ${safeLanguageCode}</span>
        </div>
      </div>
    `;
    container.appendChild(item);
  });
}

async function openNewChatModal() {
  const contacts = await fetchContacts();
  const accepted = contacts.filter((c) => c.status === 'accepted');
  renderContactListForModal(newChatList, accepted);
  newChatModal.classList.remove('hidden');

  // Aggiungi evento click su ogni contatto nella lista
  newChatList.querySelectorAll('.modal-contact-item').forEach((item) => {
    item.addEventListener('click', () => {
      const contactId = item.dataset.contactId;
      const contactName = item.dataset.contactName;
      if (contactId && contactName) {
        closeNewChatModal();
        openChat(contactId, contactName);
      }
    });
  });
}

async function openGroupChatModal() {
  const contacts = await fetchContacts();
  const accepted = contacts.filter((c) => c.status === 'accepted');
  const myLang = currentUser?.language_code;
  const onlineAccepted = accepted.filter((c) => {
    const other = c.other_user;
    return getOnlineClass(other.id) === 'online' && other.language_code === myLang;
  });
  const list = document.getElementById('group-chat-contact-list');
  if (!list) return;
  list.innerHTML = '';
  if (onlineAccepted.length === 0) {
    document.getElementById('group-error').textContent = t('group_error_no_contacts_online');
    document.getElementById('group-error').style.display = 'block';
  } else {
    document.getElementById('group-error').style.display = 'none';
    onlineAccepted.forEach((contact) => {
      const other = contact.other_user;
      const role = other.has_api_key ? t('role_keyholder') : t('role_guest');
      const avatarHtml = renderAvatarHtml(other);
      const safeUsername = escapeHtml(other.username);
      const displayName = formatDisplayName(safeUsername);
      const safeFlag = other.flag || '🏴‍☠️';
      const safeLanguageCode = escapeHtml(other.language_code);
      const onlineClass = getOnlineClass(other.id);
      const div = document.createElement('div');
      div.className = 'modal-contact-item';
      div.dataset.contactId = other.id;
      div.innerHTML = `
        <input type="checkbox" class="group-member-checkbox" value="${other.id}" />
        <div class="contact-info">
          ${avatarHtml}
          <span class="presence-dot ${onlineClass}"></span>
          <div class="contact-details">
            <div class="contact-name-row">
              <span class="contact-name" title="${safeUsername}">${displayName}</span>
              <span class="contact-flag">${safeFlag}</span>
            </div>
            <span class="contact-role">${role} · ${safeLanguageCode}</span>
          </div>
        </div>
      `;
      list.appendChild(div);
    });
  }
  document.getElementById('group-chat-modal').classList.remove('hidden');

  list.querySelectorAll('.modal-contact-item').forEach((item) => {
    item.addEventListener('click', (e) => {
      if (e.target.tagName !== 'INPUT') {
        const cb = item.querySelector('input[type="checkbox"]');
        if (cb) cb.checked = !cb.checked;
      }
    });
  });
}

document.getElementById('close-group-chat-modal').addEventListener('click', () => {
  document.getElementById('group-chat-modal').classList.add('hidden');
});

document.getElementById('create-group-btn').addEventListener('click', () => {
  const checkboxes = document.querySelectorAll('.group-member-checkbox:checked');
  const contactIds = Array.from(checkboxes).map((cb) => cb.value);
  if (contactIds.length === 0) {
    document.getElementById('group-error').textContent = t('group_error_select_contact');
    document.getElementById('group-error').style.display = 'block';
    return;
  }
  socket.emit('create_group', { contactIds });
  document.getElementById('group-chat-modal').classList.add('hidden');
});

document.getElementById('close-group-chat-modal').addEventListener('click', () => {
  document.getElementById('group-chat-modal').classList.add('hidden');
});

document.getElementById('create-group-btn').addEventListener('click', () => {
  const checkboxes = document.querySelectorAll('.group-member-checkbox:checked');
  const contactIds = Array.from(checkboxes).map((cb) => cb.value);
  if (contactIds.length === 0) {
    document.getElementById('group-error').textContent = t('group_error_select_contact');
    document.getElementById('group-error').style.display = 'block';
    return;
  }
  socket.emit('create_group', { contactIds });
  document.getElementById('group-chat-modal').classList.add('hidden');
});

function closeNewChatModal() {
  newChatModal.classList.add('hidden');
  newChatList.innerHTML = '';
}

// ==================== TERMS MODAL LOGIC ====================
function setupTermsModal() {
  const modal = document.getElementById('terms-modal');
  const termsText = document.getElementById('terms-text');
  const checkbox = document.getElementById('terms-checkbox');
  const confirmBtnOriginal = document.getElementById('terms-confirm-btn');
  const cancelBtn = document.getElementById('terms-cancel-btn');

  if (!modal || !termsText || !checkbox || !confirmBtnOriginal || !cancelBtn) return;

  // Rimuovi marker precedente
  const oldMarker = document.getElementById('terms-end-marker');
  if (oldMarker) oldMarker.remove();

  // Aggiungi marker alla fine del testo
  const marker = document.createElement('div');
  marker.id = 'terms-end-marker';
  marker.style.height = '1px';
  marker.style.width = '1px';
  marker.style.opacity = '0';
  marker.style.pointerEvents = 'none';
  termsText.appendChild(marker);

  // Disconnetti vecchio osservatore
  if (window.termsObserver) window.termsObserver.disconnect();

  // Osservatore per abilitare checkbox quando marker visibile
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && checkbox.disabled) {
        checkbox.disabled = false;
        observer.disconnect();
      }
    });
  }, { threshold: 0.1, root: termsText });
  observer.observe(marker);
  window.termsObserver = observer;

  // Clona il pulsante conferma per rimuovere vecchi listener
  const newConfirmBtn = confirmBtnOriginal.cloneNode(true);
  confirmBtnOriginal.parentNode.replaceChild(newConfirmBtn, confirmBtnOriginal);
  const finalConfirmBtn = document.getElementById('terms-confirm-btn');

  // Listener change checkbox: abilita/disabilita il pulsante finale
  const onCheckboxChange = () => {
    finalConfirmBtn.disabled = !checkbox.checked;
  };
  checkbox.removeEventListener('change', onCheckboxChange);
  checkbox.addEventListener('change', onCheckboxChange);

  // Pulsante annulla
  const onCancel = () => {
    modal.classList.add('hidden');
    checkbox.checked = false;
    checkbox.disabled = true;
    finalConfirmBtn.disabled = true;
    termsText.scrollTop = 0;
    if (window.termsObserver) window.termsObserver.disconnect();
  };
  cancelBtn.removeEventListener('click', onCancel);
  cancelBtn.addEventListener('click', onCancel);

  // Pulsante conferma: azione di registrazione
  finalConfirmBtn.addEventListener('click', async () => {
    if (finalConfirmBtn.disabled) return;

    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;
    const language_code = document.getElementById('reg-language').value;
    const flag = languageFlags[language_code] || '🏴‍☠️';
    const api_key = document.getElementById('reg-api-key').value || undefined;

    if (!username || !password || !language_code) {
      alert(t('alert_fill_all_fields'));
      return;
    }

    modal.classList.add('hidden');
    // Resetta i flag di primo accesso e stato UI per il nuovo utente
    localStorage.removeItem('gotyou_first_access_done');
    sessionStorage.removeItem('uiState');
    // Richiedi subito il permesso notifiche (prima della chiamata di registrazione)
    let pushSubscriptionReady = null;
    if ('Notification' in window && 'serviceWorker' in navigator) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        try {
          const registration = await navigator.serviceWorker.ready;
          let subscription = await registration.pushManager.getSubscription();
          if (!subscription) {
            const resVapid = await fetch(`${API_URL}/auth/vapid-public-key`);
            const vapidData = await resVapid.json();
            const publicKey = vapidData.publicKey;
            if (publicKey) {
              subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlB64ToUint8Array(publicKey),
              });
            }
          }
          if (subscription) {
            pushSubscriptionReady = subscription;
          }
        } catch (e) {
          console.error('Errore preparazione subscription:', e);
        }
      }
    }
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, language_code, flag, api_key }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.errors && Array.isArray(data.errors)) {
          const messages = data.errors.map((e) => `• ${e.msg}`).join('\n');
          alert(messages);
        } else {
          alert(data.error || t('error_register_failed'));
        }
        return;
      }
      // Imposta la lingua UI sulla lingua scelta dall'utente
      const selectedLangCode = document.getElementById('reg-language').value;
      const uiLang = selectedLangCode.split('-')[0]; // 'it', 'en', ...
      setUILanguage(uiLang);
      applyTranslations(); // aggiorna l'interfaccia
      if (pushSubscriptionReady) {
        try {
          await fetch(`${API_URL}/auth/pending-subscription`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, subscription: pushSubscriptionReady }),
          });
        } catch (e) {
          console.error('Errore salvataggio subscription pending:', e);
        }
      }
      alert(t('registration_pending'));
      document.getElementById('show-login').click();
    } catch (err) {
      alert(t('error_network'));
    }
    // Reset finale
    checkbox.checked = false;
    checkbox.disabled = true;
    finalConfirmBtn.disabled = true;
    termsText.scrollTop = 0;
  });
}

// Listener del form di registrazione
registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const modal = document.getElementById('terms-modal');
  const termsTextDiv = document.getElementById('terms-text');
  const checkbox = document.getElementById('terms-checkbox');
  const confirmBtn = document.getElementById('terms-confirm-btn');
  const cancelBtn = document.getElementById('terms-cancel-btn');

  if (modal && termsTextDiv && checkbox && confirmBtn && cancelBtn) {
    // Legge la lingua selezionata nel form di registrazione
    const selectedLang = document.getElementById('reg-language').value.split('-')[0]; // 'it', 'en'...
    // Salva la lingua UI corrente per ripristinarla solo in caso di annullamento
    const previousUILang = currentUILanguage;
    // Imposta la lingua UI su quella selezionata
    setUILanguage(selectedLang);
    // Applica traduzioni a tutto l'interfaccia (modale compreso)
    applyTranslations();

    // Imposta il testo tradotto dei termini
    termsTextDiv.textContent = t('terms_text');
    // Resetta lo scroll
    setTimeout(() => { termsTextDiv.scrollTop = 0; }, 10);
    // Resetta stati
    checkbox.checked = false;
    checkbox.disabled = true;
    confirmBtn.disabled = true;
    // Ricrea marker e observer
    setupTermsModal();
    // Mostra il modale
    modal.classList.remove('hidden');

    // Funzione per ripristinare la lingua originale e chiudere il modale
    const restoreAndClose = () => {
      setUILanguage(previousUILang);
      applyTranslations();
      modal.classList.add('hidden');
      checkbox.checked = false;
      checkbox.disabled = true;
      confirmBtn.disabled = true;
      termsTextDiv.scrollTop = 0;
      if (window.termsObserver) window.termsObserver.disconnect();
      // Rimuovi i listener per evitare duplicati
      cancelBtn.removeEventListener('click', restoreAndClose);
      modal.removeEventListener('click', backdropHandler);
    };

    // Gestore per click sul backdrop (solo sull'overlay, non sul contenuto)
    const backdropHandler = (event) => {
      if (event.target === modal) {
        restoreAndClose();
      }
    };

    // Listener per il pulsante Annulla
    cancelBtn.addEventListener('click', restoreAndClose);
    // Listener per il backdrop
    modal.addEventListener('click', backdropHandler);
  }
});

// ========== GESTIONE CHIAVI API ==========

async function loadApiKeys() {
  try {
    const res = await apiCall('/auth/keys');
    if (!res.ok) return [];
    const data = await res.json();
    return data.keys || [];
  } catch (e) {
    return [];
  }
}

async function addApiKey(apiKey) {
  const res = await apiCall('/auth/keys', {
    method: 'POST',
    body: JSON.stringify({ api_key: apiKey }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Errore aggiunta chiave');
  }
  return await res.json();
}

async function deleteApiKey(keyId) {
  const res = await apiCall(`/auth/keys/${keyId}`, { method: 'DELETE' });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Errore eliminazione chiave');
  }
  return await res.json();
}

async function openApiKeysModal() {
  document.getElementById('api-keys-modal').classList.remove('hidden');
  const list = document.getElementById('api-keys-list');
  list.innerHTML = '';

  try {
    const keys = await loadApiKeys();
    if (keys.length === 0) {
      list.innerHTML =
        '<li style="text-align:center;color:var(--text-secondary);padding:10px;">' +
        t('no_api_keys') +
        '</li>';
    } else {
      keys.forEach((key) => {
        const li = document.createElement('li');
        li.className = 'api-key-item';
        li.innerHTML = `
          <span class="key-last8">...${escapeHtml(key.last_8)}</span>
          <button class="btn-small btn-danger delete-key-btn" data-id="${key.id}">${t('btn_remove')}</button>
        `;
        list.appendChild(li);
      });
      // Listener per eliminare
      document.querySelectorAll('.delete-key-btn').forEach((btn) => {
        btn.addEventListener('click', async (e) => {
          const id = e.target.dataset.id;
          if (confirm(t('confirm_delete_api_key'))) {
            await deleteApiKey(id);
            await openApiKeysModal(); // refresh lista
          }
        });
      });
    }
  } catch (e) {
    list.innerHTML = '<li class="error">Errore caricamento chiavi</li>';
  }
}

function closeApiKeysModal() {
  document.getElementById('api-keys-modal').classList.add('hidden');
  document.getElementById('new-api-key-input').value = '';
}

// Aggiungi listener
document.getElementById('manage-api-keys-btn').addEventListener('click', openApiKeysModal);
document.getElementById('admin-panel-open-btn')?.addEventListener('click', () => {
  showAdminPanel();
});
document.getElementById('close-api-keys-modal').addEventListener('click', closeApiKeysModal);

document.getElementById('add-api-key-btn').addEventListener('click', async () => {
  const input = document.getElementById('new-api-key-input');
  const key = input.value.trim();
  if (!key) return;
  try {
    await addApiKey(key);
    input.value = '';
    await openApiKeysModal(); // refresh lista
  } catch (e) {
    alert(e.message);
  }
});

closeNewChatModalBtn.addEventListener('click', closeNewChatModal);

// Listener globale per il pulsante Logout (ora nel Profilo)
document.addEventListener('DOMContentLoaded', () => {
  // Inizializza pulsante Logout
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      const regApiKey = document.getElementById('reg-api-key');
      if (regApiKey) regApiKey.value = '';
      if (socket) socket.disconnect();
      showAuthScreen();
    });
  }

  // Applica traduzioni e verifica autenticazione
  applyTranslations();
  checkAuth();
  window.addEventListener('popstate', () => {
    // Ricarica la gestione del percorso quando cambia l'URL
    if (currentUser) {
      handleDeepLink();
    }
  });
  window.addEventListener('hashchange', () => {
    if (currentUser) {
      checkHashForAdminPanel();
    }
  });
  // Precariamento audio notifiche: crea contesto ma non riproduce suono
  if (!window.notificationAudioCtx) {
    window.notificationAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
    // Blocca la riproduzione automatica: il contesto parte sospeso
    // Verrà ripreso al primo tocco dell'utente (ad esempio su un pulsante)
  }
  // Aggiunge un listener globale per il primo tocco che riattiva l'audio
  const resumeAudio = () => {
    if (window.notificationAudioCtx && window.notificationAudioCtx.state === 'suspended') {
      window.notificationAudioCtx.resume().catch(e => console.log('Resume manuale fallito:', e));
    }
    document.removeEventListener('click', resumeAudio);
    document.removeEventListener('touchstart', resumeAudio);
  };
  document.addEventListener('click', resumeAudio);
  document.addEventListener('touchstart', resumeAudio);
});

// Pulsante per riavviare il tour
const restartTourBtn = document.getElementById('restart-tour-btn');
if (restartTourBtn) {
  restartTourBtn.addEventListener('click', resetAndRestartTour);
}

async function ensureFreshToken() {
  const token = getAccessToken();
  if (!token) return;
  // Prova a decodificare per vedere se è scaduto
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Date.now() / 1000;
    if (payload.exp - now < 60) {
      // se scade entro 1 minuto
      await refreshAccessToken();
    }
  } catch (e) {
    /* token non valido, ignora */
  }
}

function saveUIState(state) {
  sessionStorage.setItem('uiState', JSON.stringify(state));
}

function handleDeepLink() {
  const urlParams = new URLSearchParams(window.location.search);
  const page = urlParams.get('page');
  if (page === 'admin-requests' && currentUser?.isAdmin) {
    showAdminPanel();
    // Pulisce l'URL senza ricaricare
    history.replaceState({}, document.title, window.location.pathname);
    return true;
  }
  const openChat = urlParams.get('openChat');
  if (openChat) {
    // La funzione openChat verrà chiamata altrove (già presente)
    return true;
  }
  return false;
}

function checkHashForAdminPanel() {
  if (window.location.hash === '#admin-panel' && currentUser?.isAdmin) {
    showAdminPanel();
    // Rimuove l'hash senza ricaricare
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }
}

function loadUIState() {
  const raw = sessionStorage.getItem('uiState');
  return raw ? JSON.parse(raw) : null;
}

// ─── Admin: gestione richieste ─────────────────────────
let adminCurrentPage = 1;
let adminSelectionMode = false;
let adminForceMode = false;
let selectedAdminUserIds = new Set();
let adminLongPressTimer = null;
let adminHasMore = true;
let adminIsLoading = false;
let adminCurrentSearch = '';
let adminFilterInactive = false;

async function loadAdminUsers(resetList = true) {
  const container = document.getElementById('admin-requests-list');
  if (!container) return;
  
  if (resetList) {
    adminCurrentPage = 1;
    adminHasMore = true;
    container.innerHTML = '<div style="text-align:center;padding:20px;">Caricamento...</div>';
  }
  if (adminIsLoading || !adminHasMore) return;
  
  adminIsLoading = true;
  try {
    const params = new URLSearchParams({
      page: adminCurrentPage,
      limit: 10,
      search: adminCurrentSearch,
      filterInactive: adminFilterInactive
    });
    const res = await apiCall(`/admin/users?${params.toString()}`);
    if (!res.ok) throw new Error('Errore caricamento');
    const data = await res.json();
    const users = data.users;
    const totalPages = data.totalPages;
    
    if (resetList) {
      container.innerHTML = '';
    }
    
    if (users.length === 0 && adminCurrentPage === 1) {
      container.innerHTML = `<p style="text-align:center;color:var(--text-secondary);padding:20px;">${t('admin_no_requests')}</p>`;
      adminHasMore = false;
      adminIsLoading = false;
      return;
    }
    
    users.forEach(user => {
      const userDiv = document.createElement('div');
      userDiv.className = 'admin-user-item';
      userDiv.dataset.userId = user.id;
      userDiv.innerHTML = `
        <div class="admin-user-header">
          <span class="admin-user-username">${escapeHtml(user.username)}</span>
            <div class="admin-actions">
              <span class="user-flag">${escapeHtml(user.flag || languageFlags[user.language_code] || '🏴‍☠️')}</span>
              <label class="admin-toggle-label">
                <span>${user.isActive ? t('admin_account_active') : t('admin_account_inactive')}</span>
                <div class="toggle-switch">
                  <input type="checkbox" class="admin-toggle" ${user.isActive ? 'checked' : ''}>
                  <span class="toggle-slider"></span>
                </div>
              </label>
            </div>
        </div>
        <textarea class="admin-note" maxlength="30" data-i18n-placeholder="admin_note_placeholder" placeholder="${t('admin_note_placeholder')}">${escapeHtml(user.adminNote || '')}</textarea>
      `;
      container.appendChild(userDiv);
    });
    
    adminHasMore = adminCurrentPage < totalPages;
    if (adminHasMore) adminCurrentPage++;
    
    // Attacca eventi ai nuovi elementi
    attachAdminItemEvents(container);
    
  } catch (e) {
    if (adminCurrentPage === 1) {
      container.innerHTML = `<p class="error">Errore: ${e.message || t('admin_load_error')}</p>`;
    }
  } finally {
    adminIsLoading = false;
  }
}

// ------------------ Helper per eventi (toggle, nota, elimina) ------------------
function attachAdminItemEvents(container) {
  container.querySelectorAll('.admin-user-item').forEach(item => {
    if (item.dataset.listenerAttached) return;
    item.dataset.listenerAttached = 'true';
    
    const userId = item.dataset.userId;
    const toggle = item.querySelector('.admin-toggle');
    const noteArea = item.querySelector('.admin-note');
    const labelSpan = item.querySelector('.admin-toggle-label span');
    
    // Toggle attivazione/disattivazione
    toggle.addEventListener('change', async () => {
      const isActive = toggle.checked;
      const note = noteArea.value;
      try {
        const res = await apiCall(`/admin/users/${userId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isActive, adminNote: note.slice(0,30) })
        });
        if (!res.ok) throw new Error();
        labelSpan.textContent = isActive ? t('admin_account_active') : t('admin_account_inactive');
      } catch (err) {
        alert(t('admin_delete_error'));
        toggle.checked = !isActive;
      }
    });
    
    // Nota admin con debounce
    let noteTimer;
    noteArea.addEventListener('input', () => {
      clearTimeout(noteTimer);
      noteTimer = setTimeout(async () => {
        const isActive = toggle.checked;
        const note = noteArea.value;
        try {
          await apiCall(`/admin/users/${userId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isActive, adminNote: note.slice(0,30) })
          });
        } catch (err) {
          console.error('Errore salvataggio nota');
        }
      }, 800);
    });
    
    // --- CLICK PER FORCE ADD (nuovo) ---
    item.addEventListener('click', async (e) => {
      if (e.target.closest('.admin-toggle') || e.target.closest('.admin-note')) return;
      if (!adminForceMode) return;
      e.preventDefault();
      
      const userId = item.dataset.userId;
      const username = item.querySelector('.admin-user-username')?.innerText || 'utente';
      
      try {
        const res = await apiCall('/admin/force-add-contact', {
          method: 'POST',
          body: JSON.stringify({ targetUserId: userId })
        });
        if (!res.ok) {
          const err = await res.json();
          alert(err.error || 'Errore durante aggiunta forzata');
          return;
        }
        const data = await res.json();
        const contact = data.contact;
        openChat(contact.other_user.id, contact.other_user.username);
        hideAdminPanel();
      } catch (err) {
        alert('Errore di rete');
      }
    });
    
    // --- Long press per selezione multipla (esistente) ---
    let pressTimer;
    const startPress = (e) => {
      if (adminSelectionMode) return;
      pressTimer = setTimeout(() => {
        enterAdminSelectionMode();
        if (!selectedAdminUserIds.has(userId)) {
          selectedAdminUserIds.add(userId);
          item.classList.add('selected');
          updateAdminSelectionBar();
        }
      }, 500);
    };
    const cancelPress = () => {
      if (pressTimer) {
        clearTimeout(pressTimer);
        pressTimer = null;
      }
    };
    const handleTapInSelectionMode = (e) => {
      if (!adminSelectionMode) return;
      if (e.target.closest('.admin-toggle') || e.target.closest('.admin-note')) return;
      e.preventDefault();
      if (selectedAdminUserIds.has(userId)) {
        selectedAdminUserIds.delete(userId);
        item.classList.remove('selected');
      } else {
        selectedAdminUserIds.add(userId);
        item.classList.add('selected');
      }
      updateAdminSelectionBar();
    };
    
    item.addEventListener('touchstart', startPress, { passive: false });
    item.addEventListener('touchend', cancelPress);
    item.addEventListener('touchmove', cancelPress);
    item.addEventListener('mousedown', startPress);
    item.addEventListener('mouseup', cancelPress);
    item.addEventListener('mousemove', cancelPress);
    item.addEventListener('click', handleTapInSelectionMode);
  });
}

// Modale per notifiche admin
function showAdminNotificationModal(message, onClose) {
  let modal = document.getElementById('admin-notification-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'admin-notification-modal';
    modal.className = 'modal-overlay hidden admin-notification-modal';
    modal.innerHTML = `
      <div class="modal">
        <h3>Service communication</h3>
        <p id="admin-notification-text"></p>
        <button id="admin-notification-ok" class="btn-save">OK</button>
      </div>
    `;
    document.body.appendChild(modal);
  }
  const textP = document.getElementById('admin-notification-text');
  textP.textContent = message;
  modal.classList.remove('hidden');
  
  const okBtn = document.getElementById('admin-notification-ok');
  const oldHandler = okBtn._closeHandler;
  if (oldHandler) okBtn.removeEventListener('click', oldHandler);
  
  const closeHandler = () => {
    modal.classList.add('hidden');
    if (onClose) onClose();
    okBtn.removeEventListener('click', closeHandler);
    okBtn._closeHandler = null;
  };
  okBtn.addEventListener('click', closeHandler);
  okBtn._closeHandler = closeHandler;
}

// Recupera notifiche non lette dal server
async function checkUnreadAdminNotifications() {
  try {
    const res = await apiCall('/notifications/unread');
    if (!res.ok) return;
    const data = await res.json();
    if (data.notifications && data.notifications.length > 0) {
      // Mostra la più recente (o tutte in sequenza)
      for (const notif of data.notifications) {
        await new Promise((resolve) => {
          showAdminNotificationModal(notif.translatedText, () => {
            // Dopo OK, segna come letta
            markAdminNotificationRead(notif.recipientId).then(resolve);
          });
        });
      }
    }
  } catch (err) {
    console.error('Errore recupero notifiche admin:', err);
  }
}

async function markAdminNotificationRead(recipientId) {
  try {
    await apiCall('/notifications/mark-read', {
      method: 'POST',
      body: JSON.stringify({ recipientIds: [recipientId] })
    });
  } catch (err) {
    console.error('Errore marcatura letta:', err);
  }
}

// Ascolta i messaggi dal service worker
function setupAdminNotificationListener() {
  if (!navigator.serviceWorker) return;
  navigator.serviceWorker.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'ADMIN_NOTIFICATION_RECEIVED') {
      // Quando arriva una push, ricarica le notifiche non lette
      checkUnreadAdminNotifications();
    }
  });
}

function setupAdminNotify() {
  const notifyBtn = document.getElementById('admin-notify-all-btn');
  if (!notifyBtn) return;
  
  const modal = document.getElementById('admin-notify-modal');
  const messageTextarea = document.getElementById('admin-notify-message');
  const submitBtn = document.getElementById('admin-notify-submit');
  const cancelBtn = document.getElementById('admin-notify-cancel');
  
  let currentEndpoint = '/admin/notify-all';

  const sameLangBtn = document.getElementById('admin-notify-same-lang-btn');
  if (sameLangBtn) {
    sameLangBtn.addEventListener('click', () => {
      currentEndpoint = '/admin/notify-same-language';
      modal.classList.remove('hidden');
      messageTextarea.value = '';
    });
  }
  
  notifyBtn.addEventListener('click', () => {
    currentEndpoint = '/admin/notify-all';
    modal.classList.remove('hidden');
    messageTextarea.value = '';
  });
  
  cancelBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });
  
  submitBtn.addEventListener('click', async () => {
    const message = messageTextarea.value.trim();
    if (!message) {
      alert(t('admin_notify_empty'));
      return;
    }
    modal.classList.add('hidden');
    showToast('Invio notifica in corso...', 'info');
    
    (async () => {
      try {
        const res = await apiCall(currentEndpoint, {
          method: 'POST',
          body: JSON.stringify({ message })
        });
        if (!res.ok) {
          let errorMsg = 'Errore durante invio notifiche';
          try {
            const errorData = await res.json();
            if (errorData.error) errorMsg = errorData.error;
            if (errorData.details) errorMsg += ` (${errorData.details})`;
          } catch (e) {}
          throw new Error(errorMsg);
        }
        const data = await res.json();
        showToast(`Notifica inviata a ${data.successCount} utenti. Falliti: ${data.failureCount}`, 'success');
      } catch (err) {
        console.error(err);
        showToast(err.message || 'Errore durante invio notifiche', 'error');
      }
    })();
  });
}

function enterAdminSelectionMode() {
  if (adminSelectionMode) return;
  adminSelectionMode = true;
  selectedAdminUserIds.clear();
  // Aggiunge classe selectable a tutti gli item (per stile)
  document.querySelectorAll('.admin-user-item').forEach(item => {
    item.classList.add('selectable');
  });
  createAdminSelectionBar();
}

function exitAdminSelectionMode() {
  adminSelectionMode = false;
  selectedAdminUserIds.clear();
  document.querySelectorAll('.admin-user-item').forEach(item => {
    item.classList.remove('selected', 'selectable');
  });
  const bar = document.getElementById('admin-selection-bar');
  if (bar) bar.remove();
}

function createAdminSelectionBar() {
  // Rimuovi eventuale barra esistente
  const oldBar = document.getElementById('admin-selection-bar');
  if (oldBar) oldBar.remove();
  
  const bar = document.createElement('div');
  bar.id = 'admin-selection-bar';
  bar.className = 'admin-selection-bar';
  bar.innerHTML = `
    <button id="admin-cancel-selection" class="secondary">Annulla</button>
    <button id="admin-delete-selected" class="btn-delete">Elimina selezionati (0)</button>
  `;
  document.body.appendChild(bar);
  
  document.getElementById('admin-cancel-selection').addEventListener('click', () => {
    exitAdminSelectionMode();
  });
  document.getElementById('admin-delete-selected').addEventListener('click', () => {
    const count = selectedAdminUserIds.size;
    if (count === 0) return;
    // Mostra modale di conferma con conteggio
    const modal = document.getElementById('confirm-delete-modal');
    const msgSpan = document.getElementById('confirm-delete-message');
    msgSpan.textContent = `Sei sicuro di voler eliminare ${count} account selezionati? Questa operazione è irreversibile.`;
    modal.classList.remove('hidden');
    
    const confirmOk = document.getElementById('confirm-delete-ok');
    const confirmCancel = document.getElementById('confirm-delete-cancel');
    const handleConfirm = async () => {
      modal.classList.add('hidden');
      try {
        const res = await apiCall('/admin/users/batch', {
          method: 'DELETE',
          body: JSON.stringify({ userIds: Array.from(selectedAdminUserIds) })
        });
        if (!res.ok) {
          const err = await res.json();
          alert(err.error || 'Errore eliminazione');
          return;
        }
        const data = await res.json();
        alert(`Eliminati ${data.deletedCount} account.`);
        exitAdminSelectionMode();
        loadAdminUsers(true); // ricarica lista
      } catch (err) {
        alert('Errore durante eliminazione multipla');
      } finally {
        confirmOk.removeEventListener('click', handleConfirm);
        confirmCancel.removeEventListener('click', handleCancel);
      }
    };
    const handleCancel = () => {
      modal.classList.add('hidden');
      confirmOk.removeEventListener('click', handleConfirm);
      confirmCancel.removeEventListener('click', handleCancel);
    };
    confirmOk.addEventListener('click', handleConfirm);
    confirmCancel.addEventListener('click', handleCancel);
  });
}

function updateAdminSelectionBar() {
  const bar = document.getElementById('admin-selection-bar');
  if (!bar) return;
  const count = selectedAdminUserIds.size;
  const deleteBtn = document.getElementById('admin-delete-selected');
  if (deleteBtn) deleteBtn.textContent = `Elimina selezionati (${count})`;
}

function setupAdminScroll() {
  const listContainer = document.getElementById('admin-requests-list');
  if (!listContainer) return;
  listContainer.addEventListener('scroll', () => {
    if (listContainer.scrollTop + listContainer.clientHeight >= listContainer.scrollHeight - 50) {
      if (!adminIsLoading && adminHasMore) {
        loadAdminUsers(false);
      }
    }
  });
}

function initAdminPanel() {
  const searchInput = document.getElementById('admin-search-input');
  const filterCheckbox = document.getElementById('admin-filter-inactive');
  if (!searchInput || !filterCheckbox) return;
  
  let searchTimeout;
  searchInput.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      adminCurrentSearch = searchInput.value.trim();
      adminFilterInactive = filterCheckbox.checked;
      loadAdminUsers(true);
    }, 300);
  });
  
  filterCheckbox.addEventListener('change', () => {
    adminCurrentSearch = searchInput.value.trim();
    adminFilterInactive = filterCheckbox.checked;
    loadAdminUsers(true);
  });

    const forceModeBtn = document.getElementById('admin-force-mode-btn');
  if (forceModeBtn) {
    forceModeBtn.addEventListener('click', () => {
      adminForceMode = !adminForceMode;
      if (adminForceMode) {
        forceModeBtn.classList.add('force-mode-active');
        forceModeBtn.textContent = t('admin_force_mode_active');
      } else {
        forceModeBtn.classList.remove('force-mode-active');
        forceModeBtn.textContent = t('admin_force_mode_btn');
      }
    });
  }
  
  // Quando si chiude il pannello (pulsante indietro), resetta tutto
  const backBtn = document.getElementById('admin-back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      // reset ricerca e filtro
      searchInput.value = '';
      filterCheckbox.checked = false;
      adminCurrentSearch = '';
      adminFilterInactive = false;
      adminHasMore = true;
      adminCurrentPage = 1;
      loadAdminUsers(true);
    });
  }
  
  // Carica iniziale
  loadAdminUsers(true);
  setupAdminNotify();
  setupAdminScroll();
}

function showAdminPanel() {
  hideAllPanels();
  hideFab();
  // Nasconde la barra di navigazione
  const bottomNav = document.querySelector('.bottom-nav');
  if (bottomNav) bottomNav.style.display = 'none';
  
  // Salva lo stato originale di #main-content e rimuove padding-bottom
  const mainContent = document.getElementById('main-content');
  if (mainContent) {
    mainContent.dataset.originalPaddingBottom = mainContent.style.paddingBottom;
    mainContent.style.paddingBottom = '0';
    mainContent.style.paddingTop = '0';
  }
  
  document.getElementById('admin-requests-panel').style.display = 'flex';

  if (typeof window.adminPanelInitialized === 'undefined' || !window.adminPanelInitialized) {
    initAdminPanel();
    window.adminPanelInitialized = true;
  }
}

function hideAdminPanel() {
  document.getElementById('admin-requests-panel').style.display = 'none';
  const bottomNav = document.querySelector('.bottom-nav');
  if (bottomNav) bottomNav.style.display = '';
  
  const mainContent = document.getElementById('main-content');
  if (mainContent && mainContent.dataset.originalPaddingBottom !== undefined) {
    mainContent.style.paddingBottom = mainContent.dataset.originalPaddingBottom;
    delete mainContent.dataset.originalPaddingBottom;
  } else if (mainContent) {
    mainContent.style.paddingBottom = '';
  }
  mainContent.style.paddingTop = '';
}

// Gestione typing indicator (solo chat singola)
document.getElementById('text-input').addEventListener('input', () => {
  if (!currentChatContactId) return;
  const textInput = document.getElementById('text-input');
  const text = textInput.value.trim();
  if (text.length > 0) {
    if (socket && socket.connected) {
      socket.emit('typing_start', { recipientId: currentChatContactId });
    }
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => stopTyping(), 2000);
  } else {
    stopTyping();
  }
});

function stopTyping() {
  if (typingTimeout) {
    clearTimeout(typingTimeout);
    typingTimeout = null;
  }
  if (socket && socket.connected && currentChatContactId) {
    socket.emit('typing_stop', { recipientId: currentChatContactId });
  }
}

async function fetchContactPublicKey(contactId) {
  try {
    const keyRes = await apiCall(`/users/${contactId}/key`);
    if (keyRes.ok) {
      const keyData = await keyRes.json();
      return keyData.public_key || null;
    }
  } catch (e) {
    /* ignore */
  }
  return null;
}

async function tryDecryptMessage(original, is_encrypted) {
  if (!is_encrypted || !original) {
    return { displayText: original, displayOriginal: original };
  }
  try {
    if (!ecdhPrivateKey) await loadPrivateKeyIntoMemory();
    if (ecdhPrivateKey) {
      const encryptedPayload = JSON.parse(original);
      const decrypted = await decryptMessage(encryptedPayload, ecdhPrivateKey);
      return { displayText: decrypted, displayOriginal: undefined };
    } else {
      return { displayText: '[Chiave privata mancante]', displayOriginal: undefined };
    }
  } catch (e) {
    console.error('Decifratura fallita', e);
    return { displayText: '[Decifratura fallita]', displayOriginal: undefined };
  }
}

async function translateMessageText(messageId, text, sourceLang, targetLang) {
  const cacheKey = `${messageId}:${targetLang}`;

  // 1. Cache in memoria
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }

  // 2. Cache persistente
  if (translationPersistentCache[cacheKey]) {
    const cached = translationPersistentCache[cacheKey];
    const age = Date.now() - cached.timestamp;
    if (age < TRANSLATION_CACHE_TTL) {
      translationCache.set(cacheKey, cached.translatedText);
      return cached.translatedText;
    } else {
      delete translationPersistentCache[cacheKey];
    }
  }

  // 3. Chiamata API
  try {
    const res = await apiCall('/translate/text', {
      method: 'POST',
      body: JSON.stringify({ text, sourceLang, targetLang }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      if (res.status === 403) {
        throw new Error('API_KEY_REQUIRED');
      }
      throw new Error(err.error || 'Translation failed');
    }
    const data = await res.json();

    // Salva nelle cache
    translationCache.set(cacheKey, data.translatedText);
    translationPersistentCache[cacheKey] = {
      translatedText: data.translatedText,
      timestamp: Date.now(),
    };
    saveTranslationCache();

    return data.translatedText;
  } catch (e) {
    console.error('translateMessageText error:', e);
    throw e;
  }
}

function formatExpiryInfo(expiresAt) {
  if (!expiresAt) return '';
  const remainingMs = new Date(expiresAt) - Date.now();
  if (remainingMs <= 0) return '⏳ scaduto';
  const hours = Math.floor(remainingMs / 3600000);
  const minutes = Math.floor((remainingMs % 3600000) / 60000);
  return `⏳ ${hours}h ${minutes}m`;
}

function renderReadStatus(direction, read_at) {
  if (direction !== 'sent') return '';
  if (read_at) {
    return '<span class="read-status read">' + t('sent_read_status') + '</span>';
  } else {
    return '<span class="read-status delivered">' + t('sent_delivered_status') + '</span>';
  }
}

async function prepareEphemeralPayload(contactId) {
  if (currentChatContactLanguage !== currentUser.language_code) {
    alert(t('ephemeral_language_error'));
    return null;
  }
  if (getOnlineClass(contactId) !== 'online') {
    alert(t('ephemeral_offline_error'));
    return null;
  }
  const contactPublicKey = await fetchContactPublicKey(contactId);
  if (!contactPublicKey) {
    alert(t('error_text_e2e_required'));
    return null;
  }
  if (!ecdhPrivateKey) {
    alert(t('error_private_key_missing'));
    return null;
  }
  return await importPublicKey(contactPublicKey);
}

document.getElementById('ephemeral-checkbox').addEventListener('change', (e) => {
  ephemeralMode = e.target.checked;
  const expirySelector = document.getElementById('chat-expiry-selector');
  if (ephemeralMode) {
    expirySelector.querySelector('#chat-expiry-select').style.display = 'none';
    expirySelector.querySelector('label[for="chat-expiry-select"]').style.display = 'none';
  } else {
    expirySelector.querySelector('#chat-expiry-select').style.display = '';
    expirySelector.querySelector('label[for="chat-expiry-select"]').style.display = '';
  }
});
function requestOnlineStatus() {
  if (socket && socket.connected) {
    socket.emit('request_online_status');
  }
}

// ─── Long‑press per cancellare contatti e chat ──────────────
let longPressTimer = null;
let longPressTarget = null;
const LONG_PRESS_DURATION = 500;

function setupLongPressDelete(containerId, type) {
  const container = document.getElementById(containerId);
  if (!container || container.dataset.longPressSetup === 'true') return;
  container.dataset.longPressSetup = 'true';

  container.addEventListener('touchstart', (e) => {
    const item = e.target.closest('.contact-item');
    if (!item) return;
    longPressTarget = item;
    longPressTimer = setTimeout(() => {
      if (type === 'contact') {
        const relationId = item.dataset.relationId;
        const name = item.dataset.contactName;
        if (relationId && name) showDeleteConfirmModal('contact', relationId, name);
      } else if (type === 'chat') {
        const contactId = item.dataset.contactId;
        const name = item.dataset.contactName;
        if (contactId && name) showDeleteConfirmModal('chat', contactId, name);
      }
      longPressTimer = null;
      longPressTarget = null;
    }, LONG_PRESS_DURATION);
  }, { passive: true });

  container.addEventListener('touchend', () => {
    clearLongPress();
  });
  container.addEventListener('touchmove', () => {
    clearLongPress();
  });
  container.addEventListener('touchcancel', () => {
    clearLongPress();
  });

  // Supporto mouse per desktop
  container.addEventListener('mousedown', (e) => {
    const item = e.target.closest('.contact-item');
    if (!item) return;
    longPressTarget = item;
    longPressTimer = setTimeout(() => {
      if (type === 'contact') {
        const relationId = item.dataset.relationId;
        const name = item.dataset.contactName;
        if (relationId && name) showDeleteConfirmModal('contact', relationId, name);
      } else if (type === 'chat') {
        const contactId = item.dataset.contactId;
        const name = item.dataset.contactName;
        if (contactId && name) showDeleteConfirmModal('chat', contactId, name);
      }
      longPressTimer = null;
      longPressTarget = null;
    }, LONG_PRESS_DURATION);
  });
  container.addEventListener('mouseup', () => {
    clearLongPress();
  });
  container.addEventListener('mouseleave', () => {
    clearLongPress();
  });
}

function clearLongPress() {
  if (longPressTimer) {
    clearTimeout(longPressTimer);
    longPressTimer = null;
  }
  longPressTarget = null;
}

function clearChatCaches(contactId) {
  // Pulisce tutte le cache relative a un contatto
  sentAudioCache.forEach((val, key) => { if (key.includes(contactId)) sentAudioCache.delete(key); });
  receivedAudioCache.forEach((val, key) => { if (key.includes(contactId)) receivedAudioCache.delete(key); });
  sentImageCache.forEach((val, key) => { if (key.includes(contactId)) sentImageCache.delete(key); });
  receivedImageCache.forEach((val, key) => { if (key.includes(contactId)) receivedImageCache.delete(key); });
  sentVideoCache.forEach((val, key) => { if (key.includes(contactId)) sentVideoCache.delete(key); });
  receivedVideoCache.forEach((val, key) => { if (key.includes(contactId)) receivedVideoCache.delete(key); });
  receivedVideoThumbnailCache.forEach((val, key) => { if (key.includes(contactId)) receivedVideoThumbnailCache.delete(key); });
}

function closeChatAndReturnToList() {
  notifyChatClosed();
  if (window.timerInterval) {
    clearInterval(window.timerInterval);
    window.timerInterval = null;
  }
  document.getElementById('chat-container').style.display = 'none';
  document.getElementById('chats-list').style.display = 'block';
  showFab();
  currentChatContactId = null;
  if (socket && socket.connected) {
    socket.emit('chat_closed');
  }
  document.getElementById('messages-list').innerHTML = '';
  document.getElementById('messages-list').style.display = 'none';
  renderChats();
}

let deleteConfirmStep = 1;
let deleteConfirmType = null;
let deleteConfirmId = null;
let deleteConfirmName = null;

function showDeleteConfirmModal(type, id, name) {
  const modal = document.getElementById('confirm-delete-modal');
  const message = document.getElementById('confirm-delete-message');
  const okBtn = document.getElementById('confirm-delete-ok');

  // Rimuovi eventuale input residuo
  const oldInput = document.getElementById('confirm-delete-input');
  if (oldInput) oldInput.style.display = 'none';

  deleteConfirmStep = 1;
  deleteConfirmType = type;
  deleteConfirmId = id;
  deleteConfirmName = name;

  if (type === 'contact') {
    message.textContent = `Vuoi eliminare il contatto "${name}"?`;
  } else if (type === 'chat') {
    message.textContent = `Vuoi eliminare la chat con "${name}"?`;
  }
  okBtn.textContent = 'Elimina';
  okBtn.className = '';
  okBtn.disabled = false;
  okBtn.onclick = handleDeleteConfirmNext;
  modal.classList.remove('hidden');
}

function handleDeleteConfirmNext() {
  const modal = document.getElementById('confirm-delete-modal');
  const message = document.getElementById('confirm-delete-message');
  const okBtn = document.getElementById('confirm-delete-ok');

  if (deleteConfirmStep === 1) {
    // Secondo step: avviso irreversibile
    if (deleteConfirmType === 'contact') {
      message.textContent = `Sei sicuro? L'intera conversazione sarà eliminata per entrambi.`;
    } else {
      message.textContent = `Sei sicuro? I messaggi saranno cancellati per entrambi.`;
    }
    okBtn.textContent = 'Conferma eliminazione';
    okBtn.classList.add('btn-danger'); // stile rosso, definito in CSS
    deleteConfirmStep = 2;
  } else if (deleteConfirmStep === 2) {
    // Esegui azione
    if (deleteConfirmType === 'contact') {
      deleteContact(deleteConfirmId);
    } else if (deleteConfirmType === 'chat') {
      deleteChat(deleteConfirmId);
    }
    modal.classList.add('hidden');
    deleteConfirmStep = 1;
  }
}

// Reset all'annullamento o chiusura
function resetDeleteConfirmState() {
  deleteConfirmStep = 1;
  const okBtn = document.getElementById('confirm-delete-ok');
  if (okBtn) {
    okBtn.classList.remove('btn-danger');
    okBtn.disabled = false;
  }
  const input = document.getElementById('confirm-delete-input');
  if (input) input.style.display = 'none';
}

async function deleteContact(relationId) {
  try {
    const res = await apiCall(`/contacts/${relationId}`, { method: 'DELETE' });
    if (!res.ok) {
      const data = await res.json();
      alert(data.error || t('error_generic'));
      return;
    }
    renderContacts();
  } catch (err) {
    alert(t('error_generic'));
  }
}

async function deleteChat(contactId) {
  try {
    await apiCall(`/chats/${contactId}`, { method: 'DELETE' });
    clearChatCaches(contactId);
    if (currentChatContactId === contactId) {
      closeChatAndReturnToList();
    } else {
      renderChats();
    }
  } catch (err) {
    alert(t('error_generic'));
  }
}

// Listener per il modale di conferma
document.getElementById('confirm-delete-cancel').addEventListener('click', () => {
  document.getElementById('confirm-delete-modal').classList.add('hidden');
  resetDeleteConfirmState();
});

// Chiudi il modale cliccando fuori
document.getElementById('confirm-delete-modal').addEventListener('click', (e) => {
  if (e.target === document.getElementById('confirm-delete-modal')) {
    document.getElementById('confirm-delete-modal').classList.add('hidden');
    resetDeleteConfirmState();
  }
});

// Avvia long‑press su contatti e chat (una sola volta)
setupLongPressDelete('contacts-list-inner', 'contact');
setupLongPressDelete('chats-list-inner', 'chat');

function setupSearchFilter(inputId, listId) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    const items = document.querySelectorAll(`#${listId} .contact-item, #${listId} .chat-item`);
    items.forEach(item => {
      const name = (item.dataset.contactName || '').toLowerCase();
      item.style.display = (!query || name.startsWith(query)) ? '' : 'none';
    });
  });
}

// Attiva filtro ricerca (una sola volta)
setupSearchFilter('contacts-search', 'contacts-list-inner');
setupSearchFilter('chats-search', 'chats-list-inner');
enableSwipeAndEmojiOnMessages();
setupMessageListListeners('messages-list');
setupMessageListListeners('group-messages-list');

// Infinite scroll verso l'alto
document.getElementById('messages-list').addEventListener('scroll', () => {
  const container = document.getElementById('messages-list');
  if (!container) return;
  if (container.scrollTop <= 50 && hasMoreMessages && !isLoadingMore) {
    loadMore();
  }
});

async function loadMore() {
  if (!currentChatContactId || !oldestMessageDate) return;
  isLoadingMore = true;
  await loadMessages(currentChatContactId, oldestMessageDate);
  isLoadingMore = false;
}

function initSwipeGestures() {
  const SWIPE_THRESHOLD = 50; // px orizzontali minimi
  const VERTICAL_THRESHOLD = 30; // max spostamento verticale consentito

  let startX = 0,
    startY = 0;

  function handleTouchStart(e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }

  function handleTouchEnd(e) {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const diffX = endX - startX;
    const diffY = endY - startY;

    // Ignora se lo scroll verticale è predominante
    if (Math.abs(diffY) > VERTICAL_THRESHOLD) return;
    if (Math.abs(diffX) < SWIPE_THRESHOLD) return;

    // Determina la vista attuale in base a quale elemento ha ricevuto il touch
    const target = e.target;
    const contactsList = document.getElementById('contacts-list');
    const profilePanel = document.getElementById('profile-panel');
    const chatContainer = document.getElementById('chat-container');

    // Swipe dalla chat verso sinistra -> torna ai contatti
    if (chatContainer.style.display !== 'none' && chatContainer.contains(target)) {
      if (diffX < -SWIPE_THRESHOLD) {
        document.getElementById('back-to-contacts').click();
      }
      return;
    }

    // Swipe dalla rubrica verso destra -> profilo
    if (contactsList.style.display !== 'none' && contactsList.contains(target)) {
      if (diffX > SWIPE_THRESHOLD) {
        document.getElementById('nav-profile').click();
      }
      return;
    }

    // Swipe dal profilo verso sinistra -> rubrica
    if (profilePanel.style.display !== 'none' && profilePanel.contains(target)) {
      if (diffX < -SWIPE_THRESHOLD) {
        document.getElementById('nav-contacts').click();
      }
      return;
    }
  }

  // Attacca i listener agli elementi (sono sempre presenti nel DOM)
  document
    .getElementById('contacts-list')
    ?.addEventListener('touchstart', handleTouchStart, { passive: true });
  document
    .getElementById('contacts-list')
    ?.addEventListener('touchend', handleTouchEnd, { passive: true });

  document
    .getElementById('profile-panel')
    ?.addEventListener('touchstart', handleTouchStart, { passive: true });
  document
    .getElementById('profile-panel')
    ?.addEventListener('touchend', handleTouchEnd, { passive: true });

  document
    .getElementById('chat-container')
    ?.addEventListener('touchstart', handleTouchStart, { passive: true });
  document
    .getElementById('chat-container')
    ?.addEventListener('touchend', handleTouchEnd, { passive: true });
}

// ========== TOUR GUIDATO ==========

const tourConfig = {
  chat: [
    { selector: '#ephemeral-checkbox', text: 'tour_chat_ephemeral' },
    { selector: '#chat-expiry-select', text: 'tour_chat_selfdestruct' },
    { selector: '#record-btn', text: 'tour_chat_dictate' },
    { centered: true, text: 'tour_chat_sent' },
    { centered: true, text: 'tour_chat_received' },
    { centered: true, text: 'tour_chat_speaker' },
    { selector: '#clear-chat-btn', text: 'tour_chat_clear' }
  ],
  'group-chat': [
    { selector: '#group-messages-list', text: 'tour_group_ghost' }
  ],
  contacts: [
    { selector: '#fab-overlay', text: 'tour_contacts_fab' },
    { selector: '.contact-item', text: 'tour_contacts_delete', fallback: true }
  ],
  chats: [
    { selector: '#fab-overlay', text: 'tour_chatslist_fab' },
    { centered: true, text: 'tour_chatslist_delete' }
  ],
  profile: [
    { selector: '#settings-beep', text: 'tour_profile_recording' },
    { selector: '#manage-api-keys-btn', text: 'tour_profile_api' },
    { selector: '#regenerate-keys-btn', text: 'tour_profile_e2e' }
  ],
  translator: [
    { selector: '#translate-btn-left', text: 'tour_translate_howto' },
    { selector: '#show-original-checkbox', text: 'tour_translate_original' },
    { centered: true, text: 'tour_translate_limits' }
  ]
};

let tourCurrentPage = null;
let tourCurrentStep = 0;
let tourOverlayEl = null;
let tourTooltipEl = null;
let tourHighlightEl = null;

function getCompletedTours() {
  try {
    return JSON.parse(localStorage.getItem('gotyou_tour_completed') || '[]');
  } catch (e) {
    return [];
  }
}

function markTourCompleted(pageId) {
  const completed = getCompletedTours();
  if (!completed.includes(pageId)) {
    completed.push(pageId);
    localStorage.setItem('gotyou_tour_completed', JSON.stringify(completed));
  }
}

function isTourCompleted(pageId) {
  return getCompletedTours().includes(pageId);
}

function cleanupTourUI() {
  if (tourOverlayEl && tourOverlayEl.parentNode) {
    tourOverlayEl.parentNode.removeChild(tourOverlayEl);
    tourOverlayEl = null;
  }
  if (tourOverlayEl && tourOverlayEl.parentNode) {
    tourOverlayEl.parentNode.removeChild(tourOverlayEl);
  }
  if (tourTooltipEl && tourTooltipEl.parentNode) {
    tourTooltipEl.parentNode.removeChild(tourTooltipEl);
  }
  if (tourHighlightEl && tourHighlightEl.parentNode) {
    tourHighlightEl.parentNode.removeChild(tourHighlightEl);
  }
  tourOverlayEl = null;
  tourTooltipEl = null;
  tourHighlightEl = null;
}

function forceEndTour() {
  cleanupTourUI();
  window.removeEventListener('resize', onTourResize);
  tourCurrentPage = null;
  tourCurrentStep = 0;
}

function resetAndRestartTour() {
  // Cancella tutti i tour completati
  localStorage.removeItem('gotyou_tour_completed');
  // Forza la fine di eventuale tour in corso
  forceEndTour();
  // Avvia il tour per la pagina corrente (profilo)
  // Assicuriamoci che il pannello profilo sia visibile
  if (document.getElementById('profile-panel').style.display === 'block') {
    startTour('profile');
  } else {
    // Se per qualche motivo non siamo nel profilo, vai al profilo e poi parte il tour automaticamente
    navProfile.click();
  }
}

function startTour(pageId) {
  forceEndTour();
  if (isTourCompleted(pageId)) return;
  const steps = tourConfig[pageId];
  if (!steps || steps.length === 0) return;

  tourCurrentPage = pageId;
  tourCurrentStep = 0;

  // Se il primo step è centrato, mostra subito
  const firstStep = steps[0];
  if (firstStep.centered) {
    showTourStep();
    return;
  }

  // Altrimenti attendi che l'elemento target esista nel DOM
  const targetSelector = firstStep.selector;
  let retries = 0;
  const maxRetries = 20; // ~2 secondi totali (100ms * 20)
  const interval = setInterval(() => {
    const target = document.querySelector(targetSelector);
    if (target) {
      clearInterval(interval);
      showTourStep();
    } else if (++retries >= maxRetries) {
      clearInterval(interval);
      // Abort, tour non avviato
      console.warn(`Tour ${pageId} abortito: elemento ${targetSelector} non trovato`);
    }
  }, 100);
}

function showTourStep() {
  const steps = tourConfig[tourCurrentPage];
  if (tourCurrentStep >= steps.length) {
    endTour(true);
    return;
  }

  const step = steps[tourCurrentStep];

  // Pulisci UI precedente
  if (tourOverlayEl && tourOverlayEl.parentNode) {
    tourOverlayEl.parentNode.removeChild(tourOverlayEl);
    tourOverlayEl = null;
  }
  if (tourTooltipEl && tourTooltipEl.parentNode) {
    tourTooltipEl.parentNode.removeChild(tourTooltipEl);
    tourTooltipEl = null;
  }
  if (tourHighlightEl && tourHighlightEl.parentNode) {
    tourHighlightEl.parentNode.removeChild(tourHighlightEl);
    tourHighlightEl = null;
  }

  const isLastStep = tourCurrentStep >= steps.length - 1;
  const text = t(step.text);

  let targetRect = null;

  if (!step.centered) {
    // Step ancorato a un elemento
    const target = document.querySelector(step.selector);
    if (!target) {
      if (step.fallback) {
        tourCurrentStep++;
        showTourStep();
        return;
      } else {
        endTour(false);
        return;
      }
    }
    targetRect = target.getBoundingClientRect();

    // Crea highlight clone
    tourHighlightEl = document.createElement('div');
    tourHighlightEl.className = 'tour-highlight';
    tourHighlightEl.style.left = targetRect.left + 'px';
    tourHighlightEl.style.top = targetRect.top + 'px';
    tourHighlightEl.style.width = targetRect.width + 'px';
    tourHighlightEl.style.height = targetRect.height + 'px';
    document.body.appendChild(tourHighlightEl);
  }

  // Crea tooltip
  tourTooltipEl = document.createElement('div');
  tourTooltipEl.className = 'tour-tooltip';

  tourTooltipEl.innerHTML = `
    <div class="tour-text">${text}</div>
    <div class="tour-buttons">
      <button class="tour-btn-next">${isLastStep ? t('tour_finish') : t('tour_next')}</button>
    </div>
  `;

  document.body.appendChild(tourTooltipEl);

  // Misura reale
  let realWidth = tourTooltipEl.offsetWidth;
  let realHeight = tourTooltipEl.offsetHeight;
  const maxAllowedWidth = window.innerWidth - 16;
  if (realWidth > maxAllowedWidth) {
    tourTooltipEl.style.maxWidth = maxAllowedWidth + 'px';
    realWidth = maxAllowedWidth;
    realHeight = tourTooltipEl.offsetHeight;
  }

  let pos;
  if (step.centered) {
    // Overlay scuro per step centrati (migliora contrasto)
    tourOverlayEl = document.createElement('div');
    tourOverlayEl.className = 'tour-overlay';
    document.body.appendChild(tourOverlayEl);

    // Centrato nella viewport
    pos = {
      left: Math.round((window.innerWidth - realWidth) / 2),
      top: Math.round((window.innerHeight - realHeight) / 2)
    };
  } else {
    pos = positionPopup(targetRect, realWidth, realHeight, 'bottom');
  }

  tourTooltipEl.style.left = pos.left + 'px';
  tourTooltipEl.style.top = pos.top + 'px';

  // Event listener pulsanti
  const nextBtn = tourTooltipEl.querySelector('.tour-btn-next');

  nextBtn.addEventListener('click', () => {
    tourCurrentStep++;
    showTourStep();
  });
}

function showToast(message, type = 'info') {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = `toast toast-${type}`;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

function endTour(completed) {
  cleanupTourUI();
  window.removeEventListener('resize', onTourResize);
  if (completed && tourCurrentPage) {
    markTourCompleted(tourCurrentPage);
  }
  tourCurrentPage = null;
  tourCurrentStep = 0;
}

function onTourResize() {
  if (tourCurrentPage) {
    showTourStep(); // ridisegna highlight e tooltip
  }
}

initSwipeGestures();

document.getElementById('lightbox-close').addEventListener('click', () => {
  document.getElementById('lightbox').style.display = 'none';
  const lightboxVideo = document.getElementById('lightbox-video');
  if (lightboxVideo) lightboxVideo.pause();
});

document.getElementById('lightbox').addEventListener('click', (e) => {
  if (e.target === document.getElementById('lightbox')) {
    document.getElementById('lightbox').style.display = 'none';
    const lightboxVideo = document.getElementById('lightbox-video');
    if (lightboxVideo) lightboxVideo.pause();
  }
});

function showLightbox(src, type) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxVideo = document.getElementById('lightbox-video');
  lightbox.style.display = 'flex';
  if (type === 'video') {
    lightboxImg.style.display = 'none';
    lightboxVideo.style.display = 'block';
    lightboxVideo.src = src;
    lightboxVideo.play();
  } else {
    lightboxVideo.style.display = 'none';
    lightboxVideo.pause();
    lightboxImg.style.display = 'block';
    lightboxImg.src = src;
    lightboxImg.alt = t('lightbox_image_alt'); // Imposta l'alt localizzato
  }
}

document.getElementById('leave-group-btn').addEventListener('click', () => {
  if (currentGroupId) {
    socket.emit('leave_group', { groupId: currentGroupId });
    leaveGroupChatUI();
  }
});
