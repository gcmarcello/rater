import { Validation } from "../../decorators/Validation";
import { loginDto, LoginDto, SignupDto, signupDto } from "./dto";
import prisma from "../../infrastructure/prisma";
import { type ParsedRequest } from "../../../types/Request";
import { compareData, hashData } from "../../utils/bcrypt";
import * as jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { Session } from "@/app/types/Session";

export class AuthService {
  @Validation(signupDto)
  static async signup(request: ParsedRequest<SignupDto>) {
    const body = request.parsedBody;
    const existingEmail = await prisma.user.findUnique({
      where: { email: body.email.toLocaleLowerCase() },
    });
    if (existingEmail) {
      throw { path: "email", message: "Email já existe.", status: 409 };
    }

    await prisma.user.create({
      data: {
        email: body.email,
        password: hashData(body.password),
        name: body.name,
      },
    });
    return { message: "Usuário criado com sucesso." };
  }

  @Validation(loginDto)
  static async login(request: ParsedRequest<LoginDto>) {
    const body = request.parsedBody;
    const existingUser = await prisma.user.findUnique({
      where: { email: body.email.toLocaleLowerCase() },
    });
    if (!existingUser || !compareData(body.password, existingUser.password)) {
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
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
    cookies().set("token", token, {
      secure: true,
      sameSite: "strict",
      httpOnly: true,
      expires,
    });
    return { name: existingUser.name, exp: expires };
  }
}
