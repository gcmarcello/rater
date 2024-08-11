import { styled } from "styled-components";
import {
  Input as HeadlessInput,
  Button as HeadlessButton,
  InputProps as HeadlessInputProps,
} from "@headlessui/react";
import { Controller } from "react-hook-form";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useField } from "../hooks/useField";
import { useFormContext } from "../context/form.ctx";

type InputProps = {
  type?: "email" | "number" | "password" | "search" | "tel" | "text" | "url";
  variant?: "normal" | "error";
};

const StyledInput = styled(HeadlessInput)<InputProps>`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0 2px 0;
  background-color: #313131;
  border-radius: 12px;
  height: 48px;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 400;
  flex-grow: 1;

  border: ${(props) =>
    props.variant === "error" ? "2px solid rgba(225, 29, 72, 1)" : "0"};

  &:disabled {
    color: #585858;
  }
`;

const HidePasswordButton = styled(EyeSlashIcon)`
  position: absolute;
  height: 24px;
  width: 24px;
  right: 10px;
  top: 20px;
  z-index: 999;
  cursor: pointer;
  color: #585858;
`;

const ShowPasswordButton = styled(EyeIcon)`
  position: absolute;
  height: 24px;
  width: 24px;
  right: 10px;
  top: 20px;
  z-index: 999;
  cursor: pointer;
  color: #585858;
`;

const InputSpan = styled.span`
  position: relative;
  flex-grow: 1;
  width: 100%;
`;

export default function Input({
  className,
  mask,
  onChange,
  loading,
  type = "text",
  icon,
  ...props
}: {
  loading?: boolean;
  mask?: MaskType;
  icon?: React.ReactNode;
} & HeadlessInputProps &
  InputProps) {
  const form = useFormContext();
  const [showPassword, setShowPassword] = useState(!(type === "password"));
  const { name, error, isRequired, id } = useField();

  return (
    <InputSpan>
      <Controller
        name={name}
        control={form.control}
        render={({ field: { onChange: fieldOnChange, value, ...field } }) => (
          <>
            <StyledInput
              variant={error ? "error" : "normal"}
              onChange={(e: Event) => {
                const value = (e.target as any)?.value;
                onChange && onChange(value);
                fieldOnChange(
                  mask
                    ? formatWithMask(value, mask)
                    : type === "number"
                    ? Number(value)
                    : value
                );
              }}
              invalid={Boolean(error)}
              disabled={loading}
              value={value || ""}
              id={id}
              type={
                type === "password"
                  ? showPassword
                    ? "text"
                    : "password"
                  : type
              }
              {...props}
              {...field}
            ></StyledInput>

            {type === "password" &&
              (!showPassword ? (
                <ShowPasswordButton
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                />
              ) : (
                <HidePasswordButton
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                />
              ))}

            {/* {loading && (
          <div className="absolute right-2 top-2.5 text-gray-400">
            <ButtonSpinner />
          </div>
        )} */}

            {/* {icon && (
          <div className="absolute left-2 top-2 text-gray-400">{icon}</div>
        )} */}
          </>
        )}
      />
    </InputSpan>
  );
}

export type MaskType =
  | string
  | ((maskedValue: string, rawValue: string) => string | null)
  | null;

export const formatWithMask = (string: string, mask: MaskType) => {
  const fieldValue = string;

  // Strip current formatting to get the raw value
  const rawValue = fieldValue.replace(/[^0-9a-zA-Z]/g, "");

  if (typeof mask === "function") {
    mask = mask(fieldValue, rawValue);
  }

  if (!mask) return fieldValue;

  let formattedValue = "";
  let inputIndex = 0;
  let maskIndex = 0;

  while (inputIndex < rawValue.length && maskIndex < mask.length) {
    const maskChar = mask[maskIndex];
    const inputChar = rawValue[inputIndex];

    if (maskChar === "9") {
      if (!/\d/.test(inputChar || "")) {
      }
      formattedValue += inputChar;
      inputIndex++;
    } else if (maskChar === "a") {
      if (!/[a-zA-Z]/.test(inputChar || "")) {
      }
      formattedValue += inputChar;
      inputIndex++;
    } else if (maskChar === "*") {
      formattedValue += inputChar;
      inputIndex++;
    } else {
      formattedValue += maskChar;
    }
    maskIndex++;
  }

  return formattedValue;
};
