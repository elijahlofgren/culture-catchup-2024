require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const movieRoutes = require('./routes/movies');
const voterRoutes = require('./routes/voters');
const votesRoutes = require('./routes/votes');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json'); // Ensure this path matches the outputFile in step 2

const db = mysql.createPool({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE
});


const app = express();

// Enable CORS for all requests
app.use(cors());

app.use('/movies', movieRoutes(db));
app.use('/voters', voterRoutes(db));
app.use('/votes', votesRoutes(db));

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


