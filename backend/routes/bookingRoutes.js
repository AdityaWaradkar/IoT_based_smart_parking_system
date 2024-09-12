import express from 'express';
const router = express.Router();

// Define booking routes here
router.post('/book', (req, res) => {
  // Example route for booking a parking spot
  const { userId, slotId, time } = req.body;
  res.status(201).json({ message: 'Parking slot booked successfully', userId, slotId, time });
});

export default router;
