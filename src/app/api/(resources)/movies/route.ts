import { NextRequest } from "next/server";
import { MovieService } from "./service";
import { ServerResponse } from "@/app/api/classes/ServerResponse";
import { ParsedRequest } from "../../../types/Request";
import { Prisma } from "@prisma/client";
import { MovieController } from "./controller";

export async function GET(request: ParsedRequest<Prisma.MovieFindManyArgs>) {
  return MovieController.getMovies(request);
}
