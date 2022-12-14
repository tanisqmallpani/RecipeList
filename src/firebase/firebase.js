// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBJCJhkHbXdvpYmktklsvSnAZcF5t4ms9I",
    authDomain: "recipe-list-f1a5f.firebaseapp.com",
    projectId: "recipe-list-f1a5f",
    storageBucket: "recipe-list-f1a5f.appspot.com",
    messagingSenderId: "67693401477",
    appId: "1:67693401477:web:45654b69645cc5ce6f20ec"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const auth = getAuth(app);

export {
  firestore,
  auth,
}