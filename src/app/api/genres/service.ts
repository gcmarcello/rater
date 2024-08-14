import prisma from "../../infrastructure/prisma";

export class GenreService {
  async getGenres() {
    return await prisma.genre.findMany();
  }
}
