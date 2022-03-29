import "../App.css";
import React, { useEffect, useState } from "react";
import { Stack, Button, Box, Switch, FormControlLabel } from "@mui/material";
import { getScreens } from "../api/db";
import WidgetItem from "./WidgetItem";

const UserScreens = () => {
  const [screens, setScreens] = useState([]);
  useEffect(() => setScreens((prev) => getScreens(1)), []);

  return (
    <div>
      <Stack m={5} direction="row">
        <FormControlLabel
          control={<Switch name="showPublicScreens" />}
          label="Show public screens from other users"
        />
        <Box sx={{ flexGrow: 1 }} />
        <Button>New screen...</Button>
      </Stack>
      <div>
        {screens
          ? screens.map((w, idx) => (
              <WidgetItem key={idx} index={idx} data={w} />
            ))
          : "Loading screens..."}
      </div>
    </div>
  );
};

export default UserScreens;
