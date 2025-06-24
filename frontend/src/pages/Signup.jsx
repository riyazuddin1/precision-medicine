import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/Form.css";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async () => {
    setError("");
    setSuccess("");

    if (!form.email) return setError("Please enter your email address first.");

    try {
      const res = await fetch("http://localhost:5000/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });

      const data = await res.json();
      if (!res.ok) return setError(data.message || "Failed to send OTP.");

      setOtpSent(true);
      setSuccess("✅ OTP sent to your email.");
    } catch {
      setError("Error sending OTP. Try again.");
    }
  };

  const handleVerifyOtp = async () => {
    setError("");
    setSuccess("");

    if (!otp) return setError("Please enter the OTP sent to your email.");

    try {
      const res = await fetch("http://localhost:5000/api/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, otp }),
      });

      const data = await res.json();
      if (!res.ok) return setError(data.message || "Invalid OTP.");

      setIsVerified(true);
      setSuccess("✅ Email verified!");
    } catch {
      setError("OTP verification failed.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match.");
    }

    if (!isVerified) {
      return setError("Please verify your email before signing up.");
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();
      if (!res.ok) return setError(data.message || "Signup failed.");

      setSuccess("🎉 Account created successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2500);
    } catch {
      setError("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="auth-wrapper" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
      <div className="auth-card">
        <div className="auth-left">
          <h2>Create an Account ✨</h2>
          <p>Join PrecisionMed and personalize your health journey.</p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <div className="email-otp-group">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
                required
                disabled={isVerified}
              />
              <button type="button" onClick={handleSendOtp} disabled={isVerified}>
                {otpSent ? "Resend OTP" : "Send OTP"}
              </button>
            </div>

            {otpSent && !isVerified && (
              <div className="otp-section">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button type="button" onClick={handleVerifyOtp}>
                  Verify
                </button>
              </div>
            )}

            {isVerified && <p className="verified-msg">✅ Email verified</p>}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />

            <button type="submit" disabled={!isVerified || loading}>
              {loading ? "Creating account..." : "Signup"}
            </button>
          </form>

          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}

          <p className="switch-link">
            Already a member? <Link to="/login">Login here</Link>
          </p>
        </div>

        <div className="auth-right">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4215/4215782.png"
            alt="Signup Illustration"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Signup;
