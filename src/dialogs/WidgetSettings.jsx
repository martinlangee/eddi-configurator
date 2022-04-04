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
  Stack,
  Switch,
} from "@mui/material";
import { Box } from "@mui/system";
import OpenInBrowserIcon from "@material-ui/icons/OpenInBrowser";
import LabelEdit from "../controls/LabelEdit";
import {
  dbGetWidget,
  dbSaveWidget,
  dbGetNewWidget,
  dbInsertWidget,
} from "../api/db";

const WidgetSettings = ({ widgetId, isOpen, handleClose }) => {
  const [widgetData, setWidgetData] = useState(null);

  useEffect(() => {
    if (widgetId === undefined) return;

    // widgetId === -1 => creating new widget
    if (widgetId < 0) {
      dbGetNewWidget().then((newData) => setWidgetData(() => newData));
    } else {
      dbGetWidget(widgetId).then((newData) => setWidgetData(() => newData));
    }
  }, [widgetId]);

  const checkInput = (dbField, value) => {
    // TODO: check if data are correct
    return true;
  };

  const localSave = (dbField, value) => {
    if (!checkInput(dbField, value)) return;

    setWidgetData((prev) => {
      return { ...prev, [dbField]: value };
    });
  };

  const confirm = async () => {
    if (widgetId < 0) {
      await dbInsertWidget(widgetData);
    } else {
      await dbSaveWidget(widgetData);
    }
    handleClose(true);
  };

  const cancel = () => {
    handleClose(false);
  };

  return (
    <>
      {widgetData ? (
        <Dialog maxWidth="false" open={isOpen} onClose={cancel}>
          <DialogTitle>Widget properties</DialogTitle>
          <DialogContent>
            <Stack direction="row" mx={3} spacing={10}>
              <Stack spacing={3}>
                <LabelEdit
                  label="Name"
                  dbField="name"
                  initValue={widgetData.name}
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
                    onSave={localSave}
                  />
                  <LabelEdit
                    label="Height [px]"
                    width="100px"
                    dbField="size_y"
                    initValue={widgetData.size_y}
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
                  />
                  <Box sx={{ flexGrow: 1 }} />
                  <Button
                    variant="outlined"
                    startIcon={<OpenInBrowserIcon color="primary" />}
                  >
                    Load content ...
                  </Button>
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

export default WidgetSettings;
