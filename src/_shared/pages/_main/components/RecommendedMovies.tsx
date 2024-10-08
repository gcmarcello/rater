import { useScroll } from "../../../hooks/useScroll";
import { MediaCard } from "../../../components/MediaCard";
import { Section } from "./Section";
import { useAuthModalStore } from "../../../hooks/useAuthModalStore";
import { useGlobalStore } from "../../../hooks/useGlobalStore";
import { useAuthStore } from "../../../hooks/useAuthStore";
import useNextStore from "../../../hooks/useNextStore";
import { useRef } from "react";
import Image from "next/image";
import { useFetch } from "../../../libs/swr/fetcher";
import { MovieWithGenres } from "../../../types/Movies";
import Carousel, {
  CarouselScrollLeftButton,
  CarouselScrollRightButton,
  CarouselItem,
} from "../../../components/Carousel";
import { HideOnMobile } from "../../../components/MediaQuery";
import SectionTitle from "../../../components/Text/SectionTitle";
import Text from "../../../components/Text";
import { Loading } from "../../../components/Loading";

export function RecommendedMovies() {
  const auth = useNextStore(useAuthStore, (state) => state);
  const { ratings } = useGlobalStore();
  const { setIsAuthModalOpen } = useAuthModalStore();
  const { data: recommendedMovies, isLoading } = useFetch<MovieWithGenres[]>(
    auth?.getSession() && ratings.length
      ? "/api/movies/recommendations"
      : "/api/movies?take=6&where={%22highlighted%22:true}&skip=4&orderBy={%22rating%22:%22desc%22}"
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
        {isLoading ? (
          <Loading />
        ) : recommendedMovies?.length ? (
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
