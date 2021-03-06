import "../App.css";
import React, { useEffect, useState } from "react";
import { IconButton, Stack, Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import HighlightOffIconTwoTone from "@material-ui/icons/HighlightOffTwoTone";
import LabelEdit from "../controls/LabelEdit";
import { isPosInteger } from "../utils/utils";

const ScreenWidgetLayout = ({
  index,
  widget,
  screenWidth,
  screenHeight,
  onSave,
  onRemove,
}) => {
  const NAME_WIDTH = "170px";
  const DATA_WIDTH = "70px";

  const [data, setData] = useState(widget);

  useEffect(() => {
    // console.log("Layout:", widget);   // for debuggin' only
  }, []);

  const validateData = (value, dbField) => {
    if (!isPosInteger(value)) return "Enter positive number";
    value = Number(value);
    if (dbField.includes("size_")) {
      if (value < 30) return "Minimum size 30x30";
      if (value > 2000) return "Maximum size 2000x2000";
    }
    return "";
  };

  const saveLocal = (dbField, value) => {
    return new Promise((resolve) => {
      value = Number(value);
      setData((prev) => {
        return { ...prev, [dbField]: value };
      });
      onSave(index, dbField, value);
      resolve(""); // no error message on save
    });
  };

  const removeScreenWidget = () => {
    onRemove(data.widget_id);
  };

  return (
    <Stack>
      {/* Header line: printed only once above the first widget */}
      {index === undefined && (
        <Stack direction="row" spacing={1} mb={1}>
          <Box minWidth="162px" pl={1}>
            <strong>Name</strong>
          </Box>
          <Box minWidth={DATA_WIDTH}>
            <strong>Left</strong>
          </Box>
          <Box variant="button" minWidth={DATA_WIDTH}>
            <strong>Top</strong>
          </Box>
          <Box variant="button" minWidth={DATA_WIDTH}>
            <strong>Width</strong>
          </Box>
          <Box variant="button" pr={5} minWidth={DATA_WIDTH}>
            <strong>Height</strong>
          </Box>
        </Stack>
      )}
      {data && (
        <Stack
          direction="row"
          spacing={1}
          sx={{ "&:hover": { backgroundColor: "#e8f8ff" } }}
        >
          <Box pl={1} mr={-1} minWidth={NAME_WIDTH} display="flex">
            <Box my="auto">{data.name}</Box>
          </Box>
          <LabelEdit
            dbField="x_pos"
            onValidate={validateData}
            onSave={saveLocal}
            initValue={data.x_pos}
            width={DATA_WIDTH}
          />
          <LabelEdit
            dbField="y_pos"
            onValidate={validateData}
            onSave={saveLocal}
            initValue={data.y_pos}
            width={DATA_WIDTH}
          />
          <LabelEdit
            dbField="size_x"
            onValidate={validateData}
            onSave={saveLocal}
            initValue={data.size_x}
            width={DATA_WIDTH}
          />
          <LabelEdit
            dbField="size_y"
            onValidate={validateData}
            onSave={saveLocal}
            initValue={data.size_y}
            width={DATA_WIDTH}
          />
          <Tooltip title="Remove widget">
            <IconButton onClick={(e) => removeScreenWidget()}>
              <HighlightOffIconTwoTone
                color="primary"
                fontSize="small"
              ></HighlightOffIconTwoTone>
            </IconButton>
          </Tooltip>
        </Stack>
      )}
    </Stack>
  );
};

export default ScreenWidgetLayout;
