const express = require('express');
const Admin = require('../models/adminModel');

const router = express.Router();

// Login an admin
router.post('/login', async (req, res) => {
  const { adminKey, password } = req.body;

  try {
    const admin = await Admin.findOne({ adminKey });

    if (!admin || admin.password !== password) {
      return res.status(400).json({ message: 'Invalid admin key or password' });
    }

    res.status(200).json({ message: 'Login successful', admin: admin.adminKey });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
