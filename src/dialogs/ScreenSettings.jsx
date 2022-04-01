import "../App.css";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
} from "@mui/material";
import { Box } from "@mui/system";
import DeleteIcon from "@material-ui/icons/Delete";
import LabelEdit from "../controls/LabelEdit";
import { dbGetScreen, dbSaveScreenData } from "../api/db";
import WidgetLayout from "../components/WidgetLayout";

// TODO: init and save "public"-Field

const ScreenSettings = ({ id, isOpen, handleClose }) => {
  const [screenData, setScreenData] = useState(null);

  useEffect(() => {
    dbGetScreen(id).then((newData) => setScreenData(() => newData));
  }, [id]);

  const checkInput = (dbField, value) => {
    // TODO: check if data are correct
    return true;
  };

  const saveLocal = (dbField, value) => {
    if (!checkInput) return;

    let newData = screenData;
    newData[dbField] = value;
    setScreenData(() => newData);
  };

  const onConfirm = () => {
    dbSaveScreenData(screenData);
    handleClose(true);
  };

  const onCancel = () => {
    handleClose(false);
  };

  return (
    <>
      {screenData ? (
        <Dialog maxWidth="false" open={isOpen} onClose={onCancel}>
          <DialogTitle>Screen properties and configuration</DialogTitle>
          <DialogContent>
            <Stack direction="row" mx={3} mb={5} spacing={5}>
              <LabelEdit
                label="Name"
                dbField="name"
                initValue={screenData.name}
                onSave={saveLocal}
                width="200px"
              />
              <LabelEdit
                label="Description"
                rows={4}
                dbField="description"
                initValue={screenData.description}
                onSave={saveLocal}
                width="200px"
              />
              <LabelEdit
                label="Width [px]"
                width="80px"
                dbField="size_x"
                onSave={saveLocal}
                initValue={screenData.size_x}
              />
              <LabelEdit
                label="Height [px]"
                width="80px"
                dbField="size_y"
                onSave={saveLocal}
                initValue={screenData.size_y}
              />
              <Box m="auto" pt={2}>
                <FormControlLabel
                  control={<Switch name="public" value={screenData.public} />}
                  label="Public"
                />
                <IconButton>
                  <DeleteIcon color="primary"></DeleteIcon>
                </IconButton>
              </Box>
            </Stack>
            <DialogTitle ml={-3}>Select and place the widgets</DialogTitle>
            <Stack direction="row">
              <Stack mt={3} mr={3}>
                <WidgetLayout index={0} data={0} />
                <Stack mt={5} mr={1} direction="row" justifyContent="flex-end">
                  <FormControl sx={{ width: "300px" }}>
                    <InputLabel id="add-widget-label">Add widget</InputLabel>
                    <Select label="Add widget" labelId="add-widget-label">
                      <MenuItem value={10}>Weather</MenuItem>
                      <MenuItem value={21}>Stocks</MenuItem>
                      <MenuItem value={22}>Calender</MenuItem>
                    </Select>{" "}
                  </FormControl>
                </Stack>
              </Stack>
              <Stack>
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

export default ScreenSettings;
