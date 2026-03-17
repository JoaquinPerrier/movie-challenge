import type { MovieSearchResult, MovieDetail } from "@/types/movie";

export const mockSearchResults: MovieSearchResult[] = [
  {
    Title: "The Shawshank Redemption",
    Year: "1994",
    imdbID: "tt0111161",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMDAyY2FhYjctNDc5OS00MDNlLThiMGUtY2UxYWVkNGY2ZjljXkEyXkFqcGc@._V1_SX300.jpg",
  },
  {
    Title: "The Godfather",
    Year: "1972",
    imdbID: "tt0068646",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYTJkNGQyZDgtZDQ0NC00MDM0LWEzZWQtYzUzZDEwMDljZWNjXkEyXkFqcGc@._V1_SX300.jpg",
  },
  {
    Title: "The Dark Knight",
    Year: "2008",
    imdbID: "tt0468569",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
  },
  {
    Title: "Pulp Fiction",
    Year: "1994",
    imdbID: "tt0110912",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYTViYTE3ZGQtNDBlMC00ZTAyLTkyODMtZGRiZDg0MjA2YThkXkEyXkFqcGc@._V1_SX300.jpg",
  },
  {
    Title: "Fight Club",
    Year: "1999",
    imdbID: "tt0137523",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BOTgyOGQ1NDItNGU3Ny00MjU3LTg2YWEtNmEyYjBiMjI1Y2M5XkEyXkFqcGc@._V1_SX300.jpg",
  },
  {
    Title: "Inception",
    Year: "2010",
    imdbID: "tt1375666",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    Title: "Interstellar",
    Year: "2014",
    imdbID: "tt0816692",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_SX300.jpg",
  },
  {
    Title: "The Matrix",
    Year: "1999",
    imdbID: "tt0133093",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BN2NmN2VhMTQtMDNiOS00NDlhLTliMjgtODE2ZTY0ODQyNDFhXkEyXkFqcGc@._V1_SX300.jpg",
  },
];

export const mockMovieDetail: MovieDetail = {
  Title: "The Shawshank Redemption",
  Year: "1994",
  Rated: "R",
  Released: "14 Oct 1994",
  Runtime: "142 min",
  Genre: "Drama",
  Director: "Frank Darabont",
  Writer: "Stephen King, Frank Darabont",
  Actors: "Tim Robbins, Morgan Freeman, Bob Gunton",
  Plot: "Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.",
  Language: "English",
  Country: "United States",
  Awards: "Nominated for 7 Oscars. 21 wins & 43 nominations total",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BMDAyY2FhYjctNDc5OS00MDNlLThiMGUtY2UxYWVkNGY2ZjljXkEyXkFqcGc@._V1_SX300.jpg",
  Ratings: [
    { Source: "Internet Movie Database", Value: "9.3/10" },
    { Source: "Rotten Tomatoes", Value: "91%" },
    { Source: "Metacritic", Value: "82/100" },
  ],
  Metascore: "82",
  imdbRating: "9.3",
  imdbVotes: "2,900,000",
  imdbID: "tt0111161",
  Type: "movie",
  DVD: "N/A",
  BoxOffice: "$28,767,189",
  Production: "N/A",
  Website: "N/A",
  Response: "True",
};
