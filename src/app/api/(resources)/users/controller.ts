import { type ParsedRequestWithUser } from "@/app/_shared/types/Request";
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

export class UsersController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }
  @Authentication()
  async read(request: ParsedRequestWithUser<any>) {
    try {
      const user = await this.userService.read(request.user.id);
      return ServerResponse.json(user);
    } catch (error) {
      console.error(error);
      return ServerResponse.err(error);
    }
  }

  @Authentication()
  @Validation(updateUserDto)
  async update(request: ParsedRequestWithUser<UpdateUserDto>) {
    try {
      const updateUser = await this.userService.update(
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
  async delete(request: ParsedRequestWithUser<DeleteUserDto>) {
    try {
      const deleteUser = await this.userService.delete(
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
