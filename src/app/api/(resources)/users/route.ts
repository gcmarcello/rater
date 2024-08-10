import { ParsedRequest, ParsedRequestWithUser } from "@/app/types/Request";
import { UpdateUserDto } from "./dto";
import { ServerResponse } from "../../classes/ServerResponse";
import { UserService } from "./service";

export async function GET(request: ParsedRequestWithUser<any>) {
  try {
    const user = await UserService.read(request);
    return ServerResponse.json(user);
  } catch (error) {
    console.log(error);
    return ServerResponse.err(error);
  }
}

export async function PUT(request: ParsedRequestWithUser<UpdateUserDto>) {
  try {
    const updateUser = await UserService.update(request);
    return ServerResponse.json(updateUser);
  } catch (error) {
    console.log(error);
    return ServerResponse.err(error);
  }
}
