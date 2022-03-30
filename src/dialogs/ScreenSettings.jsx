import "../App.css";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
} from "@mui/material";
import { Box } from "@mui/system";
import DeleteIcon from "@material-ui/icons/Delete";
import LabelEdit from "../controls/LabelEdit";
import { getScreen } from "../api/db";
import WidgetLayout from "../components/WidgetLayout";

const ScreenSettings = ({ id, isOpen, handleClose }) => {
  const [data, setData] = useState(null);
  useEffect(() => setData((prev) => getScreen(id)), [id]);

  const onConfirm = () => {
    handleClose();
  };

  const onCancel = () => {
    handleClose();
  };

  return (
    <Dialog maxWidth="false" open={isOpen} onClose={onCancel}>
      <DialogTitle>Screen properties and configuration</DialogTitle>
      <DialogContent>
        {data ? (
          <>
            <Stack direction="row" mx={3} mb={5} spacing={5}>
              <LabelEdit
                label="Name"
                db="name"
                initValue={data.name}
                width="200px"
              />
              <LabelEdit
                label="Description"
                rows={4}
                db="description"
                initValue={data.description}
                width="200px"
              />
              <LabelEdit
                label="Width [px]"
                width="80px"
                db="size_x"
                initValue={data.size_x}
              />
              <LabelEdit
                label="Height [px]"
                width="80px"
                db="size_y"
                initValue={data.size_y}
              />
              <Box m="auto" pt={2}>
                <FormControlLabel
                  control={<Switch name="public" value={data.public} />}
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
          </>
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

export default ScreenSettings;
