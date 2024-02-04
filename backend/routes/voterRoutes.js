const express = require('express');
const router = express.Router();

module.exports = (db) => {
    router.get('/top-voters', (req, res) => {
        const sql = `
        SELECT 
            users.id, 
            first_name, 
            COUNT(votes.id) AS vote_count
        FROM 
            votes 
        INNER JOIN 
            users 
        ON 
            votes.user_id = users.id
        GROUP BY 
            users.id 
        ORDER BY 
            vote_count DESC
        `;
        
        db.query(sql, (err, results) => {
            if(err) {
                console.log(err);
                res.status(500).send('Error runing query');
            } else {
                res.send(results);
            }
        });
    });

    return router;
};
