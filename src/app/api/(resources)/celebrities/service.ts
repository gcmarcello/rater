import { Prisma } from "@prisma/client";
import prisma from "../../infrastructure/prisma";
export class CelebrityService {
  async getCelebrityById(id: number) {
    return await prisma.celebrity.findUnique({ where: { id } });
  }

  async getHighlightedCelebrities() {
    return await prisma.celebrity.findMany({
      take: 8,
      where: { popularity: { gt: 50 } },
      orderBy: { popularity: "desc" },
    });
  }
}
