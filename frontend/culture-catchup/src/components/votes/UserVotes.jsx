import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MovieCard from '../common/MovieCard';

function UserVotes() {
  const [voter, setVoter] = useState(null);
  const [data, setData] = useState([]);
  let { user_id } = useParams();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/voters/get-voter/${user_id}`)
      .then((response) => {
        setVoter(response.data);
      })
      .catch((error) => {
        console.error('Error fetching voter: ', error);
      });

    axios
      .get(`${import.meta.env.VITE_API_URL}/votes/by-user/${user_id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching votes: ', error);
      });
  }, []);

  return (
    <div>
      <h2>{voter?.first_name}'s Movies</h2>
      {data.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default UserVotes;
