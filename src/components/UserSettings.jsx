import "../App.css";
import React, { useEffect, useState } from "react";
import { Avatar, IconButton, Stack } from "@mui/material";
import { Box } from "@mui/system";
import OpenInBrowserIcon from "@material-ui/icons/OpenInBrowser";
import DeleteIcon from "@material-ui/icons/Delete";
import LabelEdit from "../controls/LabelEdit";
import PasswordEdit from "../controls/PasswordEdit";
import { stringAvatar } from "../utils/utils";
import { dbGetCurrentUser, dbSaveUserData } from "../api/db";
import { Typography } from "@material-ui/core";
import WaitingBox from "./WaitingBox";

const UserSettings = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    dbGetCurrentUser().then((newData) => setUserData(() => newData));
  }, []);

  const dbSave = (dbField, value) => {
    let newData = userData;
    newData[dbField] = value;
    dbSaveUserData(newData);
  };

  return (
    <div>
      {userData ? (
        <>
          <Stack ml={5} mt={5}>
            <strong>Personal data</strong>
            <Stack direction="row">
              <Stack ml={10} mt={3} spacing={2}>
                <LabelEdit
                  label="User name *"
                  dbField="user_name"
                  initValue={userData.user_name}
                  onSave={dbSave}
                />
                <LabelEdit
                  label="First name"
                  dbField="first_name"
                  initValue={userData.first_name}
                  onSave={dbSave}
                />
                <LabelEdit
                  label="Last name"
                  dbField="last_name"
                  initValue={userData.last_name}
                  onSave={dbSave}
                />
                <LabelEdit
                  label="E-Mail *"
                  dbField="email"
                  initValue={userData.email}
                  onSave={dbSave}
                />
              </Stack>
              <Stack>
                <Stack direction="row" ml={20} mt={4}>
                  <Avatar
                    {...stringAvatar(userData.user_name, "150px", "150px")}
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
              <PasswordEdit label="Password *" dbField="pwd" onSave={dbSave} />
              <PasswordEdit
                label="Password (repeat) *"
                dbField="pwd"
                onSave={dbSave}
              />
            </Stack>
            <Stack ml={10}>
              <Typography style={{ color: "gray" }}>* = mandatory</Typography>
            </Stack>
          </Stack>
        </>
      ) : (
        <WaitingBox />
      )}
    </div>
  );
};

export default UserSettings;
