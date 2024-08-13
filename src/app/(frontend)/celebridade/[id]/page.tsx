"use client";
import { CelebMediaCard } from "@/app/_shared/components/CelebrityPage/CelebMediaCard";
import FlexContainer from "@/app/_shared/components/FlexContainer";
import Text from "@/app/_shared/components/Text";
import SectionTitle from "@/app/_shared/components/Text/SectionTitle";
import { useFetch } from "@/app/_shared/libs/swr/fetcher";
import { RoleWithMedia } from "@/app/_shared/types/Media";
import { CastedRole, Celebrity } from "@prisma/client";
import Separator from "@/app/_shared/components/Separator";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import styled from "styled-components";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import {
  CarouselScrollLeftButton,
  CarouselScrollRightButton,
} from "@/app/_shared/components/Carousel";
import { useStore } from "zustand";
import { set } from "zod";
import { CelebPagination } from "@/app/_shared/components/CelebrityPage/CelebPagination";
import { CelebMediaList } from "@/app/_shared/components/CelebrityPage/CelebMediaList";
import { LoadingOverlay } from "@/app/_shared/components/Loading";
import { PaginationProvider } from "@/app/_shared/contexts/pagination.ctx";

type CelebPortraitProps = React.HTMLAttributes<HTMLDivElement> & {
  $image?: string;
};

const CelebPageContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 24px;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media screen and (min-width: 1024px) {
    flex-direction: row;
  }
`;

const CelebPortrait = styled.div<CelebPortraitProps>`
  box-sizing: border-box;
  height: 350px;
  background-image: ${(props) =>
    props.$image ? `url(${props.$image});` : "none"};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border: 4px solid #3a3a3a;
  border-radius: 24px;
  flex-grow: 1;
`;

const StyledMediaContainer = styled(FlexContainer)`
  display: flex;
  grid-auto-flow: column;
  grid-auto-columns: min-content;
  gap: 12px;
  overflow-y: hidden;
  scrollbar-width: none;
  grid-column: span 3 / span 3;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (min-width: 1024px) {
    width: 66.6%;
    grid-column: span 2 / span 2;
    overflow: hidden;
  }
`;

const StyledCelebInfoContainer = styled(FlexContainer)`
  grid-column: span 3 / span 3;
  @media screen and (min-width: 1024px) {
    width: 33.3%;
    grid-column: span 1 / span 1;
  }
`;

export default function CelebritiesPage({
  params,
}: {
  params: { id: string };
}) {
  const { data } = useFetch<Celebrity>(`/api/celebrities/${params.id}`);

  const { data: medias } = useFetch<RoleWithMedia[]>(
    data ? `/api/celebrities/${data?.id}/media` : null
  );

  if (!medias || !data) return <LoadingOverlay />;

  return (
    <>
      <CelebPageContainer>
        <StyledMediaContainer>
          <FlexContainer $grow={1} $direction="column" $gap={12} style={{}}>
            <SectionTitle>
              <Text $weight={600} size={24}>
                Filmes e séries
              </Text>
            </SectionTitle>
            <PaginationProvider
              initialPage={1}
              items={medias || []}
              itemsPerPage={15}
            >
              <CelebMediaList celebId={data.id} />
              <Separator />
              <CelebPagination />
            </PaginationProvider>
          </FlexContainer>
        </StyledMediaContainer>
        <StyledCelebInfoContainer>
          <FlexContainer $justify="center" $direction="column" $gap={12}>
            <CelebPortrait $image={data?.options?.image} />
            <Text $weight={600} size={24}>
              {data?.name}
            </Text>
            <div>
              <Text $weight={500} size={14}>
                Nascido(a) em:
              </Text>
              <Text $color={"rgba(180, 180, 180, 1)"} $weight={400} size={16}>
                {dayjs(data?.birthDate).format("D [de] MMMM [de] YYYY")}
              </Text>
            </div>
            <div>
              <Text $weight={500} size={14}>
                Origem:
              </Text>
              <Text $color={"rgba(180, 180, 180, 1)"} $weight={400} size={16}>
                {data?.options?.birthPlace}
              </Text>
            </div>
            <div>
              <Text $weight={500} size={14}>
                Sobre:
              </Text>
              <Text $color={"rgba(180, 180, 180, 1)"} $weight={400} size={16}>
                {data?.options?.biography}
              </Text>
            </div>
          </FlexContainer>
        </StyledCelebInfoContainer>
      </CelebPageContainer>
    </>
  );
}
