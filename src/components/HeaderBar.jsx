import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { cyan } from "@mui/material/colors";
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
      <AppBar position="static" style={{ backgroundColor: cyan["800"] }}>
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
            sx={{ padding: "1em", "&:hover": { backgroundColor: cyan["900"] } }}
          >
            <Link to={"/"}>Home</Link>
          </Button>
          <Button
            sx={{ padding: "1em", "&:hover": { backgroundColor: cyan["900"] } }}
          >
            <Link to={"/widgets"}>Widgets</Link>
          </Button>
          <Button
            sx={{ padding: "1em", "&:hover": { backgroundColor: cyan["900"] } }}
          >
            <Link to={"/screens"}>Screens</Link>
          </Button>
          <Button
            sx={{ padding: "1em", "&:hover": { backgroundColor: cyan["900"] } }}
          >
            <Link to={"/settings"}>Settings</Link>
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            sx={{ padding: "1em", "&:hover": { backgroundColor: cyan["900"] } }}
          >
            <Link to={"/login"}>Log in</Link>
          </Button>
          <Button
            sx={{ padding: "1em", "&:hover": { backgroundColor: cyan["900"] } }}
          >
            <Link to={"/signup"}>Sign up</Link>
          </Button>
          <Button
            sx={{
              padding: "1em",
              color: "white",
              "&:hover": { backgroundColor: cyan["900"] },
            }}
          >
            Sign out
          </Button>
          <Box>
            <PermIdentityIcon style={{ paddingLeft: "10px", color: "white" }} />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
