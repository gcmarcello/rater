"use client";
import React from "react";
import styled from "styled-components";

const BaselineButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 28px;
  gap: 8px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
`;

const PrimaryWhiteButton = styled(BaselineButton)`
  background: #eeeeee;
`;

const SecondaryButton = styled(BaselineButton)`
  background: #232323;
  &:hover {
    background: #333333;
  }
`;

const TertiaryButton = styled(BaselineButton)`
  background: rgba(255, 255, 255, 0.2);
`;

export default function Button({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: "primary" | "secondary" | "tertiary";
}) {
  switch (variant) {
    case "primary":
      return <PrimaryWhiteButton>{children}</PrimaryWhiteButton>;
    case "secondary":
      return <SecondaryButton>{children}</SecondaryButton>;
    case "tertiary":
      return <TertiaryButton>{children}</TertiaryButton>;
  }
}
