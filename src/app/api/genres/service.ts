import prisma from "@/_shared/infrastructure/prisma";

export class GenreService {
  async getGenres() {
    return await prisma.genre.findMany();
  }
}
