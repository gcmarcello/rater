import { ParsedRequestWithUser } from "@/app/types/Request";
import { UpsertRatingDto } from "./dto";
import { RatingsService } from "./service";
import { ServerResponse } from "../../classes/ServerResponse";

export async function POST(request: ParsedRequestWithUser<UpsertRatingDto>) {
  try {
    const rating = await RatingsService.upsertRating(request);
    return ServerResponse.json(rating);
  } catch (error) {
    return ServerResponse.err(error);
  }
}
