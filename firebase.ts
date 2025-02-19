
// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCcOEkj7uJIM0NSLJWuhLiTjoYXgVCPAEM",
//   authDomain: "file-store-9bc94.firebaseapp.com",
//   projectId: "file-store-9bc94",
//   storageBucket: "file-store-9bc94.appspot.com",
//   messagingSenderId: "987491187517",
//   appId: "1:987491187517:web:9afeaaa5aeb9b66a5ce354",
//   measurementId: "G-S34NRGB19R"
// };


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_UPLOADCARE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};


// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);

const auth = getAuth(app);
export { app,  auth, storage };