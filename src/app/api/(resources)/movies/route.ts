import { NextRequest } from "next/server";
import { MovieService } from "./service";
import { ServerResponse } from "@/app/api/classes/ServerResponse";
import { ParsedRequest } from "../../../types/Request";
import { Prisma } from "@prisma/client";

export async function GET(request: ParsedRequest<Prisma.MovieFindManyArgs>) {
  try {
    const test = await MovieService.getMovies(request);
    return ServerResponse.json(test);
  } catch (error) {
    console.log(error);
    return ServerResponse.err(error);
  }
}
