import { describe, it, expect, vi } from "vitest";
import {
  getFavorites,
  toggleFavorite,
  isFavorite,
  getComments,
  addComment,
} from "./storage";

describe("getFavorites", () => {
  it("returns empty array when nothing stored", () => {
    expect(getFavorites()).toEqual([]);
  });

  it("returns stored favorites", () => {
    localStorage.setItem("moviebox_favorites", JSON.stringify(["tt1", "tt2"]));
    expect(getFavorites()).toEqual(["tt1", "tt2"]);
  });
});

describe("toggleFavorite", () => {
  it("adds a movie to favorites", () => {
    const result = toggleFavorite("tt123");
    expect(result).toContain("tt123");
    expect(getFavorites()).toContain("tt123");
  });

  it("removes a movie if already favorited", () => {
    toggleFavorite("tt200");
    const result = toggleFavorite("tt200");
    expect(result).not.toContain("tt200");
  });

  it("handles multiple favorites", () => {
    toggleFavorite("tt301");
    toggleFavorite("tt302");
    toggleFavorite("tt303");
    const favs = getFavorites();
    expect(favs).toContain("tt301");
    expect(favs).toContain("tt302");
    expect(favs).toContain("tt303");

    toggleFavorite("tt302");
    expect(getFavorites()).not.toContain("tt302");
  });
});

describe("isFavorite", () => {
  it("returns false when not favorited", () => {
    expect(isFavorite("tt999")).toBe(false);
  });

  it("returns true when favorited", () => {
    toggleFavorite("tt888");
    expect(isFavorite("tt888")).toBe(true);
  });
});

describe("getComments", () => {
  it("returns empty array when nothing stored", () => {
    expect(getComments("tt500")).toEqual([]);
  });

  it("filters comments by movieId", () => {
    addComment("tt501", "User", "Great movie", 5);
    addComment("tt502", "User", "Not bad", 3);
    addComment("tt501", "User2", "Amazing", 4);

    const comments = getComments("tt501");
    expect(comments).toHaveLength(2);
    expect(comments.every((c) => c.movieId === "tt501")).toBe(true);
  });

  it("sorts comments newest first", () => {
    vi.spyOn(Date.prototype, "toISOString")
      .mockReturnValueOnce("2024-01-01T00:00:00.000Z")
      .mockReturnValueOnce("2024-01-02T00:00:00.000Z");

    addComment("tt600", "User", "First", 3);
    addComment("tt600", "User", "Second", 4);

    const comments = getComments("tt600");
    expect(comments[0].text).toBe("Second");
    expect(comments[1].text).toBe("First");

    vi.restoreAllMocks();
  });
});

describe("addComment", () => {
  it("creates a comment with all fields", () => {
    const comment = addComment("tt700", "John", "Nice movie!", 4);

    expect(comment).toMatchObject({
      movieId: "tt700",
      author: "John",
      text: "Nice movie!",
      rating: 4,
    });
    expect(comment.id).toBeDefined();
    expect(comment.createdAt).toBeDefined();
  });

  it("persists the comment to localStorage", () => {
    addComment("tt800", "John", "Nice!", 5);
    const stored = JSON.parse(
      localStorage.getItem("moviebox_comments") ?? "[]",
    );
    expect(stored.some((c: { text: string }) => c.text === "Nice!")).toBe(true);
  });
});
