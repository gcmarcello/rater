import { FieldValues, Path } from "react-hook-form";
import { useCallback, useId } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm as useReactHookForm,
  UseFormProps as useReactHookFormProps,
} from "react-hook-form";
import { ZodSchema } from "zod";
import { FieldProps } from "@headlessui/react";
import { INTERNAL_Field } from "../components/Field";

type UseFormProps<Fields extends FieldValues> = Omit<
  useReactHookFormProps<Fields>,
  "resolver"
> & {
  id?: string;
  schema: ZodSchema<Fields>;
};

type _FieldProps<Fields extends FieldValues> = FieldProps<any> & {
  name: Path<Fields>;
};

export type UseFormReturn<Fields extends FieldValues = FieldValues> = Omit<
  ReturnType<typeof useForm<Fields>>,
  "Field"
> & {
  Field?: (props: _FieldProps<Fields>) => JSX.Element;
};

export function useForm<Fields extends FieldValues>({
  schema,
  id,
  ...useReactHookFormProps
}: UseFormProps<Fields>) {
  const _id = useId();

  const Field = useCallback(
    (props: _FieldProps<Fields>) => INTERNAL_Field({ ...props }),
    []
  );

  return {
    id: id ?? _id,
    schema,
    Field,
    ...useReactHookForm<Fields>({
      ...useReactHookFormProps,
      resolver: zodResolver(schema),
    }),
  };
}
