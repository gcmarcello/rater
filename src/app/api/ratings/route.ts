import { type ParsedRequestWithUser } from "@/_shared/types/Request";
import { upsertRatingDto, UpsertRatingDto } from "./dto";
import { Prisma } from "@prisma/client";
import { response, routeHandler } from "@/app/api/handler";
import { RatingsService } from "./service";
import { Authentication } from "@/_shared/decorators/Authentication";
import { Validation } from "@/_shared/decorators/Validation";
class RatingsRoutes {
  constructor(private ratingsService: RatingsService) {
    this.ratingsService = new RatingsService();
  }

  @Authentication()
  async GET(request: ParsedRequestWithUser<Prisma.RatingFindManyArgs>) {
    return response(this.ratingsService.getRatings(request.user.id));
  }

  @Authentication()
  @Validation(upsertRatingDto)
  async POST(request: ParsedRequestWithUser<UpsertRatingDto>) {
    return response(
      await this.ratingsService.upsertRating(
        request.parsedBody,
        request.user.id
      )
    );
  }
}

export const { GET, POST } = routeHandler(RatingsRoutes);
