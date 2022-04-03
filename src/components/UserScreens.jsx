import "../App.css";
import React, { useEffect, useState } from "react";
import { Stack, Button, Box, Switch, FormControlLabel } from "@mui/material";
import {
  dbGetCurrentUser,
  dbGetUserScreens,
  dbSaveUserSeePublicScreens,
} from "../api/db";
import ScreenItem from "./ScreenItem";
import WaitingBox from "./WaitingBox";

const UserScreens = () => {
  const [screens, setScreens] = useState([]);
  const [seePublicScreens, setSeePublicScreens] = useState(undefined);

  useEffect(() => {
    dbGetUserScreens().then((newData) => setScreens(() => newData));
  }, [seePublicScreens]);

  useEffect(() => {
    dbGetCurrentUser().then((newData) =>
      setSeePublicScreens(() => newData.see_public_screens)
    );
  }, []);

  const changeSeePublicScreens = async (value) => {
    await dbSaveUserSeePublicScreens(value);
    setSeePublicScreens(() => value);
  };

  return (
    <div>
      <Stack m={5} direction="row">
        {seePublicScreens !== undefined ? (
          <FormControlLabel
            control={
              <Switch
                onChange={(e) =>
                  changeSeePublicScreens(e.currentTarget.checked)
                }
                checked={seePublicScreens}
              />
            }
            label="Show public screens from other users"
          />
        ) : (
          <></>
        )}
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
