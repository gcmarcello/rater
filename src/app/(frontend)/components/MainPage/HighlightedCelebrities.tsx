import { useRef } from "react";
import Carousel, {
  CarouselScrollLeftButton,
  CarouselScrollRightButton,
  CarouselItem,
} from "../../_shared/components/Carousel";
import SectionTitle from "../../_shared/components/Text/SectionTitle";
import { MediaCard } from "../MediaCard";
import { Section } from "./Section";
import { useScroll } from "../../hooks/useScroll";
import Text from "../../_shared/components/Text";
import { useGlobalStore } from "../../hooks/useGlobalStore";
import { useFetch } from "@/app/libs/swr/fetcher";
import { Celebrity } from "@prisma/client";
import { CelebrityCard } from "../CelebrityCard";

export function HighlightedCelebrities() {
  const { data: highlightCelebs } = useFetch<Celebrity[]>(
    "/api/celebrities/highlighted"
  );
  const highlightedCelebs = useRef<HTMLDivElement>(null);
  const { x, canX } = useScroll({
    elementRef: highlightedCelebs,
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
          {highlightCelebs?.map((celeb) => (
            <CarouselItem key={celeb.id}>
              <CelebrityCard celebrity={celeb} />
            </CarouselItem>
          ))}
        </Carousel>
      </Section>
    </>
  );
}
