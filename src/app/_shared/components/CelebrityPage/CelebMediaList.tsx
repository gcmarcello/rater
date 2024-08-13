import styled from "styled-components";
import dayjs from "dayjs";
import Image from "next/image";
import Text from "../Text";
import { RoleWithMedia } from "../../types/Media";
import { CelebMediaCard } from "./CelebMediaCard";
import { useContext } from "react";
import { useStore } from "zustand";
import { useFetch } from "../../libs/swr/fetcher";
import { usePagination } from "../../hooks/usePagination";

const CelebMediaCardContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  gap: 12px;
  min-width: 239px;
`;

const StyledCelebMediaList = styled.div`
  display: grid;
  flex-grow: 1;
  grid-template-columns: repeat(5, minmax(200px, 1fr));

  overflow-x: hidden;
  row-gap: 12px;
  column-gap: 36px;

  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export function CelebMediaList({ celebId }: { celebId: number }) {
  const { paginatedItems } = usePagination<RoleWithMedia>();

  return (
    <StyledCelebMediaList>
      {paginatedItems?.map((media) => (
        <CelebMediaCardContainer key={media.id}>
          <CelebMediaCard
            $image={media.movie?.options?.poster ?? media.show?.options?.poster}
          />
          <div
            style={{
              flexDirection: "column",
              display: "flex",
              gap: "4px",
            }}
          >
            <Text
              href={
                media.movie
                  ? `/filme/${media.movieId}`
                  : `/filme/${media.showId}`
              }
              $weight={600}
            >
              {media.movie?.title ?? media.show?.title}
            </Text>
            <div
              style={{
                display: "flex",
                gap: "4px",
                alignItems: "center",
              }}
            >
              <Image
                alt={"star"}
                src={"/fullstar.svg"}
                height={20}
                width={20}
              />
              <Text $variant="white" size={12}>
                {media.movie?.rating?.toFixed(2) ??
                  media.show?.rating?.toFixed(2)}
              </Text>
            </div>
            <Text
              style={{ color: "rgba(180, 180, 180, 1)" }}
              $weight={500}
              $variant="white"
              size={12}
            >
              {media.role}
            </Text>
            <Text
              style={{ color: "rgba(180, 180, 180, 1)" }}
              $weight={500}
              $variant="white"
              size={12}
            >
              {dayjs(media.movie?.releaseDate).year() ??
                dayjs(media.show?.releaseDate).year()}
            </Text>
          </div>
        </CelebMediaCardContainer>
      ))}
    </StyledCelebMediaList>
  );
}
