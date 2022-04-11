import "../App.css";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Paper,
  Stack,
} from "@mui/material";
import { Box } from "@mui/system";
import FileOpenTwoToneIcon from "@mui/icons-material/FileOpenTwoTone";
import LabelEdit from "../controls/LabelEdit";
import Api from "../api/api";
import { isPosInteger, transformXY } from "../utils/utils";

const WidgetSettings = ({ widgetId, isOpen, handleClose }) => {
  const MAX_SIZE = 350;
  const [widgetData, setWidgetData] = useState(null);
  const [previewSize, setPreviewSize] = useState({ w: "350px", h: "250px" });

  useEffect(() => {
    if (widgetId === undefined) return;

    // widgetId === -1 => creating new widget
    if (widgetId < 0) {
      Api.getNewWidget().then((newData) => setWidgetData(() => newData));
    } else {
      Api.getWidget(widgetId).then((newData) => setWidgetData(() => newData));
    }
  }, [widgetId]);

  // update preview frame geometry
  useEffect(() => {
    setPreviewSize(() => {
      // determine the correct preview image size ratio
      return widgetData
        ? {
            w: transformXY(
              MAX_SIZE,
              widgetData.size_x,
              widgetData.size_y,
              widgetData.size_x
            ),
            h: transformXY(
              MAX_SIZE,
              widgetData.size_x,
              widgetData.size_y,
              widgetData.size_y
            ),
          }
        : { w: "350px", h: "250px" };
    });
  }, [widgetData]);

  const validateName = (value) =>
    !value || value.trim().length < 5 ? "Enter 5 or more characters" : "";

  const validateDimension = (value) =>
    !isPosInteger(value) || value > 2000 || value < 30
      ? "Valid size: 30...2000"
      : "";

  const localSave = async (dbField, value) => {
    return new Promise((resolve) => {
      setWidgetData((prev) => {
        return { ...prev, [dbField]: value };
      });
      resolve(""); // no error message on save
    });
  };

  const confirm = async () => {
    if (widgetId < 0) {
      await Api.insertWidget(widgetData);
    } else {
      await Api.saveWidget(widgetData);
    }
    handleClose(true);
  };

  const cancel = () => {
    handleClose(false);
  };

  return (
    <>
      {widgetData && (
        <Dialog maxWidth="false" open={isOpen} onClose={cancel}>
          <DialogTitle>Widget properties</DialogTitle>
          <DialogContent>
            <Stack direction="row" mx={3} spacing={10}>
              <Stack spacing={3}>
                <LabelEdit
                  label="Name"
                  dbField="name"
                  initValue={widgetData.name}
                  onValidate={validateName}
                  onSave={localSave}
                />
                <LabelEdit
                  label="Description"
                  rows={4}
                  dbField="description"
                  initValue={widgetData.description}
                  onSave={localSave}
                />
                <Stack direction="row" justifyContent="space-between">
                  <LabelEdit
                    label="Width [px]"
                    width="100px"
                    dbField="size_x"
                    initValue={widgetData.size_x}
                    onValidate={validateDimension}
                    onSave={localSave}
                  />
                  <LabelEdit
                    label="Height [px]"
                    width="100px"
                    dbField="size_y"
                    initValue={widgetData.size_y}
                    onValidate={validateDimension}
                    onSave={localSave}
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
                  {/* TODO: future
                   <FormControlLabel
                    control={
                      <Switch
                        name="public"
                        checked={widgetData.public}
                        onChange={(e) =>
                          localSave("public", e.currentTarget.checked)
                        }
                      />
                    }
                    label="Public"
                  /> */}
                  <Box sx={{ flexGrow: 1 }} />
                  <Button
                    variant="outlined"
                    startIcon={<FileOpenTwoToneIcon color="primary" />}
                  >
                    Load content ...
                  </Button>
                </Stack>
                <label>Preview</label>
                <Paper
                  display="flex"
                  elevation={3}
                  sx={{ margin: "5px auto 0 0" }}
                >
                  <Box
                    m="auto"
                    sx={{ width: previewSize.w, height: previewSize.h }}
                    bgcolor="#e8e8e8"
                  />
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

export default WidgetSettings;
