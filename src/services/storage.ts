import type { Comment } from "@/types/movie";

const FAVORITES_KEY = "moviebox_favorites";
const COMMENTS_KEY = "moviebox_comments";

export function getFavorites(): string[] {
  const raw = localStorage.getItem(FAVORITES_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function toggleFavorite(movieId: string): string[] {
  const favorites = getFavorites();
  const index = favorites.indexOf(movieId);

  if (index >= 0) {
    favorites.splice(index, 1);
  } else {
    favorites.push(movieId);
  }

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  return favorites;
}

export function isFavorite(movieId: string): boolean {
  return getFavorites().includes(movieId);
}

export function getComments(movieId: string): Comment[] {
  const raw = localStorage.getItem(COMMENTS_KEY);
  const all: Comment[] = raw ? JSON.parse(raw) : [];
  return all
    .filter((c) => c.movieId === movieId)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
}

export function addComment(
  movieId: string,
  author: string,
  text: string,
  rating: number,
): Comment {
  const raw = localStorage.getItem(COMMENTS_KEY);
  const all: Comment[] = raw ? JSON.parse(raw) : [];

  const comment: Comment = {
    id: crypto.randomUUID(),
    movieId,
    author,
    text,
    rating,
    createdAt: new Date().toISOString(),
  };

  all.push(comment);
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(all));
  return comment;
}
