const OpenAI = require("openai");

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generate interview question using AI
 */
async function generateQuestion({
  jobTitle,
  jobDescription,
  resumeText,
  previousAnswer,
}) {
  const prompt = `
You are a professional technical interviewer.

Job Title:
${jobTitle}

Job Description:
${jobDescription}

Candidate Resume:
${resumeText}

Previous Answer:
${previousAnswer || "This is the first question."}

Ask ONE clear, relevant interview question.
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are an experienced interviewer." },
      { role: "user", content: prompt },
    ],
  });

  return response.choices[0].message.content.trim();
}

module.exports = { generateQuestion };
