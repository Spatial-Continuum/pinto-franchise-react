importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyBFl9s82b-EJ-linNjleFqFvyGM9Op2tVY",
  authDomain: "pinto-project-e1577.firebaseapp.com",
  projectId: "pinto-project-e1577",
  storageBucket: "pinto-project-e1577.firebasestorage.app",
  messagingSenderId: "606333588288",
  appId: "1:606333588288:web:e90a32733ce35417fee0a5",
  measurementId: "G-2L33Q0VRXH",
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message:", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
