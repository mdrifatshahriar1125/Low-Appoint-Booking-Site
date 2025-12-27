const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// In-memory user store (replace with database in production)
let users = [];

const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '7d' }
  );
};

// Register endpoint
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: 'All fields required' });
    }

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: Date.now().toString(),
      email,
      name,
      password: hashedPassword,
      createdAt: new Date()
    };

    users.push(newUser);
    const token = generateToken(newUser.id);

    res.json({
      token,
      user: { id: newUser.id, email, name }
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed' });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user.id);

    res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name }
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed' });
  }
});

// Get current user (protected)
router.get('/me', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = users.find(u => u.id === decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;
