
self.addEventListener('push', function(event) {
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/icon-192x192.png',
    badge: '/icon-96x96.png'
  };
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});
