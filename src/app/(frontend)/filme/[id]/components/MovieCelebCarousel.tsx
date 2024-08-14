import Carousel, {
  CarouselScrollLeftButton,
  CarouselScrollRightButton,
  CarouselItem,
} from "@/app/_shared/components/Carousel";
import { CelebrityCard } from "@/app/_shared/components/CelebrityCard";
import Text from "@/app/_shared/components/Text";
import SectionTitle from "@/app/_shared/components/Text/SectionTitle";
import { useScroll } from "@/app/_shared/hooks/useScroll";
import { useFetch } from "@/app/_shared/libs/swr/fetcher";
import { CastWithCelebrity } from "@/app/_shared/types/Celebrities";
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
