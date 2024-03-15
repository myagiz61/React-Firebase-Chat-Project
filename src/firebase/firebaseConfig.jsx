// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALDJ2sHvN2BerdYNI6738yctSWWZNMgs4",
  authDomain: "firabase-chat-1bb87.firebaseapp.com",
  projectId: "firabase-chat-1bb87",
  storageBucket: "firabase-chat-1bb87.appspot.com",
  messagingSenderId: "713200584379",
  appId: "1:713200584379:web:32ebd310af4f376dcdcb9e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// yetkşlendirme işlemi kurulum
export const auth = getAuth(app);

// google sağlayıcısı kurulum
export const provider = new GoogleAuthProvider();

// veri tabanı kurulum
export const db = getFirestore(app);
