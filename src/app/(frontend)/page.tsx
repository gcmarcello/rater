"use client";
import MainContainer from "@/app/(frontend)/components/Container";
import useSWR from "swr";
import { MediaCard } from "./components/MediaCard";
import MainPageContainer from "./components/MainPage/MainPageContainer";
import { Genre, Rating } from "@prisma/client";
import styled from "styled-components";
import { MovieWithGenres } from "../types/Movies";
import { useGlobalStore } from "./hooks/useGlobalStore";
import { LoadingOverlay } from "./_shared/components/Loading";
import { useFetch } from "../libs/swr/fetcher";
import { RatingAlert } from "./components/Rating/RatingAlert";
import { Hero } from "./components/MainPage/Hero";
import Text from "./_shared/components/Text";
import SectionTitle from "./_shared/components/Text/SectionTitle";
import dayjs from "dayjs";
import { Section } from "./components/MainPage/Section";
import { useScroll } from "./hooks/useScroll";
import React from "react";
import Carousel, {
  CarouselItem,
  CarouselScrollLeftButton,
  CarouselScrollRightButton,
} from "./_shared/components/Carousel";
import Image from "next/image";
import Button from "./_shared/components/Button";
import useNextStore from "./hooks/useNextStore";
import { useAuthStore } from "./hooks/useAuthStore";
import { useAuthModalStore } from "./hooks/useAuthModalStore";
import { LatestReleases } from "./components/MainPage/LatestReleases";
import { RatedMovies } from "./components/MainPage/RatedMovies";
import { RecommendedMovies } from "./components/MainPage/RecommendedMovies";
import { HighlightedCelebrities } from "./components/MainPage/HighlightedCelebrities";

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
