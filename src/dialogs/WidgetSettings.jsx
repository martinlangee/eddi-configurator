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
import { getWidget } from "../api/db";

const WidgetSettings = ({ id, isOpen, handleClose }) => {
  const [data, setData] = useState(null);
  useEffect(() => setData((prev) => getWidget(id)), []);

  const onConfirm = () => {
    handleClose();
  };

  const onCancel = () => {
    handleClose();
  };

  return (
    <Dialog maxWidth="false" open={isOpen} onClose={onCancel}>
      <DialogTitle>Widget properties</DialogTitle>
      <DialogContent>
        {data ? (
          <Stack direction="row" mx={3} spacing={10}>
            <Stack spacing={3}>
              <LabelEdit label="Name" db="name" initValue={data.name} />
              <LabelEdit
                label="Description"
                rows={4}
                db="description"
                initValue={data.description}
              />
              <Stack direction="row" justifyContent="space-between">
                <LabelEdit
                  label="Width [px]"
                  width="100px"
                  db="size_x"
                  initValue={data.size_x}
                />
                <LabelEdit
                  label="Height [px]"
                  width="100px"
                  db="size_y"
                  initValue={data.size_y}
                />
              </Stack>
              <Divider />
              <Stack direction="row" justifyContent="space-between">
                <label>Created</label>
                <label>{data.created}</label>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <label>Last saved</label>
                <label>{data.last_saved}</label>
              </Stack>
            </Stack>
            <Stack>
              <Stack mb={5} direction="row">
                <FormControlLabel
                  control={<Switch name="public" value={data.public} />}
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
        ) : (
          "Loading data ..."
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm}>OK</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default WidgetSettings;
