const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ===============================
// ✅ Signup (After email verification only)
// ===============================
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    // ❌ Email not found or not verified
    if (!existingUser || !existingUser.isEmailVerified) {
      return res.status(400).json({ message: "Email not verified. Please verify before signup." });
    }

    // ✅ Already verified user with full details
    if (existingUser.name && existingUser.password) {
      return res.status(400).json({ message: "User already exists. Please login." });
    }

    // ✅ Finalize signup
    existingUser.name = name;
    existingUser.password = await bcrypt.hash(password, 10);
    await existingUser.save();

    return res.status(201).json({ message: "🎉 Account created successfully!" });

  } catch (err) {
    console.error("❌ Signup error:", err.message);
    return res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

// ===============================
// ✅ Login Controller
// ===============================
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // ❌ User doesn't exist
    if (!user) {
      return res.status(404).json({ message: "Account not found. Please sign up." });
    }

    // ❌ Incomplete profile (shouldn’t happen unless bypassed)
    if (!user.name || !user.password) {
      return res.status(403).json({ message: "Incomplete account. Please finish signup." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password. Try again." });
    }

    // ✅ Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    return res.status(200).json({
      token,
      user: { name: user.name, email: user.email },
    });

  } catch (err) {
    console.error("❌ Login error:", err.message);
    return res.status(500).json({ message: "Login failed", error: err.message });
  }
};

// ===============================
// ✅ Get Profile (Protected)
// ===============================
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json(user);
  } catch (err) {
    console.error("❌ Fetch profile error:", err.message);
    return res.status(500).json({ message: "Could not fetch profile", error: err.message });
  }
};

// ===============================
// ✅ Update Profile (Protected)
// ===============================
exports.updateProfile = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { ...req.body },
      { new: true }
    ).select("-password");

    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(updated);
  } catch (err) {
    console.error("❌ Profile update error:", err.message);
    return res.status(500).json({ message: "Could not update profile", error: err.message });
  }
};
