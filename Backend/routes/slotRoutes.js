const express = require("express");
const router = express.Router();
const Slot = require("../models/slot");

// 1. Check Slot Availability using Slot database
router.get("/check-availability", async (req, res) => {
  try {
    // Fetch all slots from the database
    const slots = await Slot.find({}); // Get all slots

    // Map the slots to their availability status
    const slotAvailability = slots.map(
      (slot) => (slot.slotStatus === 0 ? 0 : 1) // 0 for available, 1 for occupied
    );

    // Send the response in the desired format
    res.json({ slots: slotAvailability });
  } catch (error) {
    console.error("Error checking slot availability:", error);
    res.status(500).send("Error checking slot availability");
  }
});

// 2. Book a Slot
router.post("/book", async (req, res) => {
  try {
    // Find the first available slot
    const availableSlot = await Slot.findOne({ slotStatus: 0 }); // Find the first slot that is available (0)

    if (!availableSlot) {
      return res.status(400).json({ message: "No slots available" });
    }

    // Mark the slot as occupied
    availableSlot.slotStatus = 1; // Mark as occupied (1)
    availableSlot.occupiedUntil = new Date(Date.now() + 60 * 60 * 1000); // Occupied for 1 hour
    await availableSlot.save();

    res.json({
      message: "Slot booked successfully",
      slotId: availableSlot._id,
    });
  } catch (error) {
    console.error("Error booking slot:", error);
    res.status(500).send("Error booking slot");
  }
});

// 3. Mark the first occupied slot as available after parking duration
router.put("/available", async (req, res) => {
  try {
    // Find the first occupied slot
    const slot = await Slot.findOne({ slotStatus: 1 }); // Assuming 1 means occupied

    if (slot && Date.now() > slot.occupiedUntil) {
      slot.slotStatus = 0; // Mark as available (0)
      slot.occupiedUntil = null; // Clear occupiedUntil
      await slot.save();
      res.json({ message: "Slot marked as available" });
    } else {
      res
        .status(400)
        .json({ message: "No occupied slots or slot still occupied" });
    }
  } catch (error) {
    console.error("Error updating slot status:", error);
    res.status(500).send("Error updating slot status");
  }
});

// Route to mark the first occupied slot as available
router.put("/unreserve", async (req, res) => {
  try {
    // Find the first slot with status 1 (occupied)
    const slot = await Slot.findOne({ slotStatus: 1 });

    if (slot) {
      slot.slotStatus = 0; // Mark as available (0)
      slot.occupiedUntil = null; // Clear occupiedUntil if necessary
      await slot.save(); // Save the updated slot

      // Do not return anything after the update
      res.sendStatus(204); // Send No Content status
    } else {
      res.sendStatus(404); // No occupied slots found, send Not Found status
    }
  } catch (error) {
    console.error("Error marking slot as available:", error);
    res.sendStatus(500); // Internal Server Error
  }
});

module.exports = router;
