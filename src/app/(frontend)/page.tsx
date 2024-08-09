"use client";
import MainContainer from "@/app/(frontend)/components/Container";
import Button from "@/app/(frontend)/components/Button";
import Text from "./_shared/components/Text";
import useSWR from "swr";
import { map } from "zod";
import { HeroMediaCard, MediaCard } from "./components/MediaCard";
import Hero from "./components/Hero";
import MainPageContainer from "./components/MainPageContainer";
import { Genre, Movie } from "@prisma/client";
import { useMemo } from "react";
import styled from "styled-components";
import { useGlobalStore } from "@/app/libs/zustand/useGlobalStore";
import { fetcher } from "../libs/swr/fetcher";
import { MovieWithGenres } from "../types/Movies";

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
    setGenres,
    handleHighlightedMovies,
    highlightedMovie,
    featuredMovies,
  } = useGlobalStore();
  useSWR<Genre[]>("/api/genres", fetcher, {
    onSuccess: (data) => setGenres(data),
  });
  const { isLoading: isLoadingMovies } = useSWR<MovieWithGenres[]>(
    "/api/movies?take=4",
    fetcher,
    {
      onSuccess: (data) => handleHighlightedMovies(data),
    }
  );

  return (
    <MainContainer>
      {!isLoadingMovies ? (
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
      ) : (
        <>Carregando...</>
      )}
    </MainContainer>
  );
}
