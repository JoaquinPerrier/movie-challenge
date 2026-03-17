import { Box, Text, VStack } from "@chakra-ui/react";
import type { Comment } from "@/types/movie";

interface CommentListProps {
  comments: Comment[];
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <Text color="lightGrey" textAlign="center" py={8}>
        No comments yet. Be the first to leave one!
      </Text>
    );
  }

  return (
    <VStack gap={6} align="stretch">
      {comments.map((comment) => (
        <Box key={comment.id}>
          <Text color="tertiary.500" fontSize="sm" fontWeight="medium" mb={2}>
            {comment.author} – {formatDate(comment.createdAt)}
          </Text>
          <Text color="white" fontSize="sm" lineHeight="tall" whiteSpace="pre-line">
            {comment.text}
          </Text>
        </Box>
      ))}
    </VStack>
  );
}
