import { useContext } from "react";
import { RoleWithMedia } from "../../types/Media";
import {
  CarouselScrollLeftButton,
  CarouselScrollRightButton,
} from "../Carousel";
import FlexContainer from "../FlexContainer";
import { useStore } from "zustand";
import { usePagination } from "../../hooks/usePagination";
import { HideOnMobile } from "../MediaQuery";

export function CelebPagination() {
  const {
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
    canPrevPage,
    canNextPage,
  } = usePagination();

  return (
    <>
      <HideOnMobile>
        <FlexContainer $justify="flex-end" $align="center" $gap={8}>
          <div>{currentPage ?? 0 + 1}</div>
          <div>de</div>
          <div>{totalPages}</div>
          <div>Páginas</div>
          <CarouselScrollLeftButton
            style={{ color: canPrevPage() ? "white" : "gray" }}
            onClick={() => prevPage()}
            width={24}
            height={24}
          />
          <CarouselScrollRightButton
            style={{ color: canNextPage() ? "white" : "gray" }}
            onClick={() => nextPage()}
            width={24}
            height={24}
          />
        </FlexContainer>
      </HideOnMobile>
    </>
  );
}
