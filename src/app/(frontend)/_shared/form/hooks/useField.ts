import { createContext, useContext } from "react";

export const FieldContext = createContext<{
  id: string;
  error: string;
  name: string;
  isRequired: boolean;
  type?: "checkbox" | "radio" | "text" | "textarea" | "select";
}>(null!);

export function useField() {
  return useContext(FieldContext);
}
