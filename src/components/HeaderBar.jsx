import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
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
          <Box
            component="img"
            pr={2}
            sx={{
              height: 32,
              width: 32,
            }}
            alt="EDDI Configurator"
            src="../logo32.png"
          />
          <Button
            px={2}
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
