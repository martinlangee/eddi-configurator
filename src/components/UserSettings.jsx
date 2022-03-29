import "../App.css";
import React from "react";
import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import LabelEdit from "../controls/LabelEdit";
import PasswordEdit from "../controls/PasswordEdit";

const UserSettings = () => {
  return (
    <div>
      <Stack ml={5} mt={5}>
        <strong>Personal data</strong>
        <Stack ml={10} mt={3}>
          <LabelEdit text="User name" />
          <Stack direction="row">
            <LabelEdit text="First name" />
            <Box minWidth={20} />
            <LabelEdit text="Last name" />
          </Stack>
          <LabelEdit text="E-Mail" />
          <LabelEdit text="Description" rows="4" />
        </Stack>
      </Stack>
      <Stack ml={5} mt={3}>
        <strong>Access</strong>
        <Stack ml={10} mt={3} mb={5}>
          <PasswordEdit text="Password" />
          <PasswordEdit text="Password (repeat)" />
        </Stack>
      </Stack>
    </div>
  );
};

export default UserSettings;
