"use client";
import styled, { keyframes } from "styled-components";
import Image from "next/image";
import { useAuthStore } from "../../hooks/useAuthStore";
import useNextStore from "../../hooks/useNextStore";
import { ProfileDropdown } from "./ProfileDropdown";
import { useAuthModalStore } from "../../hooks/useAuthModalStore";
import AuthModal from "../Auth/AuthModal";
import ProfileModal from "./ProfileModal";
import Button from "../Button";
import Text from "../Text";
import Dialog from "../Dialog";
import { Spinner } from "../Spinner";
import Link from "next/link";

const HeaderContainer = styled.div`
  width: 100dvw;
  display: flex;
  justify-content: space-between;
  padding: 24px;
`;

export default function Header() {
  const auth = useNextStore(useAuthStore, (state) => state);

  const { isAuthModalOpen, setIsAuthModalOpen } = useAuthModalStore();

  return (
    <HeaderContainer>
      <Link href="/">
        <Image src="/Logo.png" width={128} height={36} alt="Logo" />
      </Link>
      {auth ? (
        auth.getSession() ? (
          <>
            <ProfileDropdown userName={auth.getSession()?.name} />
            <ProfileModal />
          </>
        ) : (
          <>
            <Button
              onClick={() => setIsAuthModalOpen(true)}
              $variant="secondary"
            >
              <Text $variant="white">Login</Text>
            </Button>
            <Dialog isOpen={isAuthModalOpen} setIsOpen={setIsAuthModalOpen}>
              <AuthModal />
            </Dialog>
          </>
        )
      ) : (
        <Spinner />
      )}
    </HeaderContainer>
  );
}
