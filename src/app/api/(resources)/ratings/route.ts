import { ParsedRequestWithUser } from "@/app/types/Request";
import { UpsertRatingDto } from "./dto";
import { RatingsService } from "./service";
import { ServerResponse } from "../../classes/ServerResponse";
import { Prisma } from "@prisma/client";
import { RatingsController } from "./controller";

export async function GET(
  request: ParsedRequestWithUser<Prisma.RatingFindManyArgs>
) {
  return await new RatingsController().getRatings(request);
}

export async function POST(request: ParsedRequestWithUser<UpsertRatingDto>) {
  return await new RatingsController().upsertRating(request);
}
