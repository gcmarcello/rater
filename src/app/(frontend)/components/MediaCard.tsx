import styled from "styled-components";
import Button from "../_shared/components/Button";
import Text from "../_shared/components/Text";
import { Genre, Movie, Show } from "@prisma/client";
import Image from "next/image";
import { minutesToHours } from "../utils/minutesToHours";
import { MovieWithGenres } from "@/app/types/Movies";
import Indicator from "../_shared/components/Indicator";
import { useGlobalStore } from "../hooks/useGlobalStore";
import useNextStore from "../hooks/useNextStore";
import { useAuthStore } from "../hooks/useAuthStore";
import { useAuthModalStore } from "../hooks/useAuthModalStore";

export type MediaCardProps = {
  $image?: string;
};

const Card = styled.div<MediaCardProps>`
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

const MediaCardStarIndicator = styled(Indicator)`
  display: flex;
  gap: 4px;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  color: white;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 8px;
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.5);
  }
  &:active {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const CardInfo = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
  max-width: 100%;
  height: 100%;
`;

export function MediaCard({
  movie,
  show,
}: {
  movie?: MovieWithGenres | null;
  show?: Show | null;
}) {
  const auth = useNextStore(useAuthStore, (state) => state);
  const { setIsAuthModalOpen } = useAuthModalStore();
  if (!movie && !show) throw new Error("No movie or show provided");
  if (movie && show) throw new Error("Both movie and show provided");

  const { setToBeRatedMovie } = useGlobalStore();

  if (movie)
    return (
      <Card $image={movie.options?.image}>
        <CardInfo>
          <div style={{ display: "flex", gap: "12px" }}>
            <MediaCardStarIndicator
              onClick={() =>
                auth?.getSession()
                  ? setToBeRatedMovie(movie)
                  : setIsAuthModalOpen(true)
              }
            >
              <Image
                src={"/star.svg"}
                height={20}
                width={20}
                alt="highlighted icon"
              />
            </MediaCardStarIndicator>
            <MediaCardStarIndicator>
              <Image src="/star.png" width={20} height={20} alt="Star" />
              <div>{movie.rating?.toFixed(2)}</div>
            </MediaCardStarIndicator>
          </div>
          <HeroCardTitleText>{movie.title}</HeroCardTitleText>
        </CardInfo>
      </Card>
    );
}
