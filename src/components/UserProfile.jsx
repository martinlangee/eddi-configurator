import "../App.css";
import React, { useEffect, useState } from "react";
import { isEmail } from "validator";
import {
  Alert,
  Avatar,
  Button,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import FileOpenTwoToneIcon from "@mui/icons-material/FileOpenTwoTone";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import LabelEdit from "../controls/LabelEdit";
import { stringAvatar } from "../utils/utils";
import Api from "../api/api";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [pwdStatus, setPwdStatus] = useState({
    result: true,
    message: "",
    status: 202,
  });
  const [pwd1, setPwd1] = useState("");
  const [pwd2, setPwd2] = useState("");

  useEffect(() => {
    Api.getCurrentUser().then((newData) => setUser(() => newData));
  }, []);

  const save = async (dbField, value) => {
    const resp = await Api.saveUserDate(dbField, value);
    // if user_name changed => reload to update Avatar
    if (dbField === "user_name") {
      setTimeout(() => window.location.reload(), 200);
    }
    return resp.message;
  };

  const changePwd1 = (dbField, value) => {
    return new Promise((resolve) => {
      setPwd1(() => value);
      resolve("");
    });
  };

  const changePwd2 = (dbField, value) => {
    return new Promise((resolve) => {
      setPwd2(() => value);
      resolve("");
    });
  };

  const validateUsername = (value) =>
    value.length < 6 || value.length > 20 || value.indexOf(" ") >= 0
      ? "Enter 6 to 20 characters, no spaces"
      : "";

  const validateEmail = (value) =>
    !isEmail(value) ? "Enter valid E-mail address" : "";

  const validatePwd1 = () => {
    return pwd1.length < 8 ? "Enter at least 8 charscters" : "";
  };

  const validatePwd2 = () => {
    return pwd1 !== pwd2 ? "Passwords not equal" : "";
  };

  const performPwdChange = async () => {
    setPwdStatus(() => {
      return { result: false, message: "", status: 400 };
    });
    let errMessage = validatePwd1() || validatePwd2();
    if (errMessage) {
      setPwdStatus(() => {
        return { result: false, message: errMessage, status: 400 };
      });
    } else {
      const resp = await Api.saveUserDate("password", pwd1);
      setPwdStatus(() => resp);
    }
    // let the error message disappear after some seconds
    setTimeout(() => {
      setPwdStatus(() => {
        return { result: true, message: "", status: 202 };
      });
    }, 7000);
  };

  return (
    <div>
      {user && (
        <>
          <Stack ml={5} mt={5}>
            <strong>Personal data</strong>
            <Stack direction="row">
              <Stack ml={10} mt={3} spacing={2}>
                <LabelEdit
                  label="User name *"
                  dbField="user_name"
                  initValue={user.user_name}
                  onValidate={validateUsername}
                  onSave={save}
                />
                <LabelEdit
                  label="First name"
                  dbField="first_name"
                  initValue={user.first_name}
                  onSave={save}
                />
                <LabelEdit
                  label="Last name"
                  dbField="last_name"
                  initValue={user.last_name}
                  onSave={save}
                />
                <LabelEdit
                  label="E-Mail *"
                  dbField="email"
                  initValue={user.email}
                  onValidate={validateEmail}
                  onSave={save}
                />
              </Stack>
              <Stack>
                <Stack direction="row" ml={20} mt={4}>
                  <Avatar {...stringAvatar(user.user_name, "150px", "150px")} />
                  <Box m={3} />
                  <Box m="auto">
                    <Tooltip title="Load image ...">
                      <IconButton>
                        <FileOpenTwoToneIcon color="primary" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Box m="auto">
                    <Tooltip title="Remove image">
                      <IconButton>
                        <DeleteForeverTwoToneIcon color="primary" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Stack direction="row">
            <Stack ml={5} mt={3}>
              <strong>Access</strong>
              <Stack ml={10} mt={3} mb={5} spacing={2}>
                <LabelEdit
                  label="Password *"
                  dbField="pwd1"
                  onSave={changePwd1}
                  isPassword="true"
                />
                <LabelEdit
                  label="Password (repeat) *"
                  dbField="pwd2"
                  onSave={changePwd2}
                  isPassword="true"
                />
              </Stack>
              <Stack ml={10}>
                <Typography style={{ color: "gray" }}>* = mandatory</Typography>
              </Stack>
            </Stack>
            <Stack ml={10} mt={15} spacing={1}>
              <Button
                sx={{ margin: "0 auto" }}
                variant="outlined"
                onClick={performPwdChange}
              >
                Update password
              </Button>
              {pwdStatus.message && (
                <Stack>
                  <Alert
                    severity={pwdStatus.status !== 202 ? "error" : "success"}
                  >
                    {pwdStatus.message}
                  </Alert>
                </Stack>
              )}
            </Stack>
          </Stack>
        </>
      )}
    </div>
  );
};

export default UserProfile;
