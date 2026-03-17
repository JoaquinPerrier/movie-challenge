import { SimpleGrid } from "@chakra-ui/react";
import { MovieCard } from "./MovieCard";
import type { MovieSearchResult } from "@/types/movie";

interface MovieGridProps {
  movies: MovieSearchResult[];
  favorites: string[];
  onToggleFavorite: (movieId: string) => void;
}

export function MovieGrid({
  movies,
  favorites,
  onToggleFavorite,
}: MovieGridProps) {
  return (
    <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} gap={5}>
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          isFavorite={favorites.includes(movie.imdbID)}
          onToggleFavorite={() => onToggleFavorite(movie.imdbID)}
        />
      ))}
    </SimpleGrid>
  );
}
