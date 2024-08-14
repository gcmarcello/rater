import { Prisma } from "@prisma/client";
import prisma from "../../infrastructure/prisma";
import { parseNumber } from "../../../_shared/utils/parseFloat";
import { CrewCreateArgsSchema } from "../../../../../prisma/generated/zod";

export class CrewService {
  // CRUD
  async createCrew(data: Prisma.CrewCreateArgs["data"]) {
    return await prisma.crew.create({
      data,
    });
  }

  async readCrew(data: Prisma.CrewFindManyArgs) {
    return await prisma.crew.findMany(data);
  }

  async updateCrew(
    data: Prisma.CrewUpdateArgs["data"],
    crewId: string | number
  ) {
    return await prisma.crew.update({
      where: { id: parseNumber(crewId) },
      data,
    });
  }

  async deleteCrew(crewId: string) {
    return await prisma.crew.delete({
      where: { id: parseNumber(crewId) },
    });
  }

  // SPECIAL QUERIES
  async readCrewById(crewId: string | number) {
    return await prisma.crew.findUnique({
      where: { id: parseNumber(crewId) },
      include: { celebrity: true },
    });
  }

  async readMovieCrew(movieId: string | number) {
    return await prisma.crew.findMany({
      where: { movieId: parseNumber(movieId) },
      include: { celebrity: true },
    });
  }

  async readShowCrew(showId: string | number) {
    return await prisma.crew.findMany({
      where: { showId: parseNumber(showId) },
      include: { celebrity: true },
    });
  }
}
