import { ParsedRequest } from "../../../types/Request";
import { Prisma } from "@prisma/client";
import { MovieController } from "./controller";

export async function GET(request: ParsedRequest<Prisma.MovieFindManyArgs>) {
  return new MovieController().getMovies(request);
}
