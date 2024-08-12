"use client";
import MainContainer from "@/app/(frontend)/components/Container";
import useSWR from "swr";
import { MediaCard } from "./components/MediaCard";
import MainPageContainer from "./components/MainPageContainer";
import { Genre, Movie } from "@prisma/client";
import styled from "styled-components";
import { MovieWithGenres } from "../types/Movies";
import { useGlobalStore } from "./hooks/useGlobalStore";
import { LoadingOverlay } from "./_shared/components/Loading";
import { useFetch } from "../libs/swr/fetcher";
import { useRef, useState } from "react";
import { RatingAlert } from "./components/Rating/RatingAlert";
import { Hero } from "./components/Hero";
import Text from "./_shared/components/Text";
import SectionTitle from "./_shared/components/Text/SectionTitle";

const AdjacentList = styled.div`
  display: flex;
  min-height: 284px;
  gap: 6px;
  height: 100%;

  @media screen and (min-width: 1024px) {
    flex-direction: column;
    grid-column: span 2 / span 2;
    gap: 12px;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media screen and (min-width: 1024px) {
    display: flex;
    grid-column: span 2 / span 2;
    gap: 12px;
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
  const ref = useRef<HTMLInputElement>(null);

  useFetch<Genre[]>(genres ? "/api/genres" : null, {
    onSuccess: (data) => setGenres(data),
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const { isLoading: isLoadingMovies } = useFetch<MovieWithGenres[]>(
    featuredMovies
      ? "/api/movies?take=4&where={%22highlighted%22:true}&orderBy={%22rating%22:%22desc%22}"
      : null,
    {
      onSuccess: (data) => handleHighlightedMovies(data),
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return (
    <MainContainer>
      {isLoadingMovies && <LoadingOverlay />}
      {highlightedMovie && featuredMovies && (
        <MainPageContainer>
          <Hero key={highlightedMovie?.id} movie={highlightedMovie} />
          <Sidebar>
            <SectionTitle size={20} variant="white">
              Destaques Também
            </SectionTitle>
            <AdjacentList>
              {featuredMovies.map((movie) => (
                <MediaCard key={movie.id} movie={movie} />
              ))}
            </AdjacentList>
          </Sidebar>
        </MainPageContainer>
      )}
      <RatingAlert />
    </MainContainer>
  );
}
