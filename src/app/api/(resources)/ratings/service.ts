import { type ParsedRequestWithUser } from "@/app/types/Request";
import { upsertRatingDto, UpsertRatingDto } from "./dto";
import { Validation } from "../../decorators/Validation";
import { Authentication } from "../../decorators/Authentication";
import prisma from "../../infrastructure/prisma";
import { MovieService } from "../movies/service";

export class RatingsService {
  @Authentication()
  @Validation(upsertRatingDto)
  static async upsertRating(request: ParsedRequestWithUser<UpsertRatingDto>) {
    const { movieId, showId, rating, comment } = request.parsedBody;
    const user = request.user;

    if (movieId) {
      const movie = await prisma.movie.findUnique({
        where: { id: movieId },
      });
      if (!movie) {
        throw { status: 404, message: "Movie not found" };
      }
      const newRating = await prisma.rating.upsert({
        where: { userId_movieId: { movieId: movieId, userId: user.id } },
        create: {
          rating,
          comment,
          movieId: movieId,
          userId: user.id,
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
        where: { userId_showId: { showId: showId, userId: user.id } },
        create: {
          rating,
          comment,
          showId: showId,
          userId: user.id,
        },
        update: {
          rating,
          comment,
        },
      });
    }
  }
}
