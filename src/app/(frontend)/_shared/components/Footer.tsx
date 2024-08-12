"use client";
import styled from "styled-components";

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 67px;
`;
export function Footer() {
  return <StyledFooter>© 2024 Rader. All rights reserved</StyledFooter>;
}
