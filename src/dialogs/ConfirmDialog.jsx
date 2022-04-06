import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const ConfirmDialog = ({ title, children, open, setOpen, onConfirm }) => {
  useEffect(() => {
    document
      .getElementById("dialog")
      .addEventListener("keydown", function (event) {
        if (event.code === "Enter" || event.code === "NumpadEnter") {
          event.preventDefault();
          document.getElementById("btnOK").click();
        }
      });
  }, []);

  return (
    <Dialog
      id="dialog"
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="confirm-dialog"
    >
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button
          id="btnOK"
          variant="outlined"
          onClick={() => {
            setOpen(false);
            onConfirm();
          }}
        >
          Yes
        </Button>
        <Button variant="outlined" onClick={() => setOpen(false)}>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
