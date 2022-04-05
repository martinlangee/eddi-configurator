import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, makeStyles } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { Avatar, Box } from "@mui/material";
import { cyan } from "@mui/material/colors";
import { stringAvatar } from "../utils/utils";
import { dbGetCurrentUser } from "../api/db";
import AuthService from "../services/auth.service";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    flexGrow: "1",
    display: "flex",
    alignItems: "center",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    padding: theme.spacing(2.5, 2),
    textTransform: "uppercase",
    "&:hover": {
      color: cyan["900"],
      backgroundColor: "white",
    },
  },
  activeLink: {
    textDecoration: "none",
    color: cyan["900"],
    backgroundColor: "white",
    padding: theme.spacing(2, 2),
    textTransform: "uppercase",
  },
}));

function Navbar() {
  const classes = useStyles();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    dbGetCurrentUser().then((userData) => setUserName(() => userData.id)); // TODO: replace 'userData.id' with 'userData.user_name' before relase
  }, []);

  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <AppBar position="static" style={{ backgroundColor: cyan["800"] }}>
      <Toolbar>
        <Box
          component="img"
          pr={2}
          alt="EDDI Configurator"
          src="../logo48.png"
        />
        <Box className={classes.navlinks}>
          <NavLink
            to="/"
            className={classes.link}
            activeclassname={classes.activeLink}
          >
            Home
          </NavLink>
          {currentUser && (
            <>
              <NavLink
                to="/widgets"
                className={classes.link}
                activeclassname={classes.activeLink}
              >
                Widgets
              </NavLink>
              <NavLink
                to="/screens"
                className={classes.link}
                activeclassname={classes.activeLink}
              >
                Screens
              </NavLink>
            </>
          )}
          <Box sx={{ flexGrow: 1 }} />
          {currentUser && (
            <NavLink
              to="/profile"
              className={classes.link}
              activeclassname={classes.activeLink}
            >
              Profile
            </NavLink>
          )}
          <NavLink
            to="/login"
            className={classes.link}
            activeclassname={classes.activeLink}
          >
            Log in
          </NavLink>
          <NavLink
            to="/signup"
            className={classes.link}
            activeclassname={classes.activeLink}
          >
            Sign up
          </NavLink>
          {showAdminBoard && (
            <NavLink
              to="/admin"
              className={classes.link}
              activeclassname={classes.activeLink}
            >
              Admin
            </NavLink>
          )}
          {currentUser && (
            <>
              <NavLink
                to="/user"
                className={classes.link}
                activeclassname={classes.activeLink}
              >
                User
              </NavLink>
              <NavLink
                to="/"
                className={classes.link}
                activeclassname={classes.activeLink}
              >
                Sign out
              </NavLink>
              <Box ml={2}>
                <Avatar {...stringAvatar(userName)} />
              </Box>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
