import "../App.css";
import React, { useEffect, useState } from "react";
import { Stack, Button, Box, Switch, FormControlLabel } from "@mui/material";
import { getScreens } from "../api/db";
import ScreenItem from "./ScreenItem";
import WaitingBox from "./WaitingBox";

const UserScreens = () => {
  const [screens, setScreens] = useState([]);
  useEffect(() => setScreens(() => getScreens(1)), []);

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
          screens.map((w, idx) => <ScreenItem key={idx} index={idx} data={w} />)
        ) : (
          <WaitingBox />
        )}
      </div>
    </div>
  );
};

export default UserScreens;
