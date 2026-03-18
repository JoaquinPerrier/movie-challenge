import axios from "axios";
import type { Comment } from "@/types/movie";

interface JsonPlaceholderComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

function imdbIdToPostId(imdbId: string): number {
  const numericPart = imdbId.replace(/\D/g, "");
  const num = parseInt(numericPart, 10) || 1;
  return (num % 100) + 1;
}

function toLocalComment(
  raw: JsonPlaceholderComment,
  movieId: string,
): Comment {
  const namePart = raw.email.split("@")[0].replace(/[._]/g, " ");

  const baseDate = new Date("2021-11-01");
  baseDate.setDate(baseDate.getDate() - raw.id);

  return {
    id: `jph-${raw.id}`,
    movieId,
    author: namePart,
    text: raw.body.replace(/\n/g, " "),
    rating: (raw.id % 5) + 1,
    createdAt: baseDate.toISOString(),
  };
}

export async function fetchComments(movieId: string): Promise<Comment[]> {
  const postId = imdbIdToPostId(movieId);
  const { data } = await axios.get<JsonPlaceholderComment[]>(
    `https://jsonplaceholder.typicode.com/comments`,
    { params: { postId } },
  );

  return data.map((c) => toLocalComment(c, movieId));
}
