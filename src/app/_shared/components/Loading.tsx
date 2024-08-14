import styled from "styled-components";
import { Spinner } from "./Spinner";

const StyledLoadingOverlay = styled.div`
  z-index: 1000;
  background-color: #00000067;
  display: flex;
  width: 100dvw;
  top: 0;
  left: 0;
  height: 100dvh;
  justify-content: center;
  align-items: center;
  position: fixed;
`;

const StyledLoadingDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-grow: 1;
`;

export function LoadingOverlay() {
  return (
    <StyledLoadingOverlay>
      <Spinner size={150} />
    </StyledLoadingOverlay>
  );
}

export function Loading() {
  return (
    <StyledLoadingDiv>
      <Spinner size={80} />
    </StyledLoadingDiv>
  );
}
