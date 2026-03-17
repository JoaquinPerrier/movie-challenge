import { Box, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { LuPopcorn } from "react-icons/lu";

export function Header() {
  return (
    <Box bg="grey" borderBottom="1px solid" borderColor="midGrey" px={4}>
      <Flex
        maxW="1200px"
        mx="auto"
        h="64px"
        align="center"
        justify="space-between"
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <Flex align="center" gap={2}>
            <LuPopcorn size={28} color="#FF9F1C" />
            <Text fontSize="xl" fontWeight="bold" color="white">
              Movie
              <Text as="span" color="primary.500">
                Box
              </Text>
            </Text>
          </Flex>
        </Link>
      </Flex>
    </Box>
  );
}
