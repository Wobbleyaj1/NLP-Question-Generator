import { render, screen, fireEvent } from "@testing-library/react";
import QuizQuestionDialog from "../QuizQuestionDialog";

const quiz = [
  {
    question: "What is 2+2?",
    options: ["3", "4", "5"],
    correct: "4",
  },
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris"],
    correct: "Paris",
  },
];

describe("QuizQuestionDialog", () => {
  test("renders current question and options", () => {
    render(
      <QuizQuestionDialog
        open={true}
        quiz={quiz}
        currentQuestion={0}
        answers={{}}
        submitted={false}
        handleAnswerChange={() => {}}
        handlePrev={() => {}}
        handleNext={() => {}}
        handleSubmit={() => {}}
        handleClose={() => {}}
      />
    );
    expect(screen.getByText(/Question 1 of 2/i)).toBeInTheDocument();
    expect(screen.getByText(/What is 2\+2\?/i)).toBeInTheDocument();
    expect(screen.getByLabelText("3")).toBeInTheDocument();
    expect(screen.getByLabelText("4")).toBeInTheDocument();
    expect(screen.getByLabelText("5")).toBeInTheDocument();
  });

  test("calls handleAnswerChange when an option is selected", () => {
    const handleAnswerChange = jest.fn();
    render(
      <QuizQuestionDialog
        open={true}
        quiz={quiz}
        currentQuestion={0}
        answers={{}}
        submitted={false}
        handleAnswerChange={handleAnswerChange}
        handlePrev={() => {}}
        handleNext={() => {}}
        handleSubmit={() => {}}
        handleClose={() => {}}
      />
    );
    fireEvent.click(screen.getByLabelText("4"));
    expect(handleAnswerChange).toHaveBeenCalledWith(0, "4");
  });

  test("disables Previous button on first question", () => {
    render(
      <QuizQuestionDialog
        open={true}
        quiz={quiz}
        currentQuestion={0}
        answers={{}}
        submitted={false}
        handleAnswerChange={() => {}}
        handlePrev={() => {}}
        handleNext={() => {}}
        handleSubmit={() => {}}
        handleClose={() => {}}
      />
    );
    expect(screen.getByRole("button", { name: /previous/i })).toBeDisabled();
  });

  test("disables Next button on last question", () => {
    render(
      <QuizQuestionDialog
        open={true}
        quiz={quiz}
        currentQuestion={1}
        answers={{}}
        submitted={false}
        handleAnswerChange={() => {}}
        handlePrev={() => {}}
        handleNext={() => {}}
        handleSubmit={() => {}}
        handleClose={() => {}}
      />
    );
    expect(screen.getByRole("button", { name: /next/i })).toBeDisabled();
  });

  test("shows Submit button on last question", () => {
    render(
      <QuizQuestionDialog
        open={true}
        quiz={quiz}
        currentQuestion={1}
        answers={{ 0: "4", 1: "Paris" }}
        submitted={false}
        handleAnswerChange={() => {}}
        handlePrev={() => {}}
        handleNext={() => {}}
        handleSubmit={() => {}}
        handleClose={() => {}}
      />
    );
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  test("shows feedback and Close button when submitted", () => {
    render(
      <QuizQuestionDialog
        open={true}
        quiz={quiz}
        currentQuestion={0}
        answers={{ 0: "4" }}
        submitted={true}
        handleAnswerChange={() => {}}
        handlePrev={() => {}}
        handleNext={() => {}}
        handleSubmit={() => {}}
        handleClose={() => {}}
      />
    );
    expect(screen.getByText(/Correct!/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
  });
});
