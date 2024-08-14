import { response, routeHandler } from "@/app/api/handler";
import { CelebrityService } from "../service";

class CelebrityHighlightedRoutes {
  constructor(private celebrityService: CelebrityService) {
    this.celebrityService = new CelebrityService();
  }

  async GET(request: Request, { params }: { params: { id: string } }) {
    return response(this.celebrityService.getHighlightedCelebrities());
  }
}

export const { GET } = routeHandler(CelebrityHighlightedRoutes);
