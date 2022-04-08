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
  dbGetNewScreen,
  dbGetScreen,
  dbGetScreenWidgets,
  dbGetUserWidgets,
  dbInsertScreen,
  dbSaveScreen,
  dbSaveScreenWidgets,
} from "../api/db";
import ScreenWidgetLayout from "../components/ScreenWidgetLayout";
import AuthService from "../services/auth.service";
import { isPosInteger } from "../utils/utils";

// TODO: Screen:
// - Name not Empty
// - Dimensions are numbers, min 50, max 800
// - Width + Height: min 50, max 800
// - Screen-Widget: dimensions and positions are numbers and min+max check

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

  const validateName = (value) =>
    !value || value.trim().length < 5
      ? "Enter a valid name (5 or more characters)"
      : "";

  const validateDimension = (value) => {
    const msg =
      !isPosInteger(value) || value > 800 || value < 30
        ? "Enter a valid dimension (30...800)"
        : "";
    return msg;
  };

  const localSaveScreenData = async (dbField, value) => {
    return new Promise((resolve) => {
      setScreenData((prev) => {
        return { ...prev, [dbField]: value };
      });
      resolve(""); // no error message on save
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
          user_id: AuthService.getCurrentUser().id,
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
      {screenData && (
        <Dialog maxWidth="false" open={isOpen} onClose={cancel}>
          <DialogTitle>Screen properties and configuration</DialogTitle>
          <DialogContent>
            <Stack direction="row" mx={3} mb={1} spacing={5}>
              <LabelEdit
                label="Name"
                dbField="name"
                initValue={screenData.name}
                onValidate={validateName}
                onSave={localSaveScreenData}
                width="200px"
              />
              <LabelEdit
                label="Description"
                rows={4}
                dbField="description"
                initValue={screenData.description}
                onSave={localSaveScreenData}
                width="250px"
              />
              <LabelEdit
                label="Width [px]"
                width="80px"
                dbField="size_x"
                onValidate={validateDimension}
                onSave={localSaveScreenData}
                initValue={screenData.size_x}
              />
              <LabelEdit
                label="Height [px]"
                width="80px"
                dbField="size_y"
                onValidate={validateDimension}
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
              <Stack mr={3} minWidth="500px">
                <Stack spacing="3px" pb={2}>
                  <ScreenWidgetLayout />
                  {confScreenWidgets &&
                    confScreenWidgets.map((widget, idx) => (
                      <ScreenWidgetLayout
                        key={idx}
                        index={idx}
                        widget={widget}
                        screenWidth={screenData.size_x}
                        screenHeight={screenData.size_y}
                        onSave={localSaveWidgetLayout}
                        onRemove={removeScreenWidget}
                      />
                    ))}
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  style={{ color: "silver" }}
                >
                  <Stack pl={1} pt={1}>
                    <Typography sx={{ fontStyle: "italic" }}>
                      [Dimensions in pixel]
                    </Typography>
                  </Stack>
                  <FormControl sx={{ width: "300px", paddingRight: "7px" }}>
                    <InputLabel id="add-widget-label">
                      {availableWidgets && availableWidgets.length
                        ? "Select widget to add"
                        : "< no further widgets available >"}
                    </InputLabel>
                    <Select
                      size="small"
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
                  >
                    <Box
                      position="relative"
                      sx={{
                        top: "10px",
                        left: "50px",
                        width: "150px",
                        height: "130px",
                        backgroundColor: "blue",
                        zIndex: "tooltip",
                      }}
                    />
                  </Box>
                </Box>
              </Stack>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={confirm} variant="outlined">
              OK
            </Button>
            <Button onClick={cancel} variant="outlined">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default ScreenSettings;
