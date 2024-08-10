"use server";
import { cookies } from "next/headers";
import * as jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import { ServerResponse } from "../classes/ServerResponse";
import { Session } from "@/app/types/Session";

export async function logout() {
  cookies().delete("token");
  return redirect("/");
}
