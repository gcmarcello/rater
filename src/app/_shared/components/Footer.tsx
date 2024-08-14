"use client";
import styled from "styled-components";
import Text from "./Text";

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 67px;
`;
export function Footer() {
  return (
    <StyledFooter>
      <Text $variant="white">© 2024 Rater. All rights reserved</Text>
    </StyledFooter>
  );
}
