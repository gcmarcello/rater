import styled from "styled-components";
import FlexContainer from "@/app/_shared/components/FlexContainer";

const StyledMediaContainer = styled(FlexContainer)`
  display: flex;
  grid-auto-flow: column;
  grid-auto-columns: min-content;
  gap: 12px;
  overflow-y: hidden;
  scrollbar-width: none;
  grid-column: span 3 / span 3;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (min-width: 1024px) {
    width: 66.6%;
    grid-column: span 2 / span 2;
    overflow: hidden;
  }
`;

const StyledCelebInfoContainer = styled(FlexContainer)`
  grid-column: span 3 / span 3;
  @media screen and (min-width: 1024px) {
    width: 33.3%;
    grid-column: span 1 / span 1;
  }
`;

export default function CelebMediaContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StyledMediaContainer>{children}</StyledMediaContainer>;
}

export function CelebInfoContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StyledCelebInfoContainer>{children}</StyledCelebInfoContainer>;
}
