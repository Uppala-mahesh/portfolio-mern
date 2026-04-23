const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

/* ───────────── Middleware ───────────── */
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

/* ───────────── API Routes ───────────── */
app.use('/api/profile', require('./routes/profileRoutes'));
app.use('/api/skills', require('./routes/skillRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/certifications', require('./routes/certificationRoutes'));
app.use('/api/qualifications', require('./routes/qualificationRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

/* ───────────── Health Check ───────────── */
app.get('/api/health', (_req, res) => {
  res.json({ status: 'OK', message: 'Portfolio API is running', timestamp: new Date().toISOString() });
});

/* ───────────── Global Error Handler ───────────── */
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

/* ───────────── Database & Server Boot ───────────── */
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅  Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀  Server running → http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌  MongoDB connection failed:', err.message);
    process.exit(1);
  });
