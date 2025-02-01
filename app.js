const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const insightsRoutes = require('./routes/insightsRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());



const allowedOrigins = [
  'http://localhost:3000',
  'https://expense-tracker-frontend-delta-ten.vercel.app', 
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/insights', insightsRoutes);

// Error handling
app.use(errorHandler);

module.exports = app;
