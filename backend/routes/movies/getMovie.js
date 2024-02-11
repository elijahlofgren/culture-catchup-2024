// @ts-check

const express = require('express');
const router = express.Router();
const Joi = require('joi');
const getMovieDetails = require('../../lib/movie-db/getMovieDetails');

// Define a schema
const schema = Joi.object({
  movie_id: Joi.number().integer().positive().required(),
});

module.exports = (knex) => {
  router.get('/get-movie/:movie_id', async (req, res) => {
    // Validate request parameters
    const { value: validatedParams, error } = schema.validate(req.params);
    if (error) {
      // If validation fails, return a 400 response with the error message
      return res.status(400).send(error.details[0].message);
    }

    try {
      // TODO: Cache movie details for up to 5 months (6 months is limit allowed)

      const movie = await knex('movies')
        .select('*')
        .where('id', validatedParams.movie_id)
        .first();

      const results = await getMovieDetails(movie.imdb_id);
      res.json(results);
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  return router;
};
