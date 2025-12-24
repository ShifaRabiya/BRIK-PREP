// This is a MOCK AI service for MVP
// Later this will call Python AI

async function startInterview(data) {
  return {
    type: "question",
    content: "Tell me about yourself.",
  };
}

async function processAnswer(answer) {
  return {
    type: "question",
    content: "Explain closures in JavaScript.",
  };
}

async function endInterview() {
  return {
    type: "report",
    score: 7.5,
    feedback: "Good fundamentals, needs improvement in async concepts.",
  };
}

module.exports = {
  startInterview,
  processAnswer,
  endInterview,
};
