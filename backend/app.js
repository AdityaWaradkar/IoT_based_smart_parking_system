// /app.js
import express from "express";
import userRoutes from "./routes/user.js"; // Import user routes
import adminRoutes from "./routes/admin.js"; // Import admin routes

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Use the user and admin routes
app.use("/user", userRoutes); // User routes
app.use("/admin", adminRoutes); // Admin routes

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
