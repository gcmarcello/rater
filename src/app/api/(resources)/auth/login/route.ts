import { ParsedRequest } from "@/app/_shared/types/Request";
import { AuthController } from "../controller";
import { LoginDto } from "../dto";
import { ServerResponse } from "@/app/api/classes/ServerResponse";

export async function POST(request: ParsedRequest<LoginDto>) {
  return new AuthController().login(request);
}
