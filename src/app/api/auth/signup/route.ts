import { type ParsedRequest } from "@/_shared/types/Request";
import { signupDto, SignupDto } from "../dto";
import { AuthService } from "../service";
import { response, routeHandler } from "@/app/api/handler";
import { Validation } from "@/_shared/decorators/Validation";

class SignupRoutes {
  constructor(private authService: AuthService) {
    this.authService = new AuthService();
  }

  @Validation(signupDto)
  async POST(request: ParsedRequest<SignupDto>) {
    return response(this.authService.signup(request.parsedBody));
  }
}

export const { POST } = routeHandler(SignupRoutes);
