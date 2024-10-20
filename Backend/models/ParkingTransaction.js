const mongoose = require("mongoose");

const ParkingTransactionSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  parkingDuration: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  paymentDateTime: {
    type: Date,
    default: Date.now,
  },
});

// Create the ParkingTransaction model
const ParkingTransaction = mongoose.model(
  "ParkingTransaction",
  ParkingTransactionSchema
);

module.exports = ParkingTransaction;
