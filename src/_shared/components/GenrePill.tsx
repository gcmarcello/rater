import React from "react";
import styled from "styled-components";
const StyledGenrePill = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4.5px 12px;
  font-size: 12px;
  color: rgba(180, 180, 180, 1);
  font-weight: 400;
  border: 2px solid #313131;
  border-radius: 99px;
  flex: none;
  order: 2;
  flex-grow: 0;
`;

export default function GenrePill(
  props: React.PropsWithChildren<{ genre: string }>
) {
  return <StyledGenrePill>{props.genre}</StyledGenrePill>;
}
