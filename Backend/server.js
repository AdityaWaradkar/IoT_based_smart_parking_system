// server.js
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors'); // Import the cors middleware

connectDB();

const app = express();

app.use(cors()); // This will allow all origins

app.use(express.json());

app.use('/api/users', userRoutes);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
