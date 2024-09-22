import { auth, db } from "../config/firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set, get, query, orderByChild, equalTo } from "firebase/database";

// Register User
export const registerUser = async (req, res) => {
  const { name, email, carNumber, password } = req.body;

  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Store additional user information in the database
    await set(ref(db, "users/" + user.uid), {
      carNumber,
      name,
      email,
      password, // Ideally, use a hashed password or remove it from the database
    });

    res
      .status(201)
      .json({ success: true, message: "User registered successfully!" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


// User Login
export const loginUser = async (req, res) => {
  const { carNumber, password } = req.body;

  try {
    // Retrieve user data by car number
    const userSnapshot = await db
      .ref("users")
      .orderByChild("carNumber")
      .equalTo(carNumber)
      .once("value");
    const userData = userSnapshot.val();

    if (userData) {
      const userKey = Object.keys(userData)[0]; // Get the first user key
      const user = userData[userKey];

      // Directly compare the plain text password
      if (user.password === password) {
        res.status(200).json({ success: true, user });
      } else {
        res.status(400).json({ success: false, message: "Invalid password." });
      }
    } else {
      res.status(400).json({ success: false, message: "User not found." });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: "Login failed." });
  }
};