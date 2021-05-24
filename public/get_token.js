var firebaseConfig = {
  apiKey: "AIzaSyD2MnmAZ1tZz7JGI18lKaRKqNZD4V9pZi8",
  authDomain: "calcetweet.firebaseapp.com",
  projectId: "calcetweet",
  storageBucket: "calcetweet.appspot.com",
  messagingSenderId: "269710413018",
  appId: "1:269710413018:web:6f8f36285e7280476fa9e3"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
messaging.getToken(messaging, { vapidKey: 'BIFcySoRe2NzzdFDdH79vUjd65zsg_CIPeuIPqFSWP6smT1BArKyb3XrhraNfsz03jamAs2MEXbC-0NFRQVQb5o' }).then((currentToken) => {
  if (currentToken) {
    // Send the token to your server and update the UI if necessary
    // ...
    console.log('Registration token available.', currentToken);
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.token.length === 0) {
      if (currentToken !== user.token) {
        console.log('send token to server');
      }
    }
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});

messaging.onMessage((payload) => {
  console.log('Message received. ', payload);
  // ...
});