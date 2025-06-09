import React from "react";
import { Box, TextField, Button, CircularProgress } from "@mui/material";
import ModeSelector from "./ModeSelector";

export default function QuizInputForm({
  paragraph,
  setParagraph,
  numQuestions,
  setNumQuestions,
  loading,
  handleGenerate,
  mode,
  setMode,
}) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
      <TextField
        label="Enter paragraph"
        multiline
        rows={5}
        value={paragraph}
        onChange={(e) => setParagraph(e.target.value)}
        sx={{ width: 600, mb: 2 }}
      />
      <Box display="flex" alignItems="center" gap={2}>
        <ModeSelector mode={mode} setMode={setMode} />

        <TextField
          label="# of Questions"
          type="number"
          inputProps={{ min: 1, max: 10 }}
          value={numQuestions}
          onChange={(e) => setNumQuestions(Number(e.target.value))}
          sx={{ width: 120 }}
        />
        <Button variant="contained" onClick={handleGenerate} disabled={loading}>
          {loading ? "Generating..." : "Generate Quiz"}
        </Button>
        {loading && <CircularProgress size={24} />}
      </Box>
    </Box>
  );
}
