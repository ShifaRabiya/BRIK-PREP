const express = require('express');
const cors = require('cors');
const interviewRoutes = require('./routes/InterviewRoutess');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/interview', interviewRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

module.exports = app;