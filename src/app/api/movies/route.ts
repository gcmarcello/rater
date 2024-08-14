import { type ParsedRequest } from "@/_shared/types/Request";
import { Prisma } from "@prisma/client";
import { MovieService } from "./service";
import { MovieFindManyArgsSchema } from "../../../../prisma/generated/zod";
import { Validation } from "@/_shared/decorators/Validation";
import { response, routeHandler } from "../handler";

class MovieRoutes {
  private movieService: MovieService;
  constructor() {
    this.movieService = new MovieService();
  }

  @Validation(MovieFindManyArgsSchema, { validateSearchParams: true })
  async GET(request: ParsedRequest<Prisma.MovieFindManyArgs>) {
    return response(this.movieService.getMovies(request.parsedSearchParams));
  }
}

export const { GET } = routeHandler(MovieRoutes);
