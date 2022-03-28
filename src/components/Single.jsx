import "../App.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Card,
  CardHeader,
  Grid,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";
import { updatePokemon } from "../api/api";

const Single = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  useEffect(() => updatePokemon(id, setPokemon), [id]);

  const typesAsStr = () => {
    let res = pokemon.type[0];
    for (let i = 1; i < pokemon.type.length; i++) {
      res += ", " + pokemon.type[i];
    }
    return res;
  };

  return (
    <div>
      {pokemon ? (
        <>
          <Card sx={{ width: "50%", boxShadow: 3, m: 2 }}>
            <Table direction="row">
              <TableBody>
                <TableRow>
                  <TableCell className="borderCell" width="1%">
                    <CardHeader
                      avatar={<Avatar src={pokemon.imageUrl} />}
                      title={pokemon.name.english}
                      subheader={typesAsStr()}
                    />
                  </TableCell>
                  <TableCell className="borderCell" width={"250px"}>
                    <Grid container>
                      <Grid item width="40%">
                        <Typography>Japanese:</Typography>
                      </Grid>
                      <Grid item width="60%">
                        <Typography>{pokemon.name.japanese}</Typography>
                      </Grid>
                      <Grid item width="40%">
                        <Typography>Chinese:</Typography>
                      </Grid>
                      <Grid item width="60%">
                        <Typography>{pokemon.name.chinese}</Typography>
                      </Grid>
                      <Grid item width="40%">
                        <Typography>French:</Typography>
                      </Grid>
                      <Grid item width="60%">
                        <Typography>{pokemon.name.french}</Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell>
                    <Grid container width="200px">
                      <Grid item width="80%">
                        <Typography>HP:</Typography>
                      </Grid>
                      <Grid item>
                        <Typography>{pokemon.base["HP"]}</Typography>
                      </Grid>
                      <Grid item width="80%">
                        <Typography>Attack:</Typography>
                      </Grid>
                      <Grid item>
                        <Typography>{pokemon.base["Attack"]}</Typography>
                      </Grid>
                      <Grid item width="80%">
                        <Typography>Defense:</Typography>
                      </Grid>
                      <Grid item>
                        <Typography>{pokemon.base["Defense"]}</Typography>
                      </Grid>
                      <Grid item width="80%">
                        <Typography>Sp. Attack:</Typography>
                      </Grid>
                      <Grid item>
                        <Typography>{pokemon.base["Sp. Attack"]}</Typography>
                      </Grid>
                      <Grid item width="80%">
                        <Typography>Sp. Defense:</Typography>
                      </Grid>
                      <Grid item>
                        <Typography>{pokemon.base["Sp. Defense"]}</Typography>
                      </Grid>
                      <Grid item width="80%">
                        <Typography>Speed:</Typography>
                      </Grid>
                      <Grid item>
                        <Typography>{pokemon.base["Speed"]}</Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </>
      ) : (
        "Loading data ..."
      )}
    </div>
  );
};

export default Single;
