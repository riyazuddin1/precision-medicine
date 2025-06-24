import { useUser } from "../context/UserContext";
import "../styles/DietPlan.css";
import { motion } from "framer-motion";

const DietPlan = () => {
  const { user } = useUser();

  const samplePlan = {
    Monday: {
      Breakfast: "Oats with banana & almond milk",
      Lunch: "Grilled tofu wrap with veggies",
      Dinner: "Quinoa salad with chickpeas",
    },
    Tuesday: {
      Breakfast: "Smoothie with spinach, apple, and flax seeds",
      Lunch: "Brown rice with lentils and sautéed greens",
      Dinner: "Sweet potato curry with roti",
    },
  };

  return (
    <motion.div className="diet-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1>🥗 Your Personalized Diet Plan</h1>
      <p className="sub">
        Customized for your goal: <strong>{user.goal || "General Health"}</strong> & diet:
        <strong> {user.dietType || "Vegetarian"}</strong>
      </p>

      <div className="diet-cards">
        {Object.entries(samplePlan).map(([day, meals]) => (
          <div key={day} className="diet-card">
            <h3>{day}</h3>
            <ul>
              {Object.entries(meals).map(([meal, desc]) => (
                <li key={meal}>
                  <strong>{meal}:</strong> {desc}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default DietPlan;
