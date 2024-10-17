const express = require('express');
const ParkingDuration = require('../models/parkingDuration'); // Ensure this path is correct
const router = express.Router();

// POST endpoint to create parking duration
router.post('/parkingDuration', async (req, res) => {
  const { userId, hours, minutes } = req.body; // Get userId from the request body

  // Validate the request body
  if (!userId) {
    console.log("User ID is missing in the request."); // Log if user ID is missing
    return res.status(400).json({ message: 'User ID is required.' });
  }

  // Optionally, validate userId format if necessary
  if (typeof userId !== 'string' || userId.length !== 24) {
    console.log("Invalid User ID format:", userId); // Log invalid user ID
    return res.status(400).json({ message: 'Invalid User ID format.' });
  }

  if (hours == null || minutes == null) {
    console.log("Hours or minutes are missing:", { hours, minutes }); // Log missing hours/minutes
    return res.status(400).json({ message: 'Hours and minutes are required.' });
  }

  try {
    const parkingDuration = new ParkingDuration({ userId, hours, minutes });
    await parkingDuration.save();
    console.log("Parking duration saved successfully:", parkingDuration); // Log success
    res.status(201).json(parkingDuration);
  } catch (error) {
    console.error("Error saving parking duration:", error); // Log any error that occurs
    res.status(500).json({ message: 'Failed to save parking duration.', error: error.message });
  }
});

module.exports = router;
