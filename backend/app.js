import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';  // Import the route files
import parkingRoutes from './routes/parkingRoutes.js';  // Import the route files
import bookingRoutes from './routes/bookingRoutes.js';  // Import the route files
import { db, auth } from './config/firebase.js';  // Import the initialized Firebase instance

const app = express();
app.use(cors());
app.use(express.json());

// Routes and other logic
app.use('/api/auth', authRoutes);  // Handles user and admin authentication
app.use('/api/parking', parkingRoutes);  // Handles parking-related routes
app.use('/api/booking', bookingRoutes);  // Handles booking-related routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
