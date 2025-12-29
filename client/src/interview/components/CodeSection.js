import React, { useState } from "react";
import Editor from "@monaco-editor/react";

function CodeSection({ questionType, loading }) {
  const [code, setCode] = useState("// Write your code here");

  if (loading) {
    return <div>Loading question...</div>;
  }

  if (questionType !== "coding") {
    return <div>No coding required for this question</div>;
  }

  return (
    <div style={{ height: "100%" }}>
      <Editor
        height="100%"
        language="javascript"
        theme="vs-light"
        value={code}
        onChange={(value) => setCode(value || "")}
      />
    </div>
  );
}

export default CodeSection;
