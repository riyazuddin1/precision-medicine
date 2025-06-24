// backend/routes/emailRoutes.js
const express = require("express");
const router = express.Router();
const {
  sendVerificationEmail,
  verifyEmailOtp
} = require("../controllers/emailController"); // ✅ make sure path & names are correct

router.post("/send-otp", sendVerificationEmail); // ✅ Function should be imported properly
router.post("/verify-email", verifyEmailOtp);

module.exports = router;
