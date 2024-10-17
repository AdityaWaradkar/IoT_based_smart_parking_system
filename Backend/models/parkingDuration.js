const mongoose = require('mongoose');

const ParkingDurationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    // Removed the ref field
  },
  hours: {
    type: Number,
    required: true,
    min: 0
  },
  minutes: {
    type: Number,
    required: true,
    min: 0,
    max: 59
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ParkingDuration = mongoose.model('ParkingDuration', ParkingDurationSchema);
module.exports = ParkingDuration;
