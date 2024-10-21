const express = require("express");
const ParkingTransaction = require("../models/ParkingTransaction"); // Ensure the path is correct
const router = express.Router();

// Route to fetch parking transaction history
router.get("/history", async (req, res) => {
  try {
    const transactions = await ParkingTransaction.find(); // Fetch all transactions
    res.status(200).json(transactions); // Respond with the list of transactions
  } catch (error) {
    console.error("Error fetching transactions:", error.message); // Log the error for debugging
    res.status(500).json({
      message: "Failed to fetch transactions",
      error: error.message,
    });
  }
});

module.exports = router;
