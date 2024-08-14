import { FieldValues } from "react-hook-form";
import { UseFormReturn } from "../hooks/useForm";
import { createContext, useContext } from "react";

export function FormProvider<Fields extends FieldValues>({
  children,
  ...data
}: UseFormReturn<Fields> & { children: React.ReactNode }) {
  return (
    <FormContext.Provider value={data as unknown as UseFormReturn}>
      {children}
    </FormContext.Provider>
  );
}

const FormContext = createContext<UseFormReturn>(null!);

export function useFormContext<Fields extends FieldValues>() {
  return useContext(FormContext) as unknown as UseFormReturn<Fields>;
}
