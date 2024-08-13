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
  private movieService: MovieService;
  constructor() {
    this.movieService = new MovieService();
  }
  @Validation(MovieFindManyArgsSchema, { validateSearchParams: true })
  async getMovies(request: ParsedRequest<Prisma.MovieFindManyArgs>) {
    try {
      const movies = await this.movieService.getMovies(
        request.parsedSearchParams
      );
      return ServerResponse.json(movies);
    } catch (error) {
      console.log(error);
      return ServerResponse.err(error);
    }
  }

  @Authentication()
  async getMovieRecommendations(request: ParsedRequestWithUser<any>) {
    try {
      const recommendations = await this.movieService.getMovieRecommendations(
        request.user.id
      );
      return ServerResponse.json(recommendations);
    } catch (error) {
      console.log(error);
      return ServerResponse.err(error);
    }
  }
}
