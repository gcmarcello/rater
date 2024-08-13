import { LoginDto, SignupDto } from "./dto";
import prisma from "../../infrastructure/prisma";
import { compareData, hashData } from "../../utils/bcrypt";
import * as jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { Session } from "@/app/types/Session";
import dayjs from "dayjs";

export class AuthService {
  async signup(data: SignupDto) {
    const existingEmail = await prisma.user.findUnique({
      where: { email: data.email.toLocaleLowerCase() },
    });
    if (existingEmail) {
      throw { path: "email", message: "Email já existe.", status: 409 };
    }

    await prisma.user.create({
      data: {
        email: data.email,
        password: hashData(data.password),
        name: data.name,
      },
    });
    return { message: "Usuário criado com sucesso." };
  }

  async login(data: LoginDto) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email.toLocaleLowerCase() },
    });
    if (!existingUser || !compareData(data.password, existingUser.password)) {
      throw {
        message: "Email ou senha inválidos.",
        path: "password",
        status: 401,
      };
    }
    const token = jwt.sign(
      { id: existingUser.id, name: existingUser.name } as Session,
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      }
    );
    const expires = dayjs().add(7, "day").diff(0, "s");
    cookies().set("token", token, {
      sameSite: "strict",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });
    return { name: existingUser.name, exp: expires, id: existingUser.id };
  }
}
