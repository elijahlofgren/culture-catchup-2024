const express = require('express');
const router = express.Router();
const getTopVoters = require('./getTopVoters');
const getVoter = require('./getVoter');

module.exports = (db) => {

    router.use('/', getTopVoters(db));
    router.use('/', getVoter(db));

    return router;

};
