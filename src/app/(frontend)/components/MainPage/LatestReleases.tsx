import React, { useRef } from "react";
import Carousel, {
  CarouselScrollLeftButton,
  CarouselScrollRightButton,
  CarouselItem,
} from "../../_shared/components/Carousel";
import Text from "../../_shared/components/Text";
import SectionTitle from "../../_shared/components/Text/SectionTitle";
import { useScroll } from "../../hooks/useScroll";
import { MediaCard } from "../MediaCard";
import { Section } from "./Section";
import { useFetch } from "@/app/libs/swr/fetcher";
import { MovieWithGenres } from "@/app/types/Movies";

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
