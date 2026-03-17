import { Box, Image } from "@chakra-ui/react";
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
  const isSeriesType = movie.Type === "series";

  return (
    <Link to={`/movie/${movie.imdbID}`} style={{ textDecoration: "none" }}>
      <Box
        position="relative"
        borderRadius="xl"
        overflow="hidden"
        transition="transform 0.2s, box-shadow 0.2s"
        _hover={{
          transform: "translateY(-4px)",
          boxShadow: "xl",
        }}
        cursor="pointer"
      >
        {isSeriesType && (
          <Box
            position="absolute"
            top={3}
            left={3}
            zIndex={1}
            bg="rgba(255, 255, 255, 0.5)"
            color="dark"
            fontSize="9px"
            fontWeight="medium"
            px={2}
            py={0.5}
            borderRadius="full"
            textTransform="uppercase"
            letterSpacing="0.05em"
          >
            TV Series
          </Box>
        )}

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
          aspectRatio="2/3"
          objectFit="cover"
        />
      </Box>
    </Link>
  );
}
