import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { system } from "@/theme";
import { Header } from "@/components/layout/Header";
import { HomePage } from "@/pages/HomePage";
import { DetailPage } from "@/pages/DetailPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <ChakraProvider value={system}>
      <BrowserRouter>
        <ScrollToTop />
        <Box bg="dark" minH="100vh">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie/:id" element={<DetailPage />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
