"use client";
import FlexContainer from "@/app/_shared/components/FlexContainer";
import Text from "@/app/_shared/components/Text";
import SectionTitle from "@/app/_shared/components/Text/SectionTitle";
import { useFetch } from "@/app/_shared/libs/swr/fetcher";
import { RoleWithMedia } from "@/app/_shared/types/Media";
import { Celebrity } from "@prisma/client";
import Separator from "@/app/_shared/components/Separator";
import dayjs from "dayjs";
import React, { useRef } from "react";

import { CelebPagination } from "@/app/_shared/components/CelebrityPage/CelebPagination";
import { CelebMediaList } from "@/app/_shared/components/CelebrityPage/CelebMediaList";
import { LoadingOverlay } from "@/app/_shared/components/Loading";
import { PaginationProvider } from "@/app/_shared/contexts/pagination.ctx";
import CelebPageContainer from "@/app/_shared/components/CelebrityPage/CelebPageContainer";
import CelebMediaContainer, {
  CelebInfoContainer,
} from "@/app/_shared/components/CelebrityPage/CelebSubcontainers";
import CelebPortrait from "@/app/_shared/components/CelebrityPage/CelebPortrait";

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
        <CelebMediaContainer>
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
        </CelebMediaContainer>
        <CelebInfoContainer>
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
        </CelebInfoContainer>
      </CelebPageContainer>
    </>
  );
}
