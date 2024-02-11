import React from 'react';
import './MovieCard.scss';

function MovieCard(props) {
  const { movie } = props;

  const handleCardClick = () => {
    window.location.href = `/movies/${movie.id}`;
  };

  return (
    <div className='movie-card' onClick={handleCardClick} key={movie.id}>
      <a
        className='movie-card-link'
        href={`/movies/${movie.id}`}
        target='_self'
      >
        <h2 className='movie-title'>{movie.title}</h2>
        <div className='movie-links'>
          <span>Movie Details</span>
          <a
            href={`https://www.imdb.com/title/${movie.imdb_id}`}
            target='_blank'
            rel='noreferrer noopener'
            className='imdb-link'
            onClick={(e) => e.stopPropagation()} // Prevent the card click handler when clicking this link
          >
            IMDB
          </a>
        </div>
      </a>
    </div>
  );
}

export default MovieCard;
