// client/themes.js – Temi colore dell'interfaccia

const THEMES = {
  original: {
    name: 'Original',
    vars: {
      '--bg': '#272b2e',
      '--surface': '#3a4045',
      '--surface2': '#4d555a',
      '--primary': '#4db3a6',
      '--primary-hover': '#3a8c81',
      '--secondary': '#d9577b',
      '--subtitle': '#499344',
      '--success': '#499344',
      '--success-light': '#5cb24e',
      '--success-hover': '#3a7535',
      '--danger': '#c23b55',
      '--danger-hover': '#a8324a',
      '--action': '#3a6ea5',
      '--action-hover': '#2c478a',
      '--text': '#f0f0f0',
      '--text-secondary': '#b0b0b0',
      '--bubble-sent-text': '#ffffff',
      '--bubble-sent-text-secondary': '#d0d0d0',
      '--bubble-received-text': '#f0f0f0',
      '--bubble-received-text-secondary': '#c0c0c0',
      '--reaction-bg-sent': '#2a3a4a',
      '--reaction-bg-received': '#2a3a4a',
      '--border': '#6a737b',
      '--radius': '12px',
      '--font': "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      '--primary-rgb': '77, 179, 166',
      '--secondary-rgb': '217, 87, 123',
      '--presence-online': '#2ecc71',
      '--presence-offline': '#888',
      '--shadow-dark-rgb': '0, 0, 0',
      '--shadow-light-rgb': '255, 255, 255',
      '--bg-media-thumbnail': '#2f353a',
      '--chat-bg-opacity': '0.9',
      '--chat-bg-image': "url('icons/ghost_w_bg.svg')",
      '--bg-transparent': 'transparent',
      '--nav-bg': '#272b2e',
      '--text-rgb': '240, 240, 240',
      '--tour-color': 'var(--success-light)',
      '--save-outline': '1px solid var(--success-light)',
      '--chat-list-bg-opacity': '0.95',
      '--chat-banner-bg-rgb': '18, 20, 22',
      '--chat-banner-bg': '#121416',
    }
  },
  redlight: {
    name: 'RedLight District',
    vars: {
      '--bg': '#0f0f1a',
      '--surface': '#1a1a2e',
      '--surface2': '#16213e',
      '--primary': '#e94560',
      '--primary-hover': '#ff001c',
      '--secondary': '#60e945',
      '--subtitle': '#60e945',
      '--success': '#27ae60',
      '--success-light': '#2ecc71',
      '--success-hover': '#219a52',
      '--danger': '#c0392b',
      '--danger-hover': '#a93226',
      '--action': '#3498db',
      '--action-hover': '#2980b9',
      '--text': '#eee',
      '--text-secondary': '#aaa',
      '--bubble-sent-text': '#eee',
      '--bubble-sent-text-secondary': '#aaa',
      '--bubble-received-text': '#eee',
      '--bubble-received-text-secondary': '#aaa',
      '--reaction-bg-sent': '#1e2a4a',
      '--reaction-bg-received': '#1e2a4a',
      '--border': '#2a2a4a',
      '--radius': '12px',
      '--font': "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      '--primary-rgb': '233, 69, 96',
      '--secondary-rgb': '96, 233, 69',
      '--presence-online': '#2ecc71',
      '--presence-offline': '#888',
      '--shadow-dark-rgb': '0, 0, 0',
      '--shadow-light-rgb': '255, 255, 255',
      '--bg-media-thumbnail': '#222',
      '--chat-bg-opacity': '0.9',
      '--chat-bg-image': "url('icons/ghost_w_bg.svg')",
      '--bg-transparent': 'transparent',
      '--nav-bg': '#0f0f1a',
      '--text-rgb': '238, 238, 238',
      '--tour-color': 'var(--success-light)',
      '--save-outline': '1px solid var(--success-light)',
      '--chat-list-bg-opacity': '0.95',
      '--chat-banner-bg-rgb': '2, 2, 4',
      '--chat-banner-bg': '#020204',
    }
  },
  cyberpunk: {
    name: 'Cyberpunk',
    vars: {
      '--bg': '#0a0c1a',
      '--surface': '#3C0B15',
      '--surface2': '#910324',
      '--primary': '#ffd700',
      '--primary-hover': '#cca300',
      '--secondary': '#00d4ff',
      '--subtitle': '#4cb4e6',
      '--success': '#27ae60',
      '--success-light': '#2ecc71',
      '--success-hover': '#219a52',
      '--danger': '#ff3366',
      '--danger-hover': '#cc224f',
      '--action': '#c026ff',
      '--action-hover': '#9a1fcc',
      '--text': '#f0f3f8',
      '--text-secondary': '#a0a8c0',
      '--bubble-sent-text': '#1a1a2e',
      '--bubble-sent-text-secondary': '#4a4a5a',
      '--bubble-received-text': '#f0f3f8',
      '--bubble-received-text-secondary': '#a0a8c0',
      '--reaction-bg-sent': '#910324',
      '--reaction-bg-received': '#1a0a1e',
      '--border': '#2a3560',
      '--radius': '12px',
      '--font': "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      '--primary-rgb': '255, 215, 0',
      '--secondary-rgb': '0, 212, 255',
      '--presence-online': '#2ecc71',
      '--presence-offline': '#888888',
      '--shadow-dark-rgb': '0, 0, 0',
      '--shadow-light-rgb': '255, 255, 255',
      '--bg-media-thumbnail': '#12172c',
      '--chat-bg-opacity': '0.9',
      '--chat-bg-image': "url('icons/ghost_w_bg.svg')",
      '--bg-transparent': 'transparent',
      '--nav-bg': '#0a0c1a',
      '--text-rgb': '0, 255, 255',
      '--tour-color': 'var(--success-light)',
      '--save-outline': '1px solid var(--success-light)',
      '--chat-list-bg-opacity': '0.95',
      '--chat-banner-bg-rgb': '1, 1, 2',
      '--chat-banner-bg': '#010102',
    }
  },
  matrix: {
    name: 'Matrix',
    vars: {
      '--bg': '#0a0f0a',
      '--surface': '#0d1a0d',
      '--surface2': '#1a2e1a',
      '--primary': '#00ff41',
      '--primary-hover': '#00cc33',
      '--secondary': '#e50914',
      '--subtitle': '#a52a2a',
      '--success': '#00b36b',
      '--success-light': '#4dffb3',
      '--success-hover': '#00804d',
      '--danger': '#ff3b3b',
      '--danger-hover': '#cc2f2f',
      '--action': '#a259f0',
      '--action-hover': '#823fd4',
      '--text': '#ffffff',
      '--text-secondary': '#aaaaaa',
      '--bubble-sent-text': '#0a0f0a',
      '--bubble-sent-text-secondary': '#1a2e1a',
      '--bubble-received-text': '#ffffff',
      '--bubble-received-text-secondary': '#aaaaaa',
      '--reaction-bg-sent': '#003b00',
      '--reaction-bg-received': '#001a00',
      '--border': '#1a2a3a',
      '--radius': '12px',
      '--font': "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      '--primary-rgb': '0, 255, 65',
      '--secondary-rgb': '229, 9, 20',
      '--presence-online': '#2ecc71',
      '--presence-offline': '#888',
      '--shadow-dark-rgb': '0, 0, 0',
      '--shadow-light-rgb': '255, 255, 255',
      '--bg-media-thumbnail': '#0d1a0d',
      '--chat-bg-opacity': '0.9',
      '--chat-bg-image': "url('icons/ghost_w_bg.svg')",
      '--bg-transparent': 'transparent',
      '--nav-bg': '#0a0f0a',
      '--text-rgb': '0, 255, 65',
      '--tour-color': 'var(--success-light)',
      '--save-outline': '1px solid var(--success-light)',
      '--chat-list-bg-opacity': '0.95',
      '--chat-banner-bg-rgb': '0, 1, 0',
      '--chat-banner-bg': '#000100',
    }
  },
  whatsapp: {
    name: 'WhatsApp',
    vars: {
      '--bg': '#000000',
      '--surface': '#0B141A',
      '--surface2': '#202C33',
      '--primary': '#25D366',
      '--primary-hover': '#128C7E',
      '--secondary': '#53BDEB',
      '--subtitle': '#53BDEB',
      '--success': '#27ae60',
      '--success-light': '#2ecc71',
      '--success-hover': '#219a52',
      '--danger': '#E53935',
      '--danger-hover': '#C62828',
      '--action': '#E9EDEF',
      '--action-hover': '#8696A0',
      '--text': '#E9EDEF',
      '--text-secondary': '#8696A0',
      '--bubble-sent-text': '#0B141A',
      '--bubble-sent-text-secondary': '#5A6A7A',
      '--bubble-received-text': '#E9EDEF',
      '--bubble-received-text-secondary': '#8696A0',
      '--reaction-bg-sent': '#31444f',
      '--reaction-bg-received': '#31444f',
      '--border': '#2A3842',
      '--radius': '12px',
      '--font': "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      '--primary-rgb': '37, 211, 102',
      '--secondary-rgb': '83, 189, 235',
      '--presence-online': '#25D366',
      '--presence-offline': '#888888',
      '--shadow-dark-rgb': '0, 0, 0',
      '--shadow-light-rgb': '255, 255, 255',
      '--bg-media-thumbnail': '#0B141A',
      '--chat-bg-opacity': '0.9',
      '--chat-bg-image': "url('icons/ghost_w_bg.svg')",
      '--bg-transparent': 'transparent',
      '--nav-bg': '#0B141A',
      '--text-rgb': '0, 0, 0',
      '--tour-color': 'var(--success-light)',
      '--save-outline': '1px solid var(--success-light)',
      '--chat-list-bg-opacity': '0.95',
      '--chat-banner-bg-rgb': '16, 16, 16',
      '--chat-banner-bg': '#161616',
    }
  },
  telegram: {
    name: 'Telegram',
    vars: {
      '--bg': '#ffffff',
      '--surface': '#d9d9d9',
      '--surface2': '#bbbbbb',
      '--primary': '#2AABEE',
      '--primary-hover': '#1C8ADB',
      '--secondary': '#64B5F6',
      '--subtitle': '#64B5F6',
      '--success': '#1C8ADB',
      '--success-light': '#2AABEE',
      '--success-hover': '#2AABEE',
      '--danger': '#E53935',
      '--danger-hover': '#C62828',
      '--action': '#2b2b2b',
      '--action-hover': '#181818',
      '--text': '#181818',
      '--text-secondary': '#2b2b2b',
      '--bubble-sent-text': '#F5F5F5',
      '--bubble-sent-text-secondary': '#A0B4C8',
      '--bubble-received-text': '#181818',
      '--bubble-received-text-secondary': '#2b2b2b',
      '--reaction-bg-sent': '#6a6a6a',
      '--reaction-bg-received': '#6a6a6a',
      '--toggle-off-bg': '#dcdcdc',
      '--toggle-on-bg': '#2ecc71',
      '--border': '#2D3B4A',
      '--radius': '12px',
      '--font': "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      '--primary-rgb': '42, 171, 238',
      '--secondary-rgb': '100, 181, 246',
      '--presence-online': '#25D366',
      '--presence-offline': '#888888',
      '--shadow-dark-rgb': '0, 0, 0',
      '--shadow-light-rgb': '255, 255, 255',
      '--bg-media-thumbnail': '#17212B',
      '--chat-bg-opacity': '0.8',
      '--chat-bg-image': "url('icons/ghost_bg.svg')",
      '--bg-transparent': 'transparent',
      '--nav-bg': '#dadada',
      '--text-rgb': '255, 255, 255',
      '--tour-color': 'var(--success-light)',
      '--save-outline': '1px solid var(--success-light)',
      '--chat-list-bg-opacity': '0.95',
      '--chat-banner-bg-rgb': '221, 221, 221',
      '--chat-banner-bg': '#dddddd',
    }
  }
};

