import { render, screen, fireEvent } from "@testing-library/react";
import QuizResultsDialog from "../QuizResultsDialog";

const quiz = [
  {
    question: "What is 2+2?",
    options: ["3", "4", "5"],
    correct: "4",
  },
  {
    question: "Capital of France?",
    options: ["London", "Berlin", "Paris"],
    correct: "Paris",
  },
];

describe("QuizResultsDialog", () => {
  test("renders all questions and answers when open", () => {
    render(
      <QuizResultsDialog
        open={true}
        quiz={quiz}
        answers={{ 0: "4", 1: "Berlin" }}
        handleClose={() => {}}
      />
    );
    expect(screen.getByText(/Quiz Results/i)).toBeInTheDocument();
    expect(screen.getByText(/Q1: What is 2\+2\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Q2: Capital of France\?/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Your answer:/i)).toHaveLength(2);
    const userAnswer = screen.getAllByText("4")[0];
    const correctAnswer = screen.getAllByText("4")[1];
    expect(userAnswer).toBeInTheDocument();
    expect(correctAnswer).toBeInTheDocument();
    expect(screen.getByText("Berlin")).toBeInTheDocument();
    expect(screen.getAllByText(/Correct answer:/i)).toHaveLength(2);
    expect(screen.getByText("Paris")).toBeInTheDocument();
  });

  test("shows 'No answer' if not answered", () => {
    render(
      <QuizResultsDialog
        open={true}
        quiz={quiz}
        answers={{ 0: "4" }}
        handleClose={() => {}}
      />
    );
    expect(screen.getByText(/No answer/i)).toBeInTheDocument();
  });

  test("calls handleClose when Close button is clicked", () => {
    const handleClose = jest.fn();
    render(
      <QuizResultsDialog
        open={true}
        quiz={quiz}
        answers={{ 0: "4", 1: "Paris" }}
        handleClose={handleClose}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(handleClose).toHaveBeenCalled();
  });
});

test("calls handleExport when Export Results button is clicked", () => {
  const handleExport = jest.fn();
  render(
    <QuizResultsDialog
      open={true}
      quiz={quiz}
      answers={{ 0: "4", 1: "Paris" }}
      handleClose={() => {}}
      handleExport={handleExport}
    />
  );
  fireEvent.click(screen.getByRole("button", { name: /export results/i }));
  expect(handleExport).toHaveBeenCalled();
});
