import "../App.css";
import React, { useEffect, useState } from "react";
import { isEmail } from "validator";
import { Alert, Button, Stack, Typography } from "@mui/material";
import { base64StringToBlob } from "blob-util";
import LabelEdit from "../controls/LabelEdit";
import Api from "../api/api";
import AvatarPicker from "./AvatarPicker";
import AuthService from "../services/auth.service";

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
    return new Promise(async (resolve) => {
      const resp = await AuthService.saveUserDate(dbField, value);
      // if user_name changed => reload to update Avatar
      if (dbField === "user_name") {
        if (resp.result) setTimeout(() => window.location.reload(), 200);
      }
      if (resp.result) {
        setUser((prev) => {
          return { ...prev, [dbField]: value };
        });
      }
      resolve(resp.result ? "" : resp.message);
    });
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
    return pwd1.length < 8 ? "Enter at least 8 characters" : "";
  };

  const validatePwd2 = () => {
    return pwd1 !== pwd2 ? "Passwords not equal" : "";
  };

  const convertToUrl = (base64) => {
    // split payload and image type cause the latter must be taken dynamically from loaded image (could be png, jpg...)
    const data = base64.split(",");
    return data[0] && data[1]
      ? base64StringToBlob(data[1], data[0].split(/[:;]/))
      : undefined;
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleAvatarChange = async (file) => {
    const base64 = file ? await convertToBase64(file) : "";
    await save("image", base64);
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
              <Stack direction="row" ml={15}>
                <AvatarPicker
                  handleChangeImage={handleAvatarChange}
                  avatarImage={convertToUrl(user.image)}
                />
              </Stack>
            </Stack>
          </Stack>
          <Stack direction="row">
            <Stack ml={5} mt={8}>
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
            <Stack ml={10} mt={20} spacing={1}>
              <Button
                sx={{ margin: "0 20px", width: "200px" }}
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
