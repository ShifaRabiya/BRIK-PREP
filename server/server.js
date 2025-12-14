require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

// Routes
const interviewRoutes = require("./routes/interviewRoutes");
const reportRoutes = require("./routes/reportroutes");

const app = express();

app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/interview", interviewRoutes);
app.use("/api/report", reportRoutes);

// Test root route
app.get("/", (req, res) => {
  res.send("BrikPrep backend running (JSON report MVP)");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
