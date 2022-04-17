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
      setUserColumns(() => Object.keys(usrs && usrs.length && usrs[0]));
      setUsers(() =>
        usrs.map((u) => Object.values(u).map((val) => String(val).slice(0, 30)))
      );
    });
    // widgets
    Api.getAllWidgets().then((widg) => {
      setWidgetColumns(() => Object.keys(widg && widg.length && widg[0]));
      setWidgets(() =>
        widg.map((w) => Object.values(w).map((val) => String(val).slice(0, 50)))
      );
    });
    // screens
    Api.getAllScreens().then((scrn) => {
      setScreenColumns(() => Object.keys(scrn && scrn.length && scrn[0]));
      setScreens(() => scrn.map((s) => Object.values(s)));
    });
    // screen-widgets cross table
    Api.getAllScreenWidgets().then((scrwdg) => {
      setScreenWidgetColumns(
        () => scrwdg && scrwdg.length && Object.keys(scrwdg[0])
      );
      setScreenWidgets(() => scrwdg.map((sw) => Object.values(sw)));
    });
  }, []);

  return (
    <Box p={1}>
      <Typography p={3} variant="h6">
        Administration
      </Typography>
      {userColumns && users ? (
        <MUIDataTable title={"User List"} data={users} columns={userColumns} />
      ) : (
        <></>
      )}
      {widgetColumns && widgets ? (
        <MUIDataTable
          title={"Widget List"}
          data={widgets}
          columns={widgetColumns}
        />
      ) : (
        <></>
      )}
      {screenColumns && screens ? (
        <MUIDataTable
          title={"Screen List"}
          data={screens}
          columns={screenColumns}
        />
      ) : (
        <></>
      )}
      {screenWidgetColumns && screenWidgets ? (
        <MUIDataTable
          title={"Screen-Widget List"}
          data={screenWidgets}
          columns={screenWidgetColumns}
        />
      ) : (
        <></>
      )}
    </Box>
  );
};

export default Admin;
