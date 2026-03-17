import type { Comment } from "@/types/movie";

export const mockComments: Comment[] = [
  {
    id: "mock-1",
    movieId: "default",
    author: "Kim",
    text: "Having read the book a hundred years ago, it took some time to begin to understand what was going on. If there is a criticism that many share, it is the pacing of the first part of the film. It needed something to set the scene for us, to show us who the strong and the weak were. I'm not much for narration (show me, don't tell me), but it may not have been a bad idea. The scenes are magnificent with special effects off the chart. Many desert travel scenes are quite endless. How do you spruce up a desert. I thought the sand worms were a little one dimensional. I know there is another film down the road.",
    rating: 4,
    createdAt: "2021-10-22T00:00:00.000Z",
  },
  {
    id: "mock-2",
    movieId: "default",
    author: "Steve",
    text: "I've never read Frank Herbert's novel or seen any other adaptation of \"Dune\", so I have to take Denis Villeneuve's adaptation as the guide. It's an impressive movie. Not just the visuals, but in the story's complexity. Timothée Chalamet continues to reaffirm himself as one of the greatest actors of his generation.\n\nI'm eager to see part 2, as well as David Lynch's adaptation.",
    rating: 5,
    createdAt: "2021-10-20T00:00:00.000Z",
  },
  {
    id: "mock-3",
    movieId: "default",
    author: "Adam",
    text: "A visually stunning masterpiece that captures the essence of Frank Herbert's legendary novel. The cinematography is breathtaking and Hans Zimmer's score is otherworldly.",
    rating: 5,
    createdAt: "2021-10-18T00:00:00.000Z",
  },
];
