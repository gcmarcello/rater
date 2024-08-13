import { Show } from "@prisma/client";
import { useGlobalStore } from "../../hooks/useGlobalStore";
import styled from "styled-components";
import { MediaCardProps } from "../MediaCard";
import Image from "next/image";
import { minutesToHours } from "../../utils/minutesToHours";
import { MovieWithGenres } from "../../types/Movies";
import Indicator from "../Indicator";
import Text from "../Text";

const HeroContainer = styled.div`
  display: flex;
  justify-content: center;
  min-height: 284px;
  grid-column: span 6 / span 6;

  @media screen and (min-width: 1024px) {
    min-height: 80vh;
    align-items: center;
  }
`;

const StyledHero = styled.div<MediaCardProps>`
  display: flex;
  flex-direction: column;
  justify-content: end;
  background-image: ${(props) =>
    props.$image
      ? `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)), url(${props.$image});`
      : "none"};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  min-width: 167px;
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
  justify-content: end;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  max-width: 100%;
  height: 100%;
`;

const CardTitleText = styled.p`
  color: white;
  font-size: 16px;
  font-weight: 700;

  @media screen and (min-width: 1024px) {
    font-size: 40px;
  }
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

export function Hero({
  movie,
  show,
}: {
  movie?: MovieWithGenres | null;
  show?: Show | null;
}) {
  if (!movie && !show) throw new Error("No movie or show provided");
  if (movie && show) throw new Error("Both movie and show provided");

  const { setToBeRatedMovie } = useGlobalStore();

  if (movie)
    return (
      <HeroContainer>
        <StyledHero $image={movie.options?.image}>
          <CardInfo>
            {movie.highlighted && (
              <div style={{ display: "flex", gap: "12px" }}>
                <Indicator>
                  <Image
                    src={"/flame.svg"}
                    height={20}
                    width={20}
                    alt="highlighted icon"
                  />
                  <>
                    <Text $variant="white">Em Destaque</Text>
                  </>
                </Indicator>
                <Indicator onClick={() => setToBeRatedMovie(movie)}>
                  <Image
                    src={"/star.svg"}
                    height={20}
                    width={20}
                    alt="highlighted icon"
                  />
                </Indicator>
              </div>
            )}
            <CardTitleText>{movie.title}</CardTitleText>
            <CardDetails>
              <Image src="/star.png" width={20} height={20} alt="Star" />
              <div>{movie.rating?.toFixed(2)} |</div>
              <div>
                {movie.options?.duration &&
                  minutesToHours(movie.options?.duration)}{" "}
                •{" "}
                {movie.releaseDate && new Date(movie.releaseDate).getFullYear()}{" "}
                •{" "}
                {movie.genres.length
                  ? movie.genres.map((g) => g.name).join(", ")
                  : ""}
              </div>
            </CardDetails>

            <Description>{movie.options?.description}</Description>
          </CardInfo>
        </StyledHero>
      </HeroContainer>
    );
}
