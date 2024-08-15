import { MediaService } from "@/app/api/media/service";
import { response, routeHandler } from "@/app/api/handler";

class MediaRoutes {
  private mediaService: MediaService;
  constructor() {
    this.mediaService = new MediaService();
  }

  async GET(request: Request, { params }: { params: { id: string } }) {
    return response(this.mediaService.similarMediaToMovie(params.id));
  }
}

export const { GET } = routeHandler(MediaRoutes);
