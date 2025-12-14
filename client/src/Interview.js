import { useEffect, useState } from "react";
import "./Interview.css";
import CodeSection from "./components/CodeSection";
import InteractionSection from "./components/InteractionSection";

function Interview() {

  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setCurrentQuestion({
        text: "Implement a REST API using Express.js",
        type: "coding"
      });
      setLoading(false);
    }, 1000);
  }, []);

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
        />
      </div>

    </div>
  </div>
);

}

export default Interview;
