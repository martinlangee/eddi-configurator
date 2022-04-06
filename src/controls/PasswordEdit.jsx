import "../App.css";
import React, { useState } from "react";
import { Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import VisibilityIcon from "@mui/icons-material/Visibility";

// TODO: save password as hash in DB

const PasswordEdit = ({ label, dbField, onSave }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const focusOut = () => {
    if (onSave) onSave(dbField, value);
  };

  return (
    <Stack direction="column">
      {label && (
        <Typography
          variant="body2"
          color="gray"
          style={{ marginBottom: "5px" }}
        >
          {label}
        </Typography>
      )}
      <Box display="flex">
        <TextField
          sx={{ width: "300px" }}
          variant="standard"
          type={showPassword ? "text" : "password"}
          size="small"
          onSave={onSave}
          value={value}
          onChange={onChange}
          onBlur={focusOut}
        />
        <Box my="auto" ml={1}>
          <VisibilityIcon
            style={{ color: "Silver" }}
            onMouseOver={() => setShowPassword(true)}
            onMouseLeave={() => setShowPassword(false)}
          />
        </Box>
      </Box>
    </Stack>
  );
};

export default PasswordEdit;
