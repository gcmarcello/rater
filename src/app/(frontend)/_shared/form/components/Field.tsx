import { FieldValues, Path } from "react-hook-form";
import {
  Field as HeadlessField,
  FieldsetProps,
  Fieldset as HeadlessFieldset,
} from "@headlessui/react";
import styled from "styled-components";
import { getEntryFromPath } from "@/app/(frontend)/_shared/form/functions/getEntryFromPath";
import { createContext, useContext } from "react";
import { getZodFields } from "@/app/libs/zod/getFieldsFromSchema";
import { FieldContext } from "../hooks/useField";
import { useFormContext } from "../context/form.ctx";

const StyledField = styled(HeadlessFieldset)`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  flex-grow: 1;
  margin: 0;
  border: 0;
`;

export type FieldProps<Fields extends FieldValues> = FieldsetProps & {
  name: Path<Fields>;
};

export function INTERNAL_Field<Fields extends FieldValues>({
  name,
  className,
  ...props
}: FieldProps<Fields>) {
  const form = useFormContext();
  if (!form) {
    throw new Error("INTERNAL_Field must be used inside a Form component");
  }
  const {
    formState: { errors },
    schema,
  } = form;

  const zodField = getZodFields(schema)[name];
  const isRequired = !zodField?.isOptional();
  const error = getEntryFromPath(errors, name).entryValue?.message;

  const fieldContextValue = {
    name,
    error: error,
    isRequired,
  };

  return (
    <FieldContext.Provider value={fieldContextValue}>
      <StyledField {...props} />
    </FieldContext.Provider>
  );
}
