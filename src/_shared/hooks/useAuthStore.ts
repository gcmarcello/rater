import { logout } from "@/app/api/auth/action";
import { Session } from "@/_shared/types/Session";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { create, createStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type AuthStoreProps = {
  session: Session | null;
  getSession: () => Session | null;
  login: (session: Session) => void;
  setSession: (session: Session | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStoreProps>()(
  persist(
    (set, get) => ({
      session: null,
      setSession: (session: Session | null) => set({ session }),
      getSession: () => {
        const currentSession = get().session;
        if (!currentSession?.exp) return null;
        if (dayjs().isAfter(dayjs.unix(currentSession.exp * 1000))) {
          set({ session: null });
          return null;
        }
        return get().session;
      },
      login: (session: Session) => set({ session }),
      logout: async () => {
        await logout();
        set({ session: null });
      },
    }),

    {
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => !["foo"].includes(key))
        ),
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
