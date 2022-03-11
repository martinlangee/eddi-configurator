import "../App.css";
import React, { useState, useEffect } from "react";
import { Box, Alert } from "@mui/material";
import { updateAllPokemons } from "../api/api";
import PokemonCard from "./PokemonCard";

const All = () => {
  const [pokemons, setPokemons] = useState([]);
  useEffect(() => updateAllPokemons(setPokemons), []);

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      {pokemons.length ? (
        <>
          {pokemons.map((p) => (
            <PokemonCard pokemon={p} key={p.id} />
          ))}
        </>
      ) : (
        <Alert severity="info">Loading data ...</Alert>
      )}
    </Box>
  );
};

export default All;
