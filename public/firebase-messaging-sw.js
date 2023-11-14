

// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

const firebaseConfig = {
    apiKey: "AIzaSyBdNnOg_OjNkKsxd3QEAvqDjvgeYWtQUIg",
    authDomain: "fir-fcm-8d942.firebaseapp.com",
    projectId: "fir-fcm-8d942",
    storageBucket: "fir-fcm-8d942.appspot.com",
    messagingSenderId: "884651803428",
    appId: "1:884651803428:web:0c00ae7605494184ffe9b1",
    measurementId: "G-FJQ0176Y0M",
};
// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();


messaging.onBackgroundMessage(function (payload) {
    console.log('Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };
    // eslint-disable-next-line no-restricted-globals
    self.registration.showNotification(notificationTitle,
        notificationOptions);
});