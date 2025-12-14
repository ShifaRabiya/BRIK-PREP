import React, { useState } from "react";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = "en-US";
recognition.interimResults = false;

function VoiceInterview() {
  const [userText, setUserText] = useState("");
  const [aiQuestion, setAiQuestion] = useState("");

  // 🎤 Speech-to-Text
  const startListening = () => {
    recognition.start();

    recognition.onresult = async (event) => {
      const spokenText = event.results[0][0].transcript;
      setUserText(spokenText);

      // 🔌 Call AI backend
      const res = await fetch("http://localhost:8000/start-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jd: "Hiring MERN stack developer",
          resume: spokenText
        })
      });

      const data = await res.json();
      setAiQuestion(data.question);
    };
  };

  // 🔊 Text-to-Speech
  const speakAI = () => {
    if (!aiQuestion) return;
    const msg = new SpeechSynthesisUtterance(aiQuestion);
    msg.lang = "en-US";
    speechSynthesis.speak(msg);
  };

  return (
    <div>
      <h3>AI Voice Interview</h3>

      <button onClick={startListening}>🎤 Speak Answer</button>
      <p>User said: {userText}</p>

      <p>AI Question: {aiQuestion}</p>
      <button onClick={speakAI}>🔊 Speak AI</button>
    </div>
  );
}

export default VoiceInterview;
