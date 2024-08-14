import { Prisma } from "@prisma/client";
import prisma from "../../infrastructure/prisma";
import { parseNumber } from "../../../_shared/utils/parseFloat";
import { CrewCreateArgsSchema } from "../../../../../prisma/generated/zod";
import { CreateCastDto, ReadCastDto, UpdateCastDto } from "./dto";

export class CastedRoleService {
  // CRUD
  async createCast(data: CreateCastDto) {
    return await prisma.castedRole.create({
      data,
    });
  }

  async readCast(data: ReadCastDto) {
    return await prisma.castedRole.findMany(data);
  }

  async updateCast(data: UpdateCastDto, castedRoleId: string | number) {
    return await prisma.castedRole.update({
      where: { id: parseNumber(castedRoleId) },
      data,
    });
  }

  async deleteCast(castedRoleId: string) {
    return await prisma.castedRole.delete({
      where: { id: parseNumber(castedRoleId) },
    });
  }

  // SPECIAL QUERIES
  async readCastById(castedRoleId: string | number) {
    return await prisma.castedRole.findUnique({
      where: { id: parseNumber(castedRoleId) },
      include: { celebrity: true },
    });
  }

  async readMovieCast(movieId: string | number) {
    return await prisma.castedRole.findMany({
      where: { movieId: parseNumber(movieId) },
      include: { celebrity: true },
      orderBy: { celebrity: { popularity: "desc" } },
    });
  }

  async readShowCast(showId: string | number) {
    return await prisma.castedRole.findMany({
      where: { showId: parseNumber(showId) },
      include: { celebrity: true },
      orderBy: { celebrity: { popularity: "desc" } },
    });
  }
}
