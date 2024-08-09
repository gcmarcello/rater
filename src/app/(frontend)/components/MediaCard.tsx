import styled from "styled-components";
import Button from "./Button";
import Text from "./Text";
import { Genre, Movie, Show } from "@prisma/client";
import Image from "next/image";
import { minutesToHours } from "../utils/minutesToHours";

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

  @media screen and (max-width: 1024px) {
    max-height: 300px;
  }
`;

const CardInfo = styled.div`
  display: flex;
  margin-right: auto;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  max-width: 100%;
`;

const CardDetails = styled.div`
  display: flex;
  gap: 12px;
  font-size: 16px;
  font-weight: 600;
  color: rgba(180, 180, 180, 1);
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
    white-space: normal;
    min-height: auto;
    max-height: auto;
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
  movie: Movie & { genre?: Genre[] };
  show?: Show;
}) {
  if (!movie && !show) throw new Error("No movie or show provided");
  if (movie && show) throw new Error("Both movie and show provided");

  if (movie)
    return (
      <Card image={movie.options?.image}>
        <CardInfo>
          <CardTitleText>{movie.title}</CardTitleText>
          <CardDetails>
            <Image src="/star.png" width={20} height={20} alt="Star" />
            <div>{movie.rating?.toFixed(2)} |</div>
            <div>
              {movie.options?.duration &&
                minutesToHours(movie.options?.duration)}{" "}
              • {movie.releaseDate && new Date(movie.releaseDate).getFullYear()}{" "}
              • {movie.genre ? movie.genre.map((g) => g.name).join(", ") : ""}
            </div>
          </CardDetails>

          <Description>{movie.options?.description}</Description>
        </CardInfo>
      </Card>
    );
}

export function MediaCard({}) {}
