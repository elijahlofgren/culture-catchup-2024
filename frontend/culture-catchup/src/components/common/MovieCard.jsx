import React from 'react';

function MovieCard(props) {
    const { movie } = props;

    return <div key={movie.id}>
        <h2>{movie.title}</h2>
        <a href={`https://www.imdb.com/title/${movie.imdb_id}`} target="noreferrer noopener _blank">View on IMBD</a>

    </div>;
}

export default MovieCard;
