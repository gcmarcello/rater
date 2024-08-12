"use client";
import styled from "styled-components";

const Container = styled.div`
  width: 100dvw;
  min-height: calc(100dvh - 84px - 67px);
  padding: 0 12px 12px 12px;

  @media screen and (min-width: 1024px) {
    padding: 0 24px 24px 24px;
  }
`;

export default function MainContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Container>{children}</Container>;
}
