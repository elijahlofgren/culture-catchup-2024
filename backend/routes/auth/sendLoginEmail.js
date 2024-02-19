// @ts-check

const express = require('express');
const router = express.Router();
const Joi = require('joi');
const sendLoginEmail = require('../../lib/auth/sendLoginEmail');

const schema = Joi.object({
  email: Joi.string().required(),
});

module.exports = (knex) => {
  router.post('/send-login-email/:email', async (req, res) => {
    // Validate request parameters
    const { value: validatedParams, error } = schema.validate(req.params);
    if (error) {
      // If validation fails, return a 400 response with the error message
      return res.status(400).send(error.details[0].message);
    }

    try {
      await sendLoginEmail(knex, res, validatedParams.email);
    } catch (error) {
      console.error('Error executing query with Knex:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  return router;
};
