import styled from "styled-components";

const StyledStar = styled.div`
  width: 24px;
  height: 24px;

  @media screen and (min-width: 1024px) {
    width: 40px;
    height: 40px;
  }
`;

const fullStar = (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20 29.6668L9.66665 35.0002L11.6666 23.5002L3.33331 15.5002L15 13.8335L20 3.3335"
      fill="#EAB308"
    />
    <path
      d="M20 3.3335L25.15 13.7668L36.6666 15.4502L28.3333 23.5668L30.3 35.0335L20 29.6168L9.69998 35.0335L11.6666 23.5668L3.33331 15.4502L14.85 13.7668L20 3.3335Z"
      fill="#EAB308"
      stroke="#EAB308"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const emptyStar = (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20 3.3335L25.15 13.7668L36.6666 15.4502L28.3333 23.5668L30.3 35.0335L20 29.6168L9.69998 35.0335L11.6666 23.5668L3.33331 15.4502L14.85 13.7668L20 3.3335Z"
      stroke="#313131"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const halfStar = (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20 3.3335L25.15 13.7668L36.6666 15.4502L28.3333 23.5668L30.3 35.0335L20 29.6168L9.69998 35.0335L11.6666 23.5668L3.33331 15.4502L14.85 13.7668L20 3.3335Z"
      stroke="#313131"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 29.6668L9.66665 35.0002L11.6666 23.5002L3.33331 15.5002L15 13.8335L20 3.3335"
      fill="#EAB308"
    />
    <path
      d="M20 29.6668L9.66665 35.0002L11.6666 23.5002L3.33331 15.5002L15 13.8335L20 3.3335V29.6668Z"
      stroke="#EAB308"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function Star({ type }: { type: "full" | "empty" | "half" }) {
  return (
    <StyledStar>
      {type === "full" && fullStar}
      {type === "empty" && emptyStar}
      {type === "half" && halfStar}
    </StyledStar>
  );
}
