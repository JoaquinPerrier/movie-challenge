import axios from "axios";
import type { MovieDetail, SearchResponse } from "@/types/movie";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY || "DEMO_KEY";
const BASE_URL = "https://www.omdbapi.com";

const client = axios.create({
  baseURL: BASE_URL,
  params: { apikey: API_KEY },
});

export async function searchMovies(
  query: string,
  page = 1,
): Promise<SearchResponse> {
  const { data } = await client.get<SearchResponse>("", {
    params: { s: query, page },
  });
  return data;
}

export async function getMovieById(id: string): Promise<MovieDetail> {
  const { data } = await client.get<MovieDetail>("", {
    params: { i: id, plot: "full" },
  });
  return data;
}
