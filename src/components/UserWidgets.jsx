import "../App.css";
import React, { useEffect, useState } from "react";
import { Stack, Button, Box, Switch, FormControlLabel } from "@mui/material";
import {
  dbGetCurrentUser,
  dbGetUserWidgets,
  dbSaveUserSeePublicWidgets,
} from "../api/db";
import WidgetItem from "./WidgetItem";

const UserWidgets = () => {
  const [widgets, setWidgets] = useState(null);
  const [seePublicWidgets, setSeePublicWidgets] = useState(undefined);

  useEffect(() => {
    dbGetUserWidgets().then((newData) => setWidgets(() => newData));
  }, [seePublicWidgets]);

  useEffect(() => {
    dbGetCurrentUser().then((newData) =>
      setSeePublicWidgets(() => newData.see_public_widgets)
    );
  }, []);

  const changeSeePublicWidgets = async (value) => {
    await dbSaveUserSeePublicWidgets(value);
    setSeePublicWidgets(() => value);
  };

  return (
    <div>
      <Stack m={5} direction="row">
        {seePublicWidgets !== undefined ? (
          <FormControlLabel
            control={
              <Switch
                name="seePublicWidgets"
                onChange={(e) =>
                  changeSeePublicWidgets(e.currentTarget.checked)
                }
                checked={seePublicWidgets}
              />
            }
            label="Show public widgets from other users"
          />
        ) : (
          <></>
        )}
        <Box sx={{ flexGrow: 1 }} />
        <Button variant="outlined" sx={{ minWidth: "200px" }}>
          New widget ...
        </Button>
      </Stack>
      <div>
        {widgets
          ? widgets.map((widget, idx) => (
              <WidgetItem key={idx} index={idx} id={widget.id} />
            ))
          : ""}
      </div>
    </div>
  );
};

export default UserWidgets;
