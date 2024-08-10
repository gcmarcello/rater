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
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (isOpen: boolean) => void;
};

export const useGlobalStore = create<GlobalStoreProps>((set) => ({
  isAuthModalOpen: false,
  setIsAuthModalOpen: (isOpen: boolean) => set({ isAuthModalOpen: isOpen }),
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
