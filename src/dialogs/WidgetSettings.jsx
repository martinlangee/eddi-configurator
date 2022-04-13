import "../App.css";
import React, { useEffect, useRef, useState } from "react";
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
import { IconButton, Tooltip } from "@material-ui/core";
import FileOpenTwoToneIcon from "@mui/icons-material/FileOpenTwoTone";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import LabelEdit from "../controls/LabelEdit";
import Api from "../api/api";
import { isPosInteger, transformXY } from "../utils/utils";

const WidgetSettings = ({ widgetId, isOpen, handleClose }) => {
  const MAX_SIZE = 350;
  const [widgetData, setWidgetData] = useState(null);
  const [previewSize, setPreviewSize] = useState({ w: "350px", h: "250px" });

  const fileRef = useRef();

  useEffect(() => {
    if (widgetId === undefined) return;

    const setData = (newData) => {
      setWidgetData(() => newData);
      setWidgetContent(newData.content);
    };

    // widgetId === -1 => creating new widget
    if (widgetId < 0) {
      Api.getNewWidget().then((newData) => setData(newData));
    } else {
      Api.getWidget(widgetId).then((newData) => setData(newData));
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
      resolve(""); // no error message on save - they are handled on validation
    });
  };

  const showOpenFileDialog = () => {
    fileRef.current.click();
  };

  let fileReader;

  const setWidgetContent = (html, restoreOld) => {
    const cont = document.getElementById("preview-cont");
    cont.innerHTML = restoreOld ? widgetData.content : html;
    // save to state
    setWidgetData((prev) => {
      return { ...prev, content: cont.innerHTML };
    });
  };

  function isValidHTML(html) {
    var doc = document.createElement("div");
    // clean loaded HTML before asigning and comparing
    const cleanedHtml = html
      .replace(/\s\s+/g, " ") // replace consecutive mutliple spaces
      .replace(/(?:\r\n|\r|\n)/g, ""); // replace line breaks
    doc.innerHTML = cleanedHtml;
    return doc.innerHTML === cleanedHtml;
  }

  const checkHTML = (content) => {
    if (isValidHTML(content)) return content;

    // if erroneous show message and remove it after 7 s
    setTimeout(() => {
      setWidgetContent("", true);
    }, 7000);
    return `<div style="margin: 10px;padding: 20px;background: lightsalmon">
               <h2>HTML check failed!</h2>
             </div>`;
  };

  const handleFileChosen = (file) => {
    if (!file) return;
    fileReader = new FileReader();
    fileReader.onloadend = (e) => {
      setWidgetContent(checkHTML(fileReader.result));
    };
    fileReader.readAsText(file);
  };

  const handleDeletePreview = () => {
    setWidgetContent("");
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
                    onClick={showOpenFileDialog}
                  >
                    Load content ...
                  </Button>
                </Stack>
                <Stack
                  ml={-1}
                  mb={-1}
                  sx={{ alignItems: "center" }}
                  direction="row"
                >
                  <Tooltip title="Delete widget content ...">
                    <IconButton onClick={handleDeletePreview}>
                      <DeleteForeverTwoToneIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                  <Box>Preview</Box>
                </Stack>
                <Paper
                  id="preview-cont"
                  display="flex"
                  elevation={3}
                  sx={{
                    margin: "5px auto 0 0",
                    width: previewSize.w,
                    height: previewSize.h,
                    backgroundColor: "#e8e8e8",
                  }}
                ></Paper>
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
          <input
            ref={fileRef}
            type="file"
            style={{ display: "none" }}
            accept="text/html"
            onChange={(e) => handleFileChosen(e.target.files[0])}
          />
        </Dialog>
      )}
    </>
  );
};

export default WidgetSettings;
