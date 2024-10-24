const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  slotNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  isAvailable: {
    type: Number, // Change this to Number
    required: true,
    default: 0, // 0 for available, 1 for occupied
  },
  occupiedUntil: {
    type: Date,
    default: null,
  },
});

const Slot = mongoose.model("Slot", slotSchema);

module.exports = Slot;
