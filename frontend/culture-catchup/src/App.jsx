import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import routes from "./routes";

function App() {
  return (
    <Router>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Culture Catch Up</h1>
      <nav>
        <ul>
          <li>
            <Link to="/movies">Movies</Link>
          </li>
          <li>
            <Link to="/top-voters">Top Voters</Link>
          </li>
          {/* Add more links here if needed */}
        </ul>
      </nav>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={React.createElement(route.component)} />
        ))}
      </Routes>
    </Router>

  )
}

export default App
