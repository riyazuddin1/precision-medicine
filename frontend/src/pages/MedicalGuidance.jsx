import { useUser } from "../context/UserContext";
import "../styles/Medical.css";
import { motion } from "framer-motion";

const MedicalGuidance = () => {
  const { user } = useUser();

  const guidance = [
    { condition: "Frequent Fatigue", action: "Consider a blood test for anemia or thyroid." },
    { condition: "High Sugar Intake", action: "Consult a dietician to prevent insulin resistance." },
    { condition: "Poor Sleep", action: "Try melatonin support or talk to a sleep specialist." },
    { condition: "Family Heart History", action: "Schedule regular blood pressure & lipid panels." },
    { condition: "Chronic Stress", action: "Seek mental wellness support if prolonged." },
  ];

  return (
    <motion.div className="medical-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1>🏥 Medical Guidance</h1>
      <p>Actionable suggestions based on your profile & common conditions</p>

      <section className="user-info">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Conditions:</strong> {user.currentConditions || "Not mentioned"}</p>
      </section>

      <div className="guidance-list">
        {guidance.map((g, i) => (
          <div key={i} className="guidance-card">
            <p><strong>Issue:</strong> {g.condition}</p>
            <p><strong>Advice:</strong> {g.action}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default MedicalGuidance;
