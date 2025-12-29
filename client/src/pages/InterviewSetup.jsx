import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function InterviewSetup() {
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResumeChange = (e) => {
    setResume(e.target.files && e.target.files[0] ? e.target.files[0] : null);
    setSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume || !title || !description) {
      alert("Please upload resume and fill all fields");
      return;
    }

    // read resume as text (simple MVP version)
    const reader = new FileReader();

    reader.onload = () => {
      const resumeText = reader.result;

      navigate("/interview", {
        state: {
          sessionId: crypto.randomUUID(),
          resumeText,
          jobTitle: title,
          jobDescription: description,
        },
      });
    };

    reader.readAsText(resume);
  };

  return (
    <div style={styles.page}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2 style={styles.heading}>Interview Setup</h2>

        <label style={styles.label}>Resume</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={handleResumeChange}
          style={styles.input}
        />
        {resume && <div style={styles.fileName}>{resume.name}</div>}

        <label style={styles.label}>Job Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Frontend Developer"
          style={styles.input}
        />

        <label style={styles.label}>Job Description</label>
        <textarea
          rows={6}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Paste job description here..."
          style={{ ...styles.input, height: 120 }}
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>

        {submitted && (
          <div style={styles.success}>
            Interview data submitted successfully ✅
          </div>
        )}
      </form>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    padding: "24px",
  },
  card: {
    width: "100%",
    maxWidth: 640,
    border: "1px solid #e6e6e6",
    borderRadius: 8,
    padding: 20,
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
    background: "#ffffff",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  heading: {
    margin: 0,
    marginBottom: 8,
    fontSize: 18,
  },
  label: {
    fontSize: 13,
    color: "#333",
  },
  input: {
    padding: "10px 12px",
    border: "1px solid #dcdcdc",
    borderRadius: 6,
    fontSize: 14,
  },
  button: {
    marginTop: 8,
    padding: "10px 14px",
    background: "#0b69ff",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 14,
  },
  fileName: {
    fontSize: 13,
    color: "#444",
  },
  success: {
    marginTop: 8,
    color: "green",
    fontSize: 13,
  },
};
