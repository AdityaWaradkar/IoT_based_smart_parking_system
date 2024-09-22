import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child } from "firebase/database";

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

// Initialize Realtime Database
const db = getDatabase(app);

// Example of writing data to the database
const writeData = async () => {
  try {
    await set(ref(db, "test/"), {
      username: "example_user",
      email: "user@example.com",
    });
    console.log("Data written successfully");
  } catch (error) {
    console.error("Error writing data:", error);
  }
};

// Example of reading data from the database
const readData = async () => {
  const dbRef = ref(db);
  try {
    const snapshot = await get(child(dbRef, "test/"));
    if (snapshot.exists()) {
      console.log("Data:", snapshot.val());
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.error("Error reading data:", error);
  }
};

// Call the functions
await writeData();
await readData();
