const express = require('express');
const router = express.Router();
const getVotesByUser = require('./getVotesByUser');

module.exports = (db) => {

    router.use('/', getVotesByUser(db));

    return router;

};
