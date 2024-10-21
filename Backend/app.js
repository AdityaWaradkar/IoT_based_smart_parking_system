const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const parkingRoutes = require("./routes/parkingDurationRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const parkingTransactionRoutes = require("./routes/parkingTransactionRoutes");
const parkingHistoryRoutes = require("./routes/parkingHistoryRoutes");
const cors = require("cors");
const morgan = require("morgan"); // Logging middleware

// Connect to the database
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev")); // Log incoming requests

// Define routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/parking", parkingRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/parkingTransaction", parkingTransactionRoutes);
app.use("/api/parkingHistory", parkingHistoryRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Set the port
const PORT = 5000; // Hardcoded port

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("Shutting down server...");
  server.close(() => {
    console.log("Server closed.");
    process.exit();
  });
});
