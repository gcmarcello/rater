import { type ParsedRequestWithUser } from "@/app/types/Request";
import { ServerResponse } from "../../classes/ServerResponse";
import { Authentication } from "../../decorators/Authentication";
import { Validation } from "../../decorators/Validation";
import {
  deleteUserDto,
  DeleteUserDto,
  updateUserDto,
  UpdateUserDto,
} from "./dto";
import { UserService } from "./service";
import { use } from "react";
import { UserFindUniqueArgsSchema } from "../../../../../prisma/generated/zod";

export class UsersController {
  @Authentication()
  static async read(request: ParsedRequestWithUser<any>) {
    try {
      const user = await UserService.read(request.user.id);
      return ServerResponse.json(user);
    } catch (error) {
      console.error(error);
      return ServerResponse.err(error);
    }
  }

  @Authentication()
  @Validation(updateUserDto)
  static async update(request: ParsedRequestWithUser<UpdateUserDto>) {
    try {
      const updateUser = await UserService.update(
        request.parsedBody,
        request.user.id
      );
      return ServerResponse.json(updateUser);
    } catch (error) {
      console.error(error);
      return ServerResponse.err(error);
    }
  }

  @Authentication()
  @Validation(deleteUserDto)
  static async delete(request: ParsedRequestWithUser<DeleteUserDto>) {
    try {
      const deleteUser = await UserService.delete(
        request.parsedBody,
        request.user.id
      );
      return ServerResponse.json(deleteUser);
    } catch (error) {
      console.error(error);
      return ServerResponse.err(error);
    }
  }
}
