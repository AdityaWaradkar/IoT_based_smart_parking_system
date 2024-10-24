const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const parkingRoutes = require("./routes/parkingDurationRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const parkingTransactionRoutes = require("./routes/parkingTransactionRoutes");
const parkingHistoryRoutes = require("./routes/parkingHistoryRoutes");
const slotRoutes = require("./routes/slotRoutes");
const cors = require("cors");
const fetch = require("node-fetch");
const Slot = require("./models/slot");

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/parking", parkingRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/parkingTransaction", parkingTransactionRoutes);
app.use("/api/parkingHistory", parkingHistoryRoutes);
app.use("/api/slots", slotRoutes);

// Function to fetch from ThingSpeak
async function fetchFromThingSpeak() {
  const response = await fetch(
    "https://api.thingspeak.com/channels/2704658/feeds.json?api_key=32MSZR5SR9CQH0WA&results=1"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data from ThingSpeak");
  }

  const data = await response.json();
  return data.feeds; // Return feeds data
}

// Function to sync slots with ThingSpeak
async function syncSlotsWithThingSpeak() {
  try {
    console.log("Syncing slots with ThingSpeak...");

    const thingspeakData = await fetchFromThingSpeak();
    const latestEntry = thingspeakData[thingspeakData.length - 1];

    if (latestEntry) {
      // Map fetched data to slot updates, treating null as available
      const slotUpdates = [
        { slotNumber: 1, slotStatus: latestEntry.field1 === null ? 0 : 1 },
        { slotNumber: 2, slotStatus: latestEntry.field2 === null ? 0 : 1 },
        { slotNumber: 3, slotStatus: latestEntry.field3 === null ? 0 : 1 },
        { slotNumber: 4, slotStatus: latestEntry.field4 === null ? 0 : 1 },
        { slotNumber: 5, slotStatus: latestEntry.field5 === null ? 0 : 1 },
        { slotNumber: 6, slotStatus: latestEntry.field6 === null ? 0 : 1 },
      ];

      const updatePromises = slotUpdates.map((slot) =>
        Slot.updateOne(
          { slotNumber: slot.slotNumber },
          { slotStatus: slot.slotStatus }
        )
      );

      await Promise.all(updatePromises);
      console.log("Slot data updated from ThingSpeak");
    } else {
      console.log("No data found in ThingSpeak feed");
    }
  } catch (error) {
    console.error("Error updating slot data:", error);
  }
}

// Call the sync function at the start
syncSlotsWithThingSpeak();

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Handle undefined routes (optional)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Port Configuration
const PORT = process.env.PORT || 5000;

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown on SIGINT (Ctrl+C)
process.on("SIGINT", () => {
  console.log("Shutting down server...");
  server.close(() => {
    console.log("Server closed.");
    process.exit();
  });
});
