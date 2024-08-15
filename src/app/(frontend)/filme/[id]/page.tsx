"use client";
import { Loading, LoadingOverlay } from "@/_shared/components/Loading";
import { Section } from "@/_shared/components/MainPage/Section";
import { useFetch } from "@/_shared/libs/swr/fetcher";
import { CastWithCelebrity } from "@/_shared/types/Celebrities";
import { MovieWithGenres } from "@/_shared/types/Movies";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import MovieCelebCarousel from "./components/MovieCelebCarousel";
import SimilarMediaCarousel from "./components/SimilarMediaCarousel";
import MovieInfoSection from "./components/MovieInfoSection";
import Indicator from "@/_shared/components/Indicator";
import Link from "next/link";
import { PlayIcon } from "@heroicons/react/24/solid";
import { TrailerButton } from "@/_shared/components/TrailerButton";
import FlexContainer from "@/_shared/components/FlexContainer";
import GenrePill from "@/_shared/components/GenrePill";

type MediaHeroProps = {
  $backgroundImage?: string;
};

const StyledMediaHero = styled.div<MediaHeroProps>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 24px;
  width: 100%;
  padding: 16px;
  background: ${(props) =>
    props.$backgroundImage ? `url(${props.$backgroundImage})` : "none"};
  background-size: cover;
  background-position: center;
  border-radius: 24px;
  height: 30dvh;
  flex: none;
  order: 0;
  flex-grow: 0;

  @media screen and (min-width: 1024px) {
    padding: 48px;
    height: 40dvh;
  }
`;

const StyledPillSection = styled(FlexContainer)`
  margin-top: 12px;
  gap: 12px;
  overflow-x: scroll;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (min-width: 1024px) {
    overflow: hidden;
  }
`;

export default function MoviePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data, isLoading } = useFetch<MovieWithGenres>(
    `/api/movies/${params.id}`,
    {
      onSuccess: (data) => {
        !data && router.push("/404");
      },
    }
  );
  const { data: castData, isLoading: castIsLoading } = useFetch<
    CastWithCelebrity[]
  >(data ? `/api/cast/movie/${data.id}` : null);

  if (isLoading) {
    return <LoadingOverlay />;
  }
  return (
    <>
      <StyledMediaHero $backgroundImage={data?.options?.image}>
        {data?.options?.trailer && (
          <TrailerButton trailerUrl={data.options.trailer} />
        )}
      </StyledMediaHero>
      <StyledPillSection>
        {data?.genres.map((g) => (
          <GenrePill key={g.id} genre={g.name} />
        ))}
      </StyledPillSection>
      {castData && data ? (
        <MovieInfoSection cast={castData} movie={data} />
      ) : (
        <Section>
          <Loading />
        </Section>
      )}
      <Section>
        <MovieCelebCarousel data={castData} />
      </Section>

      <Section>
        <SimilarMediaCarousel data={data} />
      </Section>
    </>
  );
}
