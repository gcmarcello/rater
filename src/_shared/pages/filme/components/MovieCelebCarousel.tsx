import Carousel, {
  CarouselScrollLeftButton,
  CarouselScrollRightButton,
  CarouselItem,
} from "@/_shared/components/Carousel";
import { CelebrityCard } from "@/_shared/components/CelebrityCard";
import Text from "@/_shared/components/Text";
import SectionTitle from "@/_shared/components/Text/SectionTitle";
import { useScroll } from "@/_shared/hooks/useScroll";
import { useFetch } from "@/_shared/libs/swr/fetcher";
import { CastWithCelebrity } from "@/_shared/types/Celebrities";
import { Movie } from "@prisma/client";
import { useRef } from "react";

export default function MovieCelebCarousel({
  data,
}: {
  data?: CastWithCelebrity[];
}) {
  const highlightedCelebs = useRef<HTMLDivElement>(null);
  const { x, canX } = useScroll({
    elementRef: highlightedCelebs,
  });

  return (
    <>
      <SectionTitle>
        <Text $variant="white" size={24}>
          Elenco Principal
        </Text>
        <div>
          <CarouselScrollLeftButton
            onClick={() => x(-768)}
            fill={canX(-768) ? "white" : "gray"}
            width={24}
            height={24}
          />
          <CarouselScrollRightButton
            onClick={() => x(768)}
            fill={canX(768) ? "white" : "gray"}
            width={24}
            height={24}
          />
        </div>
      </SectionTitle>
      <Carousel ref={highlightedCelebs}>
        {data?.map((celeb) => (
          <CarouselItem key={celeb.id}>
            <CelebrityCard celebrity={celeb.celebrity} />
          </CarouselItem>
        ))}
      </Carousel>
    </>
  );
}
