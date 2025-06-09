import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import QuizGenerator from "../QuizGenerator";

beforeAll(() => {
  window.alert = jest.fn();
});

describe("QuizGenerator integration", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            quiz: [
              {
                question: "What is 2+2?",
                correct_answer: "4",
                distractors: ["3", "5"],
              },
            ],
          }),
      })
    );
  });

  afterEach(() => {
    global.fetch.mockRestore();
  });

  test("user can generate quiz, answer, and see results", async () => {
    render(<QuizGenerator />);
    // Fill in paragraph and number of questions
    fireEvent.change(screen.getByLabelText(/enter paragraph/i), {
      target: { value: "math" },
    });
    fireEvent.change(screen.getByLabelText(/# of questions/i), {
      target: { value: 1 },
    });
    fireEvent.click(screen.getByRole("button", { name: /generate quiz/i }));

    // Wait for the quiz dialog to appear
    await waitFor(() =>
      expect(screen.getByText(/Question 1 of 1/i)).toBeInTheDocument()
    );

    // Select an answer
    fireEvent.click(screen.getByLabelText("4"));

    // Submit the quiz
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    // Wait for results dialog
    await waitFor(() =>
      expect(screen.getByText(/Quiz Results/i)).toBeInTheDocument()
    );

    // Check that the results are shown
    expect(screen.getAllByText(/What is 2\+2\?/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Your answer:/i)).toBeInTheDocument();
    expect(screen.getAllByText("4").length).toBeGreaterThan(0);
    expect(screen.getByText(/Correct answer:/i)).toBeInTheDocument();
  });
});

test("switching mode bypasses no change dialog", async () => {
  render(<QuizGenerator />);
  fireEvent.change(screen.getByLabelText(/enter paragraph/i), {
    target: { value: "test" },
  });
  fireEvent.click(screen.getByRole("button", { name: /generate quiz/i }));
  // Now switch mode
  fireEvent.click(screen.getByRole("button", { name: /download quiz/i }));
  await waitFor(() =>
    expect(screen.getByRole("button", { name: /generate quiz/i })).toBeEnabled()
  );
  fireEvent.click(screen.getByRole("button", { name: /generate quiz/i }));
  expect(screen.queryByText(/no changes detected/i)).not.toBeInTheDocument();
});
