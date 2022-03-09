import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { updatePokemon } from "../api/api";

const Single = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  useEffect(() => updatePokemon(id, setPokemon), [id]);

  const type2Str = (types) => {
    let res = types[0];
    for (let i = 1; i < types.length; i++) {
      res += ", " + types[i];
    }
    return res;
  };

  return (
    <div>
      {pokemon ? (
        <>
          <h2>{pokemon.name.english}</h2>
          <p>
            <b>Type(s):</b> {type2Str(pokemon.type)}
          </p>
          <Link to={`/pokemon/${id}/name`} className="nav-link">
            Name
          </Link>
          <Link to={`/pokemon/${id}/base`} className="nav-link">
            Base
          </Link>
        </>
      ) : (
        "..."
      )}
    </div>
  );
};

export default Single;
