const express = require("express");
const Admin = require("../models/adminModel");
const Slot = require("../models/slot");
const fetch = require("node-fetch"); // Using node-fetch to fetch data from ThingSpeak

const router = express.Router();

// 1. Admin Login
router.post("/login", async (req, res) => {
  const { adminKey, password } = req.body;

  try {
    const admin = await Admin.findOne({ adminKey });

    if (!admin || admin.password !== password) {
      return res.status(400).json({ message: "Invalid admin key or password" });
    }

    res
      .status(200)
      .json({ message: "Login successful", admin: admin.adminKey });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});




module.exports = router;
