const express = require('express');
const ParkingDuration = require('../models/parkingDuration'); // Ensure this path is correct
const router = express.Router();

// POST endpoint to create parking duration
router.post('/parkingDuration', async (req, res) => {
  const { userName, hours, minutes } = req.body; // Get userName from the request body

  // Validate the request body
  if (!userName) {
    console.log("User Name is missing in the request."); // Log if userName is missing
    return res.status(400).json({ message: 'User Name is required.' });
  }

  if (hours == null || minutes == null) {
    console.log("Hours or minutes are missing:", { hours, minutes }); // Log missing hours/minutes
    return res.status(400).json({ message: 'Hours and minutes are required.' });
  }

  try {
    const parkingDuration = new ParkingDuration({ userName, hours, minutes });
    await parkingDuration.save();
    console.log("Parking duration saved successfully:", parkingDuration); // Log success
    res.status(201).json(parkingDuration);
  } catch (error) {
    console.error("Error saving parking duration:", error); // Log any error that occurs
    res.status(500).json({ message: 'Failed to save parking duration.', error: error.message });
  }
});

module.exports = router;
