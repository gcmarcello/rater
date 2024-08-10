import React, { AnchorHTMLAttributes } from "react";
import styled from "styled-components";

type TextProps = {
  variant?: "white" | "dark";
  children: React.ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const WhiteText = styled.p<TextProps>`
  color: white;
  font-weight: 600;
`;

const DarkText = styled.p<TextProps>`
  color: #121212;
  font-weight: 600;
`;

const WhiteAnchor = styled.a<TextProps>`
  color: white;
  font-weight: 600;
`;

const DarkAnchor = styled.a<TextProps>`
  color: #121212;
  font-weight: 600;
`;

export default function Text(props: TextProps) {
  switch (props.variant) {
    case "white":
      return props.href ? (
        <WhiteAnchor {...props}>{props.children}</WhiteAnchor>
      ) : (
        <WhiteText>{props.children}</WhiteText>
      );
    case "dark":
      return props.href ? (
        <DarkAnchor {...props}>{props.children}</DarkAnchor>
      ) : (
        <DarkText>{props.children}</DarkText>
      );
  }
}
