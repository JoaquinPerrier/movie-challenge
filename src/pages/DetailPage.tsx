import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
  Badge,
  Spinner,
} from "@chakra-ui/react";
import { useParams, Link } from "react-router-dom";
import { LuArrowLeft, LuClock, LuStar } from "react-icons/lu";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import { CommentForm } from "@/components/comments/CommentForm";
import { CommentList } from "@/components/comments/CommentList";
import { useSingleFavorite } from "@/hooks/useFavorites";
import { useComments } from "@/hooks/useComments";
import { getMovieById } from "@/services/omdb";
import type { MovieDetail } from "@/types/movie";

const PLACEHOLDER_IMG = "https://via.placeholder.com/300x450?text=No+Poster";

export function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isFavorite, toggle } = useSingleFavorite(id ?? "");
  const { comments, addComment } = useComments(id ?? "");

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    getMovieById(id)
      .then((data) => {
        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError("Movie not found");
        }
      })
      .catch(() => setError("Failed to load movie details"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="calc(100vh - 64px)">
        <Spinner size="xl" color="primary.500" />
      </Flex>
    );
  }

  if (error || !movie) {
    return (
      <Flex justify="center" align="center" minH="calc(100vh - 64px)" direction="column" gap={4}>
        <Text color="secondary.500" fontSize="lg">
          {error ?? "Movie not found"}
        </Text>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Text color="tertiary.500" _hover={{ textDecoration: "underline" }}>
            Back to search
          </Text>
        </Link>
      </Flex>
    );
  }

  const genres = movie.Genre ? movie.Genre.split(", ") : [];

  return (
    <Box minH="calc(100vh - 64px)">
      <Box bg="grey" py={8} px={4}>
        <Container maxW="1200px">
          <Link to="/" style={{ textDecoration: "none" }}>
            <HStack gap={1} mb={6} color="lightGrey" _hover={{ color: "white" }}>
              <LuArrowLeft />
              <Text fontSize="sm">Back to search</Text>
            </HStack>
          </Link>

          <Flex
            direction={{ base: "column", md: "row" }}
            gap={8}
            align="start"
          >
            <Image
              src={movie.Poster !== "N/A" ? movie.Poster : PLACEHOLDER_IMG}
              alt={movie.Title}
              borderRadius="lg"
              w={{ base: "200px", md: "300px" }}
              objectFit="cover"
              flexShrink={0}
            />

            <VStack align="start" gap={4} flex={1}>
              <Flex align="center" gap={3} w="100%">
                <Heading size="2xl" color="white" flex={1}>
                  {movie.Title}
                </Heading>
                <FavoriteButton
                  isFavorite={isFavorite}
                  onToggle={toggle}
                  size="lg"
                />
              </Flex>

              {genres.length > 0 && (
                <HStack gap={2} flexWrap="wrap">
                  {genres.map((genre) => (
                    <Badge
                      key={genre}
                      bg="midGrey"
                      color="white"
                      px={2}
                      py={1}
                      borderRadius="md"
                      fontWeight="medium"
                      fontSize="xs"
                    >
                      {genre}
                    </Badge>
                  ))}
                </HStack>
              )}

              <HStack gap={6} color="lightGrey" fontSize="sm">
                {movie.Runtime !== "N/A" && (
                  <HStack gap={1}>
                    <LuClock />
                    <Text>{movie.Runtime}</Text>
                  </HStack>
                )}
                <Text>{movie.Year}</Text>
                {movie.Rated !== "N/A" && <Text>{movie.Rated}</Text>}
              </HStack>

              {movie.imdbRating !== "N/A" && (
                <HStack gap={1} align="center">
                  <LuStar fill="#FF9F1C" color="#FF9F1C" />
                  <Text fontWeight="bold" color="white" fontSize="xl">
                    {movie.imdbRating}
                  </Text>
                  <Text color="lightGrey" fontSize="sm">
                    / 10
                  </Text>
                  {movie.imdbVotes !== "N/A" && (
                    <Text color="midGrey" fontSize="xs" ml={1}>
                      ({movie.imdbVotes} votes)
                    </Text>
                  )}
                </HStack>
              )}

              {movie.Plot !== "N/A" && (
                <Text color="lightGrey" lineHeight="tall">
                  {movie.Plot}
                </Text>
              )}

              <VStack align="start" gap={2} w="100%">
                {movie.Director !== "N/A" && (
                  <HStack gap={2}>
                    <Text color="lightGrey" fontWeight="semibold" minW="80px">
                      Director
                    </Text>
                    <Text color="white">{movie.Director}</Text>
                  </HStack>
                )}
                {movie.Actors !== "N/A" && (
                  <HStack gap={2}>
                    <Text color="lightGrey" fontWeight="semibold" minW="80px">
                      Cast
                    </Text>
                    <Text color="white">{movie.Actors}</Text>
                  </HStack>
                )}
                {movie.Country !== "N/A" && (
                  <HStack gap={2}>
                    <Text color="lightGrey" fontWeight="semibold" minW="80px">
                      Country
                    </Text>
                    <Text color="white">{movie.Country}</Text>
                  </HStack>
                )}
                {movie.BoxOffice && movie.BoxOffice !== "N/A" && (
                  <HStack gap={2}>
                    <Text color="lightGrey" fontWeight="semibold" minW="80px">
                      Box Office
                    </Text>
                    <Text color="white">{movie.BoxOffice}</Text>
                  </HStack>
                )}
              </VStack>
            </VStack>
          </Flex>
        </Container>
      </Box>

      <Container maxW="1200px" py={10} px={4}>
        <Heading size="xl" color="white" mb={6}>
          Reviews
        </Heading>

        <Flex direction={{ base: "column", lg: "row" }} gap={10}>
          <Box flex={1}>
            <CommentList comments={comments} />
          </Box>
          <Box w={{ base: "100%", lg: "400px" }} flexShrink={0}>
            <CommentForm onSubmit={addComment} />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
