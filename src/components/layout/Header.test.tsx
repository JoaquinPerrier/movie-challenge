import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "./Header";
import { TestWrapper } from "@/test/wrapper";

describe("Header", () => {
  it("renders the MovieBox logo text", () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>,
    );
    expect(screen.getByText("MovieBox")).toBeInTheDocument();
  });

  it("has a link to the home page", () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>,
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/");
  });
});
