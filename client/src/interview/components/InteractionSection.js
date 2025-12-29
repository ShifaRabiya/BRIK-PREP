import { useEffect, useRef, useState } from "react";
import avatarImg from "../../assets/avatar.png";

function InteractionSection({
  question,
  loading,
  setCurrentQuestion,
  sessionId,
  setSessionId,
  resumeText,
  jobTitle,
  jobDescription,
}) {
  const [started, setStarted] = useState(false);
  const [answer, setAnswer] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const avatarRef = useRef(null);
  const videoRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Camera access denied", err);
      }
    }
    startCamera();
  }, []);

  const startInterview = async () => {
    if (!resumeText || !jobTitle || !jobDescription) {
      alert("Missing resume or job data");
      return;
    }

    try {
      setStarted(true);

      const res = await fetch(`http://localhost:5000/api/interview/start/${sessionId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, jobTitle, jobDescription }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Start interview failed:", text);
        throw new Error(text);
      }

      const data = await res.json();
      setSessionId(data.sessionId); // save updated sessionId from backend
      setCurrentQuestion({ text: data.firstQuestion, type: "text" });

      // Start microphone/audio analyzer
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioCtx();
      if (audioContext.state === "suspended") await audioContext.resume();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      dataArrayRef.current = dataArray;

      animateAvatar();
    } catch (error) {
      console.error("Start interview failed:", error);
      alert("Failed to start interview");
      setStarted(false);
    }
  };

  const submitAnswer = async () => {
    if (!answer.trim()) return;

    try {
      setSubmitting(true);
      const res = await fetch("http://localhost:5000/api/interview/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, answer: answer.trim() }),
      });

      const data = await res.json();
      if (data.type === "question") {
        setCurrentQuestion({ text: data.content, type: "text" });
      } else if (data.type === "report") {
        setCurrentQuestion({
          text: `Interview completed! Score: ${data.score}/10\nFeedback: ${data.feedback}`,
          type: "completed",
        });
      }

      setAnswer("");
    } catch (error) {
      console.error("Submit answer failed:", error);
      alert("Failed to submit answer");
    } finally {
      setSubmitting(false);
    }
  };

  const animateAvatar = () => {
    if (!started || !analyserRef.current || !avatarRef.current || !dataArrayRef.current) return;
    analyserRef.current.getByteFrequencyData(dataArrayRef.current);
    let sum = 0;
    for (let i = 0; i < dataArrayRef.current.length; i++) sum += dataArrayRef.current[i];
    const volume = sum / dataArrayRef.current.length;
    const THRESHOLD = 8;
    if (volume < THRESHOLD) {
      avatarRef.current.style.transform = "scale(1)";
      avatarRef.current.style.setProperty("--voice", 0);
      avatarRef.current.classList.remove("speaking");
    } else {
      const intensity = Math.min(volume / 180, 1);
      avatarRef.current.style.transform = `scale(${1 + intensity * 0.15})`;
      avatarRef.current.style.setProperty("--voice", intensity);
      avatarRef.current.classList.add("speaking");
    }
    animationRef.current = requestAnimationFrame(animateAvatar);
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="interaction-content">
      <h2>AI Interviewer</h2>

      {question && started && (
        <div className="question-display">
          <h3>Question:</h3>
          <p>{question.text}</p>
        </div>
      )}

      <div className="avatar-area">
        <div ref={avatarRef} className="avatar-wrapper">
          <img src={avatarImg} alt="AI Avatar" className="avatar-image" />
        </div>
      </div>

      <div className="camera-box">
        <video ref={videoRef} autoPlay muted playsInline className="camera-video" />
      </div>

      {!started && (
        <div className="start-button-wrapper">
          <button onClick={startInterview}>Start Interview</button>
        </div>
      )}

      {started && question && question.type !== "completed" && (
        <div className="answer-section">
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here..."
            rows={4}
            disabled={submitting}
          />
          <button onClick={submitAnswer} disabled={submitting || !answer.trim()}>
            {submitting ? "Submitting..." : "Submit Answer"}
          </button>
        </div>
      )}

      {question && question.type === "completed" && (
        <div className="completion-message">
          <h3>Interview Completed!</h3>
          <p>{question.text}</p>
        </div>
      )}
    </div>
  );
}

export default InteractionSection;
