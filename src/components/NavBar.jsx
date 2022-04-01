import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, makeStyles } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { Avatar, Box } from "@mui/material";
import { cyan } from "@mui/material/colors";
import { stringAvatar } from "../utils/utils";
import { dbGetCurrentUser } from "../api/db";

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
    dbGetCurrentUser().then((userData) =>
      setUserName(() => userData.user_name)
    );
  }, []);

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
          <NavLink
            to="/settings"
            className={classes.link}
            activeclassname={classes.activeLink}
          >
            Settings
          </NavLink>
          <Box sx={{ flexGrow: 1 }} />
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
          <NavLink
            to="/admin"
            className={classes.link}
            activeclassname={classes.activeLink}
          >
            Admin
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
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
