import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import Icon from "@mui/material/Icon";
/*import { makeStyles } from "@material-ui/styles";

/* doen't work though it already did !!?? 
const useStyles = makeStyles({
  btn: {
    "&:hover": {
      backgroundColor: "#468",
    },
    padding: "20px",
  },
});  */

export default function HeaderBar() {
  //const classes = useStyles();

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
          <Button
            sx={{ padding: "1em", "&:hover": { backgroundColor: "#458" } }}
          >
            <Link to={"/"}>Home</Link>
          </Button>
          <Button
            sx={{ padding: "1em", "&:hover": { backgroundColor: "#458" } }}
          >
            <Link to={"/widgets"}>Widgets</Link>
          </Button>
          <Button
            sx={{ padding: "1em", "&:hover": { backgroundColor: "#458" } }}
          >
            <Link to={"/screens"}>Screens</Link>
          </Button>
          <Button
            sx={{ padding: "1em", "&:hover": { backgroundColor: "#458" } }}
          >
            <Link to={"/settings"}>Settings</Link>
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            sx={{ padding: "1em", "&:hover": { backgroundColor: "#458" } }}
          >
            <Link to={"/login"}>Log in</Link>
          </Button>
          <Button
            sx={{ padding: "1em", "&:hover": { backgroundColor: "#458" } }}
          >
            <Link to={"/signup"}>Sign up</Link>
          </Button>
          <Button
            sx={{
              padding: "1em",
              color: "white",
              "&:hover": { backgroundColor: "#458" },
            }}
          >
            Sign out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
