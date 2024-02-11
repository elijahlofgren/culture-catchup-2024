const express = require('express');
const router = express.Router();
const Joi = require('joi');

// Define a schema
const schema = Joi.object({
  user_id: Joi.number().integer().positive().required(),
});

module.exports = (knex) => {
  router.get('/by-user/:user_id', async (req, res) => {
    // Validate request parameters
    const { value: validatedParams, error } = schema.validate(req.params);
    if (error) {
      // If validation fails, return a 400 response with the error message
      return res.status(400).send(error.details[0].message);
    }

    try {
      const rows = await knex('votes as v')
        .select('m.id', 'm.title', 'v.up_vote', 'v.down_vote', 'u.first_name')
        .leftJoin('users as u', 'v.user_id', 'u.id')
        .leftJoin('movies as m', 'v.movie_id', 'm.id')
        .where('u.id', validatedParams.user_id);

      res.json(rows);
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  return router;
};
