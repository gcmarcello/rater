"use client";
import MainContainer from "@/app/(frontend)/components/Container";
import Button from "@/app/(frontend)/components/Button";
import Text from "./(frontend)/components/Text";
import useSWR from "swr";
import { map } from "zod";
import { HeroMediaCard, MediaCard } from "./(frontend)/components/MediaCard";
import Hero from "./(frontend)/components/Hero";
import MainPageContainer from "./(frontend)/components/MainPageContainer";
import { Movie } from "@prisma/client";
import { useMemo } from "react";
import styled from "styled-components";

const fetcher = (url: string) =>
  fetch(url)
    .then((r) => r.json())
    .catch((e) => console.error(e));

const AdjacentList = styled.div`
  display: flex;
  min-height: 284px;
  gap: 12px;

  @media screen and (min-width: 1024px) {
    flex-direction: column;
  }
`;

export default function Home() {
  const { data: movies, error: movieError } = useSWR<Movie[]>(
    "/api/movies",
    fetcher
  );
  const { data: genres, error: genreError } = useSWR<Movie[]>(
    "/api/genres",
    fetcher
  );

  const movieList = useMemo(() => {
    return movies?.splice(1, 3);
  }, [movies]);

  return (
    <MainContainer>
      <MainPageContainer>
        <Hero>
          {movies ? (
            <HeroMediaCard key={movies[0]?.id} movie={movies[0]} />
          ) : (
            "Loading..."
          )}
        </Hero>
        <AdjacentList>
          {movieList?.map((movie) => (
            <HeroMediaCard key={movie.id} movie={movie} />
          ))}
        </AdjacentList>
      </MainPageContainer>
    </MainContainer>
  );
}
