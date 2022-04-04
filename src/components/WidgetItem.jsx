import "../App.css";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Stack, IconButton, Divider } from "@mui/material";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import WidgetSettings from "../dialogs/WidgetSettings";
import { dbGetWidget } from "../api/db";

const WidgetItem = ({ index, widgetId, onDelete }) => {
  const [widgetData, setWidgetData] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const updateWidget = (newData) => setWidgetData(() => newData);

  useEffect(() => {
    dbGetWidget(widgetId).then(updateWidget);
  }, [widgetId]);

  const handleSettingsOpen = () => setSettingsOpen(true);

  const handleSettingsClose = (confirmed) => {
    setSettingsOpen(false);
    if (confirmed) {
      dbGetWidget(widgetId).then(updateWidget);
    }
  };

  const handleDeleteWidget = () => {
    onDelete(widgetId);
  };

  return (
    <Box>
      {/* Header line: printed only once above the first widget */}
      {!index ? (
        <Stack direction="row" m="10px">
          <Box minWidth="30px"></Box>
          <Box ml={2} minWidth="150px" maxWidth="150px">
            <strong>Name</strong>
          </Box>
          <Box ml={1} minWidth="150px" maxWidth="500px" width="100%">
            <strong>Description</strong>
          </Box>
          <Box display="flex" minWidth="100px">
            <Box m="auto">
              <strong>Thumbnail</strong>
            </Box>
          </Box>
          <Box minWidth="100px"></Box>
        </Stack>
      ) : (
        <></>
      )}
      {/* Widget lines */}
      {widgetData ? (
        <Box>
          <Divider />
          <Stack direction="row" m="10px">
            <Box minWidth="30px" display="flex">
              {/* <Box m="auto">{index + 1}</Box> */}
              <Box m="auto">{widgetId}</Box>
            </Box>
            <Box
              mx={1}
              sx={{ backgroundColor: "whitesmoke" }}
              minWidth="150px"
              maxWidth="150px"
              display="flex"
            >
              <Box ml={1} my="auto">
                {widgetData.name}
              </Box>
            </Box>
            <Box
              sx={{ backgroundColor: "whitesmoke" }}
              minWidth="150px"
              maxWidth="500px"
              width="100%"
              display="flex"
            >
              <Box ml={1} my="auto">
                {widgetData.description}
              </Box>
            </Box>
            <Box display="flex" minWidth="100px">
              <Box
                m="auto"
                sx={{ width: "60px", height: "40px" }}
                bgcolor="silver"
              />
            </Box>
            <Box display="flex" minWidth="100px">
              <Box m="auto">
                <IconButton onClick={handleSettingsOpen}>
                  <EditTwoToneIcon color="primary" />
                </IconButton>
                <IconButton onClick={handleDeleteWidget}>
                  <DeleteForeverTwoToneIcon color="primary" />
                </IconButton>
              </Box>
            </Box>
          </Stack>
          {settingsOpen ? (
            <WidgetSettings
              widgetId={widgetId}
              isOpen={settingsOpen}
              handleClose={handleSettingsClose}
            />
          ) : (
            <></>
          )}
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default WidgetItem;
