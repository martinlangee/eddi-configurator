import React from "react";
import { AppBar, Toolbar, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Avatar, Box } from "@mui/material";
import { cyan } from "@mui/material/colors";
import { stringAvatar } from "../utils/utils";
import { getCurrentUser } from "../api/db";

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
    fontSize: "20px",
    padding: theme.spacing(2, 2),
    "&:hover": {
      color: cyan["900"],
      backgroundColor: "white",
    },
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
          <Link to="/" className={classes.link}>
            Home
          </Link>
          <Link to="/widgets" className={classes.link}>
            Widgets
          </Link>
          <Link to="/screens" className={classes.link}>
            Screens
          </Link>
          <Link to="/settings" className={classes.link}>
            Settings
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Link to="/login" className={classes.link}>
            Log in
          </Link>
          <Link to="/signup" className={classes.link}>
            Sign up
          </Link>
          <Link to="/" className={classes.link}>
            Sign out
          </Link>
          <Box ml={2}>
            <Avatar {...stringAvatar(getCurrentUser().user_name)} />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
