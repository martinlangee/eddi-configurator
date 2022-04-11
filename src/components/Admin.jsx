import "../App.css";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import MUIDataTable from "mui-datatables";
import Api from "../api/api";
import { Typography } from "@mui/material";

const Admin = () => {
  const [userColumns, setUserColumns] = useState([]);
  const [users, setUsers] = useState([]);
  const [widgetColumns, setWidgetColumns] = useState([]);
  const [widgets, setWidgets] = useState([]);
  const [screenColumns, setScreenColumns] = useState([]);
  const [screens, setScreens] = useState([]);
  const [screenWidgetColumns, setScreenWidgetColumns] = useState([]);
  const [screenWidgets, setScreenWidgets] = useState([]);

  // update all table data, filter out binary values (images, thumbnails) cause the table component cannot handle them
  useEffect(() => {
    // users
    Api.getAllUsers().then((usrs) => {
      console.log(usrs);
      setUserColumns(
        () =>
          usrs &&
          usrs.length &&
          Object.keys(usrs[0]).filter((key) => key !== "image")
      );
      setUsers(() =>
        usrs.map((u) =>
          Object.values(u).filter((val) => typeof val !== "object")
        )
      );
    });
    // widgets
    Api.getAllWidgets().then((widg) => {
      setWidgetColumns(() =>
        Object.keys(widg && widg.length && widg[0]).filter(
          (key) => key !== "thumbnail"
        )
      );
      setWidgets(() =>
        widg.map((w) =>
          Object.values(w).filter((val) => typeof val !== "object")
        )
      );
    });
    // screens
    Api.getAllScreens().then((scrn) => {
      setScreenColumns(() =>
        Object.keys(scrn && scrn.length && scrn[0]).filter(
          (key) => key !== "thumbnail"
        )
      );
      setScreens(() =>
        scrn.map((s) =>
          Object.values(s).filter((val) => typeof val !== "object")
        )
      );
    });
    // screen-widgets cross table
    Api.getAllScreenWidgets().then((scrwdg) => {
      setScreenWidgetColumns(
        () =>
          scrwdg &&
          scrwdg.length &&
          Object.keys(scrwdg[0]).filter((key) => key !== "thumbnail")
      );
      setScreenWidgets(() =>
        scrwdg.map((sw) =>
          Object.values(sw).filter((val) => typeof val !== "object")
        )
      );
    });
  }, []);

  return (
    <Box p={1}>
      <Typography p={3} variant="h6">
        Administration
      </Typography>
      {userColumns && users && (
        <MUIDataTable title={"User List"} data={users} columns={userColumns} />
      )}
      {widgetColumns && widgets && (
        <MUIDataTable
          title={"Widget List"}
          data={widgets}
          columns={widgetColumns}
        />
      )}
      {screenColumns && screens && (
        <MUIDataTable
          title={"Screen List"}
          data={screens}
          columns={screenColumns}
        />
      )}
      {screenWidgetColumns && screenWidgets && (
        <MUIDataTable
          title={"Screen-Widget List"}
          data={screenWidgets}
          columns={screenWidgetColumns}
        />
      )}
    </Box>
  );
};

export default Admin;
