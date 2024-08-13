import { Prisma } from "@prisma/client";
import { MovieController } from "../controller";
import { ParsedRequestWithUser } from "@/app/_shared/types/Request";

export async function GET(request: ParsedRequestWithUser<any>) {
  return new MovieController().getMovieRecommendations(request);
}
