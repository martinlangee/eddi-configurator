import "../App.css";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
} from "@mui/material";
import { Box } from "@mui/system";
import OpenInBrowserIcon from "@material-ui/icons/OpenInBrowser";
import DeleteIcon from "@material-ui/icons/Delete";
import LabelEdit from "../controls/LabelEdit";
import { dbGetWidget, dbSaveWidgetData } from "../api/db";

// TODO: init and save "public"-Field

const WidgetSettings = ({ id, isOpen, handleClose }) => {
  const [widgetData, setWidgetData] = useState(null);

  useEffect(() => {
    dbGetWidget(id).then((newData) => setWidgetData(() => newData));
  }, [id]);

  const checkInput = (dbField, value) => {
    // TODO: check if data are correct
    return true;
  };

  const saveLocal = (dbField, value) => {
    if (!checkInput) return;

    let newData = widgetData;
    newData[dbField] = value;
    setWidgetData(() => newData);
  };

  const onConfirm = () => {
    dbSaveWidgetData(widgetData);
    handleClose(true);
  };

  const onCancel = () => {
    handleClose(false);
  };

  return (
    <>
      {widgetData ? (
        <Dialog maxWidth="false" open={isOpen} onClose={onCancel}>
          <DialogTitle>Widget properties</DialogTitle>
          <DialogContent>
            <Stack direction="row" mx={3} spacing={10}>
              <Stack spacing={3}>
                <LabelEdit
                  label="Name"
                  dbField="name"
                  initValue={widgetData.name}
                  onSave={saveLocal}
                />
                <LabelEdit
                  label="Description"
                  rows={4}
                  dbField="description"
                  initValue={widgetData.description}
                  onSave={saveLocal}
                />
                <Stack direction="row" justifyContent="space-between">
                  <LabelEdit
                    label="Width [px]"
                    width="100px"
                    dbField="size_x"
                    initValue={widgetData.size_x}
                    onSave={saveLocal}
                  />
                  <LabelEdit
                    label="Height [px]"
                    width="100px"
                    dbField="size_y"
                    initValue={widgetData.size_y}
                    onSave={saveLocal}
                  />
                </Stack>
                <Divider />
                <Stack direction="row" justifyContent="space-between">
                  <label>Created</label>
                  <label>{widgetData.created}</label>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <label>Last saved</label>
                  <label>{widgetData.last_saved}</label>
                </Stack>
              </Stack>
              <Stack>
                <Stack mb={5} direction="row">
                  <FormControlLabel
                    control={<Switch name="public" value={widgetData.public} />}
                    label="Public"
                  />
                  <Box sx={{ flexGrow: 1 }} />
                  <IconButton>
                    <OpenInBrowserIcon color="primary"></OpenInBrowserIcon>
                  </IconButton>
                  <IconButton>
                    <DeleteIcon color="primary"></DeleteIcon>
                  </IconButton>
                </Stack>
                <label>Preview</label>
                <Box mt={1} display="flex">
                  <Box
                    m="auto"
                    sx={{ width: "350px", height: "250px" }}
                    bgcolor="silver"
                  />
                </Box>
              </Stack>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={onConfirm}>OK</Button>
            <Button onClick={onCancel}>Cancel</Button>
          </DialogActions>
        </Dialog>
      ) : (
        <></>
      )}
    </>
  );
};

export default WidgetSettings;
