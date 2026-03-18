import { Box, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { LuTvMinimalPlay } from "react-icons/lu";

export function Header() {
  return (
    <Box bg="dark" px={{ base: 4, md: 6 }} pt={20} pb={12}>
      <Flex maxW="1250px" mx="auto" align="center">
        <Link to="/" style={{ textDecoration: "none" }}>
          <Flex align="center" gap={3}>
            <Flex
              align="center"
              justify="center"
              bg="secondary.500"
              borderRadius="lg"
              w="36px"
              h="36px"
            >
              <LuTvMinimalPlay size={20} color="white" />
            </Flex>
            <Text fontSize="lg" fontWeight="semibold" color="white">
              MovieBox
            </Text>
          </Flex>
        </Link>
      </Flex>
    </Box>
  );
}
