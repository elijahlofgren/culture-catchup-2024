import React from 'react';

const About = () => {
  return (
    <div>
      <h1>About Page</h1>
      <div>
        <img src='/tmdb_logo.svg' style={{ width: '100px' }} />
        <br />
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </div>
    </div>
  );
};

export default About;
