const express = require('express');
const router = express.Router();
const getAllMovies = require('./getAllMovies');

module.exports = (db) => {

    router.use('/', getAllMovies(db));

    return router;

};
