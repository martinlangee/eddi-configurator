import "../App.css";
import React, { useEffect, useState } from "react";
import { Stack, Button, Box, Typography } from "@mui/material";
import FiberNewTwoToneIcon from "@mui/icons-material/FiberNewTwoTone";
import Api from "../api/api";
import WidgetItem from "./WidgetItem";
import WidgetSettings from "../dialogs/WidgetSettings";

const UserWidgets = () => {
  const [widgets, setWidgets] = useState([]);
  //const [seePublicWidgets, setSeePublicWidgets] = useState(undefined);  TODO: future
  const [settingsOpen, setSettingsOpen] = useState(false);

  const updateWidgets = async () => {
    return Api.getUserWidgets()
      .then((newData) => {
        setWidgets(() => newData);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    updateWidgets();
  }, [/*seePublicWidgets,*/ widgets?.length]);

  /* TODO: future
  useEffect(() => {
    Api.getCurrentUser().then((newData) =>
      setSeePublicWidgets(() => newData.see_public_widgets)
    );
  }, []);

  const changeSeePublicWidgets = async (value) => {
    await saveUserSeePublicWidgets(value);
    setSeePublicWidgets(() => value);
  } */
  const handleNewWidgetOpen = () => {
    setSettingsOpen(true);
  };

  const handleNewWidgetClose = (confirmed) => {
    setSettingsOpen(false);
    if (confirmed) {
      updateWidgets();
    }
  };

  const handleDeleteWidget = async (widgetId) => {
    Api.deleteWidget(widgetId).then(() => {
      updateWidgets();
    });
  };

  return (
    <div>
      <Stack m={5} direction="row">
        <Typography sx={{ width: "595px" }} variant="h6">
          Widgets configuration
        </Typography>
        {/* TODO: future
        seePublicWidgets !== undefined ? (
          <FormControlLabel
            control={
              <Switch
                checked={seePublicWidgets}
                onChange={(e) =>
                  changeSeePublicWidgets(e.currentTarget.checked)
                }
              />
            }
            label="Show public widgets from other users"
          />
        ) : (
          <></>
        )*/}
        <Button
          onClick={handleNewWidgetOpen}
          variant="outlined"
          startIcon={<FiberNewTwoToneIcon color="primary" />}
          sx={{ minWidth: "250px" }}
        >
          New widget ...
        </Button>
      </Stack>
      <div>
        {widgets &&
          widgets.map((widget, idx) => (
            <WidgetItem
              key={idx}
              index={idx}
              widgetId={widget.id}
              onDelete={handleDeleteWidget}
            />
          ))}
      </div>
      <Stack ml={5}>
        {widgets === undefined ||
          (widgets.length === 0 && (
            <Typography variant="subtitle1">
              <p>No widgets defined.</p>
              To define a new widget click the 'NEW WIDGET ...' button.
            </Typography>
          ))}
      </Stack>
      {settingsOpen && (
        <WidgetSettings
          widgetId={-1}
          isOpen={settingsOpen}
          handleClose={handleNewWidgetClose}
        />
      )}
    </div>
  );
};

export default UserWidgets;
