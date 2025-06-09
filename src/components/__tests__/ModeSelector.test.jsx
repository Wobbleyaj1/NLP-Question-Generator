import { render, screen, fireEvent } from "@testing-library/react";
import ModeSelector from "../ModeSelector";

describe("ModeSelector", () => {
  test("renders both mode buttons", () => {
    render(<ModeSelector mode="take" setMode={() => {}} />);
    expect(
      screen.getByRole("button", { name: /take quiz/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /download quiz/i })
    ).toBeInTheDocument();
  });

  test("highlights the selected mode", () => {
    const { rerender } = render(
      <ModeSelector mode="take" setMode={() => {}} />
    );
    expect(screen.getByRole("button", { name: /take quiz/i })).toHaveClass(
      "MuiButton-contained"
    );
    expect(screen.getByRole("button", { name: /download quiz/i })).toHaveClass(
      "MuiButton-outlined"
    );

    rerender(<ModeSelector mode="download" setMode={() => {}} />);
    expect(screen.getByRole("button", { name: /download quiz/i })).toHaveClass(
      "MuiButton-contained"
    );
    expect(screen.getByRole("button", { name: /take quiz/i })).toHaveClass(
      "MuiButton-outlined"
    );
  });

  test("calls setMode with correct value when buttons are clicked", () => {
    const setMode = jest.fn();
    render(<ModeSelector mode="take" setMode={setMode} />);
    fireEvent.click(screen.getByRole("button", { name: /download quiz/i }));
    expect(setMode).toHaveBeenCalledWith("download");
    fireEvent.click(screen.getByRole("button", { name: /take quiz/i }));
    expect(setMode).toHaveBeenCalledWith("take");
  });
});
