import MovieList from './components/movies/MovieList'
import TopVoters from './components/voters/TopVoters'

const routes = [
  {
    path: '/movies',
    component: MovieList,
  },
  {
    path: '/top-voters',
    component: TopVoters,
  },
];

export default routes;
