import { Prisma } from "@prisma/client";
import prisma from "../../infrastructure/prisma";
import { parseNumber } from "../../../_shared/utils/parseFloat";
import { ReadMovieDto } from "./dto";

export class MovieService {
  async getMovies(data: ReadMovieDto) {
    const movies = await prisma.movie.findMany({
      ...data,
      take: data.take ? Math.min(data.take, 100) : 10,
      include: { genres: true },
    });
    return movies;
  }

  async getMovie(id: string | number) {
    const movie = await prisma.movie.findUnique({
      where: { id: parseNumber(id) },
      include: { genres: true },
    });
    return movie;
  }

  // SPECIAL QUERIES
  async updateMovieRating(id: string | number) {
    const movie = await prisma.movie.findUnique({
      where: { id: parseNumber(id) },
      include: { Rating: true },
    });
    if (!movie) {
      throw new Error("Movie not found");
    }
    const newRatingAverage =
      movie.Rating.reduce((acc, rating) => acc + rating.rating, 0) /
      movie.Rating.length;

    return await prisma.movie.update({
      where: { id: parseNumber(id) },
      data: { rating: newRatingAverage },
    });
  }

  async getMovieRecommendations(userId: string) {
    const ratings = await prisma.rating.findMany({
      where: { userId },
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
