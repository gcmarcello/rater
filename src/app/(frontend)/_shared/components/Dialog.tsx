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
} from "@/app/libs/styled-components/animations";

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

const StyledDialogPanel = styled(DialogPanel)`
  width: 100dvw;
  display: flex;
  flex-direction: column;
  min-height: 60vh;
  background-color: rgba(18, 18, 18, 1);
  border-radius: 24px 24px 0 0;
  border: 2px solid rgba(35, 35, 35, 1);
  padding: 24px;
  animation: ${slideInAnimation} 0.5s linear;

  @media screen and (min-width: 1024px) {
    border-radius: 24px;
    border: 4px solid rgba(35, 35, 35, 1);
    max-width: 32rem;
    animation: ${fadeInAnimation} 0.1s linear;
  }
`;

export default function Dialog({
  isOpen,
  setIsOpen,
  children,
}: {
  isOpen: boolean;
  setIsOpen: Function;
  children: React.ReactNode;
}) {
  return (
    <>
      <_Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop>
          <StyledDialogPanel>{children}</StyledDialogPanel>
        </DialogBackdrop>
      </_Dialog>
    </>
  );
}
