import React, { useRef } from "react";

import { useScroll } from "../../../hooks/useScroll";
import { MediaCard } from "../../../components/MediaCard";
import { Section } from "./Section";
import { useFetch } from "../../../libs/swr/fetcher";
import { MovieWithGenres } from "../../../types/Movies";
import Carousel, {
  CarouselScrollLeftButton,
  CarouselScrollRightButton,
  CarouselItem,
} from "../../../components/Carousel";
import SectionTitle from "../../../components/Text/SectionTitle";
import Text from "../../../components/Text";

export function LatestReleases() {
  const { data: latestReleases } = useFetch<MovieWithGenres[]>(
    "/api/movies?take=8&orderBy={%22releaseDate%22:%22desc%22}"
  );
  const latestMedia = useRef<HTMLDivElement>(null);
  const { x: xLatest, canX: canXLatest } = useScroll({
    elementRef: latestMedia,
  });
  return (
    <>
      <Section>
        <SectionTitle>
          <Text $variant="white" size={24}>
            Últimos Lançamentos
          </Text>
          <div>
            <CarouselScrollLeftButton
              onClick={() => xLatest(-768)}
              fill={canXLatest(-768) ? "white" : "gray"}
              width={24}
              height={24}
            />
            <CarouselScrollRightButton
              onClick={() => xLatest(768)}
              fill={canXLatest(768) ? "white" : "gray"}
              width={24}
              height={24}
            />
          </div>
        </SectionTitle>
        <Carousel ref={latestMedia}>
          {latestReleases?.map((movie) => (
            <CarouselItem key={movie.id}>
              <MediaCard movie={movie} />
            </CarouselItem>
          ))}
        </Carousel>
      </Section>
    </>
  );
}
