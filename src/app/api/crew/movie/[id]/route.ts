import { response, routeHandler } from "@/app/api/handler";
import { CrewService } from "../../service";

class CrewMovieIdRoutes {
  constructor(private crewService: CrewService) {
    this.crewService = new CrewService();
  }

  async GET(request: Request, { params }: { params: { id: string } }) {
    return response(this.crewService.readMovieCrew(params.id));
  }
}

export const { GET } = routeHandler(CrewMovieIdRoutes);
