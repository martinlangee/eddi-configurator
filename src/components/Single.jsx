import React, { useState, useEffect } from "react";
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
          <div>
            <b>Names:</b>
            <div>Japanese: {pokemon.name.japanese}</div>
            <div>Chinese: {pokemon.name.chinese}</div>
            <div>French: {pokemon.name.french}</div>
          </div>
          <div>
            <b>Type(s):</b>
            <div>{type2Str(pokemon.type)}</div>
          </div>
          <div>
            <b>Properties:</b>
            <div>HP: {pokemon.base["HP"]}</div>
            <div>Attack: {pokemon.base["Attack"]}</div>
            <div>Defense: {pokemon.base["Defense"]}</div>
            <div>Sp. Attack: {pokemon.base["Sp. Attack"]}</div>
            <div>Sp. Defense: {pokemon.base["Sp. Defense"]}</div>
            <div>Speed: {pokemon.base["Speed"]}</div>
          </div>
        </>
      ) : (
        "Loading data ..."
      )}
    </div>
  );
};

export default Single;
