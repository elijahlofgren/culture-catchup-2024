// @ts-check

const express = require('express');
const router = express.Router();


module.exports = (db) => {
    router.get('/top-voters', async (req, res) => {

  try {
        const query = `SELECT 
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
              vote_count DESC`;
        const [rows] = await db.query(query,);
        res.json(rows);

       
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send('Internal Server Error');
      }
   
    });

    return router;
};
