const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

require("../config/passport"); // Ensure passport is loaded

const JWT_SECRET = process.env.JWT_SECRET || "6b9f3c8d7aaf1c2e5e3b59d4c4a8e9f0324b7d9c1a3e6d5f8c2e4a7b6d9f1e3c";

// Register
router.post("/register", async (req, res) => {
    try {
        const { mail, password } = req.body;
        console.log(req.body);

        if (!mail || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        let user = await User.findOne({ mail });
        if (user) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ mail, password: hashedPassword });
        console.log(user);
        await user.save();

        res.json({ message: "User registered successfully" });
    } catch (err) {
        console.error("Error in registration:", err.message);
        res.status(500).json({ message: "Server error" });
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const { mail, password } = req.body;

        if (!mail || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ mail });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
    } catch (err) {
        console.error("Error in login:", err.message);
        res.status(500).json({ message: "Server error" });
    }
});

// Google OAuth Login
router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"], prompt: "select_account" })
);

// Google OAuth Callback
router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        const token = jwt.sign({ id: req.user._id }, JWT_SECRET, { expiresIn: "1h" });
        res.json({ message: "Google Authentication Successful", token, user: req.user });
    }
);

// Logout
router.get("/logout", (req, res) => {
    req.logout(() => {
        res.json({ message: "User logged out" });
    });
});

// Protected Route
router.get("/profile", authMiddleware, async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
});

module.exports = router;
