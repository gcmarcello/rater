import Carousel, {
  CarouselScrollLeftButton,
  CarouselScrollRightButton,
  CarouselItem,
} from "@/_shared/components/Carousel";
import { MediaCard } from "@/_shared/components/MediaCard";
import Text from "@/_shared/components/Text";
import SectionTitle from "@/_shared/components/Text/SectionTitle";
import { useScroll } from "@/_shared/hooks/useScroll";
import { useFetch } from "@/_shared/libs/swr/fetcher";
import { Media } from "@/_shared/types/Media";
import { MovieWithGenres } from "@/_shared/types/Movies";
import { ShowWithGenres } from "@/_shared/types/Shows";
import { Movie } from "@prisma/client";
import { useRef } from "react";

type MediaWithType =
  | (MovieWithGenres & { type: "movie" })
  | (ShowWithGenres & { type: "show" });

export default function SimilarMediaCarousel({ data }: { data?: Movie }) {
  const { data: similarMovies } = useFetch<Media[]>(
    data ? `/api/media/movie/${data.id}` : null
  );

  const similarRef = useRef<HTMLDivElement>(null);
  const { x: similarX, canX: canSimilarX } = useScroll({
    elementRef: similarRef,
  });

  return (
    <>
      <SectionTitle>
        <Text $variant="white" size={24}>
          Similares
        </Text>
        <div>
          <CarouselScrollLeftButton
            onClick={() => similarX(-768)}
            fill={canSimilarX(-768) ? "white" : "gray"}
            width={24}
            height={24}
          />
          <CarouselScrollRightButton
            onClick={() => similarX(768)}
            fill={canSimilarX(768) ? "white" : "gray"}
            width={24}
            height={24}
          />
        </div>
      </SectionTitle>
      <Carousel ref={similarRef}>
        {similarMovies?.map((media) => (
          <CarouselItem key={media.id}>
            {(media as MediaWithType).type === "movie" ? (
              <CarouselItem>
                <MediaCard movie={media as MovieWithGenres} />
              </CarouselItem>
            ) : (
              <CarouselItem>
                <MediaCard show={media as ShowWithGenres} />
              </CarouselItem>
            )}
          </CarouselItem>
        ))}
      </Carousel>
    </>
  );
}
