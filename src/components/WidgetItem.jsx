import "../App.css";
import React, { useState } from "react";
import { Box } from "@mui/system";
import { Stack, TextField, Switch, IconButton, Dialog } from "@mui/material";
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
          <Box ml={2} minWidth="150px" width="100%">
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
          <Box minWidth="150px"></Box>
        </Stack>
      ) : (
        ""
      )}
      {/* Widget lines */}
      <Stack
        direction="row"
        m="10px"
        sx={{ "&:hover": { backgroundColor: "#e8f8ff" } }}
      >
        <Box minWidth="30px" display="flex">
          <Box m="auto">{index + 1}</Box>
        </Box>
        <Box m={1} sx={{ minWidth: "150px", maxWidth: "150px" }}>
          <TextField
            required
            variant="outlined"
            size="small"
            value={data.name}
          />
        </Box>
        <Box m={1} sx={{ width: "100%", minWidth: "150px" }}>
          <TextField
            required
            variant="outlined"
            size="small"
            fullWidth
            value={data.description}
          />
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
        <Box display="flex" minWidth="150px">
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
