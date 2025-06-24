import { useUser } from "../context/UserContext";
import "../styles/Insights.css";
import { motion } from "framer-motion";

const Insights = () => {
  const { user } = useUser();

  const insights = [
    "📉 Reduce screen time before bed for better sleep quality.",
    "🍽️ Eating fiber-rich foods helps stabilize energy levels.",
    "🧠 Deep breathing improves mood & clarity.",
    "📈 Regular exercise boosts insulin sensitivity.",
    "🔬 Keep a journal to identify mood/symptom patterns.",
  ];

  return (
    <motion.div className="insights-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1>📊 AI Health Insights</h1>
      <p>Based on your logged data and profile behavior</p>

      <section className="profile-glance">
        <p><strong>Goal:</strong> {user.goal}</p>
        <p><strong>Diet:</strong> {user.dietType}</p>
        <p><strong>Sleep:</strong> {user.sleepHours || "N/A"} hrs</p>
      </section>

      <ul className="insight-list">
        {insights.map((insight, i) => (
          <li key={i} className="insight-item">{insight}</li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Insights;
