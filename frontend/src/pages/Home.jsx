import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="homepage">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>
            PrecisionMed: <span>Your AI-Powered Health Partner</span>
          </h1>
          <p>
            Get personalized health strategies using AI-driven insights — based on your symptoms,
            lifestyle, and goals. Real-time tracking. Smarter care.
          </p>
          <div className="hero-buttons">
            <Link to="/features" className="btn primary">Explore Features</Link>
            <Link to="/signup" className="btn outline">Join Now</Link>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/doctor-and-patient-consultation-6624247-5486909.png"
            alt="AI doctor consultation"
          />
        </div>
      </section>

      {/* WHY PRECISIONMED */}
      <section className="why-section">
        <h2>Why Choose PrecisionMed?</h2>
        <div className="why-grid">
          <div className="why-card">
            <h3>🔬 Personalized Diagnostics</h3>
            <p>Detect health patterns early using AI + profile data.</p>
          </div>
          <div className="why-card">
            <h3>📈 Smart Learning</h3>
            <p>Our system learns and adapts with every input you give.</p>
          </div>
          <div className="why-card">
            <h3>🧘 Lifestyle Focused</h3>
            <p>Track sleep, stress, diet & habits for real-world recommendations.</p>
          </div>
          <div className="why-card">
            <h3>⚙️ Fully Custom</h3>
            <p>Everything is based on *your* profile — not generic advice.</p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section">
        <h2>Explore Key Features 🔍</h2>
        <div className="features-grid">
          <span>🧬 Genetic Insights</span>
          <span>🍽 Personalized Diet</span>
          <span>📊 Symptom Tracker</span>
          <span>🧘 Lifestyle Coaching</span>
          <span>📍 Health Dashboard</span>
          <span>🚨 Predictive Alerts</span>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section">
        <h2>How It Works 🧠</h2>
        <div className="how-grid">
          <div className="step">
            <span>1</span>
            <h4>Complete Your Profile</h4>
            <p>Tell us your age, goals, habits, health concerns & more.</p>
          </div>
          <div className="step">
            <span>2</span>
            <h4>Log & Track</h4>
            <p>Input symptoms, mood, meals, sleep, and lifestyle details.</p>
          </div>
          <div className="step">
            <span>3</span>
            <h4>Get AI Feedback</h4>
            <p>Receive tailored advice, alerts, and insights instantly.</p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="cta-section">
        <h2>Start Your Personalized Health Journey Today 💙</h2>
        <br />
        <Link to="/signup" className="btn large">Join PrecisionMed Now</Link>
      </section>

      
    </div>
  );
};

export default Home;
