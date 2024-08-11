import { styled } from "styled-components";
import { useField } from "../hooks/useField";
import {
  Label as HeadlessLabel,
  LabelProps as HeadlessLabelProps,
} from "@headlessui/react";

const Asterisk = styled.span`
  color: rgba(225, 29, 72, 1);
`;

export default function Label(
  props: HeadlessLabelProps & { children: React.ReactNode }
) {
  const { isRequired, type, name, id } = useField();

  const StyledLabel = styled(HeadlessLabel)`
    color: white;
    font-size: 14px;
    font-weight: ${() => (type === "checkbox" ? "500" : "600")};
  `;

  return (
    <StyledLabel htmlFor={id}>
      {props.children} {isRequired && <Asterisk>*</Asterisk>}
    </StyledLabel>
  );
}
