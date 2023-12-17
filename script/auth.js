// Import the functions you need from the SDKs you need

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';

// Add Firebase products that you want to use
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

const firebaseConfig = {
  apiKey: 'AIzaSyAEIjZLz1botE22-lA8l85y1Q-qaoQRHNM',
  authDomain: 'nsu-web-app.firebaseapp.com',
  projectId: 'nsu-web-app',
  storageBucket: 'nsu-web-app.appspot.com',
  messagingSenderId: '378321541934',
  appId: '1:378321541934:web:b8c084745ecd5d625eb8bf',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInButton = document.querySelector('#signInButton');
const signOutButton = document.querySelector('#signOutButton');

signOutButton.style.display = 'none';

const userSignIn = async () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

const userSignOut = async () => {
  signOut(auth)
    .then(() => {
      alert('You have signed out successfully!');
    })
    .catch((error) => {});
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    signOutButton.style.display = 'block';
    signInButton.style.display = 'none';
  } else {
    signOutButton.style.display = 'none';
    signInButton.style.display = 'block';
  }
});

signInButton.addEventListener('click', userSignIn);
signOutButton.addEventListener('click', userSignOut);
