import { useState, useEffect, useRef, type FormEvent } from "react";
import { Input, Flex, Icon } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
  debounceMs?: number;
  minChars?: number;
}

export function SearchBar({
  onSearch,
  initialQuery = "",
  debounceMs = 400,
  minChars = 3,
}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSearched = useRef(initialQuery);

  useEffect(() => {
    const trimmed = query.trim();

    if (trimmed === lastSearched.current) return;

    if (timerRef.current) clearTimeout(timerRef.current);

    if (trimmed.length >= minChars) {
      timerRef.current = setTimeout(() => {
        lastSearched.current = trimmed;
        onSearch(trimmed);
      }, debounceMs);
    } else if (trimmed.length === 0 && lastSearched.current) {
      lastSearched.current = "";
      onSearch("");
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [query, onSearch, debounceMs, minChars]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed.length >= minChars) {
      if (timerRef.current) clearTimeout(timerRef.current);
      lastSearched.current = trimmed;
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
