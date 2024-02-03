import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MovieList from './components/movies/MovieList'

function App() {
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Culture Catch Up</h1>
      <div className="card">
       <MovieList />
       </div>
    </>
  )
}

export default App
