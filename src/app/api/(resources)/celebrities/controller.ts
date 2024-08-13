import { ServerResponse } from "../../classes/ServerResponse";
import { CelebrityService } from "./service";

export class CelebrityController {
  private celebrityService: CelebrityService;
  constructor() {
    this.celebrityService = new CelebrityService();
  }

  async getHighlightedCelebrities() {
    try {
      const celebrities =
        await this.celebrityService.getHighlightedCelebrities();
      return ServerResponse.json(celebrities);
    } catch (error) {
      console.error(error);
      return ServerResponse.err(error);
    }
  }
}
