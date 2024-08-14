import Carousel, {
  CarouselScrollLeftButton,
  CarouselScrollRightButton,
  CarouselItem,
} from "@/app/_shared/components/Carousel";
import { MediaCard } from "@/app/_shared/components/MediaCard";
import Text from "@/app/_shared/components/Text";
import SectionTitle from "@/app/_shared/components/Text/SectionTitle";
import { useScroll } from "@/app/_shared/hooks/useScroll";
import { useFetch } from "@/app/_shared/libs/swr/fetcher";
import { Media } from "@/app/_shared/types/Media";
import { MovieWithGenres } from "@/app/_shared/types/Movies";
import { ShowWithGenres } from "@/app/_shared/types/Shows";
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
