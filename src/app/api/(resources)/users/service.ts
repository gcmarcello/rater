import { type ParsedRequestWithUser } from "@/app/types/Request";
import {
  deleteUserDto,
  DeleteUserDto,
  updateUserDto,
  UpdateUserDto,
} from "./dto";
import { Authentication } from "../../decorators/Authentication";
import { Validation } from "../../decorators/Validation";
import prisma from "../../infrastructure/prisma";
import { Prisma } from "@prisma/client";
import { UserFindUniqueArgsSchema } from "../../../../../prisma/generated/zod";
import { randomUUID } from "crypto";
import { z } from "zod";

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

  @Authentication()
  @Validation(deleteUserDto)
  static async delete(request: ParsedRequestWithUser<DeleteUserDto>) {
    if (!request.parsedBody.keepRatings) {
      await prisma.review.deleteMany({
        where: { userId: request.user.id },
      });
      await prisma.user.delete({
        where: { id: request.user.id },
      });
      return { message: "User deleted successfully" };
    }

    await prisma.user.update({
      where: { id: request.user.id },
      data: { email: randomUUID(), name: "Anonymous User", realName: null },
    });
    return { message: "User anonymized successfully" };
  }

  static async verifyActiveUser(id: string) {
    const potentialUser = await prisma.user.findUniqueOrThrow({
      where: { id },
    });
    return z.string().email().parse(potentialUser.email);
  }
}
