import { useUser } from "../context/UserContext";
import "../styles/Lifestyle.css";
import { motion } from "framer-motion";

const Lifestyle = () => {
  const { user } = useUser();

  const tips = [
    { title: "Sleep", desc: "Aim for 7–9 hours of sleep for optimal recovery.", icon: "🛌" },
    { title: "Movement", desc: "Get at least 30 mins of physical activity daily.", icon: "🏃" },
    { title: "Hydration", desc: "Drink at least 2 liters of water a day.", icon: "💧" },
    { title: "Stress", desc: "Practice mindfulness or meditation daily.", icon: "🧘" },
    { title: "Routine", desc: "Maintain a consistent sleep/wake schedule.", icon: "⏰" },
  ];

  return (
    <motion.div className="lifestyle-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1>🌿 Lifestyle Recommendations</h1>
      <p>Personalized habits based on your profile to optimize health</p>

      <section className="user-summary">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Goal:</strong> {user.goal}</p>
        <p><strong>Sleep:</strong> {user.sleepHours || "Not provided"} hrs/day</p>
      </section>

      <div className="tip-grid">
        {tips.map((tip, i) => (
          <div key={i} className="tip-card">
            <h3>{tip.icon} {tip.title}</h3>
            <p>{tip.desc}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Lifestyle;
