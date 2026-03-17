import { useState, type FormEvent } from "react";
import { Input, Flex, Icon } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

export function SearchBar({ onSearch, initialQuery = "" }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      onSearch(trimmed);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex
        align="center"
        bg="white"
        borderRadius="md"
        px={4}
        h="48px"
      >
        <Icon as={LuSearch} color="gray.400" boxSize="18px" mr={3} />
        <Input
          placeholder="Search movies"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          variant="flushed"
          border="none"
          color="gray.900"
          fontSize="md"
          _placeholder={{ color: "gray.400" }}
        />
      </Flex>
    </form>
  );
}
