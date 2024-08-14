"use client";
import { useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import useNextStore from "../_shared/hooks/useNextStore";
import { useAuthStore } from "../_shared/hooks/useAuthStore";

export function AuthWatcher() {
  const auth = useNextStore(useAuthStore, (state) => state);

  async function triggerLogout() {
    localStorage.removeItem("auth-storage");
    auth?.setSession(null);
    toast.error("Sessão expirada, faça login novamente!");
  }

  useEffect(() => {
    window.addEventListener("storage", triggerLogout);

    return () => {
      window.removeEventListener("storage", triggerLogout);
    };
  }, [auth]);

  return <></>;
}
