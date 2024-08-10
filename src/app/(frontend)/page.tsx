"use client";
import MainContainer from "@/app/(frontend)/components/Container";
import useSWR from "swr";
import { HeroMediaCard, MediaCard } from "./components/MediaCard";
import Hero from "./components/Hero";
import MainPageContainer from "./components/MainPageContainer";
import { Genre, Movie } from "@prisma/client";
import styled from "styled-components";
import { fetcher } from "../libs/swr/fetcher";
import { MovieWithGenres } from "../types/Movies";
import { useGlobalStore } from "./hooks/useGlobalStore";
import { useAuthStore } from "./hooks/useAuthStore";

const AdjacentList = styled.div`
  display: flex;
  min-height: 284px;
  gap: 12px;

  @media screen and (min-width: 1024px) {
    flex-direction: column;
    grid-column: span 2 / span 2;
  }
`;

export default function Home() {
  const {
    genres,
    setGenres,
    handleHighlightedMovies,
    highlightedMovie,
    featuredMovies,
  } = useGlobalStore();

  useSWR<Genre[]>(genres ? "/api/genres" : null, fetcher, {
    onSuccess: (data) => setGenres(data),
  });

  const { isLoading: isLoadingMovies } = useSWR<MovieWithGenres[]>(
    featuredMovies
      ? "/api/movies?take=4&where={%22highlighted%22:true}&orderBy={%22rating%22:%22desc%22}"
      : null,
    fetcher,
    {
      onSuccess: (data) => handleHighlightedMovies(data),
    }
  );

  return (
    <MainContainer>
      {!isLoadingMovies ? (
        highlightedMovie &&
        featuredMovies && (
          <MainPageContainer>
            <Hero>
              <HeroMediaCard
                key={highlightedMovie?.id}
                movie={highlightedMovie}
              />
            </Hero>
            <AdjacentList>
              {featuredMovies.map((movie) => (
                <MediaCard key={movie.id} movie={movie} />
              ))}
            </AdjacentList>
          </MainPageContainer>
        )
      ) : (
        <>Carregando...</>
      )}
    </MainContainer>
  );
}
