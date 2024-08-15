import { Prisma } from "@prisma/client";
import { MovieService } from "../service";
import { type ParsedRequestWithUser } from "@/_shared/types/Request";
import { response, routeHandler } from "@/app/api/handler";
import { Authentication } from "@/_shared/decorators/Authentication";

class MovieRecommendationRoutes {
  constructor(private movieService: MovieService) {
    this.movieService = new MovieService();
  }

  @Authentication()
  async GET(request: ParsedRequestWithUser<any>) {
    return response(this.movieService.getMovieRecommendations(request.user.id));
  }
}

export const { GET } = routeHandler(MovieRecommendationRoutes);
