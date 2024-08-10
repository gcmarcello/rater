import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import {
  Dropdown,
  DropdownButton,
  DropdownItems,
  DropdownItem,
} from "../_shared/components/Dropdown";
import {
  UserIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import styled from "styled-components";
import { HTMLProps } from "react";
import useNextStore from "../hooks/useNextStore";
import { useAuthStore } from "../hooks/useAuthStore";

const StyledDropdownOption = styled.div`
  cursor: pointer;
`;

export function DropdownOption(props: HTMLProps<HTMLDivElement>) {
  return <StyledDropdownOption {...props} />;
}

export function ProfileDropdown({ userName }: { userName?: string }) {
  const auth = useNextStore(useAuthStore, (state) => state);
  return (
    <Dropdown>
      {(props) => (
        <>
          <DropdownButton>
            {userName ?? "Minha Conta"}{" "}
            {props.open ? (
              <ChevronUpIcon height={20} width={20} />
            ) : (
              <ChevronDownIcon height={20} width={20} />
            )}
          </DropdownButton>
          <DropdownItems anchor="bottom">
            <DropdownItem>
              <UserIcon height={20} width={20} /> Perfil
            </DropdownItem>
            <DropdownItem div={{ onClick: () => auth?.logout() }}>
              <ArrowRightStartOnRectangleIcon height={20} width={20} />{" "}
              Desconectar
            </DropdownItem>
          </DropdownItems>
        </>
      )}
    </Dropdown>
  );
}
