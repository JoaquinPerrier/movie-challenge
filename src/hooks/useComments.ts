import { useState, useCallback } from "react";
import {
  getComments,
  addComment as addCommentToStorage,
} from "@/services/storage";
import { mockComments } from "@/mocks/comments";
import type { Comment } from "@/types/movie";

export function useComments(movieId: string) {
  const [comments, setComments] = useState<Comment[]>(() => {
    const stored = getComments(movieId);
    if (stored.length > 0) return stored;
    return mockComments.map((c) => ({ ...c, movieId }));
  });

  const addComment = useCallback(
    (author: string, text: string, rating: number) => {
      const newComment = addCommentToStorage(movieId, author, text, rating);
      setComments((prev) => [newComment, ...prev]);
    },
    [movieId],
  );

  return { comments, addComment };
}
