import { styled } from "styled-components";
import { useField } from "../hooks/useField";
import { useFormContext } from "../context/form.ctx";

const StyledErrorMessage = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: rgba(225, 29, 72, 1);
`;

export default function ErrorMessage() {
  const field = useField();
  const form = useFormContext();

  if (!field && !form)
    throw new Error(
      "ErrorMessage must be used inside a Field component or a Form component"
    );

  return (
    <StyledErrorMessage>
      {field?.error ?? form.formState.errors.root?.serverError.message}
    </StyledErrorMessage>
  );
}
