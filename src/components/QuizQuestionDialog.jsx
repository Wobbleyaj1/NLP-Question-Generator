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
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pr: 1, // add some right padding for the icon
        }}
      >
        <span>
          Question {currentQuestion + 1} of {quiz.length}
        </span>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          edge="end"
          size="small"
          sx={{ ml: 2 }}
        >
          <CloseIcon />
        </IconButton>
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
