import { describe, it, expect, vi, beforeEach } from "vitest";

const mockGet = vi.fn();

vi.mock("axios", () => {
  return {
    default: {
      create: vi.fn(() => ({ get: mockGet })),
    },
  };
});

beforeEach(() => {
  mockGet.mockReset();
});

describe("searchMovies", () => {
  it("calls API with query and page params", async () => {
    const { searchMovies } = await import("./omdb");

    mockGet.mockResolvedValueOnce({
      data: {
        Search: [{ Title: "Dune", imdbID: "tt1160419" }],
        totalResults: "1",
        Response: "True",
      },
    });

    const result = await searchMovies("Dune", 1);

    expect(mockGet).toHaveBeenCalledWith("", {
      params: { s: "Dune", page: 1 },
    });
    expect(result.Response).toBe("True");
    expect(result.Search).toHaveLength(1);
  });

  it("defaults to page 1", async () => {
    const { searchMovies } = await import("./omdb");

    mockGet.mockResolvedValueOnce({
      data: { Response: "False", Search: [], totalResults: "0" },
    });

    await searchMovies("test");

    expect(mockGet).toHaveBeenCalledWith("", {
      params: { s: "test", page: 1 },
    });
  });
});

describe("getMovieById", () => {
  it("calls API with movie id and full plot", async () => {
    const { getMovieById } = await import("./omdb");

    mockGet.mockResolvedValueOnce({
      data: {
        Title: "Dune",
        imdbID: "tt1160419",
        Response: "True",
      },
    });

    const result = await getMovieById("tt1160419");

    expect(mockGet).toHaveBeenCalledWith("", {
      params: { i: "tt1160419", plot: "full" },
    });
    expect(result.Title).toBe("Dune");
  });
});
