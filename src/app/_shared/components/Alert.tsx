import {
  Description,
  Dialog as _Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import Button from "./Button";
import styled, { keyframes } from "styled-components";
import {
  fadeInAnimation,
  slideInAnimation,
} from "../libs/styled-components/animations";

type AlertProps = {
  size?: "sm" | "md" | "lg";
};

export const AlertTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin-bottom: 16px;
`;

const AlertBackdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  z-index: 50;
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

const StyledAlertPanel = styled(DialogPanel)<AlertProps>`
  overflow-y: auto;
  display: flex;
  gap: 12px;
  flex-direction: column;
  background-color: rgba(18, 18, 18, 1);
  border-radius: 24px 24px 0 0;
  border: 2px solid rgba(35, 35, 35, 1);
  padding: 24px;
  animation: ${slideInAnimation} 0.5s linear;

  @media screen and (min-width: 1024px) {
    overflow: hidden;
    border-radius: 24px;
    border: 4px solid rgba(35, 35, 35, 1);
    animation: ${fadeInAnimation} 0.1s linear;
  }
`;

export const AlertActions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 16px;

  @media screen and (min-width: 1024px) {
    gap: 16px;
    flex-direction: row;
    justify-content: end;
  }
`;

export const AlertBody = styled(AlertTitle)`
  flex-grow: 1;
`;

export default function Alert({
  isOpen,
  setIsOpen,
  children,
  onClose,
}: {
  isOpen: boolean;
  setIsOpen: Function;
  children: React.ReactNode;
  onClose?: Function;
}) {
  return (
    <>
      <_Dialog
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
          onClose && onClose();
        }}
        className="relative z-50"
      >
        <AlertBackdrop>
          <StyledAlertPanel>{children}</StyledAlertPanel>
        </AlertBackdrop>
      </_Dialog>
    </>
  );
}
