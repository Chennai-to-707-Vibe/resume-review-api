
// swagger.js - Swagger Docs
const swaggerJsDoc = require("swagger-jsdoc");
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Auth API",
            version: "1.0.0",
            description: "Authentication API using JWT",
        },
        servers: [{ url: "http://localhost:5000" }],
    },
    apis: ["./routes/authRoutes.js"],
};
module.exports = swaggerJsDoc(options);