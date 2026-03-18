import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "@/theme";
import { SearchBar } from "./SearchBar";

function Wrapper({ children }: { children: React.ReactNode }) {
  return <ChakraProvider value={system}>{children}</ChakraProvider>;
}

describe("SearchBar", () => {
  it("renders with placeholder text", () => {
    render(<SearchBar onSearch={vi.fn()} />, { wrapper: Wrapper });
    expect(screen.getByPlaceholderText("Search movies")).toBeInTheDocument();
  });

  it("renders with initial query", () => {
    render(<SearchBar onSearch={vi.fn()} initialQuery="Dune" />, {
      wrapper: Wrapper,
    });
    expect(screen.getByDisplayValue("Dune")).toBeInTheDocument();
  });

  it("triggers search on Enter key", async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />, { wrapper: Wrapper });

    const input = screen.getByPlaceholderText("Search movies");
    await user.type(input, "Batman{Enter}");

    expect(onSearch).toHaveBeenCalledWith("Batman");
  });

  it("does not trigger search on Enter if less than minChars", async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} minChars={3} />, {
      wrapper: Wrapper,
    });

    const input = screen.getByPlaceholderText("Search movies");
    await user.type(input, "ab{Enter}");

    expect(onSearch).not.toHaveBeenCalledWith("ab");
  });

  it("triggers debounced search after typing 3+ chars", async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    render(
      <SearchBar onSearch={onSearch} debounceMs={100} minChars={3} />,
      { wrapper: Wrapper },
    );

    const input = screen.getByPlaceholderText("Search movies");
    await user.type(input, "Dun");

    await waitFor(
      () => {
        expect(onSearch).toHaveBeenCalledWith("Dun");
      },
      { timeout: 2000 },
    );
  });

  it("clears search when input is emptied", async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    render(
      <SearchBar onSearch={onSearch} initialQuery="Dune" debounceMs={100} />,
      { wrapper: Wrapper },
    );

    const input = screen.getByDisplayValue("Dune");
    await user.clear(input);

    await waitFor(
      () => {
        expect(onSearch).toHaveBeenCalledWith("");
      },
      { timeout: 2000 },
    );
  });
});
