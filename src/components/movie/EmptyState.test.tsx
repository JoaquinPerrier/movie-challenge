import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { EmptyState } from "./EmptyState";
import { TestWrapper } from "@/test/wrapper";

describe("EmptyState", () => {
  it("renders the heading text", () => {
    render(
      <TestWrapper>
        <EmptyState />
      </TestWrapper>,
    );
    expect(
      screen.getByText("Don't know what to search?"),
    ).toBeInTheDocument();
  });

  it("renders the subtitle text", () => {
    render(
      <TestWrapper>
        <EmptyState />
      </TestWrapper>,
    );
    expect(
      screen.getByText("Here's an offer you can't refuse"),
    ).toBeInTheDocument();
  });

  it("renders the landing image", () => {
    render(
      <TestWrapper>
        <EmptyState />
      </TestWrapper>,
    );
    const img = screen.getByRole("img", { name: "Landing illustration" });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/LandingImg.png");
  });
});
