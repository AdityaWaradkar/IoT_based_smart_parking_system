const mongoose = require('mongoose');

const ParkingDurationSchema = new mongoose.Schema({
  userName: {
    type: String, // Changed from ObjectId to String for userName
    required: true,
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
