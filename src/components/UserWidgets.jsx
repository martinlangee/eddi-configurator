import "../App.css";
import React, { useEffect, useState } from "react";
import { Stack, Button, Box, Switch, FormControlLabel } from "@mui/material";
import { getWidgets } from "../api/db";
import WidgetItem from "./WidgetItem";

const UserWidgets = () => {
  const [widgets, setWidgets] = useState([]);
  useEffect(() => setWidgets((prev) => getWidgets(1)), []);

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
          ? widgets.map((w, idx) => (
              <WidgetItem key={idx} index={idx} data={w} />
            ))
          : "Loading widgets..."}
      </div>
    </div>
  );
};

export default UserWidgets;
