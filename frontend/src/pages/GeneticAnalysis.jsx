import { useUser } from "../context/UserContext";
import "../styles/Genetic.css";
import { motion } from "framer-motion";

const GeneticAnalysis = () => {
  const { user } = useUser();

  const mockGenes = [
    { gene: "FTO", trait: "Obesity Risk", result: "Elevated", color: "#ff6b6b" },
    { gene: "MTHFR", trait: "Folate Metabolism", result: "Moderate Risk", color: "#ffa502" },
    { gene: "CYP1A2", trait: "Caffeine Sensitivity", result: "High Sensitivity", color: "#70a1ff" },
    { gene: "ACE", trait: "Endurance Response", result: "Above Average", color: "#2ed573" },
  ];

  // ✅ Future-ready: You can replace mockGenes with API response
  // useEffect(() => {
  //   fetch("/api/genetic-analysis", { headers: { Authorization: `Bearer ${token}` } })
  //     .then(res => res.json())
  //     .then(setGeneResults);
  // }, []);

  if (!user) return <p className="loading">🔄 Loading profile...</p>;

  return (
    <motion.div className="genetic-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1>🧬 Genetic Analysis</h1>
      <p className="sub">Based on your profile and genetic markers</p>

      {/* 🔍 Profile Summary (for ML context) */}
      <section className="profile-summary">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Age:</strong> {user.age || "N/A"}</p>
        <p><strong>Goal:</strong> {user.goal || "Not specified"}</p>
        <p><strong>Conditions:</strong> {user.currentConditions || "None"}</p>
      </section>

      {/* 🧠 Genetic Results */}
      <h2>Your Genetic Risk Insights</h2>
      <div className="gene-cards">
        {mockGenes.map((g, i) => (
          <div key={i} className="gene-card" style={{ borderLeft: `5px solid ${g.color}` }}>
            <h3>{g.gene}</h3>
            <p><strong>Trait:</strong> {g.trait}</p>
            <p><strong>Result:</strong> {g.result}</p>
          </div>
        ))}
      </div>

      <p className="genome-note">🔍 Future: You’ll be able to upload DNA data for real analysis</p>


      {/* Future: link to download / explain genes */}
      {/* <button className="download-btn">Download Report</button> */}
    </motion.div>
  );
};

export default GeneticAnalysis;
