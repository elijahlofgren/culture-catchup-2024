// @ts-check

const express = require('express');
const router = express.Router();
const Joi = require('joi');
const {
  getMovieDetailsByImdbId,
} = require('../../lib/movie-db/getMovieDetailsByImdbId');

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

      // Get the IMBD ID from the database

      // Example usage with an IMDb ID
      const results = await getMovieDetailsByImdbId('tt1375666'); // Example IMDb ID for Inception
      res.json(results);
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  return router;
};
