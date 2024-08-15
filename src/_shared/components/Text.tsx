import React, { AnchorHTMLAttributes } from "react";
import styled from "styled-components";

export type TextProps = {
  size?: number;
  $variant?: "white" | "dark" | "gray";
  $weight?: 300 | 400 | 500 | 600 | 700;
  $color?: string;
  children: React.ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const WhiteText = styled.p<TextProps>`
  color: ${(props) => props.$color ?? "white"};
  font-weight: ${(props) => props.$weight ?? 600};
  font-size: ${(props) => `${props.size}px`};
  line-height: 20px;
`;

const DarkText = styled.p<TextProps>`
  color: ${(props) => props.$color ?? "#121212"};
  font-weight: ${(props) => props.$weight ?? 600};
  font-size: ${(props) => `${props.size}px`};
  line-height: 20px;
`;

const WhiteAnchor = styled.a<TextProps>`
  color: ${(props) => props.$color ?? "white"};
  font-weight: ${(props) => props.$weight ?? 600};
  font-size: ${(props) => `${props.size}px`};
  line-height: 20px;
`;

const DarkAnchor = styled.a<TextProps>`
  color: ${(props) => props.$color ?? "#121212"};
  font-weight: ${(props) => props.$weight ?? 600};
  font-size: ${(props) => `${props.size}px`};
  line-height: 20px;
`;

const GrayText = styled.p<TextProps>`
  color: ${(props) => props.$color ?? "rgba(180, 180, 180, 1)"};
  font-weight: ${(props) => props.$weight ?? 600};
  font-size: ${(props) => `${props.size}px`};
  line-height: 20px;
`;

const GrayAnchor = styled.a<TextProps>`
  color: ${(props) => props.$color ?? "rgba(180, 180, 180, 1)"};
  font-weight: ${(props) => props.$weight ?? 600};
  font-size: ${(props) => `${props.size}px`};
  line-height: 20px;
`;

export default function Text(props: TextProps) {
  switch (props.$variant) {
    case "white":
      return props.href ? <WhiteAnchor {...props} /> : <WhiteText {...props} />;
    case "dark":
      return props.href ? <DarkAnchor {...props} /> : <DarkText {...props} />;
    case "gray":
      return props.href ? <GrayAnchor {...props} /> : <GrayText {...props} />;
    default:
      return props.href ? <WhiteAnchor {...props} /> : <WhiteText {...props} />;
  }
}
