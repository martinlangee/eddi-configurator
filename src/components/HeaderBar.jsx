import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import Icon from "@mui/material/Icon";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  button: {
    "&:hover": {
      backgroundColor: "#446",
    },
    padding: "1em",
  },
});

export default function HeaderBar() {
  const classes = useStyles();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Icon
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </Icon>
          <Button className={classes.button}>
            <Link to={"/"}>Home</Link>
          </Button>
          <Button className={classes.button}>
            <Link to={"/widgets"}>Widgets</Link>
          </Button>
          <Button className={classes.button}>
            <Link to={"/screens"}>Screens</Link>
          </Button>
          <Button className={classes.button}>
            <Link to={"/settings"}>Settings</Link>
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <Button className={classes.button}>
            <Link to={"/login"}>Login</Link>
          </Button>
          <Button className={classes.button}>
            <Link to={"/signup"}>Signup</Link>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
