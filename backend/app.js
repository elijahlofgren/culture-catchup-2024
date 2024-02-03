require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const movieRoutes = require('./routes/movieRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json'); // Ensure this path matches the outputFile in step 2

// Create connection to MySQL database using environment variables
const db = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE
});

// Connect to MySQL
db.connect((err) => {
    if(err) throw err;
    console.log('Connected to the MySQL Server');
});

const app = express();

// Use the movieRoutes for the /movies endpoint, passing the DB connection
app.use('/movies', movieRoutes(db));

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


