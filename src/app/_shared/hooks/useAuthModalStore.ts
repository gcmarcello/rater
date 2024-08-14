import { create } from "zustand";

export type AuthModalStoreProps = {
  isAuthModalOpen: boolean;
  modalForm: "login" | "signup";
  setModalForm: (form: "login" | "signup") => void;
  setIsAuthModalOpen: (isOpen: boolean) => void;
};

export const useAuthModalStore = create<AuthModalStoreProps>((set) => ({
  isAuthModalOpen: false,
  setIsAuthModalOpen: (isOpen: boolean) => {
    set({ isAuthModalOpen: isOpen, modalForm: "login" });
  },
  modalForm: "login",
  setModalForm: (form: "login" | "signup") => set({ modalForm: form }),
}));
