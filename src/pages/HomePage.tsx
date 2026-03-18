import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Spinner,
  Flex,
  Button,
  HStack,
} from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import { SearchBar } from "@/components/movie/SearchBar";
import { MovieGrid } from "@/components/movie/MovieGrid";
import { EmptyState } from "@/components/movie/EmptyState";
import { useFavorites } from "@/hooks/useFavorites";
import { searchMovies } from "@/services/omdb";
import type { MovieSearchResult } from "@/types/movie";

export function HomePage() {
  const { favorites, toggleFavorite } = useFavorites();
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") ?? "";
  const page = Number(searchParams.get("page") ?? "1");

  const [movies, setMovies] = useState<MovieSearchResult[]>([]);
  console.log(movies);
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
    <Box bg="dark">
      <Container maxW="1250px" px={6}>
        <Box py={4}>
          <SearchBar onSearch={handleSearch} initialQuery={query} />
        </Box>

        {!query && <EmptyState />}

        {query && (
          <Box py={6}>
            <Heading size="xl" color="white" mb={6}>
              Results for &ldquo;{query}&rdquo;
              {totalResults > 0 && (
                <Text as="span" color="lightGrey" fontSize="md" fontWeight="normal" ml={2}>
                  ({totalResults} found)
                </Text>
              )}
            </Heading>

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
          </Box>
        )}
      </Container>
    </Box>
  );
}
