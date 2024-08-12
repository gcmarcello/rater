import { ParsedRequest } from "../../../../types/Request";
import { AuthController } from "../controller";
import { SignupDto } from "../dto";
import { ServerResponse } from "@/app/api/classes/ServerResponse";

export async function POST(request: ParsedRequest<SignupDto>) {
  return await AuthController.signup(request);
}
