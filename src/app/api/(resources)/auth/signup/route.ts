import { ParsedRequest } from "../../../../types/Request";
import { SignupDto } from "../dto";
import { AuthService } from "../service";
import { ServerResponse } from "@/app/api/classes/ServerResponse";

export async function POST(request: ParsedRequest<SignupDto>) {
  try {
    const signup = await AuthService.signup(request);
    return ServerResponse.json(signup);
  } catch (error) {
    return ServerResponse.err(error);
  }
}
