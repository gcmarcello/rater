import { Spinner } from "../../../_shared/components/Spinner";
import Button from "../../../_shared/components/Button";
import { styled } from "styled-components";
import { useFormContext } from "../context/form.ctx";

const StyledSubmitButton = styled(Button)`
  width: 100%;
  padding: 16px 0;
  max-width: 400px;
`;

export function SubmitButton(props: React.ComponentProps<typeof Button>) {
  const form = useFormContext();
  if (!form)
    throw new Error("SubmitButton must be used inside a Form component");

  return (
    <StyledSubmitButton
      type="submit"
      disabled={form.formState.isSubmitting || form.formState.isLoading}
      {...props}
    >
      {props.children} {form.formState.isSubmitting && <Spinner />}
    </StyledSubmitButton>
  );
}
