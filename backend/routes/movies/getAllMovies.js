// @ts-check

const express = require('express');
const router = express.Router();

module.exports = (knex) => {
  router.get('/', async (req, res) => {
    try {
      const rows = await knex.select('*').from('movies');
      res.json(rows);
    } catch (error) {
      console.error('Error executing query with Knex:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  return router;
};
