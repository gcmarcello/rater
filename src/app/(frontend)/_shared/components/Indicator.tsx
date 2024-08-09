import styled from "styled-components";

const IndicatorComponent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: auto;
  padding: 8px;
  gap: 8px;
  border-radius: 12px;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.3);
`;

export default function Indicator({ children }: { children: React.ReactNode }) {
  return <IndicatorComponent>{children}</IndicatorComponent>;
}
