const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  slotNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  slotStatus: {
    type: Number,
    required: true,
    default: 0, // 0 for available, 1 for occupied
  },
});

const Slot = mongoose.model("Slot", slotSchema);

module.exports = Slot;
