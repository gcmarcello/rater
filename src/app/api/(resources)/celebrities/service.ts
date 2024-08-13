import { Prisma } from "@prisma/client";
import prisma from "../../infrastructure/prisma";
export class CelebrityService {
  async getCelebrityById(id: string) {
    const parsedInt = parseInt(id);
    if (isNaN(parsedInt)) {
      throw { message: "Invalid id" };
    }
    return await prisma.celebrity.findUnique({ where: { id: parsedInt } });
  }

  async getCelebrityMedia(id: string) {
    const parsedInt = parseInt(id);
    if (isNaN(parsedInt)) {
      throw { message: "Invalid id" };
    }
    const roles = await prisma.castedRole.findMany({
      where: { celebrityId: parsedInt },
      include: { movie: true, show: true },
    });

    return roles;
  }

  async getHighlightedCelebrities() {
    return await prisma.celebrity.findMany({
      take: 8,
      where: { popularity: { gt: 50 } },
      orderBy: { popularity: "desc" },
    });
  }
}
