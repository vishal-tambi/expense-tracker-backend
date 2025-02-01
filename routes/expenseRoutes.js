const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { addExpense, getExpenses, updateExpense, deleteExpense } = require('../controllers/expenseController');

router.post('/', protect, addExpense);
const express = require('express');
const authMiddleware = require('./middleware/authMiddleware');
const router = express.Router();

router.get('/api/expenses', authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }); // Example: Fetch expenses for the logged-in user
    res.status(200).json({ expenses });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;router.put('/:id', protect, updateExpense);
router.delete('/:id', protect, deleteExpense);

module.exports = router;