import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { updatePokemonInfo, updatePokemon } from "../api/api";

const Info = () => {
  const { id, obj } = useParams();

  const [pokemon, setPokemon] = useState({
    name: { english: "Loading data ..." },
  });
  const [pokemonInfo, setPokemonInfo] = useState(null);

  useEffect(() => updatePokemon(id, setPokemon), [id]);
  useEffect(() => updatePokemonInfo(id, obj, setPokemonInfo), [id, obj]);

  return (
    <div>
      {pokemonInfo ? (
        <>
          <h2>
            {pokemon.name.english}: {obj}
          </h2>
          <div>
            {obj === "name" ? (
              <>
                <p>Japanese: {pokemonInfo.japanese}</p>
                <p>Chinese: {pokemonInfo.chinese}</p>
                <p>French: {pokemonInfo.french}</p>
              </>
            ) : (
              <>
                <p>HP": {pokemonInfo["HP"]}</p>
                <p>Attack": {pokemonInfo["Attack"]}</p>
                <p>Defense": {pokemonInfo["Defense"]}</p>
                <p>Sp. Attack": {pokemonInfo["Sp. Attack"]}</p>
                <p>Sp. Defense": {pokemonInfo["Sp. Defense"]}</p>
                <p>Speed": {pokemonInfo["Speed"]}</p>
              </>
            )}
          </div>
        </>
      ) : (
        "Loading data ..."
      )}
    </div>
  );
};

export default Info;
