import { Box, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { LuClapperboard } from "react-icons/lu";

export function Header() {
  return (
    <Box bg="dark" px={6} py={4}>
      <Flex maxW="1200px" mx="auto" align="center">
        <Link to="/" style={{ textDecoration: "none" }}>
          <Flex align="center" gap={3}>
            <Flex
              align="center"
              justify="center"
              bg="secondary.500"
              borderRadius="lg"
              w="40px"
              h="40px"
            >
              <LuClapperboard size={22} color="white" />
            </Flex>
            <Text fontSize="xl" fontWeight="semibold" color="white">
              MovieBox
            </Text>
          </Flex>
        </Link>
      </Flex>
    </Box>
  );
}
