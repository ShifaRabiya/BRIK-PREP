const express = require("express");
const router = express.Router();
const Report = require("../models/Report");

// GET report by userId
router.get("/:userId", async (req, res) => {
  try {
    const report = await Report.findOne({ userId: req.params.userId });
    if (!report) return res.status(404).json({ message: "Report not found" });
    res.json(report);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new report (for testing / AI to save reports)
router.post("/", async (req, res) => {
  try {
    const newReport = new Report(req.body);
    const savedReport = await newReport.save();
    res.status(201).json(savedReport);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
