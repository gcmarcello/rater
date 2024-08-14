import { type ParsedRequest } from "@/app/_shared/types/Request";
import { loginDto, LoginDto } from "../dto";
import { AuthService } from "../service";
import { response, routeHandler } from "@/app/api/handler";
import { Validation } from "@/app/api/decorators/Validation";

class LoginRoutes {
  constructor(private authService: AuthService) {
    this.authService = new AuthService();
  }

  @Validation(loginDto)
  async POST(request: ParsedRequest<LoginDto>) {
    return response(this.authService.login(request.parsedBody));
  }
}

export const { POST } = routeHandler(LoginRoutes);
