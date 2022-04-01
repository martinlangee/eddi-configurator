import "../App.css";
import React, { useEffect, useState } from "react";
import { Stack, Button, Box, Switch, FormControlLabel } from "@mui/material";
import { dbGetUserScreens } from "../api/db";
import ScreenItem from "./ScreenItem";
import WaitingBox from "./WaitingBox";

const UserScreens = () => {
  const [screens, setScreens] = useState([]);

  useEffect(() => {
    dbGetUserScreens().then((newData) => setScreens(() => newData));
  }, []);

  return (
    <div>
      <Stack m={5} direction="row">
        <FormControlLabel
          control={<Switch name="showPublicScreens" />}
          label="Show public screens from other users"
        />
        <Box sx={{ flexGrow: 1 }} />
        <Button variant="outlined" sx={{ minWidth: "200px" }}>
          New screen ...
        </Button>
      </Stack>
      <div>
        {screens ? (
          screens.map((screen, idx) => (
            <ScreenItem key={idx} index={idx} id={screen.id} />
          ))
        ) : (
          <WaitingBox />
        )}
      </div>
    </div>
  );
};

export default UserScreens;
