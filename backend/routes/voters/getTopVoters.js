// @ts-check

const express = require('express');
const router = express.Router();

module.exports = (knex) => {
  router.get('/top-voters', async (req, res) => {
    try {
      const rows = await knex('votes')
        .select('users.id', 'first_name')
        .count('votes.id as vote_count')
        .join('users', 'votes.user_id', 'users.id')
        .groupBy('users.id')
        .orderBy('vote_count', 'desc');

      res.json(rows);
    } catch (error) {
      console.error('Error executing query with Knex:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  return router;
};
