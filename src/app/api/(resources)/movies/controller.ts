import { type ParsedRequest } from "@/app/types/Request";
import { Prisma } from "@prisma/client";
import { MovieService } from "./service";
import { ServerResponse } from "../../classes/ServerResponse";
import { Validation } from "../../decorators/Validation";
import { MovieFindManyArgsSchema } from "../../../../../prisma/generated/zod";

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
}
