const express = require('express');
const router = express.Router();
const getTopVoters = require('./getTopVoters');

module.exports = (db) => {

    router.use('/', getTopVoters(db));

    return router;

};
