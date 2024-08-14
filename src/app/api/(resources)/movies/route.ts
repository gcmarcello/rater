import { type ParsedRequest } from "@/app/_shared/types/Request";
import { Prisma } from "@prisma/client";
import { response, routeHandler } from "../../handler";
import { Validation } from "../../decorators/Validation";
import { MovieFindManyArgsSchema } from "../../../../../prisma/generated/zod";
import { MovieService } from "./service";

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
