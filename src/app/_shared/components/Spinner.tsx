import styled, { keyframes } from "styled-components";

type SpinnerProps = {
  size: number;
};

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerWrapper = styled.div<SpinnerProps>`
  display: flex;
  height: ${(props) => `${props.size}px`};
  width: ${(props) => `${props.size}px`};
`;

const SpinningSVG = styled.svg<SpinnerProps>`
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  animation: ${spin} 1s linear infinite;
`;

export function Spinner({ size = 24 }: { size?: number }) {
  return (
    <SpinnerWrapper size={size}>
      <SpinningSVG size={size} viewBox="0 0 24 24">
        <circle
          style={{ opacity: 0.25 }}
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          style={{ opacity: 0.75 }}
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </SpinningSVG>
    </SpinnerWrapper>
  );
}
