import styled from "styled-components";
import Text, { TextProps } from "../Text";

const StyledSectionTitle = styled(Text)`
  display: flex;
  align-items: center;
  border: 4px solid;
  border-top: 0;
  border-right: 0;
  border-bottom: 0;
  max-height: 24px;
  border-radius: 2px;
  padding-left: 8px;
  flex-grow: 1;
`;

export default function SectionTitle(props: TextProps) {
  return <StyledSectionTitle {...props} />;
}
