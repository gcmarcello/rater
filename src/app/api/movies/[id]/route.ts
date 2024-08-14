import { type ParsedRequest } from "@/app/_shared/types/Request";
import { Validation } from "@/app/api/decorators/Validation";
import { response, routeHandler } from "@/app/api/handler";
import { Prisma } from "@prisma/client";
import { MovieFindManyArgsSchema } from "../../../../../../prisma/generated/zod";
import { MovieService } from "../service";

class MovieRoutes {
  private movieService: MovieService;
  constructor() {
    this.movieService = new MovieService();
  }

  async GET(
    request: ParsedRequest<any>,
    { params }: { params: { id: string } }
  ) {
    return response(this.movieService.getMovie(params.id));
  }
}

export const { GET } = routeHandler(MovieRoutes);
