import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TopVoters() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const apiUrl = 'http://localhost:3000/voters/top-voters';

        axios.get(apiUrl)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, []); // The empty array ensures this effect runs only once after the initial render

    return (
        <div>
            <h2>Top Voters</h2>
            {data.map((voter) => (
                <div key={voter.id}>
                    <h2>{voter.first_name}</h2>
                    <a>See Votes</a>

                </div>
            ))}
        </div>
    );
}

export default TopVoters;
