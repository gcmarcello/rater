import { type ParsedRequest } from "@/app/_shared/types/Request";
import { loginDto, LoginDto, VerifyDto, verifyDto } from "../dto";
import { AuthService } from "../service";
import { response, routeHandler } from "@/app/api/handler";
import { Validation } from "@/app/api/decorators/Validation";

class VerifyRoutes {
  constructor(private authService: AuthService) {
    this.authService = new AuthService();
  }

  @Validation(verifyDto)
  async POST(request: ParsedRequest<VerifyDto>) {
    return response(this.authService.verifyCookie(request.parsedBody.token));
  }
}

export const { POST } = routeHandler(VerifyRoutes);
