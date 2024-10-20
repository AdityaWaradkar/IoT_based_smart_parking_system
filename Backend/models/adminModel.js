const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  adminKey: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;

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
    }
  } catch (error) {
    console.error("Error inserting admin data:", error.message);
  }
};

insertAdminData();
