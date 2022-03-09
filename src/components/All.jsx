import "../App.css";
import React from "react";
import { Link } from "react-router-dom";

const All = (props) => {
  const { pokemons } = props;
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
