// models/ParkingTransaction.js
const mongoose = require('mongoose');

const ParkingTransactionSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  parkingDuration: {
    type: String,
    required: true, // Use Number if duration is in hours or minutes
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  paymentDateTime: {
    type: Date,
    default: Date.now, // Automatically set to current date/time
  },
});

const ParkingTransaction = mongoose.model('ParkingTransaction', ParkingTransactionSchema);

module.exports = ParkingTransaction;
