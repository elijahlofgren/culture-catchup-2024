import MovieList from './components/movies/MovieList';
import MovieDetails from './components/movies/MovieDetails';
import TopVoters from './components/voters/TopVoters';
import UserVotes from './components/votes/UserVotes';

const routes = [
  {
    path: '/movies',
    component: MovieList,
  },
  {
    path: '/movies/:movie_id',
    component: MovieDetails,
  },
  {
    path: '/top-voters',
    component: TopVoters,
  },
  {
    path: '/votes/user-votes/:user_id',
    component: UserVotes,
  },
];

export default routes;
