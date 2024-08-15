import { GenreService } from "@/app/api/genres/service";
import { response, routeHandler } from "../handler";

class GenreRoutes {
  private genreService: GenreService;
  constructor() {
    this.genreService = new GenreService();
  }

  async GET() {
    return response(this.genreService.getGenres());
  }
}

export const { GET } = routeHandler(GenreRoutes);
