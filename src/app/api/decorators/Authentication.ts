import { ParsedRequest, ParsedRequestWithUser } from "@/app/types/Request";
import { ServerResponse } from "../classes/ServerResponse";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { Session } from "@/app/types/Session";
import { UserService } from "../(resources)/users/service";

export function Authentication<T>() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<
      (request: ParsedRequestWithUser<T>) => Promise<any>
    >
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (request: ParsedRequestWithUser<T>) {
      const token = cookies().get("token")?.value;

      if (!token) {
        throw {
          message: "Usuário não autenticado.",
          status: 401,
        };
      }

      let newRequest = request as ParsedRequestWithUser<T>;

      try {
        const decodedToken = jwt.verify(
          token,
          process.env.JWT_SECRET!
        ) as Session;
        await UserService.verifyActiveUser(decodedToken.id);
        newRequest.user = decodedToken;
      } catch (error) {
        throw {
          message: "Erro ao autenticar usuário.",
          error,
          status: 401,
        };
      }

      return await originalMethod!.apply(this, [newRequest]);
    };

    return descriptor;
  };
}
