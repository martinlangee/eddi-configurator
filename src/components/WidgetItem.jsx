import "../App.css";
import React, { useState } from "react";
import { Box } from "@mui/system";
import { Stack, Switch, IconButton, Divider } from "@mui/material";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import WidgetSettings from "../dialogs/WidgetSettings";

const WidgetItem = ({ index, data }) => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleSettingsOpen = () => setSettingsOpen(true);
  const handleSettingsClose = () => setSettingsOpen(false);

  return (
    <Box>
      {/* Header line: printed only once above the first widget */}
      {!index ? (
        <Stack direction="row" m="10px">
          <Box minWidth="30px"></Box>
          <Box ml={2} minWidth="150px" maxWidth="150px">
            <strong>Name</strong>
          </Box>
          <Box ml={1} minWidth="150px" maxWidth="400px" width="100%">
            <strong>Description</strong>
          </Box>
          <Box display="flex" minWidth="100px">
            <Box m="auto">
              <strong>Thumbnail</strong>
            </Box>
          </Box>
          <Box display="flex" minWidth="70px" mx="0px">
            <Box m="auto">
              <strong>Public</strong>
            </Box>
          </Box>
          <Box minWidth="100px"></Box>
        </Stack>
      ) : (
        ""
      )}
      {/* Widget lines */}
      <Divider />
      <Stack direction="row" m="10px">
        <Box minWidth="30px" display="flex">
          <Box m="auto">{index + 1}</Box>
        </Box>
        <Box
          mx={1}
          sx={{ backgroundColor: "whitesmoke" }}
          minWidth="150px"
          maxWidth="150px"
          display="flex"
        >
          <Box ml={1} my="auto">
            {data.name}
          </Box>
        </Box>
        <Box
          sx={{ backgroundColor: "whitesmoke" }}
          minWidth="150px"
          maxWidth="400px"
          width="100%"
          display="flex"
        >
          <Box ml={1} my="auto">
            {data.description}
          </Box>
        </Box>
        <Box display="flex" minWidth="100px">
          <Box
            m="auto"
            sx={{ width: "60px", height: "40px" }}
            bgcolor="silver"
          />
        </Box>
        <Box display="flex" minWidth="70px">
          <Box m="auto">
            <Switch></Switch>
          </Box>
        </Box>
        <Box display="flex" minWidth="100px">
          <Box m="auto">
            <IconButton onClick={handleSettingsOpen}>
              <EditIcon color="primary"></EditIcon>
            </IconButton>
            <IconButton>
              <DeleteIcon color="primary"></DeleteIcon>
            </IconButton>
          </Box>
        </Box>
      </Stack>
      <WidgetSettings
        id={data.id}
        isOpen={settingsOpen}
        handleClose={handleSettingsClose}
      />
    </Box>
  );
};

export default WidgetItem;
