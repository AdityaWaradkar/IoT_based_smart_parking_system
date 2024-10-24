// app.js
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
