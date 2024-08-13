import { type ParsedRequestWithUser } from "@/app/types/Request";
import { ServerResponse } from "../../classes/ServerResponse";
import { RatingsService } from "./service";
import { Prisma } from "@prisma/client";
import { upsertRatingDto, UpsertRatingDto } from "./dto";
import { Authentication } from "../../decorators/Authentication";
import { Validation } from "../../decorators/Validation";
import { RatingFindManyArgsSchema } from "../../../../../prisma/generated/zod";
import { MovieService } from "../movies/service";

export class RatingsController {
  private ratingsService: RatingsService;
  constructor() {
    this.ratingsService = new RatingsService(new MovieService());
  }

  @Authentication()
  @Validation(RatingFindManyArgsSchema, { validateSearchParams: false })
  async getRatings(request: ParsedRequestWithUser<Prisma.RatingFindManyArgs>) {
    try {
      const rating = await this.ratingsService.getRatings(
        request.parsedBody,
        request.user.id
      );
      return ServerResponse.json(rating);
    } catch (error) {
      console.error(error);
      return ServerResponse.err(error);
    }
  }

  @Authentication()
  @Validation(upsertRatingDto)
  async upsertRating(request: ParsedRequestWithUser<UpsertRatingDto>) {
    try {
      const rating = await this.ratingsService.upsertRating(
        request.parsedBody,
        request.user.id
      );
      return ServerResponse.json(rating);
    } catch (error) {
      console.error(error);
      return ServerResponse.err(error);
    }
  }
}
