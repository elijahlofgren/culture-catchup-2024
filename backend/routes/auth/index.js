const express = require('express');
const router = express.Router();
const sendLoginEmail = require('./sendLoginEmail');

module.exports = (db) => {
  router.use('/', sendLoginEmail(db));

  return router;
};
