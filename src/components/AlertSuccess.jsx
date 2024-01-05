import { Alert, Box, Collapse } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

function AlertSuccess({
  open,
  setOpen,
  text = "Data Berhasil Tercatat!",
  width = "41rem",
}) {
  return (
    <Box sx={{ width, marginTop: "20px" }}>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={setOpen}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {text}
        </Alert>
      </Collapse>
    </Box>
  );
}

export default AlertSuccess;
