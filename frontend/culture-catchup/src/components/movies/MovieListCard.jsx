import React from 'react';
import '../common/MovieCard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function MovieListCard(props) {
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
        <div className='movie-votes'>
          {movie.upvoted_first_names ? (
            <div>
              <FontAwesomeIcon icon={['fa', 'thumbs-up']} />{' '}
              {movie.upvoted_first_names}
            </div>
          ) : null}

          {movie.downvoted_first_names ? (
            <div>
              <FontAwesomeIcon icon={['fa', 'thumbs-down']} />{' '}
              {movie.downvoted_first_names}
            </div>
          ) : null}
        </div>
        <div className='movie-links'>
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

export default MovieListCard;
