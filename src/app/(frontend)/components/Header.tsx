"use client";
import styled from "styled-components";
import Button from "../_shared/components/Button";

const HeaderContainer = styled.div`
  width: 100dvw;

  display: flex;
  justify-content: space-between;
  padding: 24px;
`;

export default function Header() {
  return (
    <HeaderContainer>
      <img src="./Logo.png" alt="Logo" />
      <Button variant="secondary">Login</Button>
    </HeaderContainer>
  );
}
