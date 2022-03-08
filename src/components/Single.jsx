import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Axios } from "axios";

const Single = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(
    () =>
      Axios.get(`https://martins-poke-fight.herokuapp.com/pokemon/${id}`).then(
        (resp) => setPokemon(resp.data)
      ),
    [id]
  );

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
            Names
          </Link>
          <Link to={`/pokemon/${id}/base`} className="nav-link">
            Base
          </Link>
        </>
      ) : (
        "..."
      )}

      {/* 
"name": {
            "english": "Bulbasaur",
            "japanese": "フシギダネ",
            "chinese": "妙蛙种子",
            "french": "Bulbizarre"
        },
        "type": [
            "Grass",
            "Poison"
        ],
        "base": {
            "HP": 45,
            "Attack": 49,
            "Defense": 49,
            "Sp. Attack": 65,
            "Sp. Defense": 65,
            "Speed": 45
        }
*/}
    </div>
  );
};

export default Single;
