import styled from "styled-components";

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 24px 0;
  width: 100%;
`;

export function Section({ children }: { children: React.ReactNode }) {
  return <StyledSection>{children}</StyledSection>;
}
