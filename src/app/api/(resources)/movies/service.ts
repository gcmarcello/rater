import prisma from "../../infrastructure/prisma";

export class MovieService {
  static async getMovies() {
    return await prisma.movie.findMany({
      include: { genres: { select: { id: true } } },
      take: 10,
    });
  }
}
