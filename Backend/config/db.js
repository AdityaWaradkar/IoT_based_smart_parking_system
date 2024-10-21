const mongoose = require("mongoose");

// Replace <db_password> with your actual database user's password
const mongoURI =
  "mongodb+srv://adityawaradkar2004:5LrmqebMrSu5nYzR@parksense.irsm2.mongodb.net/IoT_based_smart_parking_system?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
