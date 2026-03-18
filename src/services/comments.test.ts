import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { fetchComments } from "./comments";

vi.mock("axios");

const mockedAxios = vi.mocked(axios);

describe("fetchComments", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches comments with postId derived from imdbID", async () => {
    const apiResponse = [
      {
        postId: 1,
        id: 1,
        name: "test comment",
        email: "john.doe@example.com",
        body: "Great movie!",
      },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: apiResponse });

    const result = await fetchComments("tt0000000");

    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/comments",
      { params: { postId: expect.any(Number) } },
    );
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      id: "jph-1",
      author: "john doe",
      text: "Great movie!",
    });
  });

  it("maps email to author name, replacing dots and underscores", async () => {
    const apiResponse = [
      {
        postId: 1,
        id: 5,
        name: "test",
        email: "jane_smith.jr@example.com",
        body: "Nice",
      },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: apiResponse });

    const result = await fetchComments("tt1234567");
    expect(result[0].author).toBe("jane smith jr");
  });

  it("calculates rating from id (1-5 range)", async () => {
    const apiResponse = Array.from({ length: 5 }, (_, i) => ({
      postId: 1,
      id: i + 1,
      name: "test",
      email: `user${i}@test.com`,
      body: "Comment",
    }));

    mockedAxios.get.mockResolvedValueOnce({ data: apiResponse });

    const result = await fetchComments("tt0001234");
    const ratings = result.map((c) => c.rating);
    expect(ratings).toEqual([2, 3, 4, 5, 1]);
    ratings.forEach((r) => {
      expect(r).toBeGreaterThanOrEqual(1);
      expect(r).toBeLessThanOrEqual(5);
    });
  });

  it("replaces newlines in comment body", async () => {
    const apiResponse = [
      {
        postId: 1,
        id: 1,
        name: "test",
        email: "user@test.com",
        body: "Line 1\nLine 2\nLine 3",
      },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: apiResponse });

    const result = await fetchComments("tt0000001");
    expect(result[0].text).toBe("Line 1 Line 2 Line 3");
  });
});
