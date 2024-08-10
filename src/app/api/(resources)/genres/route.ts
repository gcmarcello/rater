import { GenreService } from "@/app/api/(resources)/genres/service";
import { ServerResponse } from "@/app/api/classes/ServerResponse";

export async function GET() {
  try {
    const test = await GenreService.getGenres();
    return ServerResponse.json(test);
  } catch (error) {
    return ServerResponse.err(error);
  }
}
