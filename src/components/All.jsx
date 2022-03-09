import "../App.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { updateAllPokemons } from "../api/api";

const All = () => {
  const [pokemons, setPokemons] = useState([]);
  useEffect(() => updateAllPokemons(setPokemons), []);

  return (
    <div>
      <h2>All</h2>
      {pokemons.length ? (
        <>
          <div className="horiz-parent">
            <div className="horiz-child horiz-child-left bold">ID</div>
            <div className="horiz-child horiz-child-right bold">Name</div>
          </div>
          {pokemons.map((p) => (
            <div className="horiz-parent" key={p.id}>
              <div className="horiz-child horiz-child-left">{p.id}</div>
              <div className="horiz-child horiz-child-right">
                <Link to={`/pokemon/${p.id}`}>{p.name.english}</Link>
              </div>
            </div>
          ))}
        </>
      ) : (
        "Loading data ..."
      )}
    </div>
  );
};

export default All;
