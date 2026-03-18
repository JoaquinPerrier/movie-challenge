import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CommentForm } from "./CommentForm";
import { TestWrapper } from "@/test/wrapper";

describe("CommentForm", () => {
  it("renders the textarea and post button", () => {
    render(
      <TestWrapper>
        <CommentForm onSubmit={vi.fn()} />
      </TestWrapper>,
    );
    expect(
      screen.getByPlaceholderText("Add your comments here"),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /post/i })).toBeInTheDocument();
  });

  it("renders the Rate label", () => {
    render(
      <TestWrapper>
        <CommentForm onSubmit={vi.fn()} />
      </TestWrapper>,
    );
    expect(screen.getByText("Rate:")).toBeInTheDocument();
  });

  it("post button is disabled when form is empty", () => {
    render(
      <TestWrapper>
        <CommentForm onSubmit={vi.fn()} />
      </TestWrapper>,
    );
    expect(screen.getByRole("button", { name: /post/i })).toBeDisabled();
  });

  it("calls onSubmit with correct data and resets form", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    const { container } = render(
      <TestWrapper>
        <CommentForm onSubmit={onSubmit} />
      </TestWrapper>,
    );

    const textarea = screen.getByPlaceholderText("Add your comments here");
    await user.type(textarea, "Great movie!");

    const svgs = container.querySelectorAll("svg");
    await user.click(svgs[3]);

    await user.click(screen.getByRole("button", { name: /post/i }));

    expect(onSubmit).toHaveBeenCalledWith("Anonymous", "Great movie!", 4);
    expect(textarea).toHaveValue("");
  });

  it("does not submit with only text (no rating)", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(
      <TestWrapper>
        <CommentForm onSubmit={onSubmit} />
      </TestWrapper>,
    );

    await user.type(
      screen.getByPlaceholderText("Add your comments here"),
      "Nice",
    );

    expect(screen.getByRole("button", { name: /post/i })).toBeDisabled();
  });
});
