require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const interviewRoutes = require("./routes/interviewRoutes");
const reportRoutes = require("./routes/reportroutes");

const app = express();

app.use(cors());

// ↑ Increase request body size limit to handle large resume text
app.use(express.json({ limit: "5mb" })); // or 10mb if needed
app.use(express.urlencoded({ limit: "5mb", extended: true }));

// Routes
app.use("/api/interview", interviewRoutes);
app.use("/api/report", reportRoutes);

app.get("/", (req, res) => {
  res.send("BrikPrep backend running");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
