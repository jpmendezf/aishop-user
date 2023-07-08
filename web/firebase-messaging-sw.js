importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

firebase.initializeApp({
    apiKey: "AIzaSyAng1nflfmFwYG-yOpiKCICd72JAWijNkw",
  authDomain: "aishop-391614.firebaseapp.com",
  databaseURL: "https://aishop-391614-default-rtdb.firebaseio.com",
  projectId: "aishop-391614",
  storageBucket: "aishop-391614.appspot.com",
  messagingSenderId: "547518803970",
  appId: "1:547518803970:web:9e4c191b3aeeccb758f71b",
  measurementId: "G-ZC18TZQPCC",
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
        })
        .then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            const title = payload.notification.title;
            const options = {
                body: payload.notification.score
              };
            return registration.showNotification(title, options);
        });
    return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
    console.log('notification received: ', event)
});