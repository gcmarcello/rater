import { ParsedRequest, ParsedRequestWithUser } from "@/app/types/Request";
import { DeleteUserDto, UpdateUserDto } from "./dto";
import { ServerResponse } from "../../classes/ServerResponse";
import { UserService } from "./service";
import { UsersController } from "./controller";

export async function GET(request: ParsedRequestWithUser<any>) {
  return await UsersController.read(request);
}

export async function PUT(request: ParsedRequestWithUser<UpdateUserDto>) {
  return await UsersController.update(request);
}

export async function DELETE(request: ParsedRequestWithUser<DeleteUserDto>) {
  return await UsersController.delete(request);
}
