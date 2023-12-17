import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';

import {
  getFirestore,
  collection,
  getDocs,
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyAEIjZLz1botE22-lA8l85y1Q-qaoQRHNM',
  authDomain: 'nsu-web-app.firebaseapp.com',
  projectId: 'nsu-web-app',
  storageBucket: 'nsu-web-app.appspot.com',
  messagingSenderId: '378321541934',
  appId: '1:378321541934:web:b8c084745ecd5d625eb8bf',
};

//Firebase Variables
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const querySnapShot = await getDocs(collection(db, 'lostFound'));

querySnapShot.forEach((doc) => {
  const parentDiv = document.querySelector('.parent-div');
  const div = document.createElement('div');
  div.classList.add('card', 'mt-5', 'card-grid');

  div.innerHTML = `<img
  src="${doc.data().image}"
  class="card-img-top image-size"
  alt="..."
/>
<div class="card-body">
  <h3 class="card-title">${doc.data().item}</h3>
  <p class="card-text">
    <strong>Name:</strong>${doc.data().user}<br />
    <strong>Mobile:</strong> ${doc.data().phone} <br />
    <h6><strong>Price:</strong> ${doc.data().location} </h6><br />
    <i class="fas fa-calendar-alt"></i> ${doc
      .data()
      .date.toString()
      .slice(0, 25)}
  </p>
</div>`;

  parentDiv.appendChild(div);
});

// console.log(getDocs(collection(db, 'shop')));
