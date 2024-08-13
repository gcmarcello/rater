"use client";

import { Rating } from "@prisma/client";
import React from "react";
import styled from "styled-components";
import { LoadingOverlay } from "../_shared/components/Loading";
import { Hero } from "../_shared/components/MainPage/Hero";
import { HighlightedCelebrities } from "../_shared/components/MainPage/HighlightedCelebrities";
import { LatestReleases } from "../_shared/components/MainPage/LatestReleases";
import MainPageContainer from "../_shared/components/MainPage/MainPageContainer";
import { RatedMovies } from "../_shared/components/MainPage/RatedMovies";
import { RecommendedMovies } from "../_shared/components/MainPage/RecommendedMovies";
import { MediaCard } from "../_shared/components/MediaCard";
import { RatingAlert } from "../_shared/components/Rating/RatingAlert";
import SectionTitle from "../_shared/components/Text/SectionTitle";
import { useAuthStore } from "../_shared/hooks/useAuthStore";
import { useGlobalStore } from "../_shared/hooks/useGlobalStore";
import useNextStore from "../_shared/hooks/useNextStore";
import { useFetch } from "../_shared/libs/swr/fetcher";
import { MovieWithGenres } from "../_shared/types/Movies";
import Text from "../_shared/components/Text";

const AdjacentList = styled.div`
  display: flex;
  min-height: 284px;
  gap: 12px;
  height: 100%;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }

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
  const auth = useNextStore(useAuthStore, (state) => state);
  const {
    handleHighlightedMovies,
    highlightedMovie,
    featuredMovies,
    setRatings,
  } = useGlobalStore();

  const celebrities = React.useRef<HTMLDivElement>(null);

  useFetch<Rating[]>(auth?.getSession() ? "/api/ratings" : null, {
    onSuccess: (data) => setRatings(data),
  });

  const { isLoading: isLoadingMovies } = useFetch<MovieWithGenres[]>(
    "/api/movies?take=4&where={%22highlighted%22:true}&orderBy={%22rating%22:%22desc%22}",
    {
      onSuccess: (data) => handleHighlightedMovies(data),
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (isLoadingMovies) return <LoadingOverlay />;

  return (
    <>
      {highlightedMovie && featuredMovies && (
        <MainPageContainer>
          <Hero key={highlightedMovie?.id} movie={highlightedMovie} />
          <Sidebar>
            <SectionTitle>
              <Text $variant="white" size={20}>
                Destaques Também
              </Text>
            </SectionTitle>
            <AdjacentList>
              {featuredMovies.map((movie) => (
                <MediaCard highlighted={true} key={movie.id} movie={movie} />
              ))}
            </AdjacentList>
          </Sidebar>
        </MainPageContainer>
      )}

      <LatestReleases />
      <RatedMovies />
      <RecommendedMovies />
      <HighlightedCelebrities />

      <RatingAlert />
    </>
  );
}
