import { BrowserRouter, Routes, Route } from "react-router-dom";
import InterviewSetup from "./pages/InterviewSetup";
import Interviewp from "./interview/Interviewp";
import InterviewReport from "./report/InterviewReport";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InterviewSetup />} />
        <Route path="/interview" element={<Interviewp />} />
        <Route path="/report" element={<InterviewReport />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
