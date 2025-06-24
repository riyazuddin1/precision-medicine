const transporter = require("./mailer");
const User = require("../models/User");

const sendOtp = async (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // ✅ Find or create placeholder user (no password yet)
  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      email,
      isEmailVerified: false,
      emailOtp: otp,
    });
  } else {
    user.emailOtp = otp;
  }

  await user.save();

  const mailOptions = {
    from: `"PrecisionMed" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "🔐 Verify your PrecisionMed Email",
    text: `Your OTP for verification is: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendOtp;
