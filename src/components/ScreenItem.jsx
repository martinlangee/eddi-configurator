import "../App.css";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Stack, IconButton, Divider } from "@mui/material";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteForeverIconTwoTone from "@material-ui/icons/DeleteForeverTwoTone";
import DriveFileMoveOutlinedIcon from "@mui/icons-material/DriveFileMoveOutlined";
import ScreenSettings from "../dialogs/ScreenSettings";
import Api from "../api/api";
import ConfirmDialog from "../dialogs/ConfirmDialog";
import { Tooltip } from "@material-ui/core";

const ScreenItem = ({ index, screenId, onDelete }) => {
  const [screenData, setScreenData] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  useEffect(() => {
    Api.getScreen(screenId).then(updateScreen);
  }, [screenId]);

  const updateScreen = (newData) => setScreenData(() => newData);

  const handleSettingsOpen = () => setSettingsOpen(true);

  const handleSettingsClose = (confirmed) => {
    setSettingsOpen(false);
    if (confirmed) {
      Api.getScreen(screenId).then(updateScreen);
    }
  };

  const handleDeleteScreen = () => {
    setDeleteConfirmOpen(() => true);
  };

  const handleDeleteConfirm = () => {
    onDelete(screenId);
    setDeleteConfirmOpen(() => false);
  };

  const handleExportScreen = () => {
    /* TODO */
    window.alert(">> Export of screen HTML package is not yet implemented. <<");
  };

  return (
    <Box>
      {/* Header line: printed only once above the first screen */}
      {!index && (
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
      )}
      {/* Screen lines */}
      {screenData && (
        <Box>
          <Divider />
          <Stack direction="row" m="10px">
            <Box minWidth="30px" display="flex">
              {/* <Box m="auto">{index + 1}</Box> */}
              <Box m="auto">{screenId}</Box>
            </Box>
            <Box
              mx={1}
              sx={{ backgroundColor: "whitesmoke" }}
              minWidth="150px"
              maxWidth="150px"
              display="flex"
            >
              <Box ml={1} my="auto">
                {screenData.name}
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
                {screenData.description}
              </Box>
            </Box>
            <Box display="flex" minWidth="100px">
              <Box
                m="auto"
                sx={{ width: "60px", height: "40px" }}
                bgcolor="silver"
              />
            </Box>
            <Box display="flex" minWidth="130px">
              <Box m="auto">
                <Tooltip title="Edit screen settings ...">
                  <IconButton onClick={handleSettingsOpen}>
                    <EditTwoToneIcon color="primary" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete screen ...">
                  <IconButton onClick={handleDeleteScreen}>
                    <DeleteForeverIconTwoTone color="primary" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Export screen HTML ...">
                  <IconButton
                    onClick={handleExportScreen}
                    sx={{ backgroundColor: "#ffff99" }}
                  >
                    <DriveFileMoveOutlinedIcon color="primary" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Stack>
          {settingsOpen ? (
            <ScreenSettings
              screenId={screenId}
              isOpen={settingsOpen}
              handleClose={handleSettingsClose}
            />
          ) : (
            <></>
          )}
        </Box>
      )}
      {deleteConfirmOpen && (
        <ConfirmDialog
          title="Delete screen"
          children={
            <div>
              <p>Do you want to delete the screen</p>
              <p>'{screenData.name}'?</p>
            </div>
          }
          open={deleteConfirmOpen}
          setOpen={setDeleteConfirmOpen}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </Box>
  );
};

export default ScreenItem;
