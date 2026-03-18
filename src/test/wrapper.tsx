import type { ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { MemoryRouter } from "react-router-dom";
import { system } from "@/theme";

interface WrapperProps {
  children: ReactNode;
  initialEntries?: string[];
}

export function TestWrapper({ children, initialEntries = ["/"] }: WrapperProps) {
  return (
    <ChakraProvider value={system}>
      <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
    </ChakraProvider>
  );
}

export function createWrapper(initialEntries?: string[]) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <TestWrapper initialEntries={initialEntries}>{children}</TestWrapper>
    );
  };
}
