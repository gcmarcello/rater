import { ParsedRequest } from "../../../../types/ParsedRequest";
import { SignupDto } from "../dto";
import { AuthService } from "../service";
import { ServerResponse } from "@/app/api/classes/ServerResponse";

export async function POST(request: ParsedRequest<SignupDto>) {
  try {
    const test = await AuthService.signup(request);
    return ServerResponse.json(test);
  } catch (error) {
    return ServerResponse.err(error);
  }
}