const DEFAULT_THEME = 'original';

function getCurrentTheme() {
  return localStorage.getItem('theme') || DEFAULT_THEME;
}

function updateNavIcons(theme) {
  const suffixMap = {
    original: '',
    redlight: '_redlight',
    cyberpunk: '_cyber',
    matrix: '_matrix',
    whatsapp: '_whatsapp',
    telegram: '_telegram'
  };
  const suffix = suffixMap[theme] || '';
  document.querySelectorAll('.nav-icon[data-icon]').forEach(img => {
    const icon = img.dataset.icon;
    const newSrc = `icons/${icon}${suffix}.png`;
    const absolute = new URL(newSrc, location.href).href;
    if (img.src !== absolute) {
      img.src = newSrc;
    }
  });
}

function setTheme(themeName) {
  const theme = THEMES[themeName] || THEMES[DEFAULT_THEME];
  const root = document.documentElement;
  Object.entries(theme.vars).forEach(([prop, value]) => {
    root.style.setProperty(prop, value);
  });
  localStorage.setItem('theme', themeName);
  updateNavIcons(themeName);
  updateThemeColorMeta();
}

function applySavedTheme() {
  const theme = getCurrentTheme();
  setTheme(theme);
  updateThemeColorMeta();
}

function updateThemeColorMeta() {
  const bg = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute('content', bg);
  }
}