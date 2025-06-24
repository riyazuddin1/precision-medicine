const nodemailer = require("nodemailer");

// ✅ Configure transporter using environment variables
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail or app email
    pass: process.env.EMAIL_PASS, // App password (not Gmail login password)
  },
});

// ✅ Optional: Verify transporter on startup
transporter.verify((err, success) => {
  if (err) {
    console.error("❌ Email transporter error:", err.message);
  } else {
    console.log("✅ Mailer ready to send emails");
  }
});

module.exports = transporter;
