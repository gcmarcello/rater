import { ReactHTML, ReactHTMLElement } from "react";
import styled from "styled-components";

const IndicatorComponent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px;
  gap: 8px;
  border-radius: 12px;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.5);
  }
  &:active {
    background: rgba(255, 255, 255, 0.1);
  }
`;

export default function Indicator(
  props: React.HTMLAttributes<HTMLDivElement> & {
    ref?: React.RefObject<HTMLDivElement>;
  }
) {
  return <IndicatorComponent {...props} />;
}
