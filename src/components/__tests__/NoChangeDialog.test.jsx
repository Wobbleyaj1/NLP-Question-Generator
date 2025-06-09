import { render, screen } from "@testing-library/react";
import NoChangeDialog from "../NoChangeDialog";
import { waitFor } from "@testing-library/react";

test("renders dialog when open", async () => {
  render(<NoChangeDialog open={true} onClose={() => {}} />);
  expect(await screen.findByText(/No Changes Detected/i)).toBeInTheDocument();
  expect(
    await screen.findByText(
      /Please change the paragraph or number of questions/i
    )
  ).toBeInTheDocument();
});

test("does not render dialog when closed", async () => {
  render(<NoChangeDialog open={false} onClose={() => {}} />);
  await waitFor(() => {
    expect(screen.queryByText(/No Changes Detected/i)).not.toBeInTheDocument();
  });
});
