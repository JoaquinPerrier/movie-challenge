import { VStack, Text, Image } from "@chakra-ui/react";
import landingImg from "/LandingImg.png";

export function EmptyState() {
  return (
    <VStack textAlign="center">
      <Image src={landingImg} alt="" w="420px" mx="auto" mt={25} mb={12} pt={25} />
      <Text color="white" fontWeight="semibold" fontSize="3xl">
        Don&apos;t know what to search?
      </Text>
      <Text color="midGrey" fontSize="lg" fontWeight="semibold">
        Here&apos;s an offer you can&apos;t refuse
      </Text>
    </VStack>
  );
}
