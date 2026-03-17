import { Box, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { LuPopcorn } from "react-icons/lu";

export function Header() {
  return (
    <Box bg="gray.900" borderBottom="1px solid" borderColor="gray.800" px={4}>
      <Flex
        maxW="1200px"
        mx="auto"
        h="64px"
        align="center"
        justify="space-between"
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <Flex align="center" gap={2}>
            <LuPopcorn size={28} color="#f5c518" />
            <Text fontSize="xl" fontWeight="bold" color="white">
              Movie
              <Text as="span" color="brand.500">
                Box
              </Text>
            </Text>
          </Flex>
        </Link>
      </Flex>
    </Box>
  );
}
