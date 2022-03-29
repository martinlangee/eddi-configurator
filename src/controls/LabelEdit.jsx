import "../App.css";
import React from "react";
import { Stack, TextField } from "@mui/material";

const LabelEdit = ({ text, rows }) => {
  return (
    <Stack mb={2}>
      <label style={{ marginBottom: "5px" }}>{text}</label>
      {rows > 1 ? (
        <TextField
          sx={{ width: "300px" }}
          variant="outlined"
          size="small"
          multiline
          rows={rows}
        />
      ) : (
        <TextField sx={{ width: "300px" }} variant="outlined" size="small" />
      )}
    </Stack>
  );
};

export default LabelEdit;
