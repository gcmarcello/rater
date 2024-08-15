import styled from "styled-components";
import Link from "next/link";
import { PlayIcon } from "@heroicons/react/24/solid";

const StyledMediaInfoSection = styled.div`
  display: grid;
  flex-direction: row;
  align-items: flex-start;
  gap: 24px;
  padding: 24px 0;

  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(200px, 1fr));
    padding: 24px;
  }
`;

export type TrailerButtonsProps = {
  $full?: boolean;
};

const StyledTrailerButton = styled(Link)<TrailerButtonsProps>`
  display: flex;
  flex-direction: row;
  width: ${(props) => (props.$full ? "100%" : "auto")};
  justify-content: center;
  align-items: center;
  padding: 8px;
  gap: 8px;
  border-radius: 12px;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.5);
  }
  &:active {
    background: rgba(255, 255, 255, 0.1);
  }

  @media screen and (min-width: 1024px) {
    width: auto;
  }
`;

export function TrailerButton({ trailerUrl }: { trailerUrl: string }) {
  return (
    <StyledTrailerButton target="_blank" href={trailerUrl}>
      <PlayIcon height={24} width={24} />
      Assistir ao Trailer
    </StyledTrailerButton>
  );
}
