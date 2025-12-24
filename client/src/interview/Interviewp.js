import { useEffect, useState } from "react";
import "./Interviewp.css";
import CodeSection from "./components/CodeSection";
import InteractionSection from "./components/InteractionSection";

function Interviewp() {

  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);

return (
  <div className="interview-page">

    {/* Header */}
    <div className="header">
      BRIK PREP
    </div>

    {/* Main content */}
    <div className="interview-container">

      {/* LEFT */}
      <div className="code-section">
        <CodeSection
          questionType={currentQuestion?.type}
          loading={loading}
        />
      </div>

      {/* RIGHT */}
      <div className="interaction-section">
        <InteractionSection
          question={currentQuestion}
          loading={loading}
          setCurrentQuestion={setCurrentQuestion}
          setSessionId={setSessionId}
        />
      </div>

    </div>
  </div>
);

}

export default Interviewp;
