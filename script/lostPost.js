import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';

import {
  getFirestore,
  doc,
  setDoc,
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

import {
  getAuth,
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

//Firebase Variables
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

//Dom Variables
const createPost = document.querySelector('#post-Button');
const createButton = document.querySelector('#post-Button');
const postForm = document.querySelector('#post-Form');

//Submit Button for Lost and Found
const lostSubmit = document.querySelector('#lostSubmit');

//Form Variables
const productImage = document.querySelector('#productImage');
const userName = document.querySelector('#inputName');
const userNumber = document.querySelector('#inputPhone');
const productName = document.querySelector('#inputItem');
const lostLocation = document.querySelector('#lostLocation');

//Image Path
let productImagePath;

onAuthStateChanged(auth, (user) => {
  if (user) {
    signOutButton.style.display = 'block';
    signInButton.style.display = 'none';
    createPost.classList.remove('hidden');
  } else {
    signOutButton.style.display = 'none';
    signInButton.style.display = 'block';
    createPost.classList.add('hidden');
  }
});

//Make Form Visible
const showForm = () => {
  if (postForm.classList.contains('hidden')) {
    postForm.classList.remove('hidden');
    createButton.innerHTML = 'Cancel';
  } else {
    postForm.classList.add('hidden');
    createButton.innerHTML = 'Create Post';
  }
};

const uploadImage = (uploadFile) => {
  const [file] = uploadFile.files;
  if (file && file.type.includes('image')) {
    const formdata = new FormData();
    formdata.append('image', file);

    fetch('/upload', {
      method: 'post',
      body: formdata,
    })
      .then((res) => res.json())
      .then((data) => {
        productImagePath = `${location.origin}/${data}`;
        console.log(productImagePath);
      });
  } else {
    alert('Please Upload all Fields Correctly');
  }
};

productImage.addEventListener('change', (e) => {
  e.preventDefault();
  //Upload Image
  uploadImage(productImage);
});

lostSubmit.addEventListener('click', async (e) => {
  e.preventDefault();

  if (
    userName.value.length &&
    userNumber.value.length &&
    productName.value.length &&
    lostLocation.value.length
  ) {
    //Generating id
    let letters = 'abcdefghijklmnopqrstuvwxyz';
    let itemTitle = productName.value;
    let id = '';
    for (let i = 0; i < 8; i++) {
      id += letters[Math.floor(Math.random() * letters.length)];
    }

    //Setting up name of the Document
    let docName = `${itemTitle}-${id}`;

    //Storing data in database
    await setDoc(doc(db, 'lostFound', docName), {
      image: `${productImagePath}`,
      user: `${userName.value}`,
      phone: `${userNumber.value}`,
      item: `${productName.value}`,
      location: `${lostLocation.value}`,
    });

    location.reload();
  } else {
    alert('Please Fill all Fields and Upload Image');
  }
});

createButton.addEventListener('click', showForm);
