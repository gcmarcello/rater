import FlexContainer from "@/app/_shared/components/FlexContainer";
import {
  HideOnDesktop,
  HideOnMobile,
} from "@/app/_shared/components/MediaQuery";
import Text from "@/app/_shared/components/Text";
import SectionTitle from "@/app/_shared/components/Text/SectionTitle";
import { useFetch } from "@/app/_shared/libs/swr/fetcher";
import {
  CastWithCelebrity,
  CrewWithCelebrity,
} from "@/app/_shared/types/Celebrities";
import { MovieWithGenres } from "@/app/_shared/types/Movies";
import {
  minutesToHours,
  numberToText,
} from "@/app/_shared/utils/numbersToString";
import Image from "next/image";
import styled from "styled-components";

const StyledMediaInfoSection = styled.div`
  display: grid;
  flex-direction: row;
  align-items: flex-start;
  gap: 24px;
  padding: 24px 0;

  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(200px, 1fr));
    padding: 24px;
  }
`;

const StyledMediaDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media screen and (min-width: 1024px) {
    grid-column: span 2 / span 2;
  }
`;

const StyledMediaCelebs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledCelebsList = styled(SectionTitle)`
  justify-content: flex-start;
  align-items: start;
  flex-direction: column;
  max-height: fit-content;
`;

const StyledMediaTitle = styled.p`
  color: white;
  font-size: 20px;
  font-weight: 700;

  @media screen and (min-width: 1024px) {
    font-size: 40px;
  }
`;

export default function MovieInfoSection({
  movie,
  cast,
}: {
  movie: MovieWithGenres;
  cast: CastWithCelebrity[];
}) {
  const { data: crewData, isLoading: crewIsLoading } = useFetch<
    CrewWithCelebrity[]
  >(movie ? `/api/crew/movie/${movie.id}` : null);

  const { data: ratingData, isLoading: ratingIsLoading } = useFetch<number>(
    movie ? `/api/ratings/movie/${movie.id}` : null
  );

  return (
    <StyledMediaInfoSection>
      <StyledMediaDetails>
        <FlexContainer $align="center" $justify="flex-start" $gap={10}>
          <StyledMediaTitle>{movie?.title}</StyledMediaTitle>
          <Image src="/star.png" width={20} height={20} alt="Star" />
          <Text $weight={600}>{movie?.rating?.toFixed(2)} |</Text>
          <Text $color="rgba(180, 180, 180, 1)" $weight={400}>
            {ratingData ? (
              String(numberToText(ratingData ?? 0))
            ) : (
              <>
                <HideOnMobile>Sem Avaliações</HideOnMobile>
                <HideOnDesktop>N/A</HideOnDesktop>
              </>
            )}
          </Text>
        </FlexContainer>
        <>
          <Text $color="rgba(180, 180, 180, 1)" $weight={400}>
            {movie?.options?.duration &&
              minutesToHours(movie?.options?.duration)}{" "}
            • {movie?.options?.ageRating} •{" "}
            {movie?.releaseDate && new Date(movie?.releaseDate).getFullYear()}{" "}
          </Text>
        </>
        <Text $weight={500} size={14}>
          {movie?.options?.description}
        </Text>
      </StyledMediaDetails>
      <StyledMediaCelebs>
        <StyledCelebsList>
          <Text>Direção</Text>
          <Text $color="rgba(180, 180, 180, 1)" $weight={400} size={18}>
            {crewData
              ?.filter((crew) => crew.role === "Director")
              .map((crew) => crew.celebrity.name)
              .join(", ")}
          </Text>
        </StyledCelebsList>
        {crewData
          ?.filter((crew) => crew.role === "Writer")
          .map((crew) => crew.celebrity.name)
          .join(", ").length ? (
          <StyledCelebsList>
            <Text>Roteiristas</Text>
            <Text $color="rgba(180, 180, 180, 1)" $weight={400} size={18}>
              {crewData
                ?.filter((crew) => crew.role === "Writer")
                .map((crew) => crew.celebrity.name)
                .join(", ")}
            </Text>
          </StyledCelebsList>
        ) : null}
        <StyledCelebsList>
          <Text>Artistas</Text>
          <Text $color="rgba(180, 180, 180, 1)" $weight={400} size={18}>
            {cast
              ?.map((cast) => cast.celebrity.name)
              .slice(0, 6)
              .join(", ")}
          </Text>
        </StyledCelebsList>
      </StyledMediaCelebs>
    </StyledMediaInfoSection>
  );
}
