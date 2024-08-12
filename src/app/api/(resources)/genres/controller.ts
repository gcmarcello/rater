import { ServerResponse } from "../../classes/ServerResponse";
import { GenreService } from "./service";

export class GenreController {
  static async getGenres() {
    try {
      const genres = await GenreService.getGenres();
      return ServerResponse.json(genres);
    } catch (error) {
      console.log(error);
      return ServerResponse.err(error);
    }
  }
}
