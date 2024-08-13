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
    setRatedMovies,
    ratedMovies,
  } = useGlobalStore();

  const { setIsAuthModalOpen } = useAuthModalStore();

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

  const { data: recommendedMovies } = useFetch<MovieWithGenres[]>(
    auth?.getSession() ? "/api/movies/recommendations" : null
  );

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

      <LatestReleases />
      <RatedMovies />

      <Section>
        <SectionTitle>
          <div style={{ display: "flex", gap: "12px", alignItems: "baseline" }}>
            <Text $variant="white" size={24}>
              Filmes Recomendados
            </Text>
            {!auth?.getSession() && (
              <Text
                onClick={() => setIsAuthModalOpen(true)}
                $variant="white"
                $weight={400}
                size={16}
              >
                Faça <span style={{ fontWeight: 600 }}>login</span> para
                recomendações personalizadas!
              </Text>
            )}
          </div>
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
              gap: "12px",
              flexGrow: 1,
            }}
          >
            <Image
              src={"/clapperboard.svg"}
              alt="clapperboard"
              width={48}
              height={48}
            />
            <Text>Ops, nenhum filme recomendado para você. </Text>
            <Text $weight={400}>Aguarde, mais conteúdo aqui em breve!</Text>
          </div>
        )}
      </Section>

      <RatingAlert />
    </>
  );
}
