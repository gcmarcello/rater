import prisma from "../infrastructure/prisma";

export class GenreService {
  static async getGenres() {
    return await prisma.genre.findMany();
  }
}
