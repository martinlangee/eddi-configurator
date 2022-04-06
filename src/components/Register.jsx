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
} from "@mui/material";
import { cyan } from "@mui/material/colors";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import HourglassTopOutlinedIcon from "@mui/icons-material/HourglassTopOutlined";
import AuthService from "../services/auth.service";

const Register = () => {
  let navigate = useNavigate();
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

  useEffect(() => {
    setInvalidEmail(() => !isEmail(email));
    setEmailHelperText(() => invalidEmail && "Please enter valid E-mail");
  }, [email, invalidEmail]);

  useEffect(() => {
    setInvalidUsername(
      () =>
        username.length < 6 ||
        username.length > 20 ||
        username.indexOf(" ") >= 0
    );
    setUsernameHelperText(
      () =>
        invalidUsername &&
        "Please enter valid user name (6 to 20 characters, no spaces)"
    );
  }, [username, invalidUsername]);

  useEffect(() => {
    setInvalidPwd1(() => password1.length < 8);
    setPwd1HelperText(
      () => invalidPwd1 && "Please enter valid password (at least 8 chars)"
    );
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
          navigate("/login");
          window.location.reload();
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
        <TextField
          label="Password"
          placeholder="Enter password"
          type="password"
          size="small"
          variant="standard"
          fullWidth
          required
          onChange={onChangePassword1}
          error={invalidPwd1}
          helperText={pwd1HelperText}
        />
        <TextField
          label="Password (repeat)"
          placeholder="Re-enter password"
          type="password"
          size="small"
          variant="standard"
          fullWidth
          required
          onChange={onChangePassword2}
          error={invalidPwd2}
          helperText={pwd2HelperText}
        />
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
            <Alert severity="error">{message}</Alert>
          </Stack>
        )}
      </Stack>
    </Paper>
  );
};
export default Register;
