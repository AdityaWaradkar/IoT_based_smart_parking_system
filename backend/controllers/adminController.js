// /controllers/adminController.js
import { auth } from "../config/firebase.js";

// Admin Login
export const loginAdmin = async (req, res) => {
  const { adminKey, password } = req.body;

  // Hardcoded admin credentials
  const adminCredentials = {
    key: "admin01", // Replace with your actual admin key
    password: "admin01", // Replace with your actual admin password
  };

  // Check if the provided credentials match
  if (
    adminKey === adminCredentials.key &&
    password === adminCredentials.password
  ) {
    res.status(200).json({ success: true, message: "Admin login successful!" });
  } else {
    res.status(400).json({ success: false, message: "Invalid credentials." });
  }
};
