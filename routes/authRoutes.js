const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Check if the user is authenticated
router.get('/check', async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});


// Logout user
router.post('/logout', (req, res) => {
  res.clearCookie('token'); // Clear the JWT token cookie
  res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;

module.exports = router;