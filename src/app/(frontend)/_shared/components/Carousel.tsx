import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import React from "react";
import styled from "styled-components";

const StyledCarousel = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: min-content;
  gap: 12px;
  overflow-y: hidden;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (min-width: 1024px) {
    overflow-x: hidden;
  }
`;

const StyledCarouselItem = styled.div`
  scroll-snap-align: start;
  min-width: 170px;
`;

const StyledCarouselScrollLeftButton = styled(ChevronLeftIcon)`
  cursor: pointer;
  border-radius: 50%;
  transition-duration: 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const StyledCarouselScrollRightButton = styled(ChevronRightIcon)`
  cursor: pointer;
  border-radius: 50%;
  transition-duration: 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return (
    <StyledCarousel ref={ref} {...props}>
      {props.children}
    </StyledCarousel>
  );
});

Carousel.displayName = "Carousel";

export default Carousel;

export function CarouselItem(props: React.HTMLAttributes<HTMLDivElement>) {
  return <StyledCarouselItem>{props.children}</StyledCarouselItem>;
}

export function CarouselScrollLeftButton(
  props: React.PropsWithoutRef<React.SVGProps<SVGSVGElement>>
) {
  return <StyledCarouselScrollLeftButton {...props} />;
}

export function CarouselScrollRightButton(
  props: React.PropsWithoutRef<React.SVGProps<SVGSVGElement>>
) {
  return <StyledCarouselScrollRightButton {...props} />;
}
