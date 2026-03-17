import { Box, Text, VStack, HStack, Separator } from "@chakra-ui/react";
import { StarRating } from "@/components/rating/StarRating";
import type { Comment } from "@/types/movie";

interface CommentListProps {
  comments: Comment[];
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <Text color="gray.500" textAlign="center" py={8}>
        No reviews yet. Be the first to leave one!
      </Text>
    );
  }

  return (
    <VStack gap={0} align="stretch">
      {comments.map((comment, index) => (
        <Box key={comment.id}>
          {index > 0 && <Separator borderColor="gray.700" my={4} />}
          <VStack gap={2} align="stretch">
            <HStack justify="space-between">
              <HStack gap={3}>
                <Text fontWeight="bold" color="white">
                  {comment.author}
                </Text>
                <StarRating value={comment.rating} readOnly size="14px" />
              </HStack>
              <Text fontSize="xs" color="gray.500">
                {formatDate(comment.createdAt)}
              </Text>
            </HStack>
            <Text color="gray.300" fontSize="sm">
              {comment.text}
            </Text>
          </VStack>
        </Box>
      ))}
    </VStack>
  );
}
