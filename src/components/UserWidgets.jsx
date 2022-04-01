import "../App.css";
import React, { useEffect, useState } from "react";
import { Stack, Button, Box, Switch, FormControlLabel } from "@mui/material";
import { dbGetUserWidgets } from "../api/db";
import WidgetItem from "./WidgetItem";

const UserWidgets = () => {
  const [widgets, setWidgets] = useState(null);

  useEffect(() => {
    dbGetUserWidgets().then((widgets) => setWidgets((prev) => widgets));
  }, []);

  return (
    <div>
      <Stack m={5} direction="row">
        <FormControlLabel
          control={<Switch name="showPublicWidgets" />}
          label="Show public widgets from other users"
        />
        <Box sx={{ flexGrow: 1 }} />
        <Button variant="outlined" sx={{ minWidth: "200px" }}>
          New widget...
        </Button>
      </Stack>
      <div>
        {widgets
          ? widgets.map((wd, idx) => (
              <WidgetItem key={idx} index={idx} data={wd} />
            ))
          : "Loading widgets..."}
      </div>
    </div>
  );
};

export default UserWidgets;
