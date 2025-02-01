const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router();

// Login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d", // Token expires in 1 day
    });

    // Conditionally set 'secure' flag based on environment
    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,  // Secure cookies only in production (use in HTTPS)
      sameSite: "Strict",    // Ensures cookie is sent for same-site requests only
    });

    // Return the user data (excluding the password)
    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (err) {
    console.error("Login error:", err); // Log the error for debugging
    res.status(500).json({ message: "Server error during login" });
  }
});

// Check if the user is authenticated
router.get("/check", async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user and exclude the password
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Return the user data
    res.status(200).json({ user });
  } catch (err) {
    console.error("Auth check error:", err); // Log the error for debugging
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

// Logout user
router.post("/logout", (req, res) => {
  try {
    res.clearCookie("token"); // Clear the JWT token cookie
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err); // Log the error for debugging
    res.status(500).json({ message: "Server error during logout" });
  }
});

module.exports = router;