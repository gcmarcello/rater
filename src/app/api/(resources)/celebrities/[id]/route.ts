import { response, routeHandler } from "@/app/api/handler";
import { CelebrityService } from "../service";

class CelebrityIdRoutes {
  constructor(private celebrityService: CelebrityService) {
    this.celebrityService = new CelebrityService();
  }

  async GET(request: Request, { params }: { params: { id: string } }) {
    return response(this.celebrityService.getCelebrityById(params.id));
  }
}

export const { GET } = routeHandler(CelebrityIdRoutes);
