import "../App.css";
import React, { useState } from "react";
import { Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import VisibilityIcon from "@mui/icons-material/Visibility";

const PasswordEdit = ({ text }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Stack mb={2} direction="column">
      <label style={{ marginBottom: "5px" }}>{text}</label>
      <Box display="flex">
        <TextField
          sx={{ width: "300px" }}
          variant="outlined"
          type={showPassword ? "text" : "password"}
          size="small"
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
