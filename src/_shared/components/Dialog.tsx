import { Dialog as _Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import styled from "styled-components";

import {
  fadeInAnimation,
  slideInAnimation,
} from "../libs/styled-components/animations";
import { HideOnDesktop } from "./MediaQuery";
import { XMarkIcon } from "@heroicons/react/24/solid";

type DialogProps = {
  size?: "sm" | "md" | "lg";
};

export const DialogHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin-bottom: 16px;
`;

const DialogBackdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  width: 100vw;
  align-items: end;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  animation: ${fadeInAnimation} 0.2s linear;

  @media screen and (min-width: 1024px) {
    align-items: center;
    padding: 1rem;
  }
`;

const StyledDialogPanel = styled(DialogPanel)<DialogProps>`
  min-width: 100dvw;
  max-height: 100dvh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  min-height: 60vh;
  background-color: rgba(18, 18, 18, 1);
  border-radius: 24px 24px 0 0;
  border: 2px solid rgba(35, 35, 35, 1);
  padding: 24px;
  animation: ${slideInAnimation} 0.5s linear;

  @media screen and (min-width: 1024px) {
    overflow: hidden;
    min-width: 24dvw;
    width: ${(props) => {
      switch (props.size) {
        case "lg":
          return "62dvw";
        case "md":
          return "50dvw";
        case "sm":
          return "24dvw";
        default:
          return "24dvw";
      }
    }};
    border-radius: 24px;
    border: 4px solid rgba(35, 35, 35, 1);
    animation: ${fadeInAnimation} 0.1s linear;
  }
`;

export const DialogActions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 16px;

  @media screen and (min-width: 1024px) {
    gap: 16px;
    justify-content: end;
  }
`;

export const DialogBody = styled(DialogTitle)`
  flex-grow: 1;
`;

export const DialogTopbar = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`;

export default function Dialog({
  isOpen,
  setIsOpen,
  children,
  size = "sm",
}: {
  isOpen: boolean;
  setIsOpen: Function;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <>
      <_Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop>
          <StyledDialogPanel size={size}>
            <HideOnDesktop>
              <DialogTopbar>
                <XMarkIcon
                  onClick={() => setIsOpen(false)}
                  height={24}
                  width={24}
                />
              </DialogTopbar>
            </HideOnDesktop>
            {children}
          </StyledDialogPanel>
        </DialogBackdrop>
      </_Dialog>
    </>
  );
}
