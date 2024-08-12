import { Prisma } from "@prisma/client";
import prisma from "../../infrastructure/prisma";
import { MovieFindManyArgsSchema } from "../../../../../prisma/generated/zod";
import { Validation } from "../../decorators/Validation";
import { Authentication } from "../../decorators/Authentication";
import {
  type ParsedRequestWithUser,
  type ParsedRequest,
} from "../../../types/Request";

export class MovieService {
  static async getMovies(data: Prisma.MovieFindManyArgs) {
    const movies = await prisma.movie.findMany({
      ...data,
      take: data.take ? Math.min(data.take, 100) : 10,
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

  @Authentication()
  static async getMovieRecommendations(
    request: ParsedRequestWithUser<Prisma.MovieFindManyArgs>
  ) {
    const user = request.user;

    const ratings = await prisma.rating.findMany({
      where: { userId: user.id },
      include: { movie: { include: { genres: true } } },
    });

    const movieIds = ratings
      .map((r) => r.movieId)
      .filter((id) => typeof id === "number");
    const genreIds = ratings
      .flatMap((r) => r.movie?.genres.map((g) => g.id))
      .filter((id) => typeof id === "number");

    const recommendations = await prisma.movie.findMany({
      where: {
        id: { notIn: movieIds },
        genres: { some: { id: { in: genreIds } } },
      },
      take: 8,
      include: { genres: true },
    });

    return recommendations;
  }
}
