import { useState, useCallback } from "react";
import {
  getComments,
  addComment as addCommentToStorage,
} from "@/services/storage";
import type { Comment } from "@/types/movie";

export function useComments(movieId: string) {
  const [comments, setComments] = useState<Comment[]>(() =>
    getComments(movieId),
  );

  const addComment = useCallback(
    (author: string, text: string, rating: number) => {
      const newComment = addCommentToStorage(movieId, author, text, rating);
      setComments((prev) => [newComment, ...prev]);
    },
    [movieId],
  );

  return { comments, addComment };
}
