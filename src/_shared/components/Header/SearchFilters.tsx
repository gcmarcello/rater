import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import styled from "styled-components";
import Text from "../Text";
import { useGlobalStore } from "@/_shared/hooks/useGlobalStore";
import GenrePill from "../GenrePill";
import FlexContainer from "../FlexContainer";
import { useFormContext } from "../Form/context/form.ctx";
import { SearchDto } from "@/app/api/search/dto";
import { Checkbox } from "@headlessui/react";
import { useMemo } from "react";

export const StyledFiltersButton = styled(PopoverButton)`
  min-width: 48px;
  height: 48px;
  border: none;
  padding: 6px;
  border-radius: 100%;
  z-index: 999;

  cursor: pointer;
  color: white;
  background-color: rgba(35, 35, 35, 1);

  &:hover {
    background-color: rgba(161, 161, 161, 0.3);
  }
`;

export const StyledFiltersPanel = styled(PopoverPanel)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 12px;
  gap: 12px;
  background: #191919;
  border-radius: 24px;
  max-width: 375px !important;
`;

export const StyledGenreCheckbox: typeof Checkbox = styled(Checkbox)`
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
  background-color: ${(props) => {
    return props.value ? "rgba(136, 136, 136, 0.5)" : "rgba(0, 0, 0, 0.801)";
  }};
`;

const StyledActiveFilters = styled.div`
  position: absolute;
  background: rgba(110, 110, 110, 1);
  height: 16px;
  width: 16px;
  border-radius: 99px;
  padding: 4px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function ActiveFilters({ filters }: { filters: number }) {
  return <StyledActiveFilters>{filters}</StyledActiveFilters>;
}
