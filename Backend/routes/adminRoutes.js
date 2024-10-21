const express = require("express");
const Admin = require("../models/adminModel"); // Adjust the path as necessary

const router = express.Router();

// Login route for admins
router.post("/login", async (req, res) => {
  const { adminKey, password } = req.body;

  try {
    const admin = await Admin.findOne({ adminKey });

    // Check if the admin exists and the password matches
    if (!admin || admin.password !== password) {
      return res.status(400).json({ message: "Invalid admin key or password" });
    }

    res
      .status(200)
      .json({ message: "Login successful", admin: admin.adminKey });
  } catch (error) {
    console.error("Error during login:", error.message); // Log the error for debugging
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
