import { MovieWithGenres } from "@/app/types/Movies";
import { Genre } from "@prisma/client";
import { Session } from "inspector";
import { create } from "zustand";

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
};

export const useGlobalStore = create<GlobalStoreProps>((set) => ({
  toBeRatedMovie: null,
  setToBeRatedMovie: (movie) => set({ toBeRatedMovie: movie }),
  toBeRatedShow: null,
  setToBeRatedShow: (show) => set({ toBeRatedShow: show }),
  clearToBeRated: () => set({ toBeRatedMovie: null, toBeRatedShow: null }),
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
  isProfileModalOpen: false,
  setIsProfileModalOpen: (value) => set({ isProfileModalOpen: value }),
  isAccountRemovalModalOpen: false,
  setIsAccountRemovalModalOpen: (value) =>
    set({ isAccountRemovalModalOpen: value }),
}));
