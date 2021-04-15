import firebase from 'firebase';
const firebaseConfig = {
  apiKey: 'AIzaSyB2qKtD4QAwLJ7j11necgwJiTM06ZrJcYU',
  authDomain: 'authflow-b11d2.firebaseapp.com',
  projectId: 'authflow-b11d2',
  storageBucket: 'authflow-b11d2.appspot.com',
  messagingSenderId: '941195465619',
  appId: '1:941195465619:web:935241a511353325834e66',
};

// Initialize Firebase
let Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;
