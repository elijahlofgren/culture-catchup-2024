const { MovieDb } = require('moviedb-promise')
const moviedb = new MovieDb(process.env.MOVIE_DB_API_KEY)

async function getMovieDetailsByImdbId(imdbId) {
    try {
        // Use the `find` method with the IMDb ID
        const response = await moviedb.find({ id: imdbId, external_source: 'imdb_id' });

        if (response.movie_results.length > 0) {
            const movieDetails = response.movie_results[0]; // Assuming the first result is the desired one
            console.log('Movie Details:', movieDetails);
            return movieDetails;
        } else {
            console.log('No results found.');
            return null;
        }
    } catch (error) {
        console.error(`An error occurred: ${error.message}`);
        return null;
    }
}

exports.getMovieDetailsByImdbId = getMovieDetailsByImdbId;