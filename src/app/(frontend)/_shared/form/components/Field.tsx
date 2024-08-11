import { FieldValues, Path } from "react-hook-form";
import {
  Field as HeadlessField,
  FieldsetProps,
  Fieldset as HeadlessFieldset,
} from "@headlessui/react";
import styled from "styled-components";
import { getEntryFromPath } from "@/app/(frontend)/_shared/form/functions/getEntryFromPath";
import { createContext, useContext, useId } from "react";
import { getZodFields } from "@/app/libs/zod/getFieldsFromSchema";
import { FieldContext } from "../hooks/useField";
import { useFormContext } from "../context/form.ctx";

export type FieldProps<Fields extends FieldValues> = FieldsetProps & {
  name: Path<Fields>;
  type?: "checkbox" | "radio" | "text" | "textarea" | "select";
};

const StyledField = styled(HeadlessField)<FieldProps<FieldValues>>`
  display: flex;
  flex-direction: ${(props) => (props.type === "checkbox" ? "row" : "column")};
  align-items: ${(props) =>
    props.type === "checkbox" ? "center" : "flex-start"};
  gap: 4px;
  width: 100%;
  margin: 0;
  border: 0;
`;

const StyledCheckboxField = styled(HeadlessField)``;

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
    type: props.type,
    id: useId(),
  };

  return (
    <FieldContext.Provider value={fieldContextValue}>
      <StyledField name={name} {...props} />
    </FieldContext.Provider>
  );
}
