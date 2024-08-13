import { ParsedRequestWithUser } from "@/app/_shared/types/Request";
import { DeleteUserDto, UpdateUserDto } from "./dto";
import { UsersController } from "./controller";

export async function GET(request: ParsedRequestWithUser<any>) {
  return await new UsersController().read(request);
}

export async function PUT(request: ParsedRequestWithUser<UpdateUserDto>) {
  return await new UsersController().update(request);
}

export async function DELETE(request: ParsedRequestWithUser<DeleteUserDto>) {
  return await new UsersController().delete(request);
}
