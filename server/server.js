const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

/* ───────────── Middleware ───────────── */
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || !process.env.CLIENT_URL) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all in case CLIENT_URL not set
    }
  },
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
