const express = require("express");
const router = express.Router();

const aiService = require("../services/aiService");
const sessionStore = require("../store/sessionStore");

/**
 * START INTERVIEW
 */
router.post("/start", async (req, res) => {
  try {
    const { jobTitle, jobDescription, resumeText } = req.body;

    sessionStore.startSession({
      jobTitle,
      jobDescription,
      resumeText,
      history: [],
      status: "started",
    });

    const aiResponse = await aiService.startInterview({
      jobTitle,
      jobDescription,
      resumeText,
    });

    res.json({ ai: aiResponse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to start interview" });
  }
});

/**
 * SEND ANSWER
 */
router.post("/answer", async (req, res) => {
  try {
    const { answer } = req.body;
    const session = sessionStore.getSession();

    if (!session) {
      return res.status(400).json({ error: "No active interview" });
    }

    const aiResponse = await aiService.processAnswer(answer);

    session.history.push({
      answer,
      aiResponse,
    });

    sessionStore.updateSession(session);

    res.json(aiResponse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to process answer" });
  }
});

/**
 * END INTERVIEW
 */
router.post("/end", (req, res) => {
  sessionStore.endSession();
  res.json({ message: "Interview ended" });
});

module.exports = router;
