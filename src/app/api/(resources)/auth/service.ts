import { Validation } from "../../decorators/Validation";
import { loginDto, LoginDto, SignupDto, signupDto } from "./dto";
import prisma from "../../../../../prisma/prisma";
import { type ParsedRequest } from "../../types/ParsedRequest";
import { compareData, hashData } from "../../utils/bcrypt";
import * as jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export class AuthService {
  @Validation(signupDto)
  static async signup(request: ParsedRequest<SignupDto>) {
    const body = request.parsedBody;
    const existingEmail = await prisma.user.findUnique({
      where: { email: body.email },
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
      where: { email: body.email },
    });
    if (!existingUser || !compareData(body.password, existingUser.password)) {
      throw {
        message: "Email ou senha inválidos.",
        path: "password",
        status: 401,
      };
    }
    const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });
    cookies().set("token", token);
    return { token };
  }
}
