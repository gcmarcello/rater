import React, { AnchorHTMLAttributes } from "react";
import styled from "styled-components";

type TextProps = {
  size?: number;
  variant?: "white" | "dark";
  children: React.ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const WhiteText = styled.p<TextProps>`
  color: white;
  font-weight: 600;
  size: ${(props) => `${props.size}px`};
`;

const DarkText = styled.p<TextProps>`
  color: #121212;
  font-weight: 600;
  size: ${(props) => `${props.size}px`};
`;

const WhiteAnchor = styled.a<TextProps>`
  color: white;
  font-weight: 600;
  size: ${(props) => `${props.size}px`};
`;

const DarkAnchor = styled.a<TextProps>`
  color: #121212;
  font-weight: 600;
  size: ${(props) => `${props.size}px`};
`;

export default function Text(props: TextProps) {
  switch (props.variant) {
    case "white":
      return props.href ? <WhiteAnchor {...props} /> : <WhiteText {...props} />;
    case "dark":
      return props.href ? <DarkAnchor {...props} /> : <DarkText {...props} />;
  }
}
