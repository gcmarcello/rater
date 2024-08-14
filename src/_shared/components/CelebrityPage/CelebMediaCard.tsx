import React from "react";
import styled from "styled-components";

export type CelebMediaCardProps = React.HTMLAttributes<HTMLDivElement> & {
  $image?: string;
};

const Card = styled.div<CelebMediaCardProps>`
  flex-direction: column;
  justify-content: end;
  background-image: ${(props) =>
    props.$image ? `url(${props.$image});` : "none"};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  min-width: 64px;
  height: 86px;
  width: 64px;
  border: 2px solid rgba(35, 35, 35, 1);
  border-radius: 12px;
  transition-duration: 0.3s;
`;

export function CelebMediaCard(props: CelebMediaCardProps) {
  return <Card {...props} />;
}
