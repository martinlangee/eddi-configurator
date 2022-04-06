import React, { useState, useRef, useEffect } from "react";
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
import { cyan } from "@mui/material/colors";
import { Stack } from "@mui/material";
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
            size="small"
            fullWidth
            required
            onChange={onChangeEmail}
            error={invalidEmail()}
            helperText={emailHelperText()}
          />
          <TextField
            label="Password"
            placeholder="Enter password"
            size="small"
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
            startIcon={<LockOpenIcon color="primary" />}
            variant="outlined"
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
                /* TODO: navigate to Sign Up page*/
              }}
            >
              Sign Up
            </Link>
          </Stack>
        </Stack>
      </Paper>
    </Grid>
  );
};

export default Login;

// import React, { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
// import CheckButton from "react-validation/build/button";
// import AuthService from "../services/auth.service";

// const required = (value) => {
//   if (!value) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         This field is required!
//       </div>
//     );
//   }
// };

// const Login = () => {
//   let navigate = useNavigate();
//   const form = useRef();
//   const checkBtn = useRef();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const onChangeUsername = (e) => {
//     const email = e.target.value;
//     setEmail(email);
//   };
//   const onChangePassword = (e) => {
//     const password = e.target.value;
//     setPassword(password);
//   };
//   const handleLogin = (e) => {
//     e.preventDefault();
//     setMessage("");
//     setLoading(true);
//     form.current.validateAll();
//     if (checkBtn.current.context._errors.length === 0) {
//       AuthService.login(email, password).then(
//         () => {
//           navigate("/widgets");
//           window.location.reload();
//         },
//         (error) => {
//           const resMessage =
//             (error.response &&
//               error.response.data &&
//               error.response.data.message) ||
//             error.message ||
//             error.toString();
//           setLoading(false);
//           setMessage(resMessage);
//         }
//       );
//     } else {
//       setLoading(false);
//     }
//   };
//   return (
//     <div className="col-md-12">
//       <div className="card card-container">
//         <img
//           src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
//           alt="profile-img"
//           className="profile-img-card"
//         />
//         <Form onSubmit={handleLogin} ref={form}>
//           <div className="form-group">
//             <label htmlFor="email">E-mail</label>
//             <Input
//               type="text"
//               className="form-control"
//               name="email"
//               value={email}
//               onChange={onChangeUsername}
//               validations={[required]}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <Input
//               type="password"
//               className="form-control"
//               name="password"
//               value={password}
//               onChange={onChangePassword}
//               validations={[required]}
//             />
//           </div>
//           <div className="form-group">
//             <button className="btn btn-primary btn-block" disabled={loading}>
//               {loading && (
//                 <span className="spinner-border spinner-border-sm"></span>
//               )}
//               <span>Login</span>
//             </button>
//           </div>
//           {message && (
//             <div className="form-group">
//               <div className="alert alert-danger" role="alert">
//                 {message}
//               </div>
//             </div>
//           )}
//           <CheckButton style={{ display: "none" }} ref={checkBtn} />
//         </Form>
//       </div>
//     </div>
//   );
// };
// export default Login;
