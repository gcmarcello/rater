import { createContext, useContext } from "react";

export const FieldContext = createContext<{
  error: string;
  name: string;
  isRequired: boolean;
}>(null!);

export function useField() {
  return useContext(FieldContext);
}
