import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { create } from "zustand";
import { useAuthModalStore } from "../../hooks/useAuthModalStore";

export default function AuthModal() {
  const { modalForm } = useAuthModalStore();

  return <>{modalForm === "login" ? <LoginForm /> : <SignupForm />}</>;
}
