import { Box, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { LuTvMinimalPlay  } from "react-icons/lu";

export function Header() {
  return (
    <Box bg="dark" px={6} py={12}>
      <Flex maxW="1200px" mx="auto" align="center">
        <Link to="/" style={{ textDecoration: "none" }}>
          <Flex align="center" gap={6}>
            <Flex
              align="center"
              justify="center"
              bg="secondary.500"
              borderRadius="lg"
              w="40px"
              h="40px"
            >
              <LuTvMinimalPlay size={22} color="white" />
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
