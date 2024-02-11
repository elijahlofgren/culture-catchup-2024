import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../common/MovieCard.scss';

function UserVotesMovieCard(props) {
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
        <h2 className='movie-title'>
          {movie.up_vote ? (
            <>
              <FontAwesomeIcon icon={['fa', 'thumbs-up']} />{' '}
            </>
          ) : null}
          {movie.down_vote ? (
            <>
              <FontAwesomeIcon icon={['fa', 'thumbs-down']} />{' '}
            </>
          ) : null}

          {movie.title}
        </h2>
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

export default UserVotesMovieCard;
