import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, makeStyles } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { Avatar, Box, Tooltip } from "@mui/material";
import { cyan } from "@mui/material/colors";
import { stringAvatar } from "../utils/utils";
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
  const [currentUser, setCurrentUser] = useState(undefined);

  const updateCurrentUser = (user) => {
    setCurrentUser(user);
  };

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      updateCurrentUser(user);
    }
  }, []);

  const performSignout = () => {
    AuthService.signout();
    updateCurrentUser();
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
          {currentUser && currentUser.level >= 10 && (
            <NavLink
              to="/admin"
              className={classes.link}
              activeclassname={classes.activeLink}
            >
              Admin
            </NavLink>
          )}
          {!currentUser && (
            <>
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
            </>
          )}
          {currentUser && (
            <>
              <NavLink
                to="/"
                className={classes.link}
                activeclassname={classes.activeLink}
                onClick={performSignout}
              >
                Sign out
              </NavLink>
              <NavLink to="/profile">
                <Box ml={2}>
                  <Tooltip
                    title={
                      <>
                        Profile of: <strong>{currentUser.username}</strong>
                      </>
                    }
                  >
                    <Avatar {...stringAvatar(currentUser.username)} />
                  </Tooltip>
                </Box>
              </NavLink>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
