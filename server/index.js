// MUST be the first line
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// import routes
const interviewRoutes = require("./routes/interviewRoutes");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// serve uploaded files
app.use("/uploads", express.static("uploads"));

// use interview routes
app.use("/api/interview", interviewRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// test root route
app.get("/", (req, res) => {
  res.send("BrikPrep backend running");
});

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
