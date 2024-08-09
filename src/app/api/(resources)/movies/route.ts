import { MovieService } from "./service";
import { ServerResponse } from "@/app/api/classes/ServerResponse";

export async function GET() {
  try {
    const test = await MovieService.getMovies();
    return ServerResponse.json(test);
  } catch (error) {
    return ServerResponse.err(error);
  }
}
