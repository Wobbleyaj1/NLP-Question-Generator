import { render, screen, fireEvent } from "@testing-library/react";
import QuizInputForm from "../QuizInputForm";

describe("QuizInputForm", () => {
  test("renders input fields and button", () => {
    render(
      <QuizInputForm
        paragraph=""
        setParagraph={() => {}}
        numQuestions={3}
        setNumQuestions={() => {}}
        loading={false}
        handleGenerate={() => {}}
      />
    );
    expect(screen.getByLabelText(/enter paragraph/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of questions/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /generate quiz/i })
    ).toBeInTheDocument();
  });

  test("calls setParagraph and setNumQuestions on input change", () => {
    const setParagraph = jest.fn();
    const setNumQuestions = jest.fn();
    render(
      <QuizInputForm
        paragraph=""
        setParagraph={setParagraph}
        numQuestions={3}
        setNumQuestions={setNumQuestions}
        loading={false}
        handleGenerate={() => {}}
      />
    );
    fireEvent.change(screen.getByLabelText(/enter paragraph/i), {
      target: { value: "Test paragraph" },
    });
    expect(setParagraph).toHaveBeenCalledWith("Test paragraph");

    fireEvent.change(screen.getByLabelText(/number of questions/i), {
      target: { value: "5" },
    });
    expect(setNumQuestions).toHaveBeenCalledWith(5);
  });

  test("calls handleGenerate when button is clicked", () => {
    const handleGenerate = jest.fn();
    render(
      <QuizInputForm
        paragraph="Test"
        setParagraph={() => {}}
        numQuestions={3}
        setNumQuestions={() => {}}
        loading={false}
        handleGenerate={handleGenerate}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /generate quiz/i }));
    expect(handleGenerate).toHaveBeenCalled();
  });

  test("shows spinner and disables button when loading", () => {
    render(
      <QuizInputForm
        paragraph="Test"
        setParagraph={() => {}}
        numQuestions={3}
        setNumQuestions={() => {}}
        loading={true}
        handleGenerate={() => {}}
      />
    );
    expect(screen.getByRole("button", { name: /generating/i })).toBeDisabled();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
