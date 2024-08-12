import { ParsedRequest, ParsedRequestWithUser } from "@/app/types/Request";
import { Prisma } from "@prisma/client";
import { MovieController } from "../controller";

export async function GET(request: ParsedRequestWithUser<any>) {
  return MovieController.getMovieRecommendations(request);
}
