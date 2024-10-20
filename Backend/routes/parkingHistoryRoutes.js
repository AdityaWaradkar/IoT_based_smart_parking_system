const express = require("express");
const ParkingTransaction = require("../models/ParkingTransaction");
const router = express.Router();

router.get("/history", async (req, res) => {
  try {
    const transactions = await ParkingTransaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch transactions", error: error.message });
  }
});

module.exports = router;
