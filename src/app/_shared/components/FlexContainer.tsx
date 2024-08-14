import styled from "styled-components";

type FlexProps = React.HTMLAttributes<HTMLDivElement> & {
  $gap?: number;
  $wrap?: "wrap" | "nowrap";
  $direction?: "row" | "column";
  $justify?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  $align?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
  $grow?: number;
};

const StyledFlexContainer = styled.div<FlexProps>`
  display: flex;
  gap: ${(props) => (props.$gap ? `${props.$gap}px` : 0)};
  flex-wrap: ${(props) => props.$wrap};
  justify-content: ${(props) => props.$justify};
  align-items: ${(props) => props.$align};
  flex-direction: ${(props) => props.$direction};
  flex-grow: ${(props) => props.$grow};
`;

export default function FlexContainer(props: FlexProps) {
  return <StyledFlexContainer {...props} />;
}
