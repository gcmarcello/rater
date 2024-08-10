import { MovieWithGenres } from "@/types/Movies";
import { Genre } from "@prisma/client";
import { Session } from "inspector";
import { create } from "zustand";

export type GlobalStoreProps = {
  genres: Genre[];
  setGenres: (genres: Genre[]) => void;
  featuredMovies: MovieWithGenres[];
  highlightedMovie: MovieWithGenres | null;
  handleHighlightedMovies: (movies: MovieWithGenres[]) => void;
};

export const useGlobalStore = create<GlobalStoreProps>((set) => ({
  genres: [],
  setGenres: () => {},
  highlightedMovie: null,
  featuredMovies: [],
  handleHighlightedMovies: (movies) => {
    set({
      highlightedMovie: movies[0],
      featuredMovies: movies.splice(1, movies.length),
    });
  },
}));
