import { useRef } from "react";
import { Section } from "./Section";
import { useScroll } from "../../hooks/useScroll";
import { Celebrity } from "@prisma/client";
import { CelebrityCard } from "../CelebrityCard";
import { useFetch } from "../../libs/swr/fetcher";
import Text from "../Text";
import SectionTitle from "../Text/SectionTitle";
import Carousel, {
  CarouselItem,
  CarouselScrollLeftButton,
  CarouselScrollRightButton,
} from "../Carousel";

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
            Celebridades
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
