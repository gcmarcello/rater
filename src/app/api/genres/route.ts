import { GenreService } from "@/app/api/genres/service";
import { ServerResponse } from "@/app/api/classes/ServerResponse";

export async function GET() {
  try {
    const test = await GenreService.getGenres();
    return ServerResponse.json(test);
  } catch (error) {
    return ServerResponse.err(error);
  }
}
