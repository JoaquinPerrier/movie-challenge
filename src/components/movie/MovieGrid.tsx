import { Flex, Box } from "@chakra-ui/react";
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
    <Flex wrap="wrap" gap={{ base: 2, md: 5 }} justify="center">
      {movies.map((movie) => (
        <Box
          key={movie.imdbID}
          w={{ base: "calc(33.33% - 6px)", md: "calc(33.33% - 14px)", lg: "calc(25% - 15px)" }}
        >
          <MovieCard
            movie={movie}
            isFavorite={favorites.includes(movie.imdbID)}
            onToggleFavorite={() => onToggleFavorite(movie.imdbID)}
          />
        </Box>
      ))}
    </Flex>
  );
}
