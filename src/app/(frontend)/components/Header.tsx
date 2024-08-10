"use client";
import styled, { keyframes } from "styled-components";
import Button from "../_shared/components/Button";
import Dialog from "@/app/(frontend)/_shared/components/Dialog";
import { useState } from "react";
import LoginForm from "./Login/LoginForm";
import Text from "../_shared/components/Text";
import Image from "next/image";
import { useAuthStore } from "../hooks/useAuthStore";
import useNextStore from "../hooks/useNextStore";
import { Spinner } from "../_shared/components/Spinner";
import { ProfileDropdown } from "./ProfileDropdown";
import { useGlobalStore } from "../hooks/useGlobalStore";

const HeaderContainer = styled.div`
  width: 100dvw;
  display: flex;
  justify-content: space-between;
  padding: 24px;
`;

export default function Header() {
  const auth = useNextStore(useAuthStore, (state) => state);

  const { isAuthModalOpen, setIsAuthModalOpen } = useGlobalStore();

  return (
    <HeaderContainer>
      <Image src="/Logo.png" width={128} height={36} alt="Logo" />
      {auth ? (
        auth.getSession() ? (
          <ProfileDropdown userName={auth.getSession()?.name} />
        ) : (
          <>
            <Button
              onClick={() => setIsAuthModalOpen(true)}
              variant="secondary"
            >
              <Text variant="white">Login</Text>
            </Button>
            <Dialog isOpen={isAuthModalOpen} setIsOpen={setIsAuthModalOpen}>
              <LoginForm />
            </Dialog>
          </>
        )
      ) : (
        <Spinner />
      )}
    </HeaderContainer>
  );
}
