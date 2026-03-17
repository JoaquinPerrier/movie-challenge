import { Box, Image, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import type { MovieSearchResult } from "@/types/movie";

interface MovieCardProps {
  movie: MovieSearchResult;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const PLACEHOLDER_IMG = "https://via.placeholder.com/300x450?text=No+Poster";

export function MovieCard({
  movie,
  isFavorite,
  onToggleFavorite,
}: MovieCardProps) {
  return (
    <Link to={`/movie/${movie.imdbID}`} style={{ textDecoration: "none" }}>
      <Box
        position="relative"
        borderRadius="lg"
        overflow="hidden"
        bg="grey"
        transition="transform 0.2s, box-shadow 0.2s"
        _hover={{
          transform: "translateY(-4px)",
          boxShadow: "xl",
        }}
        cursor="pointer"
        h="100%"
      >
        <Box position="absolute" top={2} right={2} zIndex={1}>
          <FavoriteButton
            isFavorite={isFavorite}
            onToggle={onToggleFavorite}
            size="sm"
          />
        </Box>

        <Image
          src={movie.Poster !== "N/A" ? movie.Poster : PLACEHOLDER_IMG}
          alt={movie.Title}
          w="100%"
          h="350px"
          objectFit="cover"
        />

        <VStack gap={1} p={3} align="start">
          <Text
            color="white"
            fontWeight="semibold"
            fontSize="sm"
            lineClamp={1}
          >
            {movie.Title}
          </Text>
          <Text color="lightGrey" fontSize="xs">
            {movie.Year}
          </Text>
        </VStack>
      </Box>
    </Link>
  );
}
