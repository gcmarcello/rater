import styled from "styled-components";
import {
  Menu as HeadlessMenu,
  MenuButton as HeadlessMenuButton,
  MenuItems as HeadlessMenuItems,
  MenuItem as HeadlessMenuItem,
  MenuButtonProps,
  MenuItemProps,
  MenuItemsProps,
  MenuProps,
} from "@headlessui/react";
import { fadeInAnimation } from "@/_shared/libs/styled-components/animations";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { HTMLProps, ReactNode, useMemo } from "react";

const StyledDropdownButton = styled(HeadlessMenuButton)`
  display: flex;
  font-family: "Inter", sans-serif;
  flex-direction: row;
  justify-content: between;
  align-items: center;
  padding: 8px 16px;
  gap: 8px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  border: 0;
  cursor: pointer;
  background: #232323;
  color: #eeeeee;

  &:hover {
    &:not(:disabled) {
      background: #333333;
    }
  }
`;

const StyledDropdownItems = styled(HeadlessMenuItems)`
  margin-top: 8px;
  border-radius: 12px;
  padding: 6px 4px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: #232323;
  color: #eeeeee;
  width: 158px;
  animation: ${fadeInAnimation} 0.2s linear;
`;

const StyledDropdownItem = styled(HeadlessMenuItem)`
  font-weight: 600;
  display: flex;
  height: 36px;
  border-radius: 12px;
  padding: 8px;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  &:hover {
    background: #333333;
  }
`;

export function Dropdown(props: MenuProps) {
  return <HeadlessMenu {...props} />;
}

export function DropdownButton(props: MenuButtonProps) {
  return <StyledDropdownButton {...props} />;
}

export function DropdownItems(props: MenuItemsProps) {
  return <StyledDropdownItems {...props} />;
}

export function DropdownItem(
  props: MenuItemProps & { div?: HTMLProps<HTMLDivElement> }
) {
  return (
    <StyledDropdownItem {...props}>
      <div {...props.div}>{props.children as ReactNode}</div>
    </StyledDropdownItem>
  );
}
