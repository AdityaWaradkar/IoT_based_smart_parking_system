import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { db } from '../config/firebase.js';  // Ensure this path is correct

const HASH_ALGORITHM = 'sha256';
const HASH_LENGTH = 64;  // Length of the output hash

// Admin credentials (can be moved to a secure config file or environment variables)
const adminCredentials = [
  { username: 'admin1', password: 'adminpass1' },
  { username: 'admin2', password: 'adminpass2' },
  { username: 'admin3', password: 'adminpass3' }
];

// Function to hash password
const hashPassword = (password) => {
  const hash = crypto.pbkdf2Sync(password, 'salt', 1000, HASH_LENGTH, HASH_ALGORITHM);
  return hash.toString('hex');
};

// Function to verify password
const verifyPassword = (password, hash) => {
  const passwordHash = crypto.pbkdf2Sync(password, 'salt', 1000, HASH_LENGTH, HASH_ALGORITHM);
  return passwordHash.toString('hex') === hash;
};

// Register User
export const registerUser = async (req, res) => {
  const { carNumber, password } = req.body;

  try {
    const hashedPassword = hashPassword(password);
    await db.collection('users').doc(carNumber).set({ password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Failed to register user.' });
  }
};


// Login User
export const loginUser = async (req, res) => {
  const { carNumber, password } = req.body;

  try {
    const userDoc = await db.collection('users').doc(carNumber).get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const user = userDoc.data();
    const match = verifyPassword(password, user.password);

    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const token = jwt.sign({ carNumber }, 'your_jwt_secret', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Failed to log in user.' });
  }
};

// Admin Login
export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if admin credentials are valid
    const admin = adminCredentials.find(
      (admin) => admin.username === username && admin.password === password
    );

    if (!admin) {
      return res.status(401).json({ error: 'Invalid admin credentials.' });
    }

    // Generate JWT token for admin
    const token = jwt.sign({ username }, 'your_jwt_secret', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in admin:', error);
    res.status(500).json({ error: 'Failed to log in admin.' });
  }
};