import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import All from "./components/All.jsx";
import Single from "./components/Single.jsx";
import Info from "./components/Info.jsx";
import { getAllPokemons } from "./api/api";

function App() {
  const [pokemons, setPokemons] = useState([]);

  // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => getAllPokemons(setPokemons), []);

  return (
    <Router>
      <div>
        <h2>Welcome to Martin's Poke Fight Page</h2>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to={"/"} className="nav-link">
            View All
          </Link>
        </nav>
        <hr />
      </div>
      <Routes>
        <Route path="/pokemon/:id" element={<Single />} />
        <Route path="/pokemon/:id/:obj" element={<Info />} />
        <Route exact path="/" element={<All pokemons={pokemons} />} />
      </Routes>
    </Router>
  );
}

export default App;
