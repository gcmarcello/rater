import {
  Checkbox as HeadlessCheckbox,
  CheckboxProps as HeadlessCheckboxProps,
} from "@headlessui/react";
import { useFormContext } from "../context/form.ctx";
import { useField } from "../hooks/useField";
import { Controller } from "react-hook-form";
import styled from "styled-components";
import { CheckIcon } from "@heroicons/react/24/solid";

type CheckboxProps = HeadlessCheckboxProps & {
  $variant?: "normal" | "error";
  $pill?: boolean;
  invalid?: boolean;
};

const StyledCheckmark = styled(CheckIcon)`
  position: absolute;
  pointer-events: none;
  color: #eeeeee;
`;

const StyledCheckbox = styled(HeadlessCheckbox)<CheckboxProps>`
  ${(props) =>
    props.$pill
      ? `
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 4.5px 12px;
    font-size: 12px;
    color: rgba(180, 180, 180, 1);
    font-weight: 400;
    border: 2px solid #313131;
    border-radius: 99px;
    flex: none;
    order: 2;
    flex-grow: 0;
    cursor: pointer;
    background-color: ${
      props.value ? "rgba(136, 136, 136, 0.5)" : "rgba(0, 0, 0, 0.801)"
    };
  `
      : `
    position: relative;
    cursor: pointer;
    height: 16px;
    width: 16px;
    border-radius: 4px;
    background-color: ${
      props.value ? "rgba(136, 136, 136, 0.5)" : "rgba(0, 0, 0, 0.801)"
    };
  `}
`;

export default function Checkbox(props: CheckboxProps) {
  const form = useFormContext();
  if (!form) throw new Error("Checkbox must be used inside a form");
  const field = useField();
  if (!field) throw new Error("Checkbox must be used inside a field");

  const { name, error, id } = field;

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field: { onChange: fieldOnChange, value, ...field } }) => (
        <>
          <StyledCheckbox
            $variant={error ? "error" : "normal"}
            onChange={(checked: boolean) => {
              props.onChange && props.onChange(checked);
              fieldOnChange(checked);
            }}
            value={value || ""}
            id={id}
            {...props}
            {...field}
          />

          {form.watch(name) && !props.$pill && (
            <StyledCheckmark height={16} width={16} />
          )}
        </>
      )}
    />
  );
}
