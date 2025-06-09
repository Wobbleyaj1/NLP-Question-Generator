import { Box, Button } from "@mui/material";
import React from "react";

export default function ModeSelector({ mode, setMode }) {
  return (
    <Box display="flex" justifyContent="center" mb={2}>
      <Button
        variant={mode === "take" ? "contained" : "outlined"}
        onClick={() => setMode("take")}
        sx={{ mr: 1 }}
      >
        Take Quiz
      </Button>
      <Button
        variant={mode === "download" ? "contained" : "outlined"}
        onClick={() => setMode("download")}
      >
        Download Quiz
      </Button>
    </Box>
  );
}
