import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useFavorites, useSingleFavorite } from "./useFavorites";

describe("useFavorites", () => {
  it("starts with empty favorites", () => {
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites).toEqual([]);
  });

  it("loads existing favorites from localStorage", () => {
    localStorage.setItem(
      "moviebox_favorites",
      JSON.stringify(["tt100", "tt200"]),
    );
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites).toContain("tt100");
    expect(result.current.favorites).toContain("tt200");
  });

  it("toggles a favorite on", () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.toggleFavorite("tt150");
    });

    expect(result.current.favorites).toContain("tt150");
    expect(result.current.isFavorite("tt150")).toBe(true);
  });

  it("toggles a favorite off", () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.toggleFavorite("tt160");
    });
    act(() => {
      result.current.toggleFavorite("tt160");
    });

    expect(result.current.favorites).not.toContain("tt160");
    expect(result.current.isFavorite("tt160")).toBe(false);
  });
});

describe("useSingleFavorite", () => {
  it("starts as not favorite", () => {
    const { result } = renderHook(() => useSingleFavorite("tt250"));
    expect(result.current.isFavorite).toBe(false);
  });

  it("starts as favorite if already stored", () => {
    localStorage.setItem("moviebox_favorites", JSON.stringify(["tt260"]));
    const { result } = renderHook(() => useSingleFavorite("tt260"));
    expect(result.current.isFavorite).toBe(true);
  });

  it("toggles favorite state", () => {
    const { result } = renderHook(() => useSingleFavorite("tt270"));

    act(() => {
      result.current.toggle();
    });
    expect(result.current.isFavorite).toBe(true);

    act(() => {
      result.current.toggle();
    });
    expect(result.current.isFavorite).toBe(false);
  });
});
