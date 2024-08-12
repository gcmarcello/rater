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
import Image from "next/image";
import Button from "./_shared/components/Button";
import useNextStore from "./hooks/useNextStore";
import { useAuthStore } from "./hooks/useAuthStore";

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
    setGenres,
    handleHighlightedMovies,
    highlightedMovie,
    featuredMovies,
    setRatings,
    ratings,
  } = useGlobalStore();

  const latestMedia = React.useRef<HTMLDivElement>(null);
  const ratedMedia = React.useRef<HTMLDivElement>(null);
  const recommendedMedia = React.useRef<HTMLDivElement>(null);
  const celebrities = React.useRef<HTMLDivElement>(null);

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

  const { data: latestReleases } = useFetch<MovieWithGenres[]>(
    "/api/movies?take=8&orderBy={%22releaseDate%22:%22desc%22}"
  );

  const { data: recommendedMovies } = useFetch<MovieWithGenres[]>(
    "/api/movies/recommendations"
  );

  const { data: ratedMovies, mutate } = useFetch<MovieWithGenres[]>(
    ratings.length
      ? `/api/movies?where=${encodeURIComponent(
          JSON.stringify({
            id: { in: ratings.map((rating) => rating.movieId) },
          })
        )}`
      : null
  );

  const { x: xLatest, canX: canXLatest } = useScroll({
    elementRef: latestMedia,
  });
  const { x: xRated, canX: canXRated } = useScroll({
    elementRef: ratedMedia,
  });
  const { x: xRecommended, canX: canXRecommended } = useScroll({
    elementRef: recommendedMedia,
  });

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

      <Section>
        <SectionTitle>
          <Text $variant="white" size={20}>
            Últimos Lançamentos
          </Text>
          <div>
            <CarouselScrollLeftButton
              onClick={() => xLatest(-768)}
              fill={canXLatest(-768) ? "white" : "gray"}
              width={24}
              height={24}
            />
            <CarouselScrollRightButton
              onClick={() => xLatest(768)}
              fill={canXLatest(768) ? "white" : "gray"}
              width={24}
              height={24}
            />
          </div>
        </SectionTitle>
        <Carousel ref={latestMedia}>
          {latestReleases?.map((movie) => (
            <CarouselItem key={movie.id}>
              <MediaCard movie={movie} />
            </CarouselItem>
          ))}
        </Carousel>
      </Section>

      <Section>
        <SectionTitle>
          <Text $variant="white" size={20}>
            Filmes Assistidos
          </Text>
          <div>
            <CarouselScrollLeftButton
              onClick={() => xRated(-768)}
              fill={canXRated(-768) ? "white" : "gray"}
              width={24}
              height={24}
            />
            <CarouselScrollRightButton
              onClick={() => xRated(768)}
              fill={canXRated(768) ? "white" : "gray"}
              width={24}
              height={24}
            />
          </div>
        </SectionTitle>
        {ratedMovies ? (
          <Carousel ref={ratedMedia}>
            {ratedMovies.map((movie) => (
              <CarouselItem key={movie.id}>
                <MediaCard movie={movie} />
              </CarouselItem>
            ))}
          </Carousel>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              flexGrow: 1,
            }}
          >
            <Image
              src={"/clapperboard.svg"}
              alt="clapperboard"
              width={48}
              height={48}
            />
            <Text>Ops, nenhum filme avaliado ainda. </Text>
            <Text $weight={400}>Que tal adicionar um?</Text>
            {!auth?.getSession() && <Button $variant="secondary">Login</Button>}
          </div>
        )}
      </Section>

      <Section>
        <SectionTitle>
          <Text $variant="white" size={20}>
            Filmes Recomendados
          </Text>
          <Text $variant="white" size={20}>
            Filmes Recomendados
          </Text>
          <div>
            <CarouselScrollLeftButton
              onClick={() => xRecommended(-768)}
              fill={canXRecommended(-768) ? "white" : "gray"}
              width={24}
              height={24}
            />
            <CarouselScrollRightButton
              onClick={() => xRecommended(768)}
              fill={canXRecommended(768) ? "white" : "gray"}
              width={24}
              height={24}
            />
          </div>
        </SectionTitle>
        {recommendedMovies ? (
          <Carousel ref={recommendedMedia}>
            {recommendedMovies.map((movie) => (
              <CarouselItem key={movie.id}>
                <MediaCard movie={movie} />
              </CarouselItem>
            ))}
          </Carousel>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              flexGrow: 1,
            }}
          >
            <Image
              src={"/clapperboard.svg"}
              alt="clapperboard"
              width={48}
              height={48}
            />
            <Text>Ops, nenhum filme avaliado ainda. </Text>
            <Text $weight={400}>Que tal adicionar um?</Text>
            {!auth?.getSession() && <Button $variant="secondary">Login</Button>}
          </div>
        )}
      </Section>

      <RatingAlert revalidate={mutate} />
    </>
  );
}
