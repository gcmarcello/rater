import { GenreService } from "@/app/api/(resources)/genres/service";
import { ServerResponse } from "@/app/api/classes/ServerResponse";
import { GenreController } from "./controller";

export async function GET() {
  return await GenreController.getGenres();
}
