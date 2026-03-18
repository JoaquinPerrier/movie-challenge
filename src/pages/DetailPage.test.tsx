import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { DetailPage } from "./DetailPage";
import { TestWrapper } from "@/test/wrapper";
import type { MovieDetail } from "@/types/movie";

vi.mock("@/services/omdb", () => ({
  getMovieById: vi.fn(),
}));

vi.mock("@/services/comments", () => ({
  fetchComments: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: () => ({ id: "tt1160419" }),
    useNavigate: () => vi.fn(),
  };
});

import { getMovieById } from "@/services/omdb";
import { fetchComments } from "@/services/comments";

const mockedGetMovie = vi.mocked(getMovieById);
const mockedFetchComments = vi.mocked(fetchComments);

const mockMovie: MovieDetail = {
  Title: "Dune",
  Year: "2021",
  Rated: "PG-13",
  Released: "22 Oct 2021",
  Runtime: "155 min",
  Genre: "Action, Adventure, Drama",
  Director: "Denis Villeneuve",
  Writer: "Jon Spaihts, Denis Villeneuve, Eric Roth",
  Actors: "Timothée Chalamet, Rebecca Ferguson, Zendaya",
  Plot: "A noble family becomes embroiled in a war.",
  Language: "English",
  Country: "USA",
  Awards: "Won 6 Oscars",
  Poster: "https://example.com/dune.jpg",
  Ratings: [],
  Metascore: "74",
  imdbRating: "8.1",
  imdbVotes: "800,000",
  imdbID: "tt1160419",
  Type: "movie",
  DVD: "N/A",
  BoxOffice: "$108,327,830",
  Production: "N/A",
  Website: "N/A",
  Response: "True",
};

beforeEach(() => {
  vi.clearAllMocks();
  mockedFetchComments.mockResolvedValue([]);
});

describe("DetailPage", () => {
  it("shows loading spinner initially", () => {
    mockedGetMovie.mockReturnValue(new Promise(() => {}));

    const { container } = render(
      <TestWrapper initialEntries={["/movie/tt1160419"]}>
        <DetailPage />
      </TestWrapper>,
    );

    expect(container.querySelector(".chakra-spinner")).toBeInTheDocument();
  });

  it("renders movie details after loading", async () => {
    mockedGetMovie.mockResolvedValue(mockMovie);

    render(
      <TestWrapper initialEntries={["/movie/tt1160419"]}>
        <DetailPage />
      </TestWrapper>,
    );

    await waitFor(() => {
      expect(screen.getByText("Dune")).toBeInTheDocument();
    });

    expect(screen.getByText(/PG-13/)).toBeInTheDocument();
    expect(screen.getByText("8.1")).toBeInTheDocument();
    expect(screen.getByText("IMDb")).toBeInTheDocument();
    expect(screen.getByText("Overview")).toBeInTheDocument();
    expect(
      screen.getByText("A noble family becomes embroiled in a war."),
    ).toBeInTheDocument();
  });

  it("renders cast, genre, director, and writers", async () => {
    mockedGetMovie.mockResolvedValue(mockMovie);

    render(
      <TestWrapper initialEntries={["/movie/tt1160419"]}>
        <DetailPage />
      </TestWrapper>,
    );

    await waitFor(() => {
      expect(screen.getByText("Dune")).toBeInTheDocument();
    });

    expect(screen.getByText("Cast")).toBeInTheDocument();
    expect(screen.getByText("Timothée Chalamet")).toBeInTheDocument();
    expect(screen.getByText("Genre")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
    expect(screen.getByText("Director")).toBeInTheDocument();
    expect(screen.getAllByText("Denis Villeneuve").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Writers")).toBeInTheDocument();
    expect(screen.getByText("Jon Spaihts")).toBeInTheDocument();
  });

  it("formats runtime correctly", async () => {
    mockedGetMovie.mockResolvedValue(mockMovie);

    render(
      <TestWrapper initialEntries={["/movie/tt1160419"]}>
        <DetailPage />
      </TestWrapper>,
    );

    await waitFor(() => {
      expect(screen.getByText("Dune")).toBeInTheDocument();
    });

    expect(screen.getByText(/2h 35m/)).toBeInTheDocument();
  });

  it("shows error state on API failure", async () => {
    mockedGetMovie.mockRejectedValue(new Error("Network error"));

    render(
      <TestWrapper initialEntries={["/movie/tt1160419"]}>
        <DetailPage />
      </TestWrapper>,
    );

    await waitFor(() => {
      expect(
        screen.getByText("Failed to load movie details"),
      ).toBeInTheDocument();
    });

    expect(screen.getByText("Back to search")).toBeInTheDocument();
  });

  it("shows error when movie not found", async () => {
    mockedGetMovie.mockResolvedValue({
      ...mockMovie,
      Response: "False",
    } as MovieDetail);

    render(
      <TestWrapper initialEntries={["/movie/tt1160419"]}>
        <DetailPage />
      </TestWrapper>,
    );

    await waitFor(() => {
      expect(screen.getByText("Movie not found")).toBeInTheDocument();
    });
  });

  it("renders the commentary section", async () => {
    mockedGetMovie.mockResolvedValue(mockMovie);

    render(
      <TestWrapper initialEntries={["/movie/tt1160419"]}>
        <DetailPage />
      </TestWrapper>,
    );

    await waitFor(() => {
      expect(screen.getByText("Commentary")).toBeInTheDocument();
    });

    expect(
      screen.getByPlaceholderText("Add your comments here"),
    ).toBeInTheDocument();
  });

  it("renders movie poster", async () => {
    mockedGetMovie.mockResolvedValue(mockMovie);

    render(
      <TestWrapper initialEntries={["/movie/tt1160419"]}>
        <DetailPage />
      </TestWrapper>,
    );

    await waitFor(() => {
      expect(screen.getByAltText("Dune")).toBeInTheDocument();
    });

    const img = screen.getByAltText("Dune");
    expect(img).toHaveAttribute("src", "https://example.com/dune.jpg");
  });
});
