import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAqGRxEgaua4KCQJDtuJz-IBg7Nsc46mPI",
  authDomain: "smart-parking-system-c435c.firebaseapp.com",
  databaseURL: "https://smart-parking-system-c435c-default-rtdb.firebaseio.com",
  projectId: "smart-parking-system-c435c",
  storageBucket: "smart-parking-system-c435c.appspot.com",
  messagingSenderId: "777684581555",
  appId: "1:777684581555:web:e5d0eb68a482bb82dec4c6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
