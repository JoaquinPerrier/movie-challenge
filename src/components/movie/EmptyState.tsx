import { VStack, Text, Box } from "@chakra-ui/react";
import { LuPopcorn } from "react-icons/lu";

export function EmptyState() {
  return (
    <VStack gap={4} py={16} textAlign="center">
      <Box color="lightGrey" opacity={0.6}>
        <LuPopcorn size={120} />
      </Box>
      <Text color="white" fontWeight="semibold" fontSize="xl">
        Don&apos;t know what to search?
      </Text>
      <Text color="tertiary.500" fontSize="sm">
        Here&apos;s an offer you can&apos;t refuse
      </Text>
    </VStack>
  );
}
