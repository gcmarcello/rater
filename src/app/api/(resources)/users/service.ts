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
  static async update(data: UpdateUserDto, userId: string) {
    return await prisma.user.update({
      where: { id: userId },
      data,
    });
  }

  static async read(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, realName: true },
    });

    return user;
  }

  static async delete(data: DeleteUserDto, userId: string) {
    if (!data.keepRatings) {
      await prisma.rating.deleteMany({
        where: { userId: userId },
      });
      await prisma.user.delete({
        where: { id: userId },
      });
      return { message: "User deleted successfully" };
    }

    await prisma.user.update({
      where: { id: userId },
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
