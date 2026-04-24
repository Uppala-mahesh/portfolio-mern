const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const app = express();
const PORT = process.env.PORT || 5000;
const LOCAL_MONGO_URI = "mongodb://127.0.0.1:27017/portfolio";
let isDbConnected = false;

/* ───────────── Middleware ───────────── */
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || !process.env.CLIENT_URL) {
        callback(null, true);
      } else {
        callback(null, true); // Allow all in case CLIENT_URL not set
      }
    },
    methods: ["GET", "POST"],
    credentials: true,
  }),
);
app.use(express.json());

/* ───────────── DB Availability Guard ───────────── */
app.use("/api", (req, res, next) => {
  if (req.path === "/health") {
    return next();
  }

  if (!isDbConnected) {
    return res.status(503).json({
      error: "Database is unavailable. Start MongoDB or fix MONGODB_URI.",
    });
  }

  next();
});

/* ───────────── API Routes ───────────── */
app.use("/api/profile", require("./routes/profileRoutes"));
app.use("/api/skills", require("./routes/skillRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/certifications", require("./routes/certificationRoutes"));
app.use("/api/qualifications", require("./routes/qualificationRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));

/* ───────────── Root Route ───────────── */
app.get("/", (_req, res) => {
  res.json({
    message: "Portfolio API is running",
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
      profile: "/api/profile",
      skills: "/api/skills",
      projects: "/api/projects",
      certifications: "/api/certifications",
      qualifications: "/api/qualifications",
      contact: "/api/contact",
    },
  });
});

/* ───────────── Health Check ───────────── */
app.get("/api/health", (_req, res) => {
  res.json({
    status: isDbConnected ? "OK" : "DEGRADED",
    database: isDbConnected ? "connected" : "disconnected",
    message: "Portfolio API is running",
    timestamp: new Date().toISOString(),
  });
});

/* ───────────── Global Error Handler ───────────── */
app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err.stack);
  res.status(500).json({ error: "Internal server error" });
});

/* ───────────── Database & Server Boot ───────────── */
const MONGO_URI = process.env.MONGODB_URI || LOCAL_MONGO_URI;

mongoose.set("bufferCommands", false);

const connectMongo = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    isDbConnected = true;
    console.log(`✅  Connected to MongoDB (${MONGO_URI})`);
    return;
  } catch (primaryErr) {
    console.error(
      `❌  Primary MongoDB connection failed: ${primaryErr.message}`,
    );
  }

  if (MONGO_URI === LOCAL_MONGO_URI) {
    isDbConnected = false;
    return;
  }

  try {
    await mongoose.connect(LOCAL_MONGO_URI);
    isDbConnected = true;
    console.log(`✅  Connected to local MongoDB fallback (${LOCAL_MONGO_URI})`);
  } catch (fallbackErr) {
    isDbConnected = false;
    console.error(`❌  Local MongoDB fallback failed: ${fallbackErr.message}`);
  }
};

const boot = async () => {
  await connectMongo();
  app.listen(PORT, () => {
    console.log(`🚀  Server running → http://localhost:${PORT}`);
  });
};

boot();
