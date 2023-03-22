import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBJNHTSrH3atgAwdYngsiDBUfxqJ6x83iE",
  authDomain: "crud-b2589.firebaseapp.com",
  projectId: "crud-b2589",
  storageBucket: "crud-b2589.appspot.com",
  messagingSenderId: "334460170193",
  appId: "1:334460170193:web:3e8b1a510c2b63e830baf0",
  measurementId: "G-FTZDX8KVBH"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);