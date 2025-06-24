const nodemailer = require("nodemailer");
const User = require("../models/User");

// =============================================
// ✅ Send Verification OTP (without user creation yet)
// =============================================
exports.sendVerificationEmail = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    let user = await User.findOne({ email });

    // ❌ If user already exists and verified
    if (user && user.isEmailVerified) {
      return res.status(400).json({ message: "Email already in use. Please login." });
    }

    // ✅ If user does not exist, create temporary entry with only email + OTP
    if (!user) {
      user = new User({ email });
    }

    user.emailOtp = otp;
    user.isEmailVerified = false;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"PrecisionMed" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🔐 Verify your PrecisionMed Email",
      text: `Your OTP for PrecisionMed is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "OTP sent to your email." });

  } catch (err) {
    console.error("❌ Error sending OTP:", err.message);
    res.status(500).json({ message: "Failed to send OTP", error: err.message });
  }
};

// =============================================
// ✅ Verify Email OTP
// =============================================
exports.verifyEmailOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.emailOtp === otp) {
      user.isEmailVerified = true;
      user.emailOtp = null;
      await user.save();
      return res.status(200).json({ message: "Email verified successfully." });
    }

    return res.status(400).json({ message: "Invalid OTP. Please try again." });

  } catch (err) {
    console.error("❌ OTP verification failed:", err.message);
    res.status(500).json({ message: "Verification failed", error: err.message });
  }
};
