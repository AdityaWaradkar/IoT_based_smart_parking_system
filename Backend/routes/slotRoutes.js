const express = require("express");
const router = express.Router();
const Slot = require("../models/slot");
const fetch = require("node-fetch"); // Using node-fetch to fetch data from ThingSpeak

// 1. Fetch data from ThingSpeak
async function fetchFromThingSpeak() {
  const response = await fetch(
    "https://api.thingspeak.com/channels/2704658/feeds.json?api_key=32MSZR5SR9CQH0WA"
  );
  const data = await response.json();
  return data.feeds;
}

// 2. Update Slot Table from ThingSpeak
router.post("/sync-slots-with-thingspeak", async (req, res) => {
  try {
    console.log("Hurray, inside update slot route");

    const thingspeakData = await fetchFromThingSpeak();

    // Assuming you only need the latest entry (the last feed)
    const latestEntry = thingspeakData[thingspeakData.length - 1];

    if (latestEntry) {
      const slotUpdates = [
        {
          slotNumber: 1,
          isAvailable:
            latestEntry.field1 === "0" || latestEntry.field1 === null,
        },
        {
          slotNumber: 2,
          isAvailable:
            latestEntry.field2 === "0" || latestEntry.field2 === null,
        },
        {
          slotNumber: 3,
          isAvailable:
            latestEntry.field3 === "0" || latestEntry.field3 === null,
        },
        {
          slotNumber: 4,
          isAvailable:
            latestEntry.field4 === "0" || latestEntry.field4 === null,
        },
        {
          slotNumber: 5,
          isAvailable:
            latestEntry.field5 === "0" || latestEntry.field5 === null,
        },
        {
          slotNumber: 6,
          isAvailable:
            latestEntry.field6 === "0" || latestEntry.field6 === null,
        },
      ];

      // Update MongoDB slot table based on the latest entry
      const updatePromises = slotUpdates.map(async (slot) => {
        return Slot.updateOne(
          { slotNumber: slot.slotNumber },
          { isAvailable: slot.isAvailable }
        );
      });

      // Wait for all update operations to complete
      await Promise.all(updatePromises);

      res.status(200).send("Slot data updated from ThingSpeak");
    }
  } catch (error) {
    console.error("Error updating slot data:", error);
    res.status(500).send("Error updating slot data");
  }
});

// 3. Check Slot Availability using ThingSpeak
router.get("/check-availability", async (req, res) => {
  try {
    const thingspeakData = await fetchFromThingSpeak();

    // Assuming you only need the latest entry (the last feed)
    const latestEntry = thingspeakData[thingspeakData.length - 1];

    if (latestEntry) {
      const slotAvailability = [
        latestEntry.field1 === "0" || latestEntry.field1 === null ? 0 : 1,
        latestEntry.field2 === "0" || latestEntry.field2 === null ? 0 : 1,
        latestEntry.field3 === "0" || latestEntry.field3 === null ? 0 : 1,
        latestEntry.field4 === "0" || latestEntry.field4 === null ? 0 : 1,
        latestEntry.field5 === "0" || latestEntry.field5 === null ? 0 : 1,
        latestEntry.field6 === "0" || latestEntry.field6 === null ? 0 : 1,
      ];

      // Send the response in the desired format
      res.json({ slots: slotAvailability });
    } else {
      res.status(400).json({ message: "No data found in ThingSpeak feed" });
    }
  } catch (error) {
    console.error("Error checking slot availability:", error);
    res.status(500).send("Error checking slot availability");
  }
});

// 4. Book a Slot
router.post("/book", async (req, res) => {
  try {
    const availableSlot = await Slot.findOne({ isAvailable: true });

    if (!availableSlot) {
      return res.status(400).json({ message: "No slots available" });
    }

    // Payment logic (simplified here)
    const paymentSuccess = true; // Assume payment was successful

    if (paymentSuccess) {
      availableSlot.isAvailable = false; // Mark as occupied
      availableSlot.occupiedUntil = new Date(Date.now() + 60 * 60 * 1000); // Occupied for 1 hour
      await availableSlot.save();
      res.json({ message: "Slot booked successfully" });
    } else {
      res.status(400).json({ message: "Payment failed" });
    }
  } catch (error) {
    console.error("Error booking slot:", error);
    res.status(500).send("Error booking slot");
  }
});

// 5. Mark Slot Available after Parking Duration
router.put("/:id/available", async (req, res) => {
  try {
    const slot = await Slot.findById(req.params.id);

    if (slot && Date.now() > slot.occupiedUntil) {
      slot.isAvailable = true; // Mark as available
      slot.occupiedUntil = null;
      await slot.save();
      res.json({ message: "Slot marked as available" });
    } else {
      res.status(400).json({ message: "Slot still occupied" });
    }
  } catch (error) {
    console.error("Error updating slot status:", error);
    res.status(500).send("Error updating slot status");
  }
});

module.exports = router;
