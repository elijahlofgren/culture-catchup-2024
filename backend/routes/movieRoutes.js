const express = require('express');
const router = express.Router();

module.exports = (db) => {
    // Define an endpoint to fetch all movies
    router.get('/', (req, res) => {
        let sql = 'SELECT * FROM movies';
        db.query(sql, (err, results) => {
            if(err) {
                res.status(500).send('Error fetching movies from the database');
            } else {
                res.send(results);
            }
        });
    });

    return router;
};
