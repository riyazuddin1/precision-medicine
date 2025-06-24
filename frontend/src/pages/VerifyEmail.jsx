// import { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import "../styles/Form.css";

// const VerifyEmail = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const fromState = location.state?.email;
//     const fromStorage = localStorage.getItem("pendingEmail");
//     if (fromState) setEmail(fromState);
//     else if (fromStorage) setEmail(fromStorage);
//     else navigate("/login"); // ⛔ fallback if no email
//   }, [location.state, navigate]);

//   const handleVerify = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     try {
//       const res = await fetch("http://localhost:5000/api/verify-email", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, otp }),
//       });

//       const data = await res.json();
//       if (!res.ok) {
//         setMessage(data.message || "Verification failed.");
//       } else {
//         setMessage("✅ Email verified! Redirecting...");
//         localStorage.removeItem("pendingEmail");
//         setTimeout(() => navigate("/login"), 2000);
//       }
//     } catch (err) {
//       setMessage("Something went wrong.");
//     }
//   };

//   return (
//     <div className="auth-wrapper">
//       <div className="auth-card">
//         <div className="auth-left">
//           <h2>🔐 Email Verification</h2>
//           <p>Enter the OTP sent to <strong>{email}</strong></p>

//           <form onSubmit={handleVerify}>
//             <input
//               type="text"
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               required
//             />
//             <button type="submit">Verify Email</button>
//           </form>

//           {message && <p className="error">{message}</p>}
//         </div>

//         <div className="auth-right">
//           <img
//             src="https://cdn-icons-png.flaticon.com/512/2950/2950666.png"
//             alt="Verify Email"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VerifyEmail;
