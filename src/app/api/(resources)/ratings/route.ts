import { ParsedRequestWithUser } from "@/app/types/Request";
import { UpsertRatingDto } from "./dto";
import { RatingsService } from "./service";
import { ServerResponse } from "../../classes/ServerResponse";
import { Prisma } from "@prisma/client";

export async function GET(
  request: ParsedRequestWithUser<Prisma.RatingFindManyArgs>
) {
  try {
    const rating = await RatingsService.getRatings(request);
    return ServerResponse.json(rating);
  } catch (error) {
    console.error(error);
    return ServerResponse.err(error);
  }
}

export async function POST(request: ParsedRequestWithUser<UpsertRatingDto>) {
  try {
    const rating = await RatingsService.upsertRating(request);
    return ServerResponse.json(rating);
  } catch (error) {
    console.error(error);
    return ServerResponse.err(error);
  }
}
