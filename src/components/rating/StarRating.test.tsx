import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StarRating } from "./StarRating";
import { TestWrapper } from "@/test/wrapper";

describe("StarRating", () => {
  it("renders the correct number of stars", () => {
    const { container } = render(
      <TestWrapper>
        <StarRating value={0} />
      </TestWrapper>,
    );
    const svgs = container.querySelectorAll("svg");
    expect(svgs).toHaveLength(5);
  });

  it("renders custom number of stars", () => {
    const { container } = render(
      <TestWrapper>
        <StarRating value={0} max={3} />
      </TestWrapper>,
    );
    const svgs = container.querySelectorAll("svg");
    expect(svgs).toHaveLength(3);
  });

  it("calls onChange when a star is clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    const { container } = render(
      <TestWrapper>
        <StarRating value={0} onChange={onChange} />
      </TestWrapper>,
    );

    const svgs = container.querySelectorAll("svg");
    await user.click(svgs[2]);
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it("does not call onChange when readOnly", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    const { container } = render(
      <TestWrapper>
        <StarRating value={3} onChange={onChange} readOnly />
      </TestWrapper>,
    );

    const svgs = container.querySelectorAll("svg");
    await user.click(svgs[0]);
    expect(onChange).not.toHaveBeenCalled();
  });
});
