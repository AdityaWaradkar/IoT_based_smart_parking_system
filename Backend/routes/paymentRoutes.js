const express = require('express');
const Razorpay = require('razorpay');
const router = express.Router();

const razorpay = new Razorpay({
  key_id: 'rzp_test_NjMCuCfEfKS9bs',  // Your Razorpay test key
  key_secret: '3qYE4ektLBqe0CwsXLSRKkmF' // Your Razorpay test secret
});

// Route to create an order
router.post('/createOrder', async (req, res) => {
  const { amount } = req.body; 

  // Validate the received amount
  if (!amount || typeof amount !== 'number' || amount <= 0) {
    console.error("Invalid amount received:", amount);
    return res.status(400).json({ error: 'Invalid amount. Amount must be a positive number.' });
  }

  console.log("Received Amount from Frontend (in paise):", amount); // Log received amount in paise

  const options = {
    amount: amount,  // Use the received amount in paise directly
    currency: 'INR',
    receipt: `order_rcptid_${Math.floor(Math.random() * 10000)}`, // Random receipt ID for uniqueness
  };

  try {
    const order = await razorpay.orders.create(options);
    console.log("Order created successfully:", order); // Log order details

    // Send a structured response back to the frontend
    res.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      status: order.status,
    });
  } catch (error) {
    console.error("Error creating order:", error); // Log any errors encountered
    res.status(500).json({ error: 'Error creating order. Please try again.' });
  }
});

module.exports = router;
