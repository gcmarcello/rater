import { type ParsedRequestWithUser } from "@/app/types/Request";
import { updateUserDto, UpdateUserDto } from "./dto";
import { Authentication } from "../../decorators/Authentication";
import { Validation } from "../../decorators/Validation";
import prisma from "../../infrastructure/prisma";
import { Prisma } from "@prisma/client";
import { UserFindUniqueArgsSchema } from "../../../../../prisma/generated/zod";

export class UserService {
  @Authentication()
  @Validation(updateUserDto)
  static async update(request: ParsedRequestWithUser<UpdateUserDto>) {
    return await prisma.user.update({
      where: { id: request.user.id },
      data: request.parsedBody,
    });
  }

  @Authentication()
  @Validation(UserFindUniqueArgsSchema, { validateSearchParams: true })
  static async read(request: ParsedRequestWithUser<Prisma.UserFindUniqueArgs>) {
    const user = await prisma.user.findUnique({
      where: { id: request.user.id },
      select: { id: true, name: true, email: true, realName: true },
    });

    return user;
  }
}
