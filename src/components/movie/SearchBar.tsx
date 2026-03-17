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
          bg="grey"
          border="1px solid"
          borderColor="midGrey"
          color="white"
          _placeholder={{ color: "lightGrey" }}
          _focus={{ borderColor: "primary.500", boxShadow: "0 0 0 1px #FF9F1C" }}
        />
        <IconButton
          type="submit"
          aria-label="Search"
          size="lg"
          colorPalette="primary"
          variant="solid"
        >
          <LuSearch />
        </IconButton>
      </Flex>
    </form>
  );
}
