import { styled } from "styled-components";
import { useFormContext } from "../context/form.ctx";
import { Spinner } from "../../Spinner";
import Button from "../../Button";

const StyledSubmitButton = styled(Button)`
  @media screen and (min-width: 1024px) {
    width: auto;
  }
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
