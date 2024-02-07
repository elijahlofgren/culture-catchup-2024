import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UserVotes() {
    const [data, setData] = useState([]);
    let { userId } = useParams();

    useEffect(() => {
        // The URL of the API you want to fetch from
        const apiUrl = `${import.meta.env.VITE_API_URL}/votes/by-user?user_id=${userId}`;

        // Fetching data using Axios
        axios.get(apiUrl)
            .then((response) => {
                // Handling the response data
                setData(response.data);
            })
            .catch((error) => {
                // Handling errors if any
                console.error("Error fetching data: ", error);
            });
    }, []); // The empty array ensures this effect runs only once after the initial render

    return (
        <div>
            <h2>Movies</h2>
            {data.map((movie) => (
                <div key={movie.id}>
                    <h2>{movie.title}</h2>
                    <a href={`https://www.imdb.com/title/${movie.imdb_id}`} target="noreferrer noopener _blank">View on IMBD</a>

                </div>
            ))}
        </div>
    );
}

export default UserVotes;
