import styled from "styled-components";

const StyledSeparator = styled.div`
  width: 100%;
  height: 2px;
  background: #3a3a3a;
  border-radius: 99px;
  flex: none;
  margin: 2px;
`;

export default function Separator() {
  return <StyledSeparator />;
}
