import "../App.css";
import React, { useEffect, useState } from "react";
import { Avatar, IconButton, Stack } from "@mui/material";
import { Box } from "@mui/system";
import OpenInBrowserIcon from "@material-ui/icons/OpenInBrowser";
import DeleteIcon from "@material-ui/icons/Delete";
import LabelEdit from "../controls/LabelEdit";
import PasswordEdit from "../controls/PasswordEdit";
import { stringAvatar } from "../utils/utils";
import { getCurrentUser, saveUserData } from "../api/db";

const UserSettings = () => {
  const [userData, setUserData] = useState(getCurrentUser());

  useEffect(() => {
    setUserData((prev) => getCurrentUser());
  }, []);

  const dbSave = (db, value) => {
    console.log("saving: ", db, " = ", value);
    let newData = userData;
    newData[db] = value;
    saveUserData(newData);
  };

  return (
    <div>
      <Stack ml={5} mt={5}>
        <strong>Personal data</strong>
        <Stack direction="row">
          <Stack ml={10} mt={3} spacing={2}>
            <LabelEdit
              label="User name"
              db="user_name"
              initValue={userData.user_name}
              onSave={dbSave}
            />
            <LabelEdit
              label="First name"
              db="first_name"
              initValue={userData.first_name}
              onSave={dbSave}
            />
            <LabelEdit
              label="Last name"
              db="last_name"
              initValue={userData.last_name}
              onSave={dbSave}
            />
            <LabelEdit
              label="E-Mail"
              db="email"
              initValue={userData.email}
              onSave={dbSave}
            />
            <LabelEdit
              label="Description"
              db="description"
              rows="4"
              initValue={userData.description}
              onSave={dbSave}
            />
          </Stack>
          <Stack>
            <Stack direction="row" ml={20} mt={4}>
              <Avatar
                {...stringAvatar(getCurrentUser().user_name, "150px", "150px")}
              />
              <Box m={3} />
              <Box m="auto">
                <IconButton>
                  <OpenInBrowserIcon color="primary"></OpenInBrowserIcon>
                </IconButton>
              </Box>
              <Box m="auto">
                <IconButton>
                  <DeleteIcon color="primary"></DeleteIcon>
                </IconButton>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack ml={5} mt={3}>
        <strong>Access</strong>
        <Stack ml={10} mt={3} mb={5} spacing={2}>
          <PasswordEdit label="Password" db="pwd" onSave={dbSave} />
          <PasswordEdit label="Password (repeat)" db="pwd" onSave={dbSave} />
        </Stack>
      </Stack>
    </div>
  );
};

export default UserSettings;
