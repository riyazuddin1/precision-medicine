import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Form.css";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("resetEmail");
    if (savedEmail) {
      setEmail(savedEmail);
    } else {
      navigate("/forgot-password");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Reset failed");
      } else {
        setMessage("✅ Password reset successfully. Redirecting to login...");
        localStorage.removeItem("resetEmail");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      setError("Something went wrong.");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-left">
          <h2>🔁 Reset Password</h2>
          <p>Enter OTP sent to <strong>{email}</strong> and choose a new password</p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button type="submit">Reset Password</button>
          </form>

          {error && <p className="error">{error}</p>}
          {message && <p className="success">{message}</p>}
        </div>

        <div className="auth-right">
          <img src="https://cdn-icons-png.flaticon.com/512/7866/7866226.png" alt="Reset Password" />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
