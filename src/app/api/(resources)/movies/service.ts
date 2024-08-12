import { Prisma } from "@prisma/client";
import prisma from "../../infrastructure/prisma";
import { MovieFindManyArgsSchema } from "../../../../../prisma/generated/zod";
import { Validation } from "../../decorators/Validation";
import { type ParsedRequest } from "../../../types/Request";

export class MovieService {
  @Validation(MovieFindManyArgsSchema, { validateSearchParams: true })
  static async getMovies(request: ParsedRequest<Prisma.MovieFindManyArgs>) {
    const movies = await prisma.movie.findMany({
      ...request.parsedSearchParams,
      take: request.parsedSearchParams.take
        ? Math.min(request.parsedSearchParams.take, 100)
        : 10,
      include: { genres: true },
    });
    return movies;
  }

  static async updateMovieRating(id: number) {
    const movie = await prisma.movie.findUnique({
      where: { id },
      include: { Rating: true },
    });
    if (!movie) {
      throw new Error("Movie not found");
    }
    const newRatingAverage =
      movie.Rating.reduce((acc, rating) => acc + rating.rating, 0) /
      movie.Rating.length;

    return await prisma.movie.update({
      where: { id },
      data: { rating: newRatingAverage },
    });
  }
}
