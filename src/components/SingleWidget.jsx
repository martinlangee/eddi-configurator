import "../App.css";
import React from "react";
import { Box } from "@mui/system";
import { Stack, TextField, Switch, IconButton } from "@mui/material";
import EditIcon from "@material-ui/icons/Edit";
import OpenInBrowserIcon from "@material-ui/icons/OpenInBrowser";
import DeleteIcon from "@material-ui/icons/Delete";

const SingleWidget = ({ index, data }) => {
  return (
    <div>
      {!index ? (
        <Stack direction="row">
          <Box minWidth="20px"></Box>
          <Box minWidth="100px">Name</Box>
          <Box minWidth="100px" width="100%">
            Description
          </Box>
          <Box minWidth="100px">Thumbnail</Box>
          <Box minWidth="70px">Public</Box>
          <Box minWidth="300px"></Box>
        </Stack>
      ) : (
        ""
      )}
      {index ? (
        <Stack direction="row">
          <Box minWidth="20px">{index}</Box>
          <TextField
            required
            variant="outlined"
            size="small"
            sx={{ minWidth: "100px", maxWidth: "100px" }}
            defaultValue="Widget name"
            value={data.name}
          ></TextField>
          <TextField
            required
            variant="outlined"
            size="small"
            sx={{ minWidth: "100px" }}
            fullWidth
            defaultValue="Widget name"
            value={data.description}
          ></TextField>
          <Box display="flex" minWidth="100px">
            <Box m="auto">X</Box>
          </Box>
          <Box minWidth="70px">
            <Switch></Switch>
          </Box>
          <Box minWidth="300px">
            <IconButton>
              <EditIcon color="primary"></EditIcon>
            </IconButton>
            <IconButton>
              <OpenInBrowserIcon color="primary"></OpenInBrowserIcon>
            </IconButton>
            <IconButton>
              <DeleteIcon color="primary"></DeleteIcon>
            </IconButton>
          </Box>
        </Stack>
      ) : (
        ""
      )}
    </div>
  );
};

export default SingleWidget;
