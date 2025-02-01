const express = require('express');
const Expense = require('../models/Expense');
const router = express.Router();

// Fetch all expenses for the logged-in user
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.userId }); // Fetch expenses for the logged-in user
    res.status(200).json({ expenses });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;