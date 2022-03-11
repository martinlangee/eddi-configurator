import "../App.css";
import React, { useState, useEffect } from "react";
import { Box, Alert } from "@mui/material";
import { updateAllPokemons } from "../api/api";
import PokemonCard from "./PokemonCard";

const All = () => {
  const [pokemons, setPokemons] = useState([]);
  useEffect(() => updateAllPokemons(setPokemons), []);

  return (
    <>
      {pokemons.length ? (
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {pokemons.map((p) => (
            <PokemonCard pokemon={p} key={p.id} />
          ))}
        </Box>
      ) : (
        <Alert sx={{ justifyContent: "center" }} severity="info">
          Loading data ...
        </Alert>
      )}
    </>
  );
};

export default All;
