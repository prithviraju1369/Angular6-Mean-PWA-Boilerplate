
self.addEventListener('push', function(event) {
  console.log('Service Worker recived a push message', event.data.text());

  var title = 'New question posted. Click to open';
  var content=event.data.text();
  event.waitUntil(
    self.registration.showNotification(title, {
      'body': JSON.parse(content).text,
      'data': JSON.parse(content).docId,
      'icon': './assets/digigyan-48.png'
    }));
});

self.addEventListener('notificationclick', function(event) {
  console.log('Notification click: tag', event.notification.tag);
  event.notification.close();
  var url = "https://meanboilerplate.herokuapp.com/#/article/" + event.notification.data;
  event.waitUntil(
    clients.matchAll({
      type: 'window'
    })
    .then(function(windowClients) {
      console.log('WindowClients', windowClients);
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        console.log('WindowClient', client);
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});