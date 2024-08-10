import { Prisma } from "@prisma/client";
import prisma from "../../infrastructure/prisma";
import { MovieFindManyArgsSchema } from "../../../../../prisma/generated/zod";
import { Validation } from "../../decorators/Validation";
import { type ParsedRequest } from "../../../types/ParsedRequest";

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
}
