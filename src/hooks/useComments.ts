import { useState, useCallback, useEffect } from "react";
import {
  getComments,
  addComment as addCommentToStorage,
} from "@/services/storage";
import { fetchComments } from "@/services/comments";
import type { Comment } from "@/types/movie";

export function useComments(movieId: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!movieId) return;

    const stored = getComments(movieId);

    const sortByDate = (a: Comment, b: Comment) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

    setLoading(true);
    fetchComments(movieId)
      .then((apiComments) => {
        setComments([...stored, ...apiComments].sort(sortByDate));
      })
      .catch(() => {
        setComments(stored.sort(sortByDate));
      })
      .finally(() => setLoading(false));
  }, [movieId]);

  const addComment = useCallback(
    (author: string, text: string, rating: number) => {
      const newComment = addCommentToStorage(movieId, author, text, rating);
      setComments((prev) => [newComment, ...prev]);
    },
    [movieId],
  );

  return { comments, addComment, loading };
}
