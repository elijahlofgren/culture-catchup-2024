import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './MovieDetails.scss';

function UserVotes() {
  const [movie, setMovie] = useState(null);
  let { movie_id } = useParams();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/movies/get-movie/${movie_id}`)
      .then((response) => {
        setMovie(response.data);
      })
      .catch((error) => {
        console.error('Error fetching voter: ', error);
      });
  }, []);

  if (!movie) {
    return 'Loading...';
  }

  return (
    <div className='movie-details'>
      <div className='movie-container'>
        <img
          className='movie-poster'
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
        />
        <div className='movie-info'>
          <h1 className='movie-title'>{movie.title}</h1>
          <p className='movie-overview'>{movie.overview}</p>
          <p className='movie-release-date'>
            Release Date: {movie.release_date}
          </p>
          <p className='movie-vote'>
            TheMovieDB.org Rating: {movie.vote_average} ({movie.vote_count}{' '}
            votes)
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserVotes;
