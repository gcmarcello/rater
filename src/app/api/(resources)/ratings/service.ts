import { UpsertRatingDto } from "./dto";
import prisma from "../../infrastructure/prisma";
import { MovieService } from "../movies/service";
import { Prisma } from "@prisma/client";
import { parseNumber } from "../../utils/parseFloat";

export class RatingsService {
  private movieService: MovieService;
  constructor() {
    this.movieService = new MovieService();
  }
  async upsertRating(data: UpsertRatingDto, userId: string) {
    const { movieId, showId, rating, comment } = data;

    if (movieId) {
      const movie = await prisma.movie.findUnique({
        where: { id: movieId },
      });
      if (!movie) {
        throw { status: 404, message: "Movie not found" };
      }
      const newRating = await prisma.rating.upsert({
        where: { userId_movieId: { movieId: movieId, userId } },
        create: {
          rating,
          comment,
          movieId: movieId,
          userId,
        },
        update: {
          rating,
          comment,
        },
      });
      await this.movieService.updateMovieRating(movieId);
      return newRating;
    } else if (showId) {
      const show = await prisma.show.findUnique({
        where: { id: showId },
      });
      if (!show) {
        throw { status: 404, message: "Show not found" };
      }
      return await prisma.rating.upsert({
        where: { userId_showId: { showId: showId, userId } },
        create: {
          rating,
          comment,
          showId: showId,
          userId,
        },
        update: {
          rating,
          comment,
        },
      });
    }
  }

  async getRatings(userId: string) {
    return await prisma.rating.findMany({
      where: {
        userId,
      },
    });
  }

  async getMovieRatingsCount(movieId: string | number) {
    return await prisma.rating.count({
      where: {
        movieId: parseNumber(movieId),
      },
    });
  }

  async getShowRatingsCount(showId: string | number) {
    return await prisma.rating.count({
      where: {
        showId: parseNumber(showId),
      },
    });
  }
}
