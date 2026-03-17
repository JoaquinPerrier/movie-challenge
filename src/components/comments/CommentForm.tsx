import { useState, type FormEvent } from "react";
import { Box, Button, Textarea, HStack, Text } from "@chakra-ui/react";
import { StarRating } from "@/components/rating/StarRating";

interface CommentFormProps {
  onSubmit: (author: string, text: string, rating: number) => void;
}

export function CommentForm({ onSubmit }: CommentFormProps) {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim() || rating === 0) return;

    onSubmit("Anonymous", text.trim(), rating);
    setText("");
    setRating(0);
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <HStack gap={3} mb={4}>
        <Text color="tertiary.500" fontSize="sm" fontWeight="medium">
          Rate:
        </Text>
        <StarRating value={rating} onChange={setRating} />
      </HStack>

      <Textarea
        placeholder="Add your comments here"
        value={text}
        onChange={(e) => setText(e.target.value)}
        bg="white"
        color="gray.900"
        border="none"
        _placeholder={{ color: "gray.400" }}
        rows={4}
        borderRadius="md"
        mb={3}
      />

      <Box textAlign="right">
        <Button
          type="submit"
          bg="tertiary.500"
          color="white"
          size="sm"
          px={6}
          _hover={{ bg: "tertiary.600" }}
          disabled={!text.trim() || rating === 0}
        >
          Post
        </Button>
      </Box>
    </Box>
  );
}
