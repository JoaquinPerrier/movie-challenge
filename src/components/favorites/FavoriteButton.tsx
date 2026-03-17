import { Flex } from "@chakra-ui/react";
import { LuHeart } from "react-icons/lu";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { box: "32px", icon: 16 },
  md: { box: "38px", icon: 20 },
  lg: { box: "44px", icon: 24 },
};

export function FavoriteButton({
  isFavorite,
  onToggle,
  size = "md",
}: FavoriteButtonProps) {
  const { box, icon } = sizeMap[size];

  return (
    <Flex
      as="button"
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle();
      }}
      align="center"
      justify="center"
      w={box}
      h={box}
      borderRadius="full"
      bg="rgba(255, 255, 255, 0.5)"
      color={isFavorite ? "white" : "rgba(255, 255, 255, 0.7)"}
      _hover={{ bg: "rgba(255, 255, 255, 0.65)" }}
      transition="all 0.2s"
      cursor="pointer"
      border="none"
    >
      <LuHeart
        size={icon}
        fill={isFavorite ? "currentColor" : "none"}
        style={{ transition: "fill 0.2s" }}
      />
    </Flex>
  );
}
