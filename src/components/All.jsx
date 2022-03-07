import "../App.css";
import React from "react";

const All = (props) => {
  const { pokemons } = props;
  return (
    <div>
      <h2>All</h2>
      <>
        <div className="horiz-parent">
          <div className="horiz-child horiz-child-left bold">ID</div>
          <div className="horiz-child horiz-child-right bold">Name</div>
        </div>
        {pokemons.length ? (
          pokemons.map((p) => (
            <div className="horiz-parent" key={p.id}>
              <div className="horiz-child horiz-child-left">{p.id}</div>
              <div className="horiz-child horiz-child-right">
                {p.name.english}
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
      </>
    </div>
  );
};

export default All;
