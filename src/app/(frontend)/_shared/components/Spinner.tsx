import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  height: 24px; /* Adjust the height as needed */
  width: 24px; /* Adjust the width as needed */
`;

const SpinningSVG = styled.svg`
  width: 24px; /* Adjust the size as needed */
  height: 24px; /* Adjust the size as needed */
  animation: ${spin} 1s linear infinite;
`;

export function Spinner() {
  return (
    <SpinnerWrapper>
      <SpinningSVG viewBox="0 0 24 24">
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
