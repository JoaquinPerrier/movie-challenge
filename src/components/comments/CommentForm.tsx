import { useState, type FormEvent } from "react";
import { Box, Button, Input, Textarea, VStack, Text } from "@chakra-ui/react";
import { StarRating } from "@/components/rating/StarRating";

interface CommentFormProps {
  onSubmit: (author: string, text: string, rating: number) => void;
}

export function CommentForm({ onSubmit }: CommentFormProps) {
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !text.trim() || rating === 0) return;

    onSubmit(author.trim(), text.trim(), rating);
    setAuthor("");
    setText("");
    setRating(0);
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <VStack gap={4} align="stretch">
        <Text fontWeight="semibold" fontSize="lg" color="white">
          Leave a Review
        </Text>

        <Box>
          <Text fontSize="sm" color="lightGrey" mb={1}>
            Your Rating
          </Text>
          <StarRating value={rating} onChange={setRating} />
        </Box>

        <Input
          placeholder="Your name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          bg="grey"
          border="1px solid"
          borderColor="midGrey"
          color="white"
          _placeholder={{ color: "lightGrey" }}
        />

        <Textarea
          placeholder="Write your review..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          bg="grey"
          border="1px solid"
          borderColor="midGrey"
          color="white"
          _placeholder={{ color: "lightGrey" }}
          rows={4}
        />

        <Button
          type="submit"
          colorPalette="primary"
          variant="solid"
          alignSelf="flex-end"
          disabled={!author.trim() || !text.trim() || rating === 0}
        >
          Submit Review
        </Button>
      </VStack>
    </Box>
  );
}
