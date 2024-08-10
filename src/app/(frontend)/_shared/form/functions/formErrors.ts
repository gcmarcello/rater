import { FieldValues, Path } from "react-hook-form";
import { UseFormReturn } from "../hooks/useForm";

type MutationError<T extends FieldValues> = {
  message: string;
  validation?: string;
  code?: string;
  path?: ("root" | `root.${string}` | Path<T>)[];
};

type FormFields<T> = T extends FieldValues ? T : FieldValues;

export function handleFormError<T>(
  error: any,
  form?: UseFormReturn<FormFields<T>>
) {
  const parsedErrors = error as MutationError<FormFields<T>>[];

  if (form) {
    if (!parsedErrors?.length) return;

    for (const err of parsedErrors) {
      const path =
        (typeof err.path === "string"
          ? err.path
          : (err.path?.join(".") as Path<FormFields<T>>)) ?? "root.serverError";
      form.setError(path, {
        message: err.message,
      });
    }
  }
  return parsedErrors;
}
