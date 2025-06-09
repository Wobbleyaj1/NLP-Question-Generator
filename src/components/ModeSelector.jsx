import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

export default function ModeSelector({ mode, setMode }) {
  return (
    <Box display="flex" justifyContent="center">
      <FormControl>
        <InputLabel id="mode-select-label">Mode</InputLabel>
        <Select
          labelId="mode-select-label"
          id="mode-select"
          value={mode}
          label="Mode"
          onChange={(e) => setMode(e.target.value)}
          sx={{ minWidth: 160 }}
        >
          <MenuItem value="take">Take Quiz</MenuItem>
          <MenuItem value="download">Download Quiz</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
