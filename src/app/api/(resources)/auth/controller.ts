import { type ParsedRequest } from "@/app/types/Request";
import { AuthService } from "./service";
import { loginDto, LoginDto, SignupDto, signupDto } from "./dto";
import { Validation } from "../../decorators/Validation";
import { ServerResponse } from "../../classes/ServerResponse";

export class AuthController {
  constructor(private authService: AuthService) {}
  @Validation(loginDto)
  async login(request: ParsedRequest<LoginDto>) {
    try {
      const user = await this.authService.login(request.parsedBody);
      return ServerResponse.json(user);
    } catch (error) {
      console.error(error);
      return ServerResponse.err(error);
    }
  }

  @Validation(signupDto)
  async signup(request: ParsedRequest<SignupDto>) {
    try {
      const user = await this.authService.signup(request.parsedBody);
      return ServerResponse.json(user);
    } catch (error) {
      console.error(error);
      return ServerResponse.err(error);
    }
  }
}
