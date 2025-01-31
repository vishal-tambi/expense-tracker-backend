const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { addExpense, getExpenses, updateExpense, deleteExpense } = require('../controllers/expenseController');
const router = express.Router();

router.post('/', protect, addExpense);
router.get('/', protect, getExpenses);
router.put('/:id', protect, updateExpense);
router.delete('/:id', protect, deleteExpense);

module.exports = router;