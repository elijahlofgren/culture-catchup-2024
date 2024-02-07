import MovieList from './components/movies/MovieList'
import TopVoters from './components/voters/TopVoters'
import UserVotes from './components/votes/UserVotes'

const routes = [
  {
    path: '/movies',
    component: MovieList,
  },
  {
    path: '/top-voters',
    component: TopVoters,
  },
  {
    path: '/votes/user-votes/:userId',
    component: UserVotes,
  },
];

export default routes;
