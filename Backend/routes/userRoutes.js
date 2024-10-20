// routes/userRoutes.js
const express = require("express");
const User = require("../models/userModel");

const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  const { name, email, carNumber, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    F;
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ name, email, carNumber, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login a user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Return user ID, name, and a success message
    res.status(200).json({
      message: "Login successful",
      userId: user._id, // Include the user ID (ObjectId)
      userName: user.name, // Include the user's name (userName)
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
