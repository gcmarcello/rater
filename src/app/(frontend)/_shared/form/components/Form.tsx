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
  flex-grow: 1;
`;

export const FormTitle = styled.h1`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 38px;
  color: #eeeeee;
  flex: none;

  @media screen and (min-width: 1024px) {
    font-size: 32px;
  }
`;

export const Fieldset = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FieldGroup = styled.div`
  display: flex;
  gap: 4px;
  flex-direction: column;
  margin: 4px 0;
  @media screen and (min-width: 1024px) {
    display: flex;
    flex-direction: row;
    gap: 12px;
  }
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
