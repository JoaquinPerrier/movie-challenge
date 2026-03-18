import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CommentList } from "./CommentList";
import { TestWrapper } from "@/test/wrapper";
import type { Comment } from "@/types/movie";

const comments: Comment[] = [
  {
    id: "1",
    movieId: "tt123",
    author: "Alice",
    text: "Loved this movie!",
    rating: 5,
    createdAt: "2024-03-15T10:00:00.000Z",
  },
  {
    id: "2",
    movieId: "tt123",
    author: "Bob",
    text: "Not bad at all",
    rating: 3,
    createdAt: "2024-03-14T10:00:00.000Z",
  },
];

describe("CommentList", () => {
  it("shows empty state when no comments", () => {
    render(
      <TestWrapper>
        <CommentList comments={[]} />
      </TestWrapper>,
    );
    expect(
      screen.getByText("No comments yet. Be the first to leave one!"),
    ).toBeInTheDocument();
  });

  it("renders all comments", () => {
    render(
      <TestWrapper>
        <CommentList comments={comments} />
      </TestWrapper>,
    );
    expect(screen.getByText("Loved this movie!")).toBeInTheDocument();
    expect(screen.getByText("Not bad at all")).toBeInTheDocument();
  });

  it("displays author name and formatted date", () => {
    render(
      <TestWrapper>
        <CommentList comments={[comments[0]]} />
      </TestWrapper>,
    );
    const authorDateText = screen.getByText(/Alice/);
    expect(authorDateText).toBeInTheDocument();
    expect(authorDateText.textContent).toContain("March");
    expect(authorDateText.textContent).toContain("2024");
  });
});
