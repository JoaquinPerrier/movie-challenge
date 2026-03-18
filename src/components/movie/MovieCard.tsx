import { useState } from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import type { MovieSearchResult } from "@/types/movie";

interface MovieCardProps {
  movie: MovieSearchResult;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const FALLBACK_IMG = "/NoImageAvailable.jpg";

export function MovieCard({
  movie,
  isFavorite,
  onToggleFavorite,
}: MovieCardProps) {
  const isSeriesType = movie.Type === "series";
  const hasPoster = movie.Poster !== "N/A";
  const [imgFailed, setImgFailed] = useState(false);
  const showTitle = !hasPoster || imgFailed;

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
          src={hasPoster && !imgFailed ? movie.Poster : FALLBACK_IMG}
          alt={movie.Title}
          w="100%"
          aspectRatio="2/3"
          objectFit="cover"
          onError={() => setImgFailed(true)}
        />

        {showTitle && (
          <Box
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            bg="rgba(0, 0, 0, 0.7)"
            px={3}
            py={2}
          >
            <Text color="white" fontSize="sm" fontWeight="medium" lineClamp={2}>
              {movie.Title}
            </Text>
            <Text color="lightGrey" fontSize="xs">
              {movie.Year}
            </Text>
          </Box>
        )}
      </Box>
    </Link>
  );
}
