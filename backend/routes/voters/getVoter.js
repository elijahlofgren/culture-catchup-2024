// @ts-check

const express = require('express');
const router = express.Router();
const Joi = require('joi');

// Define a schema
const schema = Joi.object({
  user_id: Joi.number().integer().positive().required(),
});

module.exports = (knex) => {
  router.get('/get-voter/:user_id', async (req, res) => {
    // Validate request parameters
    const { value: validatedParams, error } = schema.validate(req.params);
    if (error) {
      // If validation fails, return a 400 response with the error message
      return res.status(400).send(error.details[0].message);
    }

    try {
      const user = await knex('users')
        .select('first_name')
        .where('id', validatedParams.user_id)
        .first();

      if (user) {
        res.json(user);
      } else {
        res.status(404).send('User not found');
      }
    } catch (error) {
      console.error('Error executing query with Knex:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  return router;
};
