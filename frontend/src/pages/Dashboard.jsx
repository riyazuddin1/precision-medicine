import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const { user } = useUser();

   if (!user) return null; // or return <p>Loading...</p>

  const aiTips = [
    "🧠 Walking after meals helps regulate blood sugar.",
    "🌙 Sleep before 11PM aligns with natural melatonin cycles.",
    "🥦 Leafy greens reduce inflammation and support digestion.",
    "💧 Staying hydrated improves cognitive performance.",
    "🚶‍♂️ 30 minutes of walking daily reduces heart risk by 40%.",
    "🍎 Fiber-rich foods reduce cholesterol and stabilize energy.",
    "🧘‍♀️ Daily deep breathing lowers cortisol and stress.",
    "📴 Reducing screen time improves sleep quality significantly.",
    "☀️ Morning sunlight boosts serotonin and sets your body clock.",
    "🍳 Balanced breakfast improves insulin sensitivity.",
    "😴 Lack of sleep impairs immune function.",
    "🧃 Avoid sugary drinks — major inflammation trigger.",
    "💤 Power naps (15–20 min) can boost brain performance.",
    "📓 Journaling reduces anxiety and supports clarity.",
    "🏃‍♂️ Regular cardio lowers depression risk by 30%.",
  ];

  const insights = [
    "🩺 Your habits define your future. Start small and be consistent.",
    "💡 Small actions today lead to big health transformations.",
    "🔬 Prevention is better than cure — let data guide your choices.",
    "🧠 A focused mind supports a healthy body.",
    "💪 Physical strength begins with mental clarity.",
  ];

  const reminders = [
    "⏰ Time to drink a glass of water and move around!",
    "🧘‍♂️ Breathe in for 4 seconds, hold, breathe out — do it now.",
    "🌿 Stand up and stretch your back and neck gently.",
    "🧃 Skip that sugary drink — hydrate with lemon water!",
    "☀️ Step outside for 3 minutes of natural light.",
  ];

  const randomTip = aiTips[Math.floor(Math.random() * aiTips.length)];
  const randomInsight = insights[Math.floor(Math.random() * insights.length)];
  const randomReminder =
    reminders[Math.floor(Math.random() * reminders.length)];

  const features = [
    [
      "🧬",
      "Genetic Analysis",
      "Explore your DNA health blueprint",
      "/genetic-analysis",
    ],
    ["🥗", "Diet Plan", "AI-recommended meals & nutrients", "/diet-plan"],
    [
      "📊",
      "Health Insights",
      "Track symptoms & analyze trends",
      "/track-symptoms",
    ], // Renamed
    [
      "🧘",
      "Lifestyle Recos",
      "Tips for sleep, stress & movement",
      "/lifestyle",
    ],
    ["🤖", "AI Insights", "Automated alerts & recommendations", "/insights"],
    ["🏥", "Medical Guidance", "See when to visit a doctor", "/guidance"],
  ];

  return (
    <motion.div
      className="dash-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <header className="dash-header">
        <h1>Welcome, {user?.name || "User"} 👋</h1>
        <p>Your PrecisionMed Dashboard</p>
      </header>

      <section className="dash-layout">
        <div className="left-panel">
          <div className="profile-card">
            <h3>👤 Profile Summary</h3>
            <p>
              <strong>Age:</strong> {user.age || "N/A"}
            </p>
            <p>
              <strong>Goal:</strong> {user.goal}
            </p>
            <p>
              <strong>Diet:</strong> {user.dietType}
            </p>
            <Link to="/profile">
              <button>Edit Profile</button>
            </Link>
          </div>

          <div className="ai-tip">
            <h3>🤖 Daily AI Tip</h3>
            <p>{randomTip}</p>
          </div>

          <div className="motivation-box">
            <h4>💬 Health Insight</h4>
            <p>{randomInsight}</p>
          </div>

          <div className="reminder-box">
            <h4>⏰ Daily Reminder</h4>
            <p>{randomReminder}</p>
          </div>
        </div>

        <div className="right-panel">
          <h2>📂 Explore Your Features</h2>
          <div className="features-grid">
            {features.map(([icon, title, subtitle, route], i) => (
              <motion.div
                key={i}
                className="feature-card"
                whileHover={{ scale: 1.05 }}
              >
                <div className="icon">{icon}</div>
                <div className="feature-text">
                  <h4>{title}</h4>
                  <p>{subtitle}</p>
                  <Link to={route}>
                    <button className="open-btn">Open</button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Dashboard;
