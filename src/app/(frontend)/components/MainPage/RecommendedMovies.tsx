import { useFetch } from "@/app/libs/swr/fetcher";
import { MovieWithGenres } from "@/app/types/Movies";
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
import { useAuthModalStore } from "../../hooks/useAuthModalStore";
import { useGlobalStore } from "../../hooks/useGlobalStore";
import { useAuthStore } from "../../hooks/useAuthStore";
import useNextStore from "../../hooks/useNextStore";
import { useRef } from "react";
import Image from "next/image";
import { HideOnMobile } from "../../_shared/components/MediaQuery";

export function RecommendedMovies() {
  const auth = useNextStore(useAuthStore, (state) => state);
  const { ratings, ratedMovies, setRatedMovies } = useGlobalStore();
  const { setIsAuthModalOpen } = useAuthModalStore();
  const { data: recommendedMovies } = useFetch<MovieWithGenres[]>(
    auth?.getSession()
      ? "/api/movies/recommendations"
      : "/api/movies?take=6&where={%22highlighted%22:true}&skip=4&orderBy={%22rating%22:%22desc%22}",
    { onSuccess: (data) => console.log(data) }
  );
  const recommendedMedia = useRef<HTMLDivElement>(null);
  const { x: xRecommended, canX: canXRecommended } = useScroll({
    elementRef: recommendedMedia,
  });
  return (
    <>
      <Section>
        <SectionTitle>
          <div style={{ display: "flex", gap: "12px", alignItems: "baseline" }}>
            <Text $variant="white" size={24}>
              Filmes Recomendados
            </Text>
            <HideOnMobile>
              {!auth?.getSession() && (
                <Text
                  onClick={() => setIsAuthModalOpen(true)}
                  $variant="white"
                  $weight={400}
                  size={16}
                >
                  Faça <span style={{ fontWeight: 600 }}>login</span> para
                  recomendações personalizadas!
                </Text>
              )}
            </HideOnMobile>
          </div>
          <div>
            <CarouselScrollLeftButton
              onClick={() => xRecommended(-768)}
              fill={canXRecommended(-768) ? "white" : "gray"}
              width={24}
              height={24}
            />
            <CarouselScrollRightButton
              onClick={() => xRecommended(768)}
              fill={canXRecommended(768) ? "white" : "gray"}
              width={24}
              height={24}
            />
          </div>
        </SectionTitle>
        {recommendedMovies ? (
          <Carousel ref={recommendedMedia}>
            {recommendedMovies.map((movie) => (
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
            <Text>Ops, nenhum filme recomendado para você. </Text>
            <Text $weight={400}>Aguarde, mais conteúdo aqui em breve!</Text>
          </div>
        )}
      </Section>
    </>
  );
}
