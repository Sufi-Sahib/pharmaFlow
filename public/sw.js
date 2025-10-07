
self.addEventListener('install', event => {
  console.log('Service Worker installing.');
  // Activate new service worker as soon as it's installed
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('Service Worker activating.');
  // Take control of all clients as soon as the service worker is activated
  event.waitUntil(clients.claim());
});

self.addEventListener('push', event => {
  console.log('[Service Worker] Push Received.');
  let data = {};
  try {
    data = event.data.json();
  } catch (e) {
    console.warn('[Service Worker] Push event data is not JSON, falling back to text.');
    data = { title: event.data.text() };
  }

  const title = data.title || 'PharmaFlow';
  const options = {
    body: data.body || 'You have a new notification.',
    icon: '/icon-192x192.png',
    badge: '/icon-192x192.png',
    data: {
      url: data.url || '/',
    },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', event => {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  const targetUrl = event.notification.data.url;

  event.waitUntil(
    clients
      .matchAll({
        type: 'window',
        includeUncontrolled: true,
      })
      .then(clientList => {
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i];
          if (client.url === '/' && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(targetUrl);
        }
      })
  );
});
