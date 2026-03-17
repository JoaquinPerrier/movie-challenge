import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Spinner,
  Flex,
  Button,
  HStack,
} from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import { SearchBar } from "@/components/movie/SearchBar";
import { MovieGrid } from "@/components/movie/MovieGrid";
import { useFavorites } from "@/hooks/useFavorites";
import { searchMovies } from "@/services/omdb";
import type { MovieSearchResult } from "@/types/movie";

export function HomePage() {
  const { favorites, toggleFavorite } = useFavorites();
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") ?? "";
  const page = Number(searchParams.get("page") ?? "1");

  const [movies, setMovies] = useState<MovieSearchResult[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = useCallback(async (q: string, p: number) => {
    if (!q) return;
    setLoading(true);
    setError(null);
    try {
      const data = await searchMovies(q, p);
      if (data.Response === "True") {
        setMovies(data.Search);
        setTotalResults(Number(data.totalResults));
      } else {
        setMovies([]);
        setTotalResults(0);
        setError(data.Error ?? "No results found");
      }
    } catch {
      setError("Failed to fetch movies. Please try again.");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies(query, page);
  }, [query, page, fetchMovies]);

  const handleSearch = (q: string) => {
    setSearchParams({ q, page: "1" });
  };

  const totalPages = Math.ceil(totalResults / 10);

  const goToPage = (p: number) => {
    setSearchParams({ q: query, page: String(p) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box minH="calc(100vh - 64px)">
      <Box bg="grey" py={16} px={4}>
        <VStack gap={4} textAlign="center">
          <Heading size="3xl" color="white" fontWeight="bold">
            Discover Your Next Favorite Movie
          </Heading>
          <Text color="lightGrey" fontSize="lg" maxW="600px">
            Search through thousands of movies, read reviews, and save your
            favorites.
          </Text>
          <Box w="100%" mt={4}>
            <SearchBar onSearch={handleSearch} initialQuery={query} />
          </Box>
        </VStack>
      </Box>

      <Container maxW="1200px" py={10} px={4}>
        {query && (
          <Heading size="xl" color="white" mb={6}>
            Results for &ldquo;{query}&rdquo;
            {totalResults > 0 && (
              <Text as="span" color="lightGrey" fontSize="md" fontWeight="normal" ml={2}>
                ({totalResults} found)
              </Text>
            )}
          </Heading>
        )}

        {!query && (
          <VStack gap={6} py={16} textAlign="center">
            <Text color="lightGrey" fontSize="lg">
              Start by searching for a movie above.
            </Text>
          </VStack>
        )}

        {loading && (
          <Flex justify="center" py={16}>
            <Spinner size="xl" color="primary.500" />
          </Flex>
        )}

        {error && !loading && (
          <Text color="secondary.500" textAlign="center" py={8}>
            {error}
          </Text>
        )}

        {!loading && !error && movies.length > 0 && (
          <>
            <MovieGrid
              movies={movies}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />

            {totalPages > 1 && (
              <HStack justify="center" mt={10} gap={2}>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => goToPage(page - 1)}
                  color="white"
                  borderColor="midGrey"
                >
                  Previous
                </Button>
                <Text color="lightGrey" fontSize="sm">
                  Page {page} of {totalPages}
                </Text>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= totalPages}
                  onClick={() => goToPage(page + 1)}
                  color="white"
                  borderColor="midGrey"
                >
                  Next
                </Button>
              </HStack>
            )}
          </>
        )}
      </Container>
    </Box>
  );
}
