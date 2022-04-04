import "../App.css";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import LabelEdit from "../controls/LabelEdit";
import {
  CURRENT_USERID,
  dbGetNewScreen,
  dbGetScreen,
  dbGetScreenWidgets,
  dbGetUserWidgets,
  dbInsertScreen,
  dbSaveScreen,
  dbSaveScreenWidgets,
} from "../api/db";
import ScreenWidgetLayout from "../components/ScreenWidgetLayout";

// TODO: init and save "public"-Field

const ScreenSettings = ({ screenId, isOpen, handleClose }) => {
  const [screenData, setScreenData] = useState(null);

  const [allWidgets, setAllWidgets] = useState([]);
  const [confScreenWidgets, setConfScreenWidgets] = useState([]);
  const [availableWidgets, setAvailableWidgets] = useState([]);

  useEffect(() => {
    if (screenId === undefined) return;

    // screenId === -1 => creating new screen
    if (screenId < 0) {
      dbGetNewScreen().then((newData) => setScreenData(() => newData));
    } else {
      dbGetScreen(screenId).then((newData) => setScreenData(() => newData));
    }
  }, [screenId]);

  useEffect(() => {
    dbGetScreenWidgets(screenId).then((newData) =>
      setConfScreenWidgets(() => newData)
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
          confScreenWidgets.find(
            (fromConf) => fromAll.id === fromConf.widget_id
          ) === undefined
      )
    );
  }, [confScreenWidgets, allWidgets]);

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
    let newData = confScreenWidgets;
    newData[index][dbField] = value;
    setConfScreenWidgets(() => newData);

    // this doesn't work:
    //    setWidgetData((prev) => {
    //      return { ...prev[index], [dbField]: value };
    //    });

    // this could be worth a test:
    //    setWidgetData((prev) => {
    //      return Object.values({ ...prev, [index]: ...prev[index], [dbField]: value }});
    //    });
  };

  const addScreenWidget = (widgetId) =>
    setConfScreenWidgets((prev) => {
      let newSW = [
        ...prev,
        {
          ...allWidgets.find((w) => w.id === widgetId),
          screen_id: screenId,
          widget_id: widgetId,
          user_id: CURRENT_USERID,
          x_pos: 0,
          y_pos: 0,
        },
      ];
      newSW.sort((a, b) => a.name.localeCompare(b.name));
      return newSW;
    });

  const removeScreenWidget = (widgetId) => {
    setConfScreenWidgets(() =>
      confScreenWidgets.filter((w) => w.widget_id !== widgetId)
    );
  };

  const confirm = async () => {
    if (screenId < 0) {
      screenId = await dbInsertScreen(screenData);
    } else {
      await dbSaveScreen(screenData);
    }
    await dbSaveScreenWidgets(screenId, confScreenWidgets);
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
                label="Width"
                width="80px"
                dbField="size_x"
                onSave={localSaveScreenData}
                initValue={screenData.size_x}
              />
              <LabelEdit
                label="Height"
                width="80px"
                dbField="size_y"
                onSave={localSaveScreenData}
                initValue={screenData.size_y}
              />
              <Box m="auto" pt={2}>
                {/* TODO: future 
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
                /> */}
              </Box>
            </Stack>
            <DialogTitle ml={-3}>Select and place the widgets</DialogTitle>
            <Stack direction="row">
              <Stack mt={0} mr={3} minWidth="500px">
                <Stack spacing="3px" pb={2}>
                  {confScreenWidgets ? (
                    confScreenWidgets.map((widget, idx) => (
                      <ScreenWidgetLayout
                        key={idx}
                        index={idx}
                        data={widget}
                        onSave={localSaveWidgetLayout}
                        onRemove={removeScreenWidget}
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
                  {confScreenWidgets && confScreenWidgets.length ? (
                    <Stack pl={1} pt={2}>
                      <Typography sx={{ fontStyle: "italic" }}>
                        [Dimensions in pixel]
                      </Typography>
                    </Stack>
                  ) : (
                    <></>
                  )}
                  <FormControl sx={{ width: "300px", paddingRight: "7px" }}>
                    <InputLabel id="add-widget-label">
                      {availableWidgets && availableWidgets.length
                        ? "Select widget to add"
                        : "< no further widgets available >"}
                    </InputLabel>
                    <Select
                      label={
                        availableWidgets && availableWidgets.length
                          ? "Select widget to add"
                          : "< no further widgets available >"
                      }
                      labelId="add-widget-label"
                      onChange={(e) => {
                        addScreenWidget(e.target.value);
                      }}
                      disabled={!availableWidgets || !availableWidgets.length}
                    >
                      {availableWidgets && availableWidgets.length ? (
                        availableWidgets.map((widget) => (
                          <MenuItem key={widget.id} value={widget.id}>
                            {widget.id}: {widget.name}
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
