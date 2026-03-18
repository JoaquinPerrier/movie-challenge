import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HomePage } from "./HomePage";
import { TestWrapper } from "@/test/wrapper";

vi.mock("@/services/omdb", () => ({
  searchMovies: vi.fn(),
}));

import { searchMovies } from "@/services/omdb";

const mockedSearch = vi.mocked(searchMovies);

beforeEach(() => {
  vi.clearAllMocks();
});

describe("HomePage", () => {
  it("renders the search bar", () => {
    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>,
    );
    expect(screen.getByPlaceholderText("Search movies")).toBeInTheDocument();
  });

  it("shows empty state when no search query", () => {
    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>,
    );
    expect(
      screen.getByText("Don't know what to search?"),
    ).toBeInTheDocument();
  });

  it("shows loading spinner while searching", async () => {
    mockedSearch.mockReturnValue(new Promise(() => {}));

    const { container } = render(
      <TestWrapper initialEntries={["/?q=Dune&page=1"]}>
        <HomePage />
      </TestWrapper>,
    );

    expect(container.querySelector(".chakra-spinner")).toBeInTheDocument();
  });

  it("displays search results", async () => {
    mockedSearch.mockResolvedValue({
      Search: [
        {
          Title: "Dune",
          Year: "2021",
          imdbID: "tt1160419",
          Type: "movie",
          Poster: "https://example.com/dune.jpg",
        },
      ],
      totalResults: "1",
      Response: "True",
    });

    render(
      <TestWrapper initialEntries={["/?q=Dune&page=1"]}>
        <HomePage />
      </TestWrapper>,
    );

    await waitFor(() => {
      expect(screen.getByAltText("Dune")).toBeInTheDocument();
    });
  });

  it("shows error message on API failure", async () => {
    mockedSearch.mockRejectedValue(new Error("Network error"));

    render(
      <TestWrapper initialEntries={["/?q=test&page=1"]}>
        <HomePage />
      </TestWrapper>,
    );

    await waitFor(() => {
      expect(
        screen.getByText("Failed to fetch movies. Please try again."),
      ).toBeInTheDocument();
    });
  });

  it("shows error when API returns no results", async () => {
    mockedSearch.mockResolvedValue({
      Search: [],
      totalResults: "0",
      Response: "False",
      Error: "Movie not found!",
    });

    render(
      <TestWrapper initialEntries={["/?q=xyznonexistent&page=1"]}>
        <HomePage />
      </TestWrapper>,
    );

    await waitFor(() => {
      expect(screen.getByText("Movie not found!")).toBeInTheDocument();
    });
  });

  it("shows pagination when there are multiple pages", async () => {
    mockedSearch.mockResolvedValue({
      Search: Array.from({ length: 10 }, (_, i) => ({
        Title: `Movie ${i}`,
        Year: "2021",
        imdbID: `tt${i}`,
        Type: "movie",
        Poster: "N/A",
      })),
      totalResults: "50",
      Response: "True",
    });

    render(
      <TestWrapper initialEntries={["/?q=test&page=1"]}>
        <HomePage />
      </TestWrapper>,
    );

    await waitFor(() => {
      expect(screen.getByText(/Page 1 of 5/)).toBeInTheDocument();
    });

    expect(screen.getByRole("button", { name: /previous/i })).toBeDisabled();
    expect(
      screen.getByRole("button", { name: /next/i }),
    ).not.toBeDisabled();
  });

  it("triggers search when user types in search bar", async () => {
    const user = userEvent.setup();

    mockedSearch.mockResolvedValue({
      Search: [],
      totalResults: "0",
      Response: "False",
      Error: "Movie not found!",
    });

    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>,
    );

    const input = screen.getByPlaceholderText("Search movies");
    await user.type(input, "Batman");

    await waitFor(
      () => {
        expect(mockedSearch).toHaveBeenCalled();
      },
      { timeout: 3000 },
    );
  });
});
