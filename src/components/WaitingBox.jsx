import "../App.css";
import React from "react";
import { Box } from "@material-ui/core";

const WaitingBox = ({ text }) => {
  return (
    <Box margin={5} minHeight="150px" minWidth="300px">
      <h4>{text ? text : "Waiting for data to load ..."}</h4>
    </Box>
  );
};

export default WaitingBox;
