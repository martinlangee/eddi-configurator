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
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { cyan } from "@mui/material/colors";
import LabelEdit from "../controls/LabelEdit";
import Api from "../api/api";
import ScreenWidgetLayout from "../components/ScreenWidgetLayout";
import { isPosInteger, transformXY } from "../utils/utils";

// TODO: init and save "public"-Field

const ScreenSettings = ({ screenId, isOpen, handleClose }) => {
  const MAX_SIZE = 300;
  const [screenData, setScreenData] = useState(null);
  const [allWidgets, setAllWidgets] = useState([]);
  const [confScreenWidgets, setConfScreenWidgets] = useState([]);
  const [screenWidgetGeom, setScreenWidgetGeom] = useState([]);
  const [availableWidgets, setAvailableWidgets] = useState([]);
  const [previewSize, setPreviewSize] = useState({ w: "300px", h: "250px" });
  const [showPreview, setShowPreview] = useState(false);

  // load screen data or init new screen
  useEffect(() => {
    if (screenId === undefined) return;

    // screenId === -1 => creating new screen
    if (screenId < 0) {
      Api.getNewScreen().then((newData) => setScreenData(() => newData));
    } else {
      Api.getScreen(screenId).then((newData) => setScreenData(() => newData));
    }
  }, [screenId]);

  // load widgets configured on this screen
  useEffect(() => {
    Api.getScreenWidgets(screenId).then((newData) => {
      setConfScreenWidgets(() => newData);
    });
  }, [screenId]);

  // load all user widgets
  useEffect(() => {
    Api.getUserWidgets().then((newData) => setAllWidgets(() => newData));
  }, [screenId]);

  // update available widgets (not yet placed on screen)
  useEffect(() => {
    setAvailableWidgets(() =>
      // filtering out all widgets that are already configured
      {
        const result = allWidgets
          .filter(
            (fromAll) =>
              confScreenWidgets.find(
                (fromConf) => fromAll.id === fromConf.widget_id
              ) === undefined
          )
          .sort((w1, w2) => w1.name.localeCompare(w2.name));
        //console.log("availableWidgets:", { result });
        return result;
      }
    );
  }, [confScreenWidgets, allWidgets]);

  // update preview frame geometry
  useEffect(() => {
    setPreviewSize(() => {
      // determine the correct preview image size ratio
      return screenData
        ? {
            w: transformXY(
              MAX_SIZE,
              screenData.size_x,
              screenData.size_y,
              screenData.size_x
            ),
            h: transformXY(
              MAX_SIZE,
              screenData.size_x,
              screenData.size_y,
              screenData.size_y
            ),
          }
        : { w: "300px", h: "250px" };
    });
  }, [screenData]);

  // update the widget geometry visualization
  useEffect(() => {
    setScreenWidgetGeom(() => {
      return screenData
        ? confScreenWidgets.map((widget) => {
            return {
              id: widget.widget_id,
              name: widget.name,
              left: transformXY(
                MAX_SIZE,
                screenData.size_x,
                screenData.size_y,
                widget.x_pos
              ),
              top: transformXY(
                MAX_SIZE,
                screenData.size_x,
                screenData.size_y,
                widget.y_pos
              ),
              width: transformXY(
                MAX_SIZE,
                screenData.size_x,
                screenData.size_y,
                widget.size_x
              ),
              height: transformXY(
                MAX_SIZE,
                screenData.size_x,
                screenData.size_y,
                widget.size_y
              ),
              content: widget.content,
            };
          })
        : [];
    });
  }, [screenData, confScreenWidgets]);

  // update HTML preview of configured widgets
  useEffect(() => {
    confScreenWidgets.forEach((widget) => {
      const wbox = document.getElementById(`wbox_${widget.widget_id}`);
      if (wbox) {
        wbox.innerHTML = showPreview ? widget.content : "";
      }
    });
  }, [confScreenWidgets, screenWidgetGeom, showPreview]);

  const validateName = (value) =>
    !value || value.trim().length < 5 ? "Enter 5 or more characters" : "";

  const validateDimension = (value) => {
    const msg =
      !isPosInteger(value) || value > 2000 || value < 30
        ? "Valid dimension: 30...2000"
        : "";
    return msg;
  };

  const localSaveScreenData = async (dbField, value) => {
    return new Promise((resolve) => {
      setScreenData((prev) => {
        return { ...prev, [dbField]: value };
      });
      resolve(""); // no error message on save - they are handled on validation
    });
  };

  const localSaveWidgetLayout = (index, dbField, value) => {
    let newArr = [...confScreenWidgets];
    newArr[index][dbField] = value;
    setConfScreenWidgets(() => newArr);
  };

  const addScreenWidget = (widgetId) =>
    setConfScreenWidgets((prev) => {
      const newW = allWidgets.find((w) => w.id === widgetId);
      let newSW = [
        ...prev,
        {
          content: newW.content,
          name: newW.name,
          public: newW.public,
          screen_id: screenId,
          size_x: newW.size_x,
          size_y: newW.size_y,
          user_id: newW.user_id,
          widget_id: widgetId,
          x_pos: 0,
          y_pos: 0,
        },
      ];
      newSW.sort((a, b) => a.name.localeCompare(b.name));
      //console.log("confScreenWidgets:", { newSW });
      return newSW;
    });

  const removeScreenWidget = (widgetId) => {
    setConfScreenWidgets(() =>
      confScreenWidgets.filter((w) => w.widget_id !== widgetId)
    );
  };

  const confirm = async () => {
    if (screenId < 0) {
      screenId = await Api.insertScreen(screenData);
    } else {
      await Api.saveScreen(screenData);
    }
    await Api.saveScreenWidgets(screenId, confScreenWidgets);
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
                        key={widget.widget_id}
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
                            {/*{widget.id}:*/} {widget.name}
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
                <Stack direction="row">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={showPreview}
                        onChange={(e) => {
                          return setShowPreview(() => e.currentTarget.checked);
                        }}
                      />
                    }
                    label="Preview"
                  />
                </Stack>
                <Paper
                  display="flex"
                  elevation={3}
                  sx={{ margin: "5px auto 0 0" }}
                >
                  <Box
                    position="relative"
                    m="auto"
                    sx={{
                      width: previewSize.w,
                      height: previewSize.h,
                      bgcolor: "#e8e8e8",
                    }}
                  >
                    {screenWidgetGeom && screenWidgetGeom.length ? (
                      screenWidgetGeom.map((swidget, idx) => (
                        <Tooltip title={swidget.name} key={idx}>
                          <Box
                            position="absolute"
                            id={`wbox_${swidget.id}`}
                            zIndex={idx}
                            sx={{
                              left: swidget.left,
                              top: swidget.top,
                              width: swidget.width,
                              height: swidget.height,
                              backgroundColor: cyan["500"] + "80",
                            }}
                          />
                        </Tooltip>
                      ))
                    ) : (
                      <></>
                    )}
                  </Box>
                </Paper>
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
