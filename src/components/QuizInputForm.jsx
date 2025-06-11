import React, { useRef } from "react";
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
  const fileInputRef = useRef();

  const extractTextFile = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("text/")) {
      const text = await extractTextFile(file);
      setParagraph(text);
    }
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("text/")) {
      const text = await extractTextFile(file);
      setParagraph(text);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
      <Box
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        sx={{
          width: 600,
          mb: 2,
          borderRadius: 2,
          p: 0,
          position: "relative",
        }}
        style={{ cursor: "pointer" }}
      >
        <TextField
          label="Enter paragraph or drop a text file"
          multiline
          rows={5}
          value={paragraph}
          onChange={(e) => setParagraph(e.target.value)}
          sx={{ width: "100%" }}
          InputProps={{ readOnly: false }}
          onDoubleClick={() => fileInputRef.current.click()}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="text/"
          style={{ display: "none" }}
          onChange={handleFileSelect}
        />
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 16,
            color: "#aaa",
            fontSize: 12,
            pointerEvents: "none",
          }}
        >
          Drag & drop a text file
        </Box>
      </Box>
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
