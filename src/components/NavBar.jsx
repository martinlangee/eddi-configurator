import React from "react";
import { AppBar, Toolbar, makeStyles } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { Avatar, Box } from "@mui/material";
import { cyan } from "@mui/material/colors";
import { stringAvatar } from "../utils/utils";
import { getCurrentUser } from "../api/db";
import "../App.css";

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
            exact={true}
            className={classes.link}
            activeClassName={classes.activeLink}
          >
            Home
          </NavLink>
          <NavLink
            to="/widgets"
            exact={true}
            className={classes.link}
            activeClassName={classes.activeLink}
          >
            Widgets
          </NavLink>
          <NavLink to="/screens" className={classes.link}>
            Screens
          </NavLink>
          <NavLink to="/settings" className={classes.link}>
            Settings
          </NavLink>
          <Box sx={{ flexGrow: 1 }} />
          <NavLink to="/login" className={classes.link}>
            Log in
          </NavLink>
          <NavLink to="/signup" className={classes.link}>
            Sign up
          </NavLink>
          <NavLink to="/xxx" className={classes.link}>
            Sign out
          </NavLink>
          <Box ml={2}>
            <Avatar {...stringAvatar(getCurrentUser().user_name)} />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
