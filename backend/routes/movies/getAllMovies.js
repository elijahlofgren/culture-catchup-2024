// @ts-check

const express = require('express');
const router = express.Router();


module.exports = (db) => {
    router.get('/', async (req, res) => {

  try {
        const query = `SELECT * FROM movies`;
        const [rows] = await db.query(query,);
        res.json(rows);

       
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send('Internal Server Error');
      }
   
    });

    return router;
};
