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
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import DeleteIcon from "@material-ui/icons/Delete";
import LabelEdit from "../controls/LabelEdit";
import {
  dbGetScreen,
  dbGetScreenWidgets,
  dbGetUserWidgets,
  dbSaveScreenData,
  dbSaveScreenWidgets,
} from "../api/db";
import ScreenWidgetLayout from "../components/ScreenWidgetLayout";

// TODO: init and save "public"-Field

const ScreenSettings = ({ id, isOpen, handleClose }) => {
  const [screenData, setScreenData] = useState(null);
  const [widgetData, setWidgetData] = useState(null);
  //const [availableWidgets, setAvailableWidgets] = useState(null);

  useEffect(() => {
    dbGetScreen(id).then((newData) => setScreenData(() => newData));
  }, [id]);

  useEffect(() => {
    dbGetScreenWidgets(id).then((newData) => setWidgetData(() => newData));
  }, [id]);

  useEffect(() => {
    dbGetUserWidgets();
  });

  const checkInput = (dbField, value) => {
    // TODO: check if data are correct
    return true;
  };

  const localSaveScreenData = (dbField, value) => {
    if (!checkInput(dbField, value)) return;

    let newData = screenData;
    newData[dbField] = value;
    setScreenData(() => newData);
  };

  const localSaveWidgetLayout = (index, dbField, value) => {
    console.log("Screen 1:", index, dbField, value);
    let newData = widgetData;
    newData[index][dbField] = value;
    console.log("Screen 2:", index, dbField, newData[index][dbField]);
    setWidgetData(() => newData);
  };

  const confirm = async () => {
    await dbSaveScreenData(screenData);
    await dbSaveScreenWidgets(id, widgetData);
    handleClose(true);
  };

  const cancel = () => {
    handleClose(false);
  };

  return (
    <>
      {screenData ? (
        <Dialog maxWidth="false" open={isOpen} onClose={cancel}>
          <DialogTitle>Screen properties and configuration</DialogTitle>
          <DialogContent>
            <Stack direction="row" mx={3} mb={1} spacing={5}>
              <LabelEdit
                label="Name"
                dbField="name"
                initValue={screenData.name}
                onSave={localSaveScreenData}
                width="200px"
              />
              <LabelEdit
                label="Description"
                rows={4}
                dbField="description"
                initValue={screenData.description}
                onSave={localSaveScreenData}
                width="200px"
              />
              <LabelEdit
                label="Width [px]"
                width="80px"
                dbField="size_x"
                onSave={localSaveScreenData}
                initValue={screenData.size_x}
              />
              <LabelEdit
                label="Height [px]"
                width="80px"
                dbField="size_y"
                onSave={localSaveScreenData}
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
              <Stack mt={3} mr={3} minWidth="500px">
                <Stack spacing="3px" pb={1}>
                  {widgetData ? (
                    widgetData.map((widget, idx) => (
                      <ScreenWidgetLayout
                        key={idx}
                        index={idx}
                        data={widget}
                        onSave={localSaveWidgetLayout}
                      />
                    ))
                  ) : (
                    <ScreenWidgetLayout index={0} />
                  )}
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  style={{ color: "silver" }}
                >
                  {widgetData && widgetData.length ? (
                    <Stack pl={1} pt={2}>
                      <Typography sx={{ fontStyle: "italic" }}>
                        (Dimensions in pixel)
                      </Typography>
                    </Stack>
                  ) : (
                    <></>
                  )}
                  <FormControl sx={{ width: "300px", paddingRight: "7px" }}>
                    <InputLabel id="add-widget-label">Add widget</InputLabel>
                    <Select label="Add widget" labelId="add-widget-label">
                      <MenuItem value={10}>Weather</MenuItem>
                      <MenuItem value={21}>Stocks</MenuItem>
                      <MenuItem value={22}>Calender</MenuItem>
                    </Select>
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
            <Button onClick={confirm}>OK</Button>
            <Button onClick={cancel}>Cancel</Button>
          </DialogActions>
        </Dialog>
      ) : (
        <></>
      )}
    </>
  );
};

export default ScreenSettings;
