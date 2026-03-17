import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import { SearchBar } from "@/components/movie/SearchBar";
import { MovieGrid } from "@/components/movie/MovieGrid";
import { useFavorites } from "@/hooks/useFavorites";
import { mockSearchResults } from "@/mocks/movies";

export function HomePage() {
  const { favorites, toggleFavorite } = useFavorites();

  const handleSearch = (query: string) => {
    // TODO: integrate with OMDB API
    console.log("Searching for:", query);
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
            <SearchBar onSearch={handleSearch} />
          </Box>
        </VStack>
      </Box>

      <Container maxW="1200px" py={10} px={4}>
        <Heading size="xl" color="white" mb={6}>
          Popular Movies
        </Heading>
        <MovieGrid
          movies={mockSearchResults}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      </Container>
    </Box>
  );
}
