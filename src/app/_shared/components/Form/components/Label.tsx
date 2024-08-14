import { styled } from "styled-components";
import { useField } from "../hooks/useField";
import {
  Label as HeadlessLabel,
  LabelProps as HeadlessLabelProps,
} from "@headlessui/react";

export type LabelProps = HeadlessLabelProps & {
  type?: "checkbox" | "radio" | "text" | "number" | "email" | "password";
  children: React.ReactNode;
};

const Asterisk = styled.span`
  color: rgba(225, 29, 72, 1);
`;

const StyledLabel = styled(HeadlessLabel)<LabelProps>`
  color: white;
  font-size: 14px;
  font-weight: ${(props) => (props.type === "checkbox" ? "500" : "600")};
`;

export default function Label(props: LabelProps) {
  const { isRequired, type, name, id } = useField();

  return (
    <StyledLabel type={props.type} htmlFor={id}>
      {props.children} {isRequired && <Asterisk>*</Asterisk>}
    </StyledLabel>
  );
}
