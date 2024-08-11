"use client";
import { Button as HeadlessButton } from "@headlessui/react";
import React from "react";
import styled from "styled-components";

const BaselineButton = styled(HeadlessButton)`
  display: flex;
  font-family: "Inter", sans-serif;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 28px;
  gap: 8px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  border: 0;
  cursor: pointer;

  :disabled {
    opacity: 0.5;
    font-size: 16px;
    cursor: none;
  }
`;

const PrimaryWhiteButton = styled(BaselineButton)`
  background: #eeeeee;
  color: #232323;

  &:hover {
    &:not(:disabled) {
      background: #cecece;
    }
  }
`;

const SecondaryButton = styled(BaselineButton)`
  background: #232323;
  &:hover {
    &:not(:disabled) {
      background: #333333;
    }
  }
`;

const TertiaryButton = styled(BaselineButton)`
  background: rgba(255, 255, 255, 0.2);
`;

const DangerButton = styled(BaselineButton)`
  background: rgba(61, 16, 21, 1);
  color: rgba(225, 29, 72, 1);
`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "danger";
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
    case "danger":
      return <DangerButton {...props}>{props.children}</DangerButton>;
    default:
      return (
        <PrimaryWhiteButton {...props}>{props.children}</PrimaryWhiteButton>
      );
  }
}
