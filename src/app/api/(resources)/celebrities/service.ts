import { Prisma } from "@prisma/client";
import prisma from "../../infrastructure/prisma";
import { parseNumber } from "../../../_shared/utils/parseFloat";
import {
  CreateCelebrityDto,
  ReadCelebrityDto,
  UpdateCelebrityDto,
} from "./dto";
export class CelebrityService {
  // CRUD
  async createCelebrity(data: CreateCelebrityDto) {
    return await prisma.celebrity.create(data);
  }

  async readCelebrity(data: ReadCelebrityDto) {
    return await prisma.celebrity.findMany({
      ...data,
      take: data.take ? Math.min(data.take, 100) : 10,
    });
  }

  async updateCelebrity(
    data: UpdateCelebrityDto,
    celebrityId: string | number
  ) {
    return await prisma.celebrity.update({
      where: { id: parseNumber(celebrityId) },
      data,
    });
  }

  async deleteCelebrity(celebrityId: string) {
    return await prisma.celebrity.delete({
      where: { id: parseNumber(celebrityId) },
    });
  }

  //SPECIAL QUERIES
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
