import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Interviewp.css";
import CodeSection from "./components/CodeSection";
import InteractionSection from "./components/InteractionSection";

function Interviewp() {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract state from InterviewSetup
  const { sessionId: initialSessionId, resumeText, jobTitle, jobDescription } = location.state || {};

  // State
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [sessionId, setSessionId] = useState(initialSessionId || null);
  const [loading, setLoading] = useState(false);

  const handleEndInterview = () => {
    navigate("/report", { state: { sessionId } });
  };

  return (
    <div className="interview-page">
      <div className="header">
        BRIK PREP
        <button className="end-btn" onClick={handleEndInterview}>
          End Interview
        </button>
      </div>

      <div className="interview-container">
        <div className="code-section">
          <CodeSection
            questionType={currentQuestion?.type}
            loading={loading}
          />
        </div>

        <div className="interaction-section">
          <InteractionSection
            question={currentQuestion}
            loading={loading}
            setCurrentQuestion={setCurrentQuestion}
            sessionId={sessionId}
            setSessionId={setSessionId}
            resumeText={resumeText}
            jobTitle={jobTitle}
            jobDescription={jobDescription}
          />
        </div>
      </div>
    </div>
  );
}

export default Interviewp;
