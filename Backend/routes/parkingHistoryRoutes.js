// routes/parkingTransactionRoutes.js
const express = require('express');
const ParkingTransaction = require('../models/ParkingTransaction');
const router = express.Router();

// Existing POST route for saving transactions

// GET: Retrieve all parking transactions
router.get('/history', async (req, res) => {
  try {
    console.log("Inside route")
    const transactions = await ParkingTransaction.find(); // Fetch all transactions
    console.log(transactions);
    res.status(200).json(transactions); // Respond with the transaction data
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Failed to fetch transactions", error: error.message });
  }
});

module.exports = router;
