const express = require("express");
const router = express.Router();
const getTopVoters = require("./getTopVoters");
const getVoter = require("./getVoter");

module.exports = (knex) => {
  router.use("/", getTopVoters(knex));
  router.use("/", getVoter(knex));

  return router;
};
