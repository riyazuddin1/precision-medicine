import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Form.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to send OTP.");
      } else {
        localStorage.setItem("resetEmail", email);
        setMessage("✅ OTP sent to your email. Proceed to reset password.");
        setTimeout(() => navigate("/reset-password"), 2000);
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-left">
          <h2>🔑 Forgot Password</h2>
          <p>Enter your registered email to receive an OTP.</p>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Send OTP</button>
          </form>

          {error && <p className="error">{error}</p>}
          {message && <p className="success">{message}</p>}
        </div>

        <div className="auth-right">
          <img src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png" alt="Forgot Password" />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
