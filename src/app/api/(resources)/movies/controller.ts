import {
  type ParsedRequestWithUser,
  type ParsedRequest,
} from "@/app/types/Request";
import { Prisma } from "@prisma/client";
import { MovieService } from "./service";
import { ServerResponse } from "../../classes/ServerResponse";
import { Validation } from "../../decorators/Validation";
import { MovieFindManyArgsSchema } from "../../../../../prisma/generated/zod";
import { Authentication } from "../../decorators/Authentication";

export class MovieController {
  @Validation(MovieFindManyArgsSchema, { validateSearchParams: true })
  static async getMovies(request: ParsedRequest<Prisma.MovieFindManyArgs>) {
    try {
      const movies = await MovieService.getMovies(request.parsedSearchParams);
      return ServerResponse.json(movies);
    } catch (error) {
      console.log(error);
      return ServerResponse.err(error);
    }
  }

  @Authentication()
  static async getMovieRecommendations(request: ParsedRequestWithUser<any>) {
    try {
      const recommendations = await MovieService.getMovieRecommendations(
        request.user.id
      );
      return ServerResponse.json(recommendations);
    } catch (error) {
      console.log(error);
      return ServerResponse.err(error);
    }
  }
}
