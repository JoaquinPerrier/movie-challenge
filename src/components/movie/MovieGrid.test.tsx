import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MovieGrid } from "./MovieGrid";
import { TestWrapper } from "@/test/wrapper";
import type { MovieSearchResult } from "@/types/movie";

const movies: MovieSearchResult[] = [
  {
    Title: "Dune",
    Year: "2021",
    imdbID: "tt1160419",
    Type: "movie",
    Poster: "https://example.com/dune.jpg",
  },
  {
    Title: "Batman Begins",
    Year: "2005",
    imdbID: "tt0372784",
    Type: "movie",
    Poster: "https://example.com/batman.jpg",
  },
  {
    Title: "Stranger Things",
    Year: "2016",
    imdbID: "tt4574334",
    Type: "series",
    Poster: "https://example.com/stranger.jpg",
  },
];

describe("MovieGrid", () => {
  it("renders all movie cards", () => {
    render(
      <TestWrapper>
        <MovieGrid
          movies={movies}
          favorites={[]}
          onToggleFavorite={vi.fn()}
        />
      </TestWrapper>,
    );

    expect(screen.getByAltText("Dune")).toBeInTheDocument();
    expect(screen.getByAltText("Batman Begins")).toBeInTheDocument();
    expect(screen.getByAltText("Stranger Things")).toBeInTheDocument();
  });

  it("marks favorited movies correctly", () => {
    render(
      <TestWrapper>
        <MovieGrid
          movies={movies}
          favorites={["tt1160419"]}
          onToggleFavorite={vi.fn()}
        />
      </TestWrapper>,
    );

    const removeButtons = screen.getAllByLabelText("Remove from favorites");
    const addButtons = screen.getAllByLabelText("Add to favorites");

    expect(removeButtons).toHaveLength(1);
    expect(addButtons).toHaveLength(2);
  });

  it("renders links to correct detail pages", () => {
    render(
      <TestWrapper>
        <MovieGrid
          movies={movies}
          favorites={[]}
          onToggleFavorite={vi.fn()}
        />
      </TestWrapper>,
    );

    const links = screen.getAllByRole("link");
    const hrefs = links.map((l) => l.getAttribute("href"));
    expect(hrefs).toContain("/movie/tt1160419");
    expect(hrefs).toContain("/movie/tt0372784");
    expect(hrefs).toContain("/movie/tt4574334");
  });
});
