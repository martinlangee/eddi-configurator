import "../App.css";
import React, { useState } from "react";
import { Alert, Box, Stack, TextField, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

const LabelEdit = ({
  label,
  dbField,
  initValue,
  onSave,
  onValidate,
  rows,
  width,
  isPassword,
}) => {
  const [hidden, setHidden] = useState(isPassword);
  const [value, setValue] = useState(initValue);
  const [error, setError] = useState("");

  const onChange = (e) => {
    setValue(() => e.target.value);
  };

  const focusOut = () => {
    const errMessage = onValidate ? onValidate(value) : "";
    setError(() => errMessage);
    if (!errMessage && onSave) {
      onSave(dbField, value).then((err) => {
        setError(() => errMessage);
      });
    }
  };

  width = width === undefined ? "300px" : width;

  return (
    <Stack>
      {label && (
        <Typography
          variant="body2"
          color="gray"
          style={{ marginBottom: "5px" }}
        >
          {label}
        </Typography>
      )}
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
        <Box display="flex">
          <TextField
            id="textField"
            sx={{ width: { width } }}
            type={hidden ? "password" : "text"}
            variant="standard"
            size="small"
            value={value}
            onChange={onChange}
            onBlur={focusOut}
          />
          {isPassword && (
            <Box my="auto" ml={1}>
              <VisibilityIcon
                style={{ color: "Silver" }}
                onMouseOver={() => setHidden(false)}
                onMouseLeave={() => setHidden(true)}
              />
            </Box>
          )}
        </Box>
      )}
      {error && (
        <Stack>
          <Alert severity="error">{error}</Alert>
        </Stack>
      )}
    </Stack>
  );
};

export default LabelEdit;
