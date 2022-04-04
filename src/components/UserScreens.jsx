import "../App.css";
import React, { useEffect, useState } from "react";
import { Stack, Button, Box, Typography } from "@mui/material";
import FiberNewTwoToneIcon from "@mui/icons-material/FiberNewTwoTone";
import { dbDeleteScreen, dbGetUserScreens } from "../api/db";
import ScreenItem from "./ScreenItem";
import WaitingBox from "./WaitingBox";
import ScreenSettings from "../dialogs/ScreenSettings";

const UserScreens = () => {
  const [screens, setScreens] = useState([]);
  // const [seePublicScreens, setSeePublicScreens] = useState(undefined);  TODO: future
  const [settingsOpen, setSettingsOpen] = useState(false);

  const updateScreens = async () => {
    return dbGetUserScreens().then((newData) => setScreens(() => newData));
  };

  useEffect(() => {
    updateScreens();
  }, [/*seePublicScreens,*/ screens?.length]);

  /* TODO: future
  useEffect(() => {
    dbGetCurrentUser().then((newData) =>
      setSeePublicScreens(() => newData.see_public_screens)
    );
  }, []);

  const changeSeePublicScreens = async (value) => {
    await dbSaveUserSeePublicScreens(value);
    setSeePublicScreens(() => value);
  }; */

  const handleNewScreenOpen = () => {
    setSettingsOpen(true);
  };

  const handleNewScreenClose = (confirmed) => {
    setSettingsOpen(false);
    if (confirmed) {
      updateScreens();
    }
  };

  const handleDeleteScreen = (screenId) => {
    dbDeleteScreen(screenId).then(() => {
      updateScreens();
    });
  };

  return (
    <div>
      <Stack m={5} direction="row">
        <Typography variant="h6">Screens configuration</Typography>
        {/* TODO: future
        seePublicScreens !== undefined ? (
          <FormControlLabel
            control={
              <Switch
                checked={seePublicScreens}
                onChange={(e) =>
                  changeSeePublicScreens(e.currentTarget.checked)
                }
              />
            }
            label="Show public screens from other users"
          />
        ) : (
          <></>
        )*/}
        <Box sx={{ flexGrow: 1 }} />
        <Button
          onClick={handleNewScreenOpen}
          variant="outlined"
          startIcon={<FiberNewTwoToneIcon color="primary" />}
          sx={{ minWidth: "200px" }}
        >
          New screen ...
        </Button>
      </Stack>
      <div>
        {screens ? (
          screens.map((screen, idx) => (
            <ScreenItem
              key={idx}
              index={idx}
              screenId={screen.id}
              onDelete={handleDeleteScreen}
            />
          ))
        ) : (
          <WaitingBox />
        )}
      </div>
      {settingsOpen ? (
        <ScreenSettings
          screenId={-1}
          isOpen={settingsOpen}
          handleClose={handleNewScreenClose}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserScreens;
