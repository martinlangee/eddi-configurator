import "../App.css";
import React from "react";
import { Box } from "@mui/system";
import { Stack, TextField, Switch, IconButton } from "@mui/material";
import EditIcon from "@material-ui/icons/Edit";
import OpenInBrowserIcon from "@material-ui/icons/OpenInBrowser";
import DeleteIcon from "@material-ui/icons/Delete";

const WidgetItem = ({ index, data }) => {
  return (
    <Box>
      {/* Header line: printed only once above the first widget */}
      {!index ? (
        <Stack direction="row" m="10px">
          <Box minWidth="30px"></Box>
          <Box ml={2} minWidth="150px" maxWidth="150px">
            Name
          </Box>
          <Box ml={2} minWidth="100px" width="100%">
            Description
          </Box>
          <Box display="flex" minWidth="100px">
            <Box m="auto">Thumbnail</Box>
          </Box>
          <Box display="flex" minWidth="70px" mx="0px">
            <Box m="auto">Public</Box>
          </Box>
          <Box minWidth="150px"></Box>
        </Stack>
      ) : (
        ""
      )}
      {/* Widget lines */}
      <Stack
        direction="row"
        m="10px"
        sx={{ "&:hover": { backgroundColor: "#e8f8ff" } }}
      >
        <Box minWidth="30px" display="flex">
          <Box m="auto">{index + 1}</Box>
        </Box>
        <Box m={1} sx={{ minWidth: "150px", maxWidth: "150px" }}>
          <TextField
            required
            variant="outlined"
            size="small"
            value={data.name}
          ></TextField>
        </Box>
        <Box m={1} sx={{ width: "100%", minWidth: "100px" }}>
          <TextField
            required
            variant="outlined"
            size="small"
            fullWidth
            value={data.description}
          ></TextField>
        </Box>
        <Box display="flex" minWidth="100px">
          <Box
            m="auto"
            sx={{ width: "60px", height: "40px" }}
            bgcolor="lightgray"
          ></Box>
        </Box>
        <Box display="flex" minWidth="70px">
          <Box m="auto">
            <Switch></Switch>
          </Box>
        </Box>
        <Box display="flex" minWidth="150px">
          <Box m="auto">
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
        </Box>
      </Stack>
    </Box>
  );
};

export default WidgetItem;
