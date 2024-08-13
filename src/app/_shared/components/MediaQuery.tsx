import styled from "styled-components";

const StyledHideOnMobile = styled.div`
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const StyledHideOnDesktop = styled.div`
  @media screen and (min-width: 1024px) {
    display: none;
  }
`;

export function HideOnMobile({ children }: { children: React.ReactNode }) {
  return <StyledHideOnMobile>{children}</StyledHideOnMobile>;
}

export function HideOnDesktop({ children }: { children: React.ReactNode }) {
  return <StyledHideOnDesktop>{children}</StyledHideOnDesktop>;
}
