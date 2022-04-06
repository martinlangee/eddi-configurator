import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import HourglassTopOutlinedIcon from "@mui/icons-material/HourglassTopOutlined";
import { cyan } from "@mui/material/colors";
import { Alert, Stack } from "@mui/material";
import AuthService from "../services/auth.service";

const Login = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputValid, setInputValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(
    () => setInputValid(!invalidEmail() && !invalidPassword()),
    [email, password]
  );

  const invalidEmail = () => {
    const re =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return !re.test(String(email).toLowerCase());
  };

  const emailHelperText = () => {
    return invalidEmail() && "Please enter valid E-mail";
  };

  const onChangeEmail = (e) => {
    const newEmail = e.target.value;
    setEmail(() => newEmail);
  };

  const invalidPassword = () => password.length < 8;

  const passwordHelperText = () =>
    invalidPassword() && "Please enter valid password (at least 8 chars)";

  const onChangePassword = (e) => {
    const newPwd = e.target.value;
    setPassword(() => newPwd);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    if (inputValid) {
      AuthService.login(email, password).then(
        () => {
          navigate("/widgets");
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
    <Grid>
      <Paper
        style={{
          padding: 20,
          width: 300,
          margin: "50px auto",
        }}
      >
        <Grid align="center">
          <Avatar style={{ backgroundColor: cyan["800"] }}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Log In</h2>
        </Grid>
        <Stack spacing={4}>
          <TextField
            label="E-mail"
            placeholder="Enter E-mail"
            fullWidth
            required
            onChange={onChangeEmail}
            error={invalidEmail()}
            helperText={emailHelperText()}
          />
          <TextField
            label="Password"
            placeholder="Enter password"
            type="password"
            fullWidth
            required
            onChange={onChangePassword}
            error={invalidPassword()}
            helperText={passwordHelperText()}
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
            onClick={handleLogin}
            disabled={!inputValid}
          >
            Log in
          </Button>
          <Stack spacing={2} mt={2} direction="row">
            <Typography>You have no account ?</Typography>
            <Link
              href="#"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign Up
            </Link>
          </Stack>
          {message && (
            <Stack>
              <Alert severity="error">{message}</Alert>
            </Stack>
          )}
        </Stack>
      </Paper>
    </Grid>
  );
};

export default Login;
