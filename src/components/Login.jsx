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
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import HourglassTopOutlinedIcon from "@mui/icons-material/HourglassTopOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AuthService from "../services/auth.service";

const Login = () => {
  let navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState(false);
  const [password, setPassword] = useState("");
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setInvalidEmail(() => !isEmail(email));
    setEmailHelperText(() => invalidEmail && "Enter a valid E-mail");
  }, [email, invalidEmail]);

  useEffect(() => {
    setInvalidPassword(() => password.length < 8);
    setPasswordHelperText(
      () => invalidPassword && "Enter a valid password (at least 8 chars)"
    );
  }, [password, invalidPassword]);

  const onChangeEmail = (e) => {
    const newEmail = e.target.value;
    setEmail(() => newEmail);
  };

  const onChangePassword = (e) => {
    const newPwd = e.target.value;
    setPassword(() => newPwd);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    if (!invalidEmail && !invalidPassword) {
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
            size="small"
            variant="standard"
            type={showPassword ? "text" : "password"}
            fullWidth
            required
            onChange={onChangePassword}
            error={invalidPassword}
            helperText={passwordHelperText}
          />
          <Box my="auto">
            <VisibilityIcon
              style={{ color: "Silver" }}
              onMouseOver={() => setShowPassword(true)}
              onMouseLeave={() => setShowPassword(false)}
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
          onClick={handleLogin}
          disabled={invalidEmail || invalidPassword}
        >
          Log In
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
  );
};

export default Login;
