import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosGet } from "../api/api";

const Info = () => {
  const { id, obj } = useParams();
  const [pokemonInfo, setPokemonInfo] = useState(null);

  useEffect(
    () => axiosGet(id, obj).then((resp) => setPokemonInfo(resp.data)),
    []
  );

  return (
    <div>
      <h2>{obj}</h2>
      <div>
        {pokemonInfo ? (
          <>
            {obj === "name" ? (
              <>
                <p>English: {pokemonInfo.english}</p>
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
          </>
        ) : (
          "..."
        )}
      </div>
    </div>
  );
};

export default Info;
