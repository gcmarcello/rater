import styled from "styled-components";
import Button from "../_shared/components/Button";
import Text from "../_shared/components/Text";
import { Celebrity, Genre, Movie, Show } from "@prisma/client";
import Image from "next/image";
import { minutesToHours } from "../utils/minutesToHours";
import { MovieWithGenres } from "@/app/types/Movies";
import Indicator from "../_shared/components/Indicator";
import { useGlobalStore } from "../hooks/useGlobalStore";
import useNextStore from "../hooks/useNextStore";
import { useAuthStore } from "../hooks/useAuthStore";
import { useAuthModalStore } from "../hooks/useAuthModalStore";
import dayjs from "dayjs";
import { Description } from "../_shared/form/components/Form";
import Link from "next/link";

export type CelebrityCardProps = {
  $image?: string;
};

const Card = styled.div<CelebrityCardProps>`
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
  height: 254px;
  border-radius: 24px;
  transition-duration: 0.3s;

  &:hover {
    transform: scale(1.005);
  }
  @media screen and (min-width: 1024px) {
    width: 269px;
    min-height: 250px;
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

const CardInfo = styled.div`
  display: flex;
  justify-content: end;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
  max-width: 100%;
  height: 100%;
`;

export function CelebrityCard({ celebrity }: { celebrity: Celebrity }) {
  return (
    <Link href={`/celebridade/${celebrity.id}`}>
      <Card $image={celebrity.options?.image}>
        <CardInfo>
          <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
            <HeroCardTitleText>{celebrity.name}</HeroCardTitleText>
            <Description>
              {dayjs().diff(dayjs(celebrity.birthDate, "YYYY-MM-DD"), "year")}
            </Description>
          </div>
        </CardInfo>
      </Card>
    </Link>
  );
}
