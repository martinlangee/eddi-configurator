import "../App.css";
import React, { useState } from "react";
import { Stack, TextField } from "@mui/material";

const LabelEdit = ({ label, db, initValue, rows, onSave, width }) => {
  const [value, setValue] = useState(initValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const focusOut = (e) => {
    if (onSave) onSave(db, value);
  };

  width = width === undefined ? "300px" : width;

  return (
    <Stack>
      <label style={{ marginBottom: "5px" }}>{label}</label>
      {rows > 1 ? (
        <TextField
          id="textField"
          sx={{ width: { width } }}
          variant="outlined"
          size="small"
          multiline
          rows={rows}
          value={value}
          onChange={onChange}
          onBlur={focusOut}
        />
      ) : (
        <TextField
          id="textField"
          sx={{ width: { width } }}
          variant="outlined"
          size="small"
          value={value}
          onChange={onChange}
          onBlur={focusOut}
        />
      )}
    </Stack>
  );
};

export default LabelEdit;
