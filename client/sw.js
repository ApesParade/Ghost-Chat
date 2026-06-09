// SW version: 2025-01-16-fix-icon
self.addEventListener('install', (event) => {
  console.log('SW installato v2');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('SW attivato v2');
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Strategia network first per API, cache per statiche (implementeremo dopo)
});

self.addEventListener('push', (event) => {
  console.log('[SW] Push ricevuta:', event.data?.text());
  
  let data;
  try {
    data = event.data?.json();
  } catch (e) {
    console.error('[SW] Errore parsing JSON:', e);
    return;
  }
  
  if (!data || !data.title || !data.body) {
    console.error('[SW] Dati push non validi:', data);
    return;
  }

  // Mostra sempre la notifica di sistema (per suono e attenzione)
  const options = {
    body: data.body,
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
    data: {
      page: data.page
    },
    requireInteraction: true,
    vibrate: [200, 100, 200],
    silent: false
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
      .then(() => {
        console.log('[SW] Notifica di sistema mostrata');
        // Invia anche un messaggio al client per aggiornare la modale
        return clients.matchAll({ type: 'window', includeUncontrolled: true });
      })
      .then(clientList => {
        clientList.forEach(client => {
          client.postMessage({ type: 'ADMIN_NOTIFICATION_RECEIVED' });
        });
      })
      .catch(err => console.error('[SW] Errore showNotification:', err))
  );
});

self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification click - data:', event.notification.data);
  event.notification.close();
  const senderId = event.notification.data?.senderId;
  const page = event.notification.data?.page;

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      if (clientList.length > 0) {
        const client = clientList[0];
        client.focus();
        if (page === 'admin-requests') {
          client.navigate('/#admin-panel');
        } else if (senderId) {
          client.navigate('/?openChat=' + encodeURIComponent(senderId));
        }
      } else {
        if (page === 'admin-requests') {
          return clients.openWindow('/#admin-panel');
        } else if (senderId) {
          return clients.openWindow('/?openChat=' + encodeURIComponent(senderId));
        } else {
          return clients.openWindow('/');
        }
      }
    })
  );
});

async function handleOpenChatFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const senderId = urlParams.get('openChat');
  if (senderId) {
    const newUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, document.title, newUrl);
    
    try {
      // Verifica che sia un contatto accettato
      const contactsRes = await apiCall('/contacts');
      if (contactsRes.ok) {
        const contacts = (await contactsRes.json()).contacts || [];
        const isContact = contacts.some(c => c.other_user.id === senderId && c.status === 'accepted');
        if (!isContact) return; // Non è un contatto, non aprire la chat
      }
      
      let senderName = senderId;
      const userRes = await apiCall(`/users/${senderId}`);
      if (userRes.ok) {
        const user = await userRes.json();
        senderName = user.username;
      }
      
      openChat(senderId, senderName);
    } catch (e) { /* non fare nulla */ }
  }
}