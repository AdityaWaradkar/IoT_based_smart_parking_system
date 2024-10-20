const express = require("express");
const ParkingDuration = require("../models/parkingDuration");
const router = express.Router();

router.post("/parkingDuration", async (req, res) => {
  const { userName, hours, minutes } = req.body;

  if (!userName) {
    return res.status(400).json({ message: "User Name is required." });
  }

  if (hours == null || minutes == null) {
    return res.status(400).json({ message: "Hours and minutes are required." });
  }

  try {
    const parkingDuration = new ParkingDuration({ userName, hours, minutes });
    await parkingDuration.save();
    res.status(201).json(parkingDuration);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to save parking duration.",
        error: error.message,
      });
  }
});

module.exports = router;
