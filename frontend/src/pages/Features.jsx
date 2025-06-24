import { motion } from "framer-motion";
import "../styles/Features.css";


const features = [
  {
    title: "🧬 Genetic Analysis",
    desc: "We decode your genetic markers to deliver hyper-personalized treatment and nutrition strategies.",
  },
  {
    title: "🥗 Personalized Diet Plans",
    desc: "Meal planning based on symptoms, medical history, and lifestyle using AI algorithms.",
  },
  {
    title: "📊 Health Analytics",
    desc: "Track, predict, and visualize your health trends with real-time data insights.",
  },
  {
    title: "🧘 Lifestyle Recommendations",
    desc: "Sleep, stress, and exercise tips uniquely adjusted for your profile.",
  },
  {
    title: "🤖 AI-Powered Insights",
    desc: "ML models analyze symptoms and generate early warning signals and actionable plans.",
  },
  {
    title: "🏥 Medical Guidance",
    desc: "Get evidence-based suggestions aligned with clinical protocols for self-care or doctor visits.",
  },
];

const Features = () => {


  return (

    <div className="features-page">
      <motion.h1
        className="features-heading"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🌟 Explore Our Key Features
      </motion.h1>

      <div className="features-grid">
        {features.map((feat, idx) => (
          <motion.div
            key={idx}
            className="feature-box"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <h2>{feat.title}</h2>
            <p>{feat.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Features;
