const express = require("express");
const ParkingTransaction = require("../models/ParkingTransaction"); // Ensure the path is correct
const router = express.Router();

// Route to create a new parking transaction
router.post("/data", async (req, res) => {
  const { userName, parkingDuration, totalPrice, paymentId } = req.body;

  try {
    // Check if the transaction already exists
    const existingTransaction = await ParkingTransaction.findOne({ paymentId });
    if (existingTransaction) {
      return res.status(400).json({ message: "Transaction already exists" });
    }

    // Create a new transaction
    const newTransaction = new ParkingTransaction({
      userName,
      parkingDuration,
      totalPrice,
      paymentId,
      paymentDateTime: new Date(), // Set the payment date/time to now
    });

    // Save the new transaction to the database
    await newTransaction.save();
    res.status(201).json({
      message: "Transaction saved successfully",
      transaction: newTransaction, // Return the saved transaction
    });
  } catch (error) {
    console.error("Error saving transaction:", error.message); // Log the error for debugging
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
