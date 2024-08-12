"use client";
import MainContainer from "@/app/(frontend)/components/Container";
import useSWR from "swr";
import { MediaCard } from "./components/MediaCard";
import MainPageContainer from "./components/MainPageContainer";
import { Genre, Rating } from "@prisma/client";
import styled from "styled-components";
import { MovieWithGenres } from "../types/Movies";
import { useGlobalStore } from "./hooks/useGlobalStore";
import { LoadingOverlay } from "./_shared/components/Loading";
import { useFetch } from "../libs/swr/fetcher";
import { RatingAlert } from "./components/Rating/RatingAlert";
import { Hero } from "./components/Hero";
import Text from "./_shared/components/Text";
import SectionTitle from "./_shared/components/Text/SectionTitle";
import dayjs from "dayjs";
import { Section } from "./components/Section";
import { useScroll } from "./hooks/useScroll";
import React from "react";
import Carousel, {
  CarouselItem,
  CarouselScrollLeftButton,
  CarouselScrollRightButton,
} from "./_shared/components/Carousel";

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
  const {
    setGenres,
    handleHighlightedMovies,
    highlightedMovie,
    featuredMovies,
    setRatings,
  } = useGlobalStore();

  const carouselRef = React.useRef<HTMLDivElement>(null);

  useFetch<Genre[]>("/api/genres", {
    onSuccess: (data) => setGenres(data),
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  useFetch<Rating[]>("/api/ratings", {
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

  const { isLoading: isLoadingLatestMovies, data: latestReleases } = useFetch<
    MovieWithGenres[]
  >("/api/movies?take=8&orderBy={%22releaseDate%22:%22desc%22}", {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const { x, y, canX, canY } = useScroll({ elementRef: carouselRef });

  return (
    <MainContainer>
      {isLoadingMovies && <LoadingOverlay />}
      {highlightedMovie && featuredMovies && (
        <MainPageContainer>
          <Hero key={highlightedMovie?.id} movie={highlightedMovie} />
          <Sidebar>
            <SectionTitle>
              <Text variant="white" size={20}>
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
      <Section>
        <SectionTitle>
          <Text variant="white" size={20}>
            Últimos Lançamentos
          </Text>
          <div>
            <CarouselScrollLeftButton
              onClick={() => x(-768)}
              fill={canX(-768) ? "white" : "gray"}
              width={24}
              height={24}
            />
            <CarouselScrollRightButton
              onClick={() => x(768)}
              fill={canX(768) ? "white" : "gray"}
              width={24}
              height={24}
            />
          </div>
        </SectionTitle>
        <Carousel ref={carouselRef}>
          {latestReleases?.map((movie) => (
            <CarouselItem key={movie.id}>
              <MediaCard movie={movie} />
            </CarouselItem>
          ))}
        </Carousel>
      </Section>

      <RatingAlert />
    </MainContainer>
  );
}
