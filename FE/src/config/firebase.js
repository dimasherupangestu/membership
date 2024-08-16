import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCv7TxYWm2sI7ztsL2_d8txBO7lPZXwZ3E",
  authDomain: "membership-1aa38.firebaseapp.com",
  projectId: "membership-1aa38",
  storageBucket: "membership-1aa38.appspot.com",
  messagingSenderId: "817980873955",
  appId: "1:817980873955:web:ab10ffcc5e66eaf9f6f9d6",
  measurementId: "G-F7MP4DZ2PS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app };
