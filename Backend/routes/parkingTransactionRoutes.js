const express = require("express");
const ParkingTransaction = require("../models/ParkingTransaction");
const router = express.Router();

router.post("/data", async (req, res) => {
  const { userName, parkingDuration, totalPrice, paymentId } = req.body;

  try {
    const existingTransaction = await ParkingTransaction.findOne({ paymentId });

    if (existingTransaction) {
      return res.status(400).json({ message: "Transaction already exists" });
    }

    const newTransaction = new ParkingTransaction({
      userName,
      parkingDuration,
      totalPrice,
      paymentId,
      paymentDateTime: new Date(),
    });

    await newTransaction.save();
    res
      .status(201)
      .json({
        message: "Transaction saved successfully",
        transaction: newTransaction,
      });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
