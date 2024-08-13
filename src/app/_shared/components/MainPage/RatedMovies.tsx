import { MediaCard } from "../MediaCard";
import { Section } from "./Section";
import { useScroll } from "../../hooks/useScroll";
import { useRef } from "react";

import { useGlobalStore } from "../../hooks/useGlobalStore";
import Image from "next/image";
import { useAuthStore } from "../../hooks/useAuthStore";
import useNextStore from "../../hooks/useNextStore";
import { useAuthModalStore } from "../../hooks/useAuthModalStore";

import { useFetch } from "../../libs/swr/fetcher";
import { MovieWithGenres } from "../../types/Movies";
import Carousel, {
  CarouselScrollLeftButton,
  CarouselScrollRightButton,
  CarouselItem,
} from "../Carousel";
import SectionTitle from "../Text/SectionTitle";
import Text from "../Text";
import Button from "../Button";

export function RatedMovies() {
  const auth = useNextStore(useAuthStore, (state) => state);
  const ratedMedia = useRef<HTMLDivElement>(null);
  const { x: xRated, canX: canXRated } = useScroll({
    elementRef: ratedMedia,
  });

  const { ratings, ratedMovies, setRatedMovies } = useGlobalStore();
  const { setIsAuthModalOpen } = useAuthModalStore();

  const { data: ratedMoviesData, mutate } = useFetch<MovieWithGenres[]>(
    ratings.length
      ? `/api/movies?where=${encodeURIComponent(
          JSON.stringify({
            id: { in: ratings.map((rating) => rating.movieId) },
          })
        )}`
      : null,
    { onSuccess: (data) => setRatedMovies(data) }
  );

  return (
    <>
      <Section>
        <SectionTitle>
          <Text $variant="white" size={24}>
            Filmes Assistidos
          </Text>
          <div>
            <CarouselScrollLeftButton
              onClick={() => xRated(-768)}
              fill={canXRated(-768) ? "white" : "gray"}
              width={24}
              height={24}
            />
            <CarouselScrollRightButton
              onClick={() => xRated(768)}
              fill={canXRated(768) ? "white" : "gray"}
              width={24}
              height={24}
            />
          </div>
        </SectionTitle>
        {ratedMovies.length && auth?.getSession() ? (
          <Carousel ref={ratedMedia}>
            {ratedMovies.map((movie) => (
              <CarouselItem key={movie.id}>
                <MediaCard movie={movie} />
              </CarouselItem>
            ))}
          </Carousel>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              flexGrow: 1,
            }}
          >
            <Image
              src={"/clapperboard.svg"}
              alt="clapperboard"
              width={48}
              height={48}
            />
            <Text>Ops, nenhum filme avaliado ainda. </Text>
            <Text $weight={400}>Que tal adicionar um?</Text>
            {!auth?.getSession() && (
              <Button
                onClick={() => setIsAuthModalOpen(true)}
                $variant="secondary"
              >
                Login
              </Button>
            )}
          </div>
        )}
      </Section>
    </>
  );
}
