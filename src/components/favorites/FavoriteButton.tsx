import { IconButton } from "@chakra-ui/react";
import { LuHeart } from "react-icons/lu";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
  size?: "sm" | "md" | "lg";
}

export function FavoriteButton({
  isFavorite,
  onToggle,
  size = "md",
}: FavoriteButtonProps) {
  return (
    <IconButton
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle();
      }}
      variant="ghost"
      size={size}
      color={isFavorite ? "secondary.500" : "lightGrey"}
      _hover={{ color: isFavorite ? "secondary.400" : "secondary.300" }}
    >
      <LuHeart
        fill={isFavorite ? "currentColor" : "none"}
        style={{ transition: "fill 0.2s" }}
      />
    </IconButton>
  );
}
