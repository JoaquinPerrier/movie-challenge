import { useState, type FormEvent } from "react";
import { Input, IconButton, Flex } from "@chakra-ui/react";
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
      <Flex gap={2} maxW="600px" mx="auto">
        <Input
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          size="lg"
          bg="gray.800"
          border="1px solid"
          borderColor="gray.700"
          color="white"
          _placeholder={{ color: "gray.400" }}
          _focus={{ borderColor: "brand.500", boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)" }}
        />
        <IconButton
          type="submit"
          aria-label="Search"
          size="lg"
          colorPalette="brand"
          variant="solid"
        >
          <LuSearch />
        </IconButton>
      </Flex>
    </form>
  );
}
