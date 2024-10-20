const express = require("express");
const Razorpay = require("razorpay");
const router = express.Router();

const razorpay = new Razorpay({
  key_id: "rzp_test_NjMCuCfEfKS9bs",
  key_secret: "3qYE4ektLBqe0CwsXLSRKkmF",
});

router.post("/createOrder", async (req, res) => {
  const { amount } = req.body;

  if (!amount || typeof amount !== "number" || amount <= 0) {
    return res
      .status(400)
      .json({ error: "Invalid amount. Amount must be a positive number." });
  }

  const options = {
    amount: amount,
    currency: "INR",
    receipt: `order_rcptid_${Math.floor(Math.random() * 10000)}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      status: order.status,
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating order. Please try again." });
  }
});

module.exports = router;
