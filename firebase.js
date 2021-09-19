import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: process.env.STORE_FIREBASE_APIKEY,
  authDomain: process.env.STORE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.STORE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.STORE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.STORE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.STORE_FIREBASE_APP_ID
};

const app = !getApps().length
  ? initializeApp(firebaseConfig): getApp();

  const db = getFirestore();
  export default db;


  // databaseURL: process.env.STORE_FIREBASE_DATABASE_URL,