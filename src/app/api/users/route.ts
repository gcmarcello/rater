import { type ParsedRequestWithUser } from "@/_shared/types/Request";
import {
  deleteUserDto,
  DeleteUserDto,
  updateUserDto,
  UpdateUserDto,
} from "./dto";
import { UserService } from "./service";
import { Authentication } from "@/_shared/decorators/Authentication";
import { Validation } from "@/_shared/decorators/Validation";
import { response, routeHandler } from "@/app/api/handler";

class UsersRoutes {
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }

  @Authentication()
  async GET(request: ParsedRequestWithUser<any>) {
    return response(this.userService.read(request.user.id));
  }

  @Authentication()
  @Validation(updateUserDto)
  async PUT(request: ParsedRequestWithUser<UpdateUserDto>) {
    return response(
      this.userService.update(request.parsedBody, request.user.id)
    );
  }

  @Authentication()
  @Validation(deleteUserDto)
  async DELETE(request: ParsedRequestWithUser<DeleteUserDto>) {
    return response(
      this.userService.delete(request.parsedBody, request.user.id)
    );
  }
}

export const { GET, PUT, DELETE } = routeHandler(UsersRoutes);
