import { ParsedRequest } from "../../../../types/Request";
import { LoginDto } from "../dto";
import { AuthService } from "../service";
import { ServerResponse } from "@/app/api/classes/ServerResponse";

export async function POST(request: ParsedRequest<LoginDto>) {
  try {
    const login = await AuthService.login(request);
    return ServerResponse.json(login);
  } catch (error) {
    return ServerResponse.err(error);
  }
}
