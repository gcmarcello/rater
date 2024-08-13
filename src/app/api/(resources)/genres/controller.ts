import { ServerResponse } from "../../classes/ServerResponse";
import { GenreService } from "./service";

export class GenreController {
  private genreService: GenreService;
  constructor() {
    this.genreService = new GenreService();
  }
  async getGenres() {
    try {
      const genres = await this.genreService.getGenres();
      return ServerResponse.json(genres);
    } catch (error) {
      console.log(error);
      return ServerResponse.err(error);
    }
  }
}
