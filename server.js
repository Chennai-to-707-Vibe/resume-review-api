// server.js - Main Entry Point
const express = require("express");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger");
const session = require("express-session");
const passport = require("passport");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

// Initialize Express App
const app = express();
app.use(express.json());

// Configure Express Session (Needed for Passport.js)
app.use(
    session({
        secret: process.env.JWT_SECRET || "defaultSecretKey",
        resave: false,
        saveUninitialized: true,
    })
);

// Initialize Passport Middleware
require("./config/passport"); // Ensure Google OAuth is loaded
app.use(passport.initialize());
app.use(passport.session());

// Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use("/api/auth", authRoutes);

// Server Listening
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
