import { response, routeHandler } from "@/app/api/handler";
import { RatingsService } from "../../service";
import { type ParsedRequest } from "@/app/_shared/types/Request";
import { Validation } from "@/app/api/decorators/Validation";
import { readMovieRatingDto, ReadMovieRatingDto } from "../../dto";

class MovieRatingRoutes {
  constructor(private ratingsService: RatingsService) {
    this.ratingsService = new RatingsService();
  }

  async GET(
    request: ParsedRequest<ReadMovieRatingDto>,
    { params }: { params: { id: string } }
  ) {
    return response(this.ratingsService.getMovieRatingsCount(params.id));
  }
}

export const { GET } = routeHandler(MovieRatingRoutes);
