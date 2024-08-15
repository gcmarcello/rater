import { CastedRole, Movie, Show } from "@prisma/client";
import { MovieWithGenres } from "./Movies";
import { ShowWithGenres } from "./Shows";

export type RoleWithMedia = CastedRole & { movie?: Movie; show?: Show };

export type Media = MovieWithGenres | ShowWithGenres;

export type RecommendedMedia = {
  movies: MovieWithGenres[];
  shows: ShowWithGenres[];
};
