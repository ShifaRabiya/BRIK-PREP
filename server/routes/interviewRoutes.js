const express = require("express");
const Interview = require("../models/Interview");
const crypto = require("crypto");

const router = express.Router();

/* ===============================
   START INTERVIEW
   POST /api/interview/start/:sessionId
================================ */
router.post("/start/:sessionId", async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { resumeText, jobTitle, jobDescription } = req.body;

    // Create interview if it doesn't exist
    let interview = await Interview.findOne({ sessionId });
    if (!interview) {
      interview = new Interview({ sessionId, resumeText, jobTitle, jobDescription });
      await interview.save();
    }

    // Return first question
    res.json({ sessionId: interview.sessionId, firstQuestion: "Tell me about yourself" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ===============================
   SUBMIT ANSWER
   POST /api/interview/answer
================================ */
router.post("/answer", async (req, res) => {
  try {
    const { sessionId, answer } = req.body;

    if (!sessionId || !answer) {
      return res.status(400).json({ message: "Missing data" });
    }

    // TODO: AI logic later
    res.json({
      type: "question",
      content: "Why do you want to be a frontend developer?",
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
