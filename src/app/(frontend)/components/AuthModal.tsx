import { useState } from "react";
import LoginForm from "./Login/LoginForm";
import SignupForm from "./Signup/SignupForm";
import { create } from "zustand";
import { useAuthModalStore } from "../hooks/useAuthModalStore";

export default function AuthModal() {
  const { modalForm } = useAuthModalStore();

  return <>{modalForm === "login" ? <LoginForm /> : <SignupForm />}</>;
}
