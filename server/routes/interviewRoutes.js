const express = require("express");
const multer = require("multer");
const Interview = require("../models/Interview");
const parseResume = require("../utils/resumeParser");

const router = express.Router();

/* ---------- Multer MEMORY storage ---------- */
const upload = multer({
  storage: multer.memoryStorage(),
});

/* ---------- POST /api/interview ---------- */
router.post("/", upload.single("resume"), async (req, res) => {
  try {
    const { jobTitle, jobDescription } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Resume file required" });
    }

    // 🔥 Parse resume text
    const resumeText = await parseResume(req.file);

    console.log("===== RESUME TEXT START =====");
    console.log(resumeText.substring(0, 500)); // preview
    console.log("===== RESUME TEXT END =====");

    const interview = new Interview({
      jobTitle,
      jobDescription,
      resumeText,
    });

    await interview.save();

    res.status(201).json({
      message: "Interview saved successfully",
      interview,
    });
  } catch (error) {
    console.error("Interview save error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
