import { HStack, Icon } from "@chakra-ui/react";
import { LuStar } from "react-icons/lu";

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  max?: number;
  size?: string;
  readOnly?: boolean;
}

export function StarRating({
  value,
  onChange,
  max = 5,
  size = "20px",
  readOnly = false,
}: StarRatingProps) {
  return (
    <HStack gap={1}>
      {Array.from({ length: max }, (_, i) => {
        const starValue = i + 1;
        const filled = starValue <= value;

        return (
          <Icon
            key={i}
            as={LuStar}
            boxSize={size}
            color={filled ? "brand.500" : "gray.500"}
            fill={filled ? "var(--chakra-colors-brand-500)" : "none"}
            cursor={readOnly ? "default" : "pointer"}
            onClick={() => !readOnly && onChange?.(starValue)}
            transition="color 0.2s, fill 0.2s"
            _hover={!readOnly ? { color: "brand.400" } : undefined}
          />
        );
      })}
    </HStack>
  );
}
