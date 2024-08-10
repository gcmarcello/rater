import { FieldValues } from "react-hook-form";
import { createContext, useContext } from "react";
import styled from "styled-components";
import { UseFormReturn } from "../hooks/useForm";
import { FormProvider } from "../context/form.ctx";

export type FormProps<Fields extends FieldValues> = Omit<
  React.ComponentProps<"form">,
  "onSubmit" | "id"
> & {
  hform: UseFormReturn<Fields>;
  onSubmit?: (data: Fields) => void;
};

export const Description = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #b4b4b4;
  flex: none;
  flex-grow: 0;
`;

export const Details = styled.span`
  display: flex;
  gap: 4px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  color: #b4b4b4;
  flex: none;
  order: 1;
  flex-grow: 0;
  font-size: 16px;
`;

export const FormBody = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
  flex-grow: 1;
`;

export const FormTitle = styled.h1`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 38px;
  text-align: center;
  color: #eeeeee;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;

  @media screen and (min-width: 1024px) {
    font-size: 32px;
  }
`;

export const Fieldset = styled.div`
  display: flex;
  flex-grow: 1;
  gap: 8px;
  flex-direction: column;
  align-items: center;
`;

export function Form<Fields extends FieldValues>({
  onSubmit,
  hform,
  ...props
}: FormProps<Fields>) {
  return (
    <FormProvider {...hform}>
      <FormBody
        onSubmit={
          onSubmit &&
          hform?.handleSubmit((data) => {
            hform.trigger();
            return onSubmit(typeof data === "object" ? { ...data } : data);
          })
        }
        id={hform.id}
        {...props}
      />
    </FormProvider>
  );
}
