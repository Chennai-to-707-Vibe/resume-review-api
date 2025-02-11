// server.js - Main Entry Point
const express = require("express");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger");
const authRoutes = require("./routes/authRoutes");
// const connectDB = require("./config/db");

dotenv.config();
// connectDB();

const app = express();
app.use(express.json());

// Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// .env - Environment Variables
// PORT=5000
// MONGO_URI=mongodb://localhost:27017/authDB
// JWT_SECRET=your_secret_key
