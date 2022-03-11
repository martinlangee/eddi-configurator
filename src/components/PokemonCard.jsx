import React, { useState } from "react";
import { Avatar, Card, CardHeader } from "@mui/material";
import { Link } from "react-router-dom";

const PokemonCard = (param) => {
  const { pokemon } = param;
  console.log(pokemon.imageUrl);

  const typesAsStr = () => {
    let res = pokemon.type[0];
    for (let i = 1; i < pokemon.type.length; i++) {
      res += ", " + pokemon.type[i];
    }
    return res;
  };

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar() {
    const name = pokemon.name.english;
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split("")[0]}${name.split("")[1]}`,
    };
  }

  return (
    <Link to={`/pokemon/${pokemon.id}`} style={{ textDecoration: "none" }}>
      <Card sx={{ minWidth: 250, boxShadow: 3, m: 2 }}>
        <CardHeader
          avatar={<Avatar {...stringAvatar()} />}
          title={pokemon.name.english}
          subheader={typesAsStr()}
        />
      </Card>
    </Link>
  );
};

export default PokemonCard;
