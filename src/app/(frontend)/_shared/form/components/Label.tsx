import { styled } from "styled-components";
import { useField } from "../hooks/useField";

const StyledLabel = styled.div`
  color: white;
  font-size: 14px;
  font-weight: 600;
  margin-top: 4px;
`;

const Asterisk = styled.span`
  color: rgba(225, 29, 72, 1);
`;

export default function Label({ children }: { children: React.ReactNode }) {
  const { isRequired } = useField();
  return (
    <StyledLabel>
      {children} {isRequired && <Asterisk>*</Asterisk>}
    </StyledLabel>
  );
}
