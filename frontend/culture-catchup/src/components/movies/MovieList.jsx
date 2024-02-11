import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieListCard from './MovieListCard';

function MovieList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // The URL of the API you want to fetch from
    const apiUrl = `${import.meta.env.VITE_API_URL}/movies`;

    // Fetching data using Axios
    axios
      .get(apiUrl)
      .then((response) => {
        // Handling the response data
        setData(response.data);
      })
      .catch((error) => {
        // Handling errors if any
        console.error('Error fetching data: ', error);
      });
  }, []); // The empty array ensures this effect runs only once after the initial render

  return (
    <div>
      <h2>Movies</h2>
      {data.map((movie) => (
        <MovieListCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default MovieList;
