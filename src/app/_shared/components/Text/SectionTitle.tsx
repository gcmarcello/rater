import styled from "styled-components";
import Text, { TextProps } from "../Text";
import React from "react";

const StyledSectionTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 4px solid;
  border-top: 0;
  border-right: 0;
  border-bottom: 0;
  max-height: 24px;
  border-radius: 2px;
  padding-left: 8px;
  flex-grow: 1;
  border-color: #eeeeee;
`;

export default function SectionTitle(
  props: React.HTMLAttributes<HTMLDivElement>
) {
  return <StyledSectionTitle {...props} />;
}
