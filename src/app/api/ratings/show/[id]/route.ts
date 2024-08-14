import { response, routeHandler } from "@/app/api/handler";
import { RatingsService } from "../../service";
import { type ParsedRequest } from "@/app/_shared/types/Request";
import { Validation } from "@/app/api/decorators/Validation";
import { readShowRatingDto, ReadShowRatingDto } from "../../dto";

class ShowRatingRoutes {
  constructor(private ratingsService: RatingsService) {
    this.ratingsService = new RatingsService();
  }

  async GET(
    request: ParsedRequest<ReadShowRatingDto>,
    { params }: { params: { id: string } }
  ) {
    return response(this.ratingsService.getShowRatingsCount(params.id));
  }
}

export const { GET } = routeHandler(ShowRatingRoutes);
