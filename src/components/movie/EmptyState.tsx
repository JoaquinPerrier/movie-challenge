import { Flex, Text, Image } from "@chakra-ui/react";

export function EmptyState() {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      textAlign="center"
      flex={1}
      py={8}
    >
      <Image
        src="/LandingImg.png"
        alt="Landing illustration"
        w={{ base: "240px", md: "340px", lg: "420px" }}
        mx="auto"
        mb={{ base: 6, md: 10 }}
        mt={{ base: 38, md: 0 }}
      />
      <Text color="white" fontWeight="semibold" fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}>
        Don&apos;t know what to search?
      </Text>
      <Text color="tertiary.500" fontSize={{ base: "sm", md: "md", lg: "lg" }} fontWeight="medium" mt={1}>
        Here&apos;s an offer you can&apos;t refuse
      </Text>
    </Flex>
  );
}
