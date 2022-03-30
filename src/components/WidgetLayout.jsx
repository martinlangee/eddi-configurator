import "../App.css";
import React from "react";
import { Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";

const WidgetLayout = ({ index, data, onUpdate }) => {
  return (
    <Stack>
      {/* Header line: printed only once above the first widget */}
      {!index ? (
        <Stack direction="row" spacing={1} mb={1}>
          <Box minWidth="110px">
            <strong>Name</strong>
          </Box>
          <Box minWidth="80px">
            <strong>Left [px]</strong>
          </Box>
          <Box variant="button" minWidth="80px">
            <strong>Top [px]</strong>
          </Box>
          <Box variant="button" minWidth="80px">
            <strong>Width [px]</strong>
          </Box>
          <Box variant="button" minWidth="80px">
            <strong>Height [px]</strong>
          </Box>
        </Stack>
      ) : (
        ""
      )}
      <Stack direction="row" spacing={1}>
        <Box
          sx={{ backgroundColor: "whitesmoke" }}
          minWidth="110px"
          display="flex"
        >
          <Box my="auto">{data.name}</Box>
        </Box>
        <TextField sx={{ width: "80px" }} size="small"></TextField>
        <TextField sx={{ width: "80px" }} size="small"></TextField>
        <TextField sx={{ width: "80px" }} size="small"></TextField>
        <TextField sx={{ width: "80px" }} size="small"></TextField>
      </Stack>
    </Stack>
  );
};

export default WidgetLayout;
