import React, { useEffect, useState } from 'react';
import apiRequest from './utils/apiRequest';
import { TMovie } from './services/types/movieType';

const App: React.FC = () => {
  const [popularMovies, setPopularMovies] = useState<TMovie[]>([]);
  const endPoint = 'movie/popular';

  useEffect(() => {
    apiRequest(endPoint, '').then(({ results }) => {
      if (results && results.length) {
        setPopularMovies(results);
      }
    });
  }, []);

  const popularMoviesList = popularMovies.map((popularMovie: TMovie) => (
    <li key={popularMovie.id}>{popularMovie.title}</li>
  ));

  return (
    <>
      <h1>Hello</h1>

      {popularMoviesList && <ul>{popularMoviesList}</ul>}
    </>
  );
};

export default App;
