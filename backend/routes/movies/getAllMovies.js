const express = require('express');
const router = express.Router();

module.exports = (knex) => {
  router.get('/', async (req, res) => {
    try {
      const rows = await knex('movies')
        .select(
          'movies.id',
          'movies.imdb_id',
          'movies.title',
          knex.raw('SUM(votes.up_vote) AS upvotes'), // Sum of upvotes for each movie
          knex.raw('SUM(votes.down_vote) AS downvotes'), // Sum of downvotes for each movie
          knex.raw('COUNT(votes.id) AS total_votes'), // Total number of votes for each movie
          knex.raw('SUM(votes.up_vote) - SUM(votes.down_vote) AS net_votes'), // Net votes (upvotes - downvotes)
          knex.raw(
            `GROUP_CONCAT(DISTINCT CASE WHEN votes.up_vote = 1 THEN users.first_name END SEPARATOR ", ") AS upvoted_first_names`
          ), // Concatenate first names of upvoters
          knex.raw(
            `GROUP_CONCAT(DISTINCT CASE WHEN votes.down_vote = 1 THEN users.first_name END SEPARATOR ", ") AS downvoted_first_names`
          ) // Concatenate first names of downvoters
        )
        .leftJoin('votes', 'movies.id', '=', 'votes.movie_id') // Join with votes table
        .leftJoin('users', 'votes.user_id', '=', 'users.id') // Join with users table to get first names
        .groupBy('movies.id') // Group by movie id to aggregate votes and names
        .orderBy('net_votes', 'desc'); // Order by net votes in descending order

      res.json(rows);
    } catch (error) {
      console.error('Error executing query with Knex:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  return router;
};
