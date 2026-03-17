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
  Separator,
} from "@chakra-ui/react";
import { useParams, Link } from "react-router-dom";
import { LuArrowLeft, LuClock, LuStar } from "react-icons/lu";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import { CommentForm } from "@/components/comments/CommentForm";
import { CommentList } from "@/components/comments/CommentList";
import { useSingleFavorite } from "@/hooks/useFavorites";
import { useComments } from "@/hooks/useComments";
import { mockMovieDetail } from "@/mocks/movies";

const PLACEHOLDER_IMG = "https://via.placeholder.com/300x450?text=No+Poster";

export function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const movie = mockMovieDetail; // TODO: fetch by id from OMDB API
  const { isFavorite, toggle } = useSingleFavorite(id ?? "");
  const { comments, addComment } = useComments(id ?? "");

  const genres = movie.Genre.split(", ");

  return (
    <Box minH="calc(100vh - 64px)">
      <Box
        bgGradient="to-b"
        gradientFrom="gray.900"
        gradientTo="gray.950"
        py={8}
        px={4}
      >
        <Container maxW="1200px">
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "var(--chakra-colors-gray-400)",
            }}
          >
            <HStack gap={1} mb={6} _hover={{ color: "white" }}>
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

              <HStack gap={2} flexWrap="wrap">
                {genres.map((genre) => (
                  <Badge
                    key={genre}
                    colorPalette="brand"
                    variant="subtle"
                    px={2}
                    py={1}
                    borderRadius="md"
                  >
                    {genre}
                  </Badge>
                ))}
              </HStack>

              <HStack gap={6} color="gray.400" fontSize="sm">
                <HStack gap={1}>
                  <LuClock />
                  <Text>{movie.Runtime}</Text>
                </HStack>
                <Text>{movie.Year}</Text>
                <Text>{movie.Rated}</Text>
              </HStack>

              <HStack gap={1} align="center">
                <LuStar fill="#f5c518" color="#f5c518" />
                <Text fontWeight="bold" color="white" fontSize="xl">
                  {movie.imdbRating}
                </Text>
                <Text color="gray.500" fontSize="sm">
                  / 10
                </Text>
                <Text color="gray.600" fontSize="xs" ml={1}>
                  ({movie.imdbVotes} votes)
                </Text>
              </HStack>

              <Text color="gray.300" lineHeight="tall">
                {movie.Plot}
              </Text>

              <VStack align="start" gap={2} w="100%">
                <HStack gap={2}>
                  <Text color="gray.500" fontWeight="semibold" minW="80px">
                    Director
                  </Text>
                  <Text color="white">{movie.Director}</Text>
                </HStack>
                <HStack gap={2}>
                  <Text color="gray.500" fontWeight="semibold" minW="80px">
                    Cast
                  </Text>
                  <Text color="white">{movie.Actors}</Text>
                </HStack>
                <HStack gap={2}>
                  <Text color="gray.500" fontWeight="semibold" minW="80px">
                    Country
                  </Text>
                  <Text color="white">{movie.Country}</Text>
                </HStack>
                {movie.BoxOffice !== "N/A" && (
                  <HStack gap={2}>
                    <Text color="gray.500" fontWeight="semibold" minW="80px">
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
