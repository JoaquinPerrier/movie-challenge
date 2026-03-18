import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MovieCard } from "./MovieCard";
import { TestWrapper } from "@/test/wrapper";
import type { MovieSearchResult } from "@/types/movie";

const baseMovie: MovieSearchResult = {
  Title: "Dune",
  Year: "2021",
  imdbID: "tt1160419",
  Type: "movie",
  Poster: "https://example.com/poster.jpg",
};

describe("MovieCard", () => {
  it("renders movie poster with alt text", () => {
    render(
      <TestWrapper>
        <MovieCard
          movie={baseMovie}
          isFavorite={false}
          onToggleFavorite={vi.fn()}
        />
      </TestWrapper>,
    );
    const img = screen.getByAltText("Dune");
    expect(img).toBeInTheDocument();
  });

  it("links to the movie detail page", () => {
    render(
      <TestWrapper>
        <MovieCard
          movie={baseMovie}
          isFavorite={false}
          onToggleFavorite={vi.fn()}
        />
      </TestWrapper>,
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/movie/tt1160419");
  });

  it("shows TV Series badge for series type", () => {
    const series: MovieSearchResult = { ...baseMovie, Type: "series" };
    render(
      <TestWrapper>
        <MovieCard
          movie={series}
          isFavorite={false}
          onToggleFavorite={vi.fn()}
        />
      </TestWrapper>,
    );
    expect(screen.getByText("TV Series")).toBeInTheDocument();
  });

  it("does not show TV Series badge for movie type", () => {
    render(
      <TestWrapper>
        <MovieCard
          movie={baseMovie}
          isFavorite={false}
          onToggleFavorite={vi.fn()}
        />
      </TestWrapper>,
    );
    expect(screen.queryByText("TV Series")).not.toBeInTheDocument();
  });

  it("shows title overlay when poster is N/A", () => {
    const noPoster: MovieSearchResult = { ...baseMovie, Poster: "N/A" };
    render(
      <TestWrapper>
        <MovieCard
          movie={noPoster}
          isFavorite={false}
          onToggleFavorite={vi.fn()}
        />
      </TestWrapper>,
    );
    expect(screen.getByText("Dune")).toBeInTheDocument();
    expect(screen.getByText("2021")).toBeInTheDocument();
  });

  it("renders the favorite button", () => {
    render(
      <TestWrapper>
        <MovieCard
          movie={baseMovie}
          isFavorite={false}
          onToggleFavorite={vi.fn()}
        />
      </TestWrapper>,
    );
    expect(
      screen.getByLabelText("Add to favorites"),
    ).toBeInTheDocument();
  });

  it("calls onToggleFavorite when favorite button is clicked", async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();

    render(
      <TestWrapper>
        <MovieCard
          movie={baseMovie}
          isFavorite={false}
          onToggleFavorite={onToggle}
        />
      </TestWrapper>,
    );

    await user.click(screen.getByLabelText("Add to favorites"));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
