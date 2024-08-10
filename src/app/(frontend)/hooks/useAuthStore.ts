import { logout } from "@/app/api/auth/action";
import { Session } from "@/app/types/Session";
import dayjs from "dayjs";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type AuthStoreProps = {
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (isOpen: boolean) => void;
  session: Session | null;
  getSession: () => Session | null;
  login: (session: Session) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStoreProps>()(
  persist(
    (set, get) => ({
      isAuthModalOpen: false,
      setIsAuthModalOpen: (isOpen: boolean) => set({ isAuthModalOpen: isOpen }),
      session: null,
      getSession: () => {
        const currentSession = get().session;
        if (!currentSession) return null;
        if (dayjs().isAfter(dayjs(currentSession.exp))) {
          set({ session: null });
          return null;
        }
        return get().session;
      },
      login: (session: Session) => set({ session }),
      logout: async () => {
        try {
          await logout();
          set({ session: null });
        } catch (error) {
          console.error(error);
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
