const mongoose = require("mongoose");

const reportSchema = mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
  overallScore: Number,
  technicalKnowledge: {
    React: Number,
    Node: Number,
    MongoDB: Number,
    Express: Number,
  },
  softSkills: {
    clarity: Number,
    strengths: [String],
    weaknesses: [String],
  },
  generalEvaluation: String,
  motivation: String,
});

module.exports = mongoose.model("Report", reportSchema);
