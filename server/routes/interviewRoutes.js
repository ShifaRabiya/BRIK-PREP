const express = require("express");
const multer = require("multer");
const Interview = require("../models/Interview");

const router = express.Router();

/* ---------- Multer setup ---------- */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* ---------- POST /api/interview ---------- */
router.post("/", upload.single("resume"), async (req, res) => {
  try {
    const { jobTitle, jobDescription } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Resume file required" });
    }

    const interview = new Interview({
      jobTitle,
      jobDescription,
      resumePath: req.file.path,
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
