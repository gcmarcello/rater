import React, { AnchorHTMLAttributes } from "react";
import styled from "styled-components";

export type TextProps = {
  size?: number;
  $variant?: "white" | "dark";
  $weight?: 300 | 400 | 500 | 600 | 700;
  children: React.ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const WhiteText = styled.p<TextProps>`
  color: white;
  font-weight: ${(props) => props.$weight ?? 600};
  font-size: ${(props) => `${props.size}px`};
`;

const DarkText = styled.p<TextProps>`
  color: #121212;
  font-weight: ${(props) => props.$weight ?? 600};
  font-size: ${(props) => `${props.size}px`};
`;

const WhiteAnchor = styled.a<TextProps>`
  color: white;
  font-weight: ${(props) => props.$weight ?? 600};
  font-size: ${(props) => `${props.size}px`};
`;

const DarkAnchor = styled.a<TextProps>`
  color: #121212;
  font-weight: ${(props) => props.$weight ?? 600};
  font-size: ${(props) => `${props.size}px`};
`;

export default function Text(props: TextProps) {
  switch (props.$variant) {
    case "white":
      return props.href ? <WhiteAnchor {...props} /> : <WhiteText {...props} />;
    case "dark":
      return props.href ? <DarkAnchor {...props} /> : <DarkText {...props} />;
    default:
      return props.href ? <WhiteAnchor {...props} /> : <WhiteText {...props} />;
  }
}
