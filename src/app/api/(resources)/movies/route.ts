import { NextRequest } from "next/server";
import { MovieService } from "./service";
import { ServerResponse } from "@/app/api/classes/ServerResponse";
import { ParsedRequest } from "../../../types/ParsedRequest";
import { Prisma } from "@prisma/client";

export async function GET() {
  try {
    const test = await MovieService.getMovies();
    return ServerResponse.json(test);
  } catch (error) {
    return ServerResponse.err(error);
  }
}
