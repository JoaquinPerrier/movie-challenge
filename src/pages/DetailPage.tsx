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
  Spinner,
  SimpleGrid,
} from "@chakra-ui/react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { LuArrowLeft } from "react-icons/lu";
import { CommentForm } from "@/components/comments/CommentForm";
import { CommentList } from "@/components/comments/CommentList";
import { useComments } from "@/hooks/useComments";
import { getMovieById } from "@/services/omdb";
import type { MovieDetail } from "@/types/movie";

const FALLBACK_IMG = "/NoImageAvailable.jpg";

function formatRuntime(runtime: string): string {
  if (runtime === "N/A") return "";
  const mins = parseInt(runtime);
  if (isNaN(mins)) return runtime;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

export function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { comments, addComment, loading: commentsLoading } = useComments(id ?? "");

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
      <Flex justify="center" align="center" minH="calc(100vh - 72px)">
        <Spinner size="xl" color="primary.500" />
      </Flex>
    );
  }

  if (error || !movie) {
    return (
      <Flex justify="center" align="center" minH="calc(100vh - 72px)" direction="column" gap={4}>
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

  const genres = movie.Genre && movie.Genre !== "N/A" ? movie.Genre.split(", ") : [];
  const actors = movie.Actors && movie.Actors !== "N/A" ? movie.Actors.split(", ") : [];
  const writers = movie.Writer && movie.Writer !== "N/A" ? movie.Writer.split(", ") : [];
  const runtime = formatRuntime(movie.Runtime);

  const metaParts = [runtime, movie.Year, movie.Rated].filter(
    (p) => p && p !== "N/A",
  );

  return (
    <Box minH="calc(100vh - 72px)" bg="grey">
      <Container maxW="1200px" px={6} py={6}>
        <Box
          as="button"
          onClick={() => navigate(-1)}
          color="lightGrey"
          mb={6}
          cursor="pointer"
          bg="none"
          border="none"
          p={0}
          _hover={{ color: "white" }}
          transition="color 0.2s"
        >
          <LuArrowLeft size={24} />
        </Box>

        <Flex
          direction={{ base: "column", md: "row" }}
          gap={8}
          align="start"
        >
          <Image
            src={movie.Poster !== "N/A" ? movie.Poster : FALLBACK_IMG}
            onError={(e) => { e.currentTarget.src = FALLBACK_IMG; }}
            alt={movie.Title}
            borderRadius="lg"
            w={{ base: "200px", md: "280px" }}
            objectFit="cover"
            flexShrink={0}
          />

          <VStack align="start" gap={3} flex={1}>
            <Heading
              fontSize={{ base: "3xl", md: "4xl" }}
              color="white"
              fontWeight="bold"
              lineHeight="shorter"
            >
              {movie.Title}
            </Heading>

            {movie.Title !== movie.Title && (
              <Text color="lightGrey" fontSize="sm">
                Original title: {movie.Title}
              </Text>
            )}

            <Text color="lightGrey" fontSize="sm">
              {metaParts.join(" – ")}
            </Text>

            {movie.imdbRating && movie.imdbRating !== "N/A" && (
              <HStack gap={2} align="center">
                <Flex
                  bg="primary.500"
                  borderRadius="md"
                  px={2}
                  py={0.5}
                  align="center"
                  justify="center"
                >
                  <Text
                    fontSize="xs"
                    fontWeight="bold"
                    color="dark"
                    letterSpacing="tight"
                  >
                    IMDb
                  </Text>
                </Flex>
                <Text fontWeight="semibold" color="white" fontSize="md">
                  {movie.imdbRating}
                  <Text as="span" color="lightGrey" fontWeight="normal">
                    /10
                  </Text>
                </Text>
              </HStack>
            )}

            {movie.Plot && movie.Plot !== "N/A" && (
              <Box mt={2}>
                <Text
                  color="lightGrey"
                  fontSize="sm"
                  fontWeight="medium"
                  mb={1}
                >
                  Overview
                </Text>
                <Text color="white" fontSize="sm" lineHeight="tall">
                  {movie.Plot}
                </Text>
              </Box>
            )}

            <SimpleGrid
              columns={{ base: 2, md: 4 }}
              gap={6}
              w="100%"
              mt={4}
            >
              {actors.length > 0 && (
                <VStack align="start" gap={1}>
                  <Text color="lightGrey" fontSize="sm" fontWeight="medium">
                    Cast
                  </Text>
                  {actors.map((actor) => (
                    <Text key={actor} color="white" fontSize="sm">
                      {actor}
                    </Text>
                  ))}
                </VStack>
              )}

              {genres.length > 0 && (
                <VStack align="start" gap={1}>
                  <Text color="lightGrey" fontSize="sm" fontWeight="medium">
                    Genre
                  </Text>
                  {genres.map((genre) => (
                    <Text key={genre} color="white" fontSize="sm">
                      {genre}
                    </Text>
                  ))}
                </VStack>
              )}

              {movie.Director && movie.Director !== "N/A" && (
                <VStack align="start" gap={1}>
                  <Text color="lightGrey" fontSize="sm" fontWeight="medium">
                    Director
                  </Text>
                  <Text color="white" fontSize="sm">
                    {movie.Director}
                  </Text>
                </VStack>
              )}

              {writers.length > 0 && (
                <VStack align="start" gap={1}>
                  <Text color="lightGrey" fontSize="sm" fontWeight="medium">
                    Writers
                  </Text>
                  {writers.map((writer) => (
                    <Text key={writer} color="white" fontSize="sm">
                      {writer}
                    </Text>
                  ))}
                </VStack>
              )}
            </SimpleGrid>
          </VStack>
        </Flex>
      </Container>

      <Container maxW="1200px" py={10} px={6}>
        <Heading size="xl" color="white" fontWeight="bold" mb={6}>
          Commentary
        </Heading>

        <CommentForm onSubmit={addComment} />

        <Box mt={8}>
          {commentsLoading ? (
            <Flex justify="center" py={8}>
              <Spinner size="md" color="tertiary.500" />
            </Flex>
          ) : (
            <CommentList comments={comments} />
          )}
        </Box>
      </Container>
    </Box>
  );
}
