"use client";
import styled from "styled-components";

const Container = styled.div`
  width: 100dvw;
  height: calc(100dvh - 90px);
`;

export default function MainContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Container>{children}</Container>;
}
