import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useUser } from "../context/UserContext";
import "../styles/Form.css";

const Login = () => {
  const { loginUser } = useUser();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 404) {
          setError("Account not found. Please sign up to continue.");
        } else if (res.status === 401 && data.message.toLowerCase().includes("password")) {
          setError("Incorrect password. Try again.");
        } else {
          setError(data.message || "Login failed.");
        }
        setIsSubmitting(false);
        return;
      }

      // ✅ Login success
      loginUser(data.user, data.token);
      localStorage.removeItem("pendingUser");
      localStorage.removeItem("pendingEmail");

      setSuccess("✅ Login successful! Redirecting...");
      setTimeout(() => {
        navigate("/dashboard");
      }, 3500); // ⏱️ Enough time to read success
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div className="auth-wrapper" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
      <div className="auth-card">
        <div className="auth-left">
          <h2>Welcome Back 👋</h2>
          <p>Login to your PrecisionMed account</p>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>

          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}

          <p className="switch-link">
            Forgot your password? <Link to="/forgot-password">Reset here</Link>
          </p>
          <p className="switch-link">
            New here? <Link to="/signup">Create an account</Link>
          </p>
        </div>

        <div className="auth-right">
          <img src="https://cdn-icons-png.flaticon.com/512/3209/3209265.png" alt="Login Illustration" />
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
