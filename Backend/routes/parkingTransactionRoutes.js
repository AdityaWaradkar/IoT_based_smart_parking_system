// routes/parkingTransactionRoutes.js
const express = require('express');
const ParkingTransaction = require('../models/ParkingTransaction'); // Import the ParkingTransaction model
const router = express.Router();

// POST: Save a parking transaction
router.post("/data", async (req, res) => {
  const { userName, parkingDuration, totalPrice, paymentId } = req.body;

  try {
    // Optional: Check if a transaction already exists for the same user and payment ID
    const existingTransaction = await ParkingTransaction.findOne({ paymentId });
    
    if (existingTransaction) {
      return res.status(400).json({ message: "Transaction already exists" });
    }

    // Create a new ParkingTransaction instance
    const newTransaction = new ParkingTransaction({
      userName,
      parkingDuration,
      totalPrice,
      paymentId, // Include paymentId in the transaction
      paymentDateTime: new Date(), // Current date and time
    });

    // Save the transaction to the database
    await newTransaction.save();

    res.status(201).json({ message: "Transaction saved successfully", transaction: newTransaction });
  } catch (error) {
    console.error("Error saving transaction:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
