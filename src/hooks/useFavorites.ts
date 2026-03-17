import { useState, useCallback } from "react";
import {
  getFavorites,
  toggleFavorite as toggleFav,
  isFavorite as checkFav,
} from "@/services/storage";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(getFavorites);

  const toggleFavorite = useCallback((movieId: string) => {
    const updated = toggleFav(movieId);
    setFavorites(updated);
  }, []);

  const isFavorite = useCallback(
    (movieId: string) => favorites.includes(movieId),
    [favorites],
  );

  return { favorites, toggleFavorite, isFavorite };
}

export function useSingleFavorite(movieId: string) {
  const [favorite, setFavorite] = useState(() => checkFav(movieId));

  const toggle = useCallback(() => {
    toggleFav(movieId);
    setFavorite((prev) => !prev);
  }, [movieId]);

  return { isFavorite: favorite, toggle };
}
