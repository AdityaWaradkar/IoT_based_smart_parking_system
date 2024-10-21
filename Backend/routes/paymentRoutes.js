const express = require("express");
const Razorpay = require("razorpay");
const router = express.Router();

// Initialize Razorpay with your API keys
const razorpay = new Razorpay({
  key_id: "rzp_test_NjMCuCfEfKS9bs", // Your Razorpay Key ID
  key_secret: "3qYE4ektLBqe0CwsXLSRKkmF", // Your Razorpay Key Secret
});

// Route to create a new Razorpay order
router.post("/createOrder", async (req, res) => {
  const { amount } = req.body;

  // Validate amount
  if (!amount || typeof amount !== "number" || amount <= 0) {
    return res
      .status(400)
      .json({ error: "Invalid amount. Must be a positive number." });
  }

  // Razorpay order options
  const options = {
    amount: amount * 100, // Razorpay expects the amount in paise
    currency: "INR",
    receipt: `order_rcptid_${Math.floor(Math.random() * 10000)}`,
  };

  try {
    // Create the order with Razorpay
    const order = await razorpay.orders.create(options);
    // Send back order details
    res.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      status: order.status,
    });
  } catch (error) {
    console.error("Error creating order:", error.message); // Log the error for debugging
    res.status(500).json({ error: "Error creating order. Please try again." });
  }
});

module.exports = router;
