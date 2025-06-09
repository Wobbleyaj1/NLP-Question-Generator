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
}) {
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
        <Button variant="contained" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
