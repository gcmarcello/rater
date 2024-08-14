import { response, routeHandler } from "@/app/api/handler";
import { CastedRoleService } from "../../service";

class CastedRoleMovieIdRoutes {
  constructor(private crewService: CastedRoleService) {
    this.crewService = new CastedRoleService();
  }

  async GET(request: Request, { params }: { params: { id: string } }) {
    return response(this.crewService.readMovieCast(params.id));
  }
}

export const { GET } = routeHandler(CastedRoleMovieIdRoutes);
