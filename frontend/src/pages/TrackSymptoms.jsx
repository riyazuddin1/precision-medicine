import { useEffect, useState } from "react";
import "../styles/TrackSymptoms.css";
import { motion } from "framer-motion";
import { useUser } from "../context/UserContext";

const TrackSymptoms = () => {
  const { user } = useUser();
  const [logs, setLogs] = useState([]);
  const [symptom, setSymptom] = useState("");
  const [severity, setSeverity] = useState("Mild");
  const [note, setNote] = useState("");
  const [aiSummary, setAiSummary] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("symptoms");
    if (stored) setLogs(JSON.parse(stored));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      date: new Date().toLocaleDateString(),
      symptom,
      severity,
      note,
    };
    const updated = [newEntry, ...logs];
    setLogs(updated);
    localStorage.setItem("symptoms", JSON.stringify(updated));
    setSymptom("");
    setSeverity("Mild");
    setNote("");
  };

  const deleteLog = (index) => {
    const updated = logs.filter((_, i) => i !== index);
    setLogs(updated);
    localStorage.setItem("symptoms", JSON.stringify(updated));
  };

  const analyzeLogs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/analyze-symptoms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ logs, profile: user }),
      });
      const data = await res.json();
      setAiSummary(data.summary || "No insights found.");
    } catch (err) {
      setAiSummary("Error analyzing logs.");
    }
  };

  return (
    <motion.div className="symptoms-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1>📈 Track Your Symptoms</h1>
      <p>Logs help identify trends. Based on your profile: {user.age} yrs old, goal: {user.goal}</p>

      <form onSubmit={handleSubmit} className="symptom-form">
        <input
          type="text"
          value={symptom}
          onChange={(e) => setSymptom(e.target.value)}
          placeholder="Symptom (e.g., headache)"
          required
        />
        <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
          <option value="Mild">Mild 😌</option>
          <option value="Moderate">Moderate 😐</option>
          <option value="Severe">Severe 😣</option>
        </select>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Optional note..."
        />
        <button type="submit">Log Symptom</button>
      </form>

      <button onClick={analyzeLogs} className="analyze-btn">🧠 Analyze My Logs</button>

      {aiSummary && (
        <div className="ai-summary">
          <h3>🧠 AI Insight:</h3>
          <p>{aiSummary}</p>
        </div>
      )}

      <h2>📝 Your Logs</h2>
      <div className="log-list">
        {logs.length === 0 ? (
          <p>No symptoms logged yet.</p>
        ) : (
          logs.map((log, idx) => (
            <div key={idx} className="log-card">
              <p><strong>Date:</strong> {log.date}</p>
              <p><strong>Symptom:</strong> {log.symptom}</p>
              <p><strong>Severity:</strong> {log.severity}</p>
              {log.note && <p><strong>Note:</strong> {log.note}</p>}
              <button onClick={() => deleteLog(idx)}>❌ Delete</button>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default TrackSymptoms;
