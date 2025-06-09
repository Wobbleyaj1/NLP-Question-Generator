import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Button,
} from "@mui/material";

export default function QuizResultsDialog({
  open,
  quiz,
  answers,
  handleClose,
  handleExport,
}) {
  function downloadResultsAsCSV(quiz, answers) {
    const header = "Question,Your Answer,Correct Answer\n";
    const rows = quiz.map((q, i) =>
      [
        `"${q.question.replace(/"/g, '""')}"`,
        `"${answers[i] || ""}"`,
        `"${q.correct.replace(/"/g, '""')}"`,
      ].join(",")
    );
    const csvContent = header + rows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quiz_results.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <Dialog open={open} maxWidth="md" fullWidth onClose={handleClose}>
      <DialogTitle>Quiz Results</DialogTitle>
      <DialogContent>
        {quiz.map((q, idx) => (
          <Box
            key={idx}
            mb={2}
            p={2}
            border={1}
            borderRadius={2}
            borderColor="grey.300"
          >
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Q{idx + 1}: {q.question}
            </Typography>
            <Typography>
              <b>Your answer:</b>{" "}
              <span
                style={{
                  color: answers[idx] === q.correct ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                {answers[idx] || <i>No answer</i>}
              </span>
            </Typography>
            <Typography>
              <b>Correct answer:</b> {q.correct}
            </Typography>
          </Box>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleExport}>Export Results</Button>
        <Button variant="contained" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
