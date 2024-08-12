import { ParsedRequest } from "../../../../types/Request";
import { AuthController } from "../controller";
import { LoginDto } from "../dto";
import { ServerResponse } from "@/app/api/classes/ServerResponse";

export async function POST(request: ParsedRequest<LoginDto>) {
  try {
    const login = await AuthController.login(request);
    return ServerResponse.json(login);
  } catch (error) {
    return ServerResponse.err(error);
  }
}
