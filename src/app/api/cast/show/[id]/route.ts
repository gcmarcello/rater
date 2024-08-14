import { response, routeHandler } from "@/app/api/handler";
import { CastedRoleService } from "../../service";

class CastedRoleShowIdRoutes {
  constructor(private crewService: CastedRoleService) {
    this.crewService = new CastedRoleService();
  }

  async GET(request: Request, { params }: { params: { id: string } }) {
    return response(this.crewService.readShowCast(params.id));
  }
}

export const { GET } = routeHandler(CastedRoleShowIdRoutes);
