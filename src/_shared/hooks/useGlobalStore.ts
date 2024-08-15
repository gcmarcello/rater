import { Genre, Rating } from "@prisma/client";
import { Session } from "inspector";
import { create } from "zustand";
import { MovieWithGenres } from "../types/Movies";

export type GlobalStoreProps = {
  genres: Genre[];
  setGenres: (genres: Genre[]) => void;
  featuredMovies: MovieWithGenres[];
  highlightedMovie: MovieWithGenres | null;
  handleHighlightedMovies: (movies: MovieWithGenres[]) => void;
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (value: boolean) => void;
  isAccountRemovalModalOpen: boolean;
  setIsAccountRemovalModalOpen: (value: boolean) => void;
  toBeRatedMovie: MovieWithGenres | null;
  setToBeRatedMovie: (movie?: MovieWithGenres) => void;
  toBeRatedShow: MovieWithGenres | null;
  setToBeRatedShow: (show?: MovieWithGenres) => void;
  clearToBeRated: () => void;
  ratings: Rating[];
  setRatings: (ratings: Rating[]) => void;
  ratedMovies: MovieWithGenres[];
  setRatedMovies: (movies: MovieWithGenres[]) => void;
};

export const useGlobalStore = create<GlobalStoreProps>((set) => ({
  toBeRatedMovie: null,
  setToBeRatedMovie: (movie) => set({ toBeRatedMovie: movie }),
  toBeRatedShow: null,
  setToBeRatedShow: (show) => set({ toBeRatedShow: show }),
  clearToBeRated: () => set({ toBeRatedMovie: null, toBeRatedShow: null }),
  genres: [],
  setGenres: (genres) => set({ genres }),
  highlightedMovie: null,
  featuredMovies: [],
  handleHighlightedMovies: (movies) => {
    set({
      highlightedMovie: movies[0],
      featuredMovies: movies.splice(1, movies.length),
    });
  },
  isProfileModalOpen: false,
  setIsProfileModalOpen: (value) => set({ isProfileModalOpen: value }),
  isAccountRemovalModalOpen: false,
  setIsAccountRemovalModalOpen: (value) =>
    set({ isAccountRemovalModalOpen: value }),
  ratings: [],
  setRatings: (ratings) => set({ ratings }),
  ratedMovies: [],
  setRatedMovies: (movies) => set({ ratedMovies: movies }),
}));
