import styled from "styled-components";
import Button from "../_shared/components/Button";
import Text from "../_shared/components/Text";
import { Genre, Movie, Show } from "@prisma/client";
import Image from "next/image";
import { minutesToHours } from "../utils/minutesToHours";
import { useGlobalStore } from "@/app/libs/zustand/useGlobalStore";
import { MovieWithGenres } from "@/app/types/Movies";
import Indicator from "../_shared/components/Indicator";

type MediaCardProps = {
  image?: string;
};

const Card = styled.div<MediaCardProps>`
  display: flex;
  flex-direction: column;
  justify-content: end;
  background-image: ${(props) =>
    props.image
      ? `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)), url(${props.image});`
      : "none"};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  border-radius: 24px;
  cursor: pointer;
  transition-duration: 0.3s;

  &:hover {
    transform: scale(1.005);
  }
  @media screen and (max-width: 1024px) {
    max-height: 300px;
  }
`;

const CardInfo = styled.div`
  display: flex;
  justify-content: start;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  max-width: 100%;
`;

const CardDetails = styled.div`
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: rgba(180, 180, 180, 1);
  display: none;

  @media screen and (min-width: 1024px) {
    display: flex;
    gap: 12px;
  }
`;

const Description = styled.p`
  color: rgba(180, 180, 180, 1);
  font-size: 12px;
  font-weight: 500;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media screen and (min-width: 1024px) {
    font-size: 16px;
    color: white;
    max-width: 550px;
    min-height: auto;
    max-height: auto;
  }
`;

const HeroCardTitleText = styled.p`
  color: white;
  font-size: 16px;
  font-weight: 700;

  @media screen and (min-width: 1024px) {
    font-size: 24px;
  }
`;

const CardTitleText = styled.p`
  color: white;
  font-size: 16px;
  font-weight: 700;

  @media screen and (min-width: 1024px) {
    font-size: 40px;
  }
`;

export function HeroMediaCard({
  movie,
  show,
}: {
  movie?: MovieWithGenres | null;
  show?: Show | null;
}) {
  if (!movie && !show) throw new Error("No movie or show provided");
  if (movie && show) throw new Error("Both movie and show provided");

  if (movie)
    return (
      <Card image={movie.options?.image}>
        <CardInfo>
          {movie.highlighted && (
            <Indicator>
              <Image
                src={"/flame.svg"}
                height={20}
                width={20}
                alt="highlighted icon"
              />
              <>
                <Text variant="white">Em Destaque</Text>
              </>
            </Indicator>
          )}
          <CardTitleText>{movie.title}</CardTitleText>
          <CardDetails>
            <Image src="/star.png" width={20} height={20} alt="Star" />
            <div>{movie.rating?.toFixed(2)} |</div>
            <div>
              {movie.options?.duration &&
                minutesToHours(movie.options?.duration)}{" "}
              • {movie.releaseDate && new Date(movie.releaseDate).getFullYear()}{" "}
              •{" "}
              {movie.genres.length
                ? movie.genres.map((g) => g.name).join(", ")
                : ""}
            </div>
          </CardDetails>

          <Description>{movie.options?.description}</Description>
        </CardInfo>
      </Card>
    );
}

export function MediaCard({
  movie,
  show,
}: {
  movie?: MovieWithGenres | null;
  show?: Show | null;
}) {
  if (!movie && !show) throw new Error("No movie or show provided");
  if (movie && show) throw new Error("Both movie and show provided");

  if (movie)
    return (
      <Card image={movie.options?.image}>
        <CardInfo>
          <HeroCardTitleText>{movie.title}</HeroCardTitleText>
        </CardInfo>
      </Card>
    );
}
