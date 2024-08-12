import { type ParsedRequestWithUser } from "@/app/types/Request";
import { upsertRatingDto, UpsertRatingDto } from "./dto";
import { Validation } from "../../decorators/Validation";
import { Authentication } from "../../decorators/Authentication";
import prisma from "../../infrastructure/prisma";
import { MovieService } from "../movies/service";
import { RatingFindManyArgsSchema } from "../../../../../prisma/generated/zod";
import { Prisma } from "@prisma/client";

export class RatingsService {
  static async upsertRating(data: UpsertRatingDto, userId: string) {
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
      await MovieService.updateMovieRating(movieId);
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

  static async getRatings(data: Prisma.RatingFindManyArgs, userId: string) {
    return await prisma.rating.findMany({
      ...data,
      where: {
        ...data,
        userId,
      },
    });
  }
}
