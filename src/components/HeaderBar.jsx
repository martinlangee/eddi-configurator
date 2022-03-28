import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import Icon from "@mui/material/Icon";

export default function HeaderBar() {
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
          <Button color="inherit" backgroundColor="blue" sx={{ mr: 2 }}>
            <Link to={"/"}>Home</Link>
          </Button>
          <Button color="inherit" sx={{ mr: 2 }}>
            <Link to={"/widgets"}>Widgets</Link>
          </Button>
          <Button color="inherit" sx={{ mr: 2 }}>
            <Link to={"/screens"}>Screens</Link>
          </Button>
          <Button color="inherit" sx={{ mr: 2 }}>
            <Link to={"/settings"}>Settings</Link>
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" sx={{ mr: 2 }}>
            <Link to={"/login"}>Login</Link>
          </Button>
          <Button color="inherit" sx={{ mr: 2 }}>
            <Link to={"/signup"}>Signup</Link>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
