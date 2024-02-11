const express = require('express');
const router = express.Router();
const getAllMovies = require('./getAllMovies');
const getMovie = require('./getMovie');

module.exports = (db) => {

    router.use('/', getAllMovies(db));
    router.use('/', getMovie(db));

    return router;

};
