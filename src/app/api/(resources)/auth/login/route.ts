import { ParsedRequest } from "../../../types/ParsedRequest";
import { LoginDto } from "../dto";
import { AuthService } from "../service";
import { ServerResponse } from "@/app/api/classes/ServerResponse";

export async function POST(request: ParsedRequest<LoginDto>) {
  try {
    const test = await AuthService.login(request);
    return ServerResponse.json(test);
  } catch (error) {
    return ServerResponse.err(error);
  }
}
