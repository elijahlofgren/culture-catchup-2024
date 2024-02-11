require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Knex = require("knex");
const movieRoutes = require("./routes/movies");
const voterRoutes = require("./routes/voters");
const votesRoutes = require("./routes/votes");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json"); // Ensure this path matches the outputFile in step 2

// Configure Knex
const knex = Knex({
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
});

const app = express();

// Enable CORS for all requests
app.use(cors());

// Pass the configured Knex instance instead of the mysql2 pool
app.use("/movies", movieRoutes(knex));
app.use("/voters", voterRoutes(knex));
app.use("/votes", votesRoutes(knex));

// Swagger UI setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
