const mongoose = require("mongoose");

// Define the admin schema
const adminSchema = new mongoose.Schema({
  adminKey: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create the Admin model
const Admin = mongoose.model("Admin", adminSchema);

// Function to insert admin data
const insertAdminData = async () => {
  const adminData = [
    { adminKey: "admin1", password: "password1" },
    { adminKey: "admin2", password: "password2" },
    { adminKey: "admin3", password: "password3" },
  ];

  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      await Admin.insertMany(adminData);
      console.log("Admin data inserted successfully");
    } else {
      console.log("Admin data already exists");
    }
  } catch (error) {
    console.error("Error inserting admin data:", error.message);
  }
};

// Call the function to insert admin data
insertAdminData();
