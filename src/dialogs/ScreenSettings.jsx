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

const ScreenSettings = ({ screenId, isOpen, handleClose }) => {
  const [screenData, setScreenData] = useState(null);
  const [confWidgets, setConfWidgets] = useState([]);
  const [allWidgets, setAllWidgets] = useState([]);
  const [availableWidgets, setAvailableWidgets] = useState([]);

  useEffect(() => {
    dbGetScreen(screenId).then((newData) => setScreenData(() => newData));
  }, [screenId]);

  useEffect(() => {
    dbGetScreenWidgets(screenId).then((newData) =>
      setConfWidgets(() => newData)
    );
  }, [screenId]);

  useEffect(() => {
    dbGetUserWidgets().then((newData) => setAllWidgets(() => newData));
  }, [screenId]);

  useEffect(() => {
    setAvailableWidgets(() =>
      // filtering out all widgets that are already configured
      allWidgets.filter(
        (fromAll) =>
          confWidgets.find((fromConf) => fromAll.id === fromConf.widget_id) ===
          undefined
      )
    );
  }, [confWidgets, allWidgets]);

  const checkInput = (dbField, value) => {
    // TODO: check if data are correct
    return true;
  };

  const localSaveScreenData = (dbField, value) => {
    if (!checkInput(dbField, value)) return;

    setScreenData((prev) => {
      return { ...prev, [dbField]: value };
    });
  };

  const localSaveWidgetLayout = (index, dbField, value) => {
    let newData = confWidgets;
    newData[index][dbField] = value;
    setConfWidgets(() => newData);

    // this doesn't work:
    //    setWidgetData((prev) => {
    //      return { ...prev[index], [dbField]: value };
    //    });

    // this could be worth a test:
    //    setWidgetData((prev) => {
    //      return Object.values({ ...prev, [index]: ...prev[index], [dbField]: value }});
    //    });
  };

  const widgetSelected = (widgetId) => {
    console.log("#####", widgetId);
    setConfWidgets((prev) => [
      ...prev,
      allWidgets.find((w) => w.id === widgetId),
    ]);
  };

  const confirm = async () => {
    await dbSaveScreenData(screenData);
    await dbSaveScreenWidgets(screenId, confWidgets);
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
                  control={
                    <Switch
                      checked={screenData.public}
                      onChange={(e) =>
                        localSaveScreenData("public", e.currentTarget.checked)
                      }
                    />
                  }
                  label="Public"
                />
                <IconButton>
                  <DeleteIcon color="primary"></DeleteIcon>
                </IconButton>
              </Box>
            </Stack>
            <DialogTitle ml={-3}>Select and place the widgets</DialogTitle>
            <Stack direction="row">
              <Stack mt={0} mr={3} minWidth="500px">
                <Stack spacing="3px" pb={1}>
                  {confWidgets ? (
                    confWidgets.map((widget, idx) => (
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
                  {confWidgets && confWidgets.length ? (
                    <Stack pl={1} pt={2}>
                      <Typography sx={{ fontStyle: "italic" }}>
                        (Dimensions in pixel)
                      </Typography>
                    </Stack>
                  ) : (
                    <></>
                  )}
                  <FormControl sx={{ width: "300px", paddingRight: "7px" }}>
                    <InputLabel id="add-widget-label">
                      {availableWidgets && availableWidgets.length
                        ? "Add widget"
                        : "< no further widgets available >"}
                    </InputLabel>
                    <Select
                      label="Add widget"
                      labelId="add-widget-label"
                      onChange={(e) => {
                        widgetSelected(e.target.value);
                      }}
                      disabled={!availableWidgets || !availableWidgets.length}
                    >
                      {availableWidgets && availableWidgets.length ? (
                        availableWidgets.map((widget) => (
                          <MenuItem key={widget.id} value={widget.id}>
                            {widget.name}
                          </MenuItem>
                        ))
                      ) : (
                        <Box></Box>
                      )}
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
