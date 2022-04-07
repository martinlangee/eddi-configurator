import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isEmail } from "validator";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  Stack,
  Box,
} from "@mui/material";
import { cyan } from "@mui/material/colors";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import HourglassTopOutlinedIcon from "@mui/icons-material/HourglassTopOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AuthService from "../services/auth.service";

const Register = () => {
  let navigate = useNavigate();
  const [showPwd1, setShowPwd1] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);

  const [username, setUsername] = useState("");
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [usernameHelperText, setUsernameHelperText] = useState(false);

  const [email, setEmail] = useState("");
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState(false);

  const [password1, setPassword1] = useState("");
  const [invalidPwd1, setInvalidPwd1] = useState(false);
  const [pwd1HelperText, setPwd1HelperText] = useState(false);

  const [password2, setPassword2] = useState("");
  const [invalidPwd2, setInvalidPwd2] = useState(false);
  const [pwd2HelperText, setPwd2HelperText] = useState(false);

  const [inputValid, setInputValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageSeverity, setMessageSeverity] = useState("error");

  useEffect(() => {
    setInvalidEmail(() => !isEmail(email));
    setEmailHelperText(() => invalidEmail && "Enter valid E-mail address");
  }, [email, invalidEmail]);

  useEffect(() => {
    setInvalidUsername(
      () =>
        username.length < 6 ||
        username.length > 20 ||
        username.indexOf(" ") >= 0
    );
    setUsernameHelperText(
      () => invalidUsername && "Enter 6 to 20 characters, no spaces"
    );
  }, [username, invalidUsername]);

  useEffect(() => {
    setInvalidPwd1(() => password1.length < 8);
    setPwd1HelperText(() => invalidPwd1 && "Enter at least 8 chars");
  }, [password1, invalidPwd1]);

  useEffect(() => {
    setInvalidPwd2(() => password1 !== password2);
    setPwd2HelperText(() => invalidPwd2 && "Passwords not equal");
  }, [password1, password2, invalidPwd2]);

  useEffect(() => {
    setInputValid(
      () => !invalidUsername && !invalidEmail && !invalidPwd1 && !invalidPwd2
    );
  }, [invalidUsername, invalidEmail, invalidPwd1, invalidPwd2]);

  const onChangeUsername = (e) => {
    const newUsername = e.target.value;
    setUsername(() => newUsername);
  };

  const onChangeEmail = (e) => {
    const newEmail = e.target.value;
    setEmail(() => newEmail);
  };

  const onChangePassword1 = (e) => {
    const newPwd = e.target.value;
    setPassword1(() => newPwd);
  };

  const onChangePassword2 = (e) => {
    const newPwd = e.target.value;
    setPassword2(() => newPwd);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    if (inputValid) {
      AuthService.register(username, email, password1).then(
        () => {
          setLoading(false);
          setMessage(
            <Stack direction="row">
              <Typography>
                New user created. To log in go to the&nbsp;
                <Link
                  href="#"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Log In
                </Link>
                &nbsp;page.
              </Typography>
            </Stack>
          );
          setMessageSeverity("success");
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };
  return (
    <Paper
      style={{
        padding: 20,
        width: 300,
        margin: "50px auto",
      }}
    >
      <Grid align="center">
        <Avatar style={{ backgroundColor: cyan["800"] }}>
          <AccountCircleTwoToneIcon />
        </Avatar>
        <h2>Sign up</h2>
      </Grid>
      <Stack spacing={4}>
        <TextField
          label="User name"
          placeholder="Enter user name"
          size="small"
          variant="standard"
          fullWidth
          required
          onChange={onChangeUsername}
          error={invalidUsername}
          helperText={usernameHelperText}
        />
        <TextField
          label="E-mail"
          placeholder="Enter E-mail"
          size="small"
          variant="standard"
          fullWidth
          required
          onChange={onChangeEmail}
          error={invalidEmail}
          helperText={emailHelperText}
        />
        <Box display="flex">
          <TextField
            label="Password"
            placeholder="Enter password"
            type={showPwd1 ? "text" : "password"}
            size="small"
            variant="standard"
            fullWidth
            required
            onChange={onChangePassword1}
            error={invalidPwd1}
            helperText={pwd1HelperText}
          />
          <Box my="auto">
            <VisibilityIcon
              style={{ color: "Silver" }}
              onMouseOver={() => setShowPwd1(true)}
              onMouseLeave={() => setShowPwd1(false)}
            />
          </Box>
        </Box>
        <Box display="flex">
          <TextField
            label="Password (repeat)"
            placeholder="Re-enter password"
            type={showPwd2 ? "text" : "password"}
            size="small"
            variant="standard"
            fullWidth
            required
            onChange={onChangePassword2}
            error={invalidPwd2}
            helperText={pwd2HelperText}
          />
          <Box my="auto">
            <VisibilityIcon
              style={{ color: "Silver" }}
              onMouseOver={() => setShowPwd2(true)}
              onMouseLeave={() => setShowPwd2(false)}
            />
          </Box>
        </Box>
        {/*} TODO: future
        <FormControlLabel
          control={<Checkbox name="checkedB" color="primary" />}
          label="Remember me"
        />
        */}
        <Button
          startIcon={
            loading ? (
              <HourglassTopOutlinedIcon color="primary" />
            ) : (
              <LockOpenIcon color="primary" />
            )
          }
          variant="outlined"
          color="primary"
          fullWidth
          onClick={handleRegister}
          disabled={!inputValid}
        >
          Sign Up
        </Button>
        <Stack spacing={2} mt={2} direction="row">
          <Typography>You already have an account ?</Typography>
          <Link
            href="#"
            onClick={() => {
              navigate("/login");
            }}
          >
            Log In
          </Link>
        </Stack>
        {message && (
          <Stack>
            <Alert severity={messageSeverity}>{message}</Alert>
          </Stack>
        )}
      </Stack>
    </Paper>
  );
};
export default Register;
