import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useComments } from "./useComments";
import type { Comment } from "@/types/movie";

vi.mock("@/services/comments", () => ({
  fetchComments: vi.fn(),
}));

import { fetchComments } from "@/services/comments";

const mockedFetchComments = vi.mocked(fetchComments);

const apiComment: Comment = {
  id: "jph-1",
  movieId: "tt900",
  author: "API User",
  text: "From API",
  rating: 4,
  createdAt: "2021-10-30T00:00:00.000Z",
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("useComments", () => {
  it("starts in loading state", () => {
    mockedFetchComments.mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => useComments("tt900"));
    expect(result.current.loading).toBe(true);
  });

  it("loads comments from API", async () => {
    mockedFetchComments.mockResolvedValue([apiComment]);

    const { result } = renderHook(() => useComments("tt901"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.comments).toHaveLength(1);
    expect(result.current.comments[0].text).toBe("From API");
  });

  it("combines stored and API comments", async () => {
    const storedComment: Comment = {
      id: "local-1",
      movieId: "tt902",
      author: "Local User",
      text: "From storage",
      rating: 5,
      createdAt: new Date().toISOString(),
    };

    const raw = localStorage.getItem("moviebox_comments");
    const existing = raw ? JSON.parse(raw) : [];
    existing.push(storedComment);
    localStorage.setItem("moviebox_comments", JSON.stringify(existing));

    mockedFetchComments.mockResolvedValue([
      { ...apiComment, movieId: "tt902" },
    ]);

    const { result } = renderHook(() => useComments("tt902"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.comments).toHaveLength(2);
  });

  it("falls back to stored comments on API error", async () => {
    const storedComment: Comment = {
      id: "local-2",
      movieId: "tt903",
      author: "User",
      text: "Stored only",
      rating: 3,
      createdAt: new Date().toISOString(),
    };

    const raw = localStorage.getItem("moviebox_comments");
    const existing = raw ? JSON.parse(raw) : [];
    existing.push(storedComment);
    localStorage.setItem("moviebox_comments", JSON.stringify(existing));

    mockedFetchComments.mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useComments("tt903"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.comments).toHaveLength(1);
    expect(result.current.comments[0].text).toBe("Stored only");
  });

  it("adds a new comment", async () => {
    mockedFetchComments.mockResolvedValue([]);

    const { result } = renderHook(() => useComments("tt904"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.addComment("Alice", "New comment", 5);
    });

    expect(result.current.comments).toHaveLength(1);
    expect(result.current.comments[0].text).toBe("New comment");
  });

  it("does not fetch if movieId is empty", () => {
    renderHook(() => useComments(""));
    expect(mockedFetchComments).not.toHaveBeenCalled();
  });
});
