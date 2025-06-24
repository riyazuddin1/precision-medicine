const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // ⚠️ NOT required at schema level

  // Full profile fields
  dob: String,
  age: Number,
  gender: String,
  mobile: String,
  bloodGroup: String,
  dietType: String,
  sleepHours: Number,
 
  goal: String,
  currentConditions: String,
  healthStatus: String,

  // Verification
  emailOtp: String,
  isEmailVerified: {
    type: Boolean,
    default: false,
  },

  // Password reset
  resetOtp: String,
  resetOtpExpiry: Date,
});

module.exports = mongoose.model("User", userSchema);
