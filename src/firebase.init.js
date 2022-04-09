// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCztQht5PiCrt1xY6hQCDOP9bHjY1S-Lek",
  authDomain: "email-password-auth-bcb83.firebaseapp.com",
  projectId: "email-password-auth-bcb83",
  storageBucket: "email-password-auth-bcb83.appspot.com",
  messagingSenderId: "245552624425",
  appId: "1:245552624425:web:761daaa215bf74d852fd38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;