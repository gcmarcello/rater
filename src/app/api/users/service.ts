import { randomUUID } from "crypto";
import { DeleteUserDto, UpdateUserDto } from "./dto";
import { z } from "zod";
import prisma from "@/_shared/infrastructure/prisma";

export class UserService {
  async update(data: UpdateUserDto, userId: string) {
    return await prisma.user.update({
      where: { id: userId },
      data,
    });
  }

  async read(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, realName: true },
    });

    return user;
  }

  async delete(data: DeleteUserDto, userId: string) {
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

  async verifyActiveUser(id: string) {
    const potentialUser = await prisma.user.findUniqueOrThrow({
      where: { id },
    });
    return z.string().email().parse(potentialUser.email);
  }
}
