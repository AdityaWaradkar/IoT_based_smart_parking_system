const express = require("express");
const ParkingDuration = require("../models/parkingDuration"); // Adjust the path as necessary
const router = express.Router();

// Route to create parking duration
router.post("/parkingDuration", async (req, res) => {
  const { userName, hours, minutes } = req.body;

  // Validate required fields
  if (!userName) {
    return res.status(400).json({ message: "User Name is required." });
  }

  if (hours == null || minutes == null) {
    return res.status(400).json({ message: "Hours and minutes are required." });
  }

  // Check for valid hour and minute values
  if (hours < 0 || minutes < 0 || minutes > 59) {
    return res.status(400).json({ message: "Invalid hours or minutes." });
  }

  try {
    const parkingDuration = new ParkingDuration({ userName, hours, minutes });
    await parkingDuration.save();
    res.status(201).json(parkingDuration); // Respond with the created parking duration
  } catch (error) {
    console.error("Error saving parking duration:", error.message); // Log the error for debugging
    res.status(500).json({
      message: "Failed to save parking duration.",
      error: error.message,
    });
  }
});

module.exports = router;
