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
import SearchForm from "./SearchForm";
import { useFetch } from "@/_shared/libs/swr/fetcher";
import { Genre } from "@prisma/client";
import { useGlobalStore } from "@/_shared/hooks/useGlobalStore";

const HeaderContainer = styled.div`
  width: 100dvw;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  gap: 12px;
`;

export default function Header() {
  const auth = useNextStore(useAuthStore, (state) => state);
  const { setGenres } = useGlobalStore();

  const { isAuthModalOpen, setIsAuthModalOpen } = useAuthModalStore();

  const { data } = useFetch<Genre[]>("/api/genres", {
    onSuccess: (data) => setGenres(data),
  });

  return (
    <HeaderContainer>
      <Link href="/">
        <Image src="/Logo.png" width={128} height={36} alt="Logo" />
      </Link>
      <SearchForm />
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
