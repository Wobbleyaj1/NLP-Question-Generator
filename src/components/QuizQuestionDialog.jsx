import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";

export default function QuizQuestionDialog({
  open,
  quiz,
  currentQuestion,
  answers,
  submitted,
  handleAnswerChange,
  handlePrev,
  handleNext,
  handleSubmit,
  handleClose,
}) {
  if (!quiz.length) return null;
  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle>
        Question {currentQuestion + 1} of {quiz.length}
      </DialogTitle>
      <DialogContent>
        <Box>
          <Typography sx={{ mb: 2 }}>
            {quiz[currentQuestion].question}
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup
              value={answers[currentQuestion] || ""}
              onChange={(e) =>
                handleAnswerChange(currentQuestion, e.target.value)
              }
            >
              {quiz[currentQuestion].options.map((opt, idx) => (
                <FormControlLabel
                  key={idx}
                  value={opt}
                  control={<Radio disabled={submitted} />}
                  label={opt}
                />
              ))}
            </RadioGroup>
          </FormControl>
          {submitted && (
            <Typography
              sx={{
                color:
                  answers[currentQuestion] === quiz[currentQuestion].correct
                    ? "green"
                    : "red",
                fontWeight: "bold",
                mt: 1,
              }}
            >
              {answers[currentQuestion] === quiz[currentQuestion].correct
                ? "Correct!"
                : `Incorrect. Correct answer: ${quiz[currentQuestion].correct}`}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handlePrev} disabled={currentQuestion === 0}>
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentQuestion === quiz.length - 1}
        >
          Next
        </Button>
        {currentQuestion === quiz.length - 1 && !submitted && (
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={Object.keys(answers).length !== quiz.length}
          >
            Submit
          </Button>
        )}
        {submitted && (
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
