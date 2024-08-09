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

interface ButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "secondary" | "tertiary";
  children: React.ReactNode | string;
}

export default function Button(props: ButtonProps) {
  switch (props.variant) {
    case "primary":
      return (
        <PrimaryWhiteButton {...props}>{props.children}</PrimaryWhiteButton>
      );
    case "secondary":
      return <SecondaryButton {...props}>{props.children}</SecondaryButton>;
    case "tertiary":
      return <TertiaryButton {...props}>{props.children}</TertiaryButton>;
    default:
      return (
        <PrimaryWhiteButton {...props}>{props.children}</PrimaryWhiteButton>
      );
  }
}
