// @ts-check

const express = require('express');
const router = express.Router();
const Joi = require('joi');

// Define a schema
const schema = Joi.object({
  user_id: Joi.number().integer().positive().required(),
});

module.exports = (db) => {
    router.get('/by-user', async (req, res) => {

 // Validate request query parameters
 const { value: validatedQueryParams, error } = schema.validate(req.query);
 if (error) {
    // If validation fails, return a 400 response with the error message
    return res.status(400).send(error.details[0].message);
  }

  try {
        const query = `SELECT
                m.title,
                v.up_vote,
                v.down_vote,
                u.first_name
            FROM
                votes v
                LEFT JOIN users u ON v.user_id = u.id
                LEFT JOIN movies m ON v.movie_id = m.id
            WHERE
                u.id = ?`;
        const [rows] = await db.query(query, [validatedQueryParams.user_id]); // Pass parameters as an array
        res.json(rows);

    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send('Internal Server Error');
      }
   
    });

    return router;
};
