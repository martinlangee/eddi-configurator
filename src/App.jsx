import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Axios from "axios";
import All from "./components/All.jsx";
import Single from "./components/Single.jsx";
import Info from "./components/Info.jsx";

function App() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    Axios.get(`http://martins-poke-fight.herokuapp.com/pokemon`).then((resp) =>
      setPokemons(resp.data)
    );
  }, []);

  return (
    <Router>
      <div>
        <h2>Welcome to Martin's Poke Fight Page</h2>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li>
              <Link to={"/"} className="nav-link">
                All
              </Link>
            </li>
            <li>
              <Link to={"/single/:id"} className="nav-link">
                Single
              </Link>
            </li>
            <li>
              <Link to={"/info/:id/:obj"} className="nav-link">
                Info
              </Link>
            </li>
          </ul>
        </nav>
        <hr />
      </div>
      <Routes>
        <Route exact path="/" element={<All pokemons={pokemons} />} />
        <Route path="/single/:id" element={<Single />} />
        <Route path="/info/:id/:obj" element={<Info />} />
      </Routes>
    </Router>
  );
}

export default App;
