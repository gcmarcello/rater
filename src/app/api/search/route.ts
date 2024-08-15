import { type ParsedRequest } from "@/_shared/types/Request";
import { SearchService } from "./service";
import { response, routeHandler } from "../handler";
import { searchDto, SearchDto } from "./dto";
import { Validation } from "@/_shared/decorators/Validation";

export class SearchRoutes {
  constructor(private searchService: SearchService) {
    this.searchService = new SearchService();
  }

  async GET(request: ParsedRequest<SearchDto>) {
    return response(await this.searchService.searchByTitle(request));
  }
}

export const { GET } = routeHandler(SearchRoutes);
