import { type ParsedRequestWithUser } from "@/_shared/types/Request";
import jwt from "jsonwebtoken";
import { cookies, headers } from "next/headers";
import { Session } from "@/_shared/types/Session";
import { ServerResponse } from "../classes/ServerResponse";
import { UserService } from "@/app/api/users/service";

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

      const clientSession =
        headers().get("x-client-session") === "true" ? true : false;

      if (!token) {
        return ServerResponse.err({
          message: "Usuário não autenticado.",
          status: 401,
          refreshSession: clientSession,
        });
      }

      let newRequest = request as ParsedRequestWithUser<T>;

      try {
        const decodedToken = jwt.verify(
          token,
          process.env.JWT_SECRET!
        ) as Session;
        const activeUser = await new UserService().verifyActiveUser(
          decodedToken.id
        );
        if (!activeUser)
          return ServerResponse.err({
            message: "Usuário não encontrado.",
            status: 401,
            refreshSession: true,
          });
        newRequest.user = decodedToken;
      } catch (error) {
        console.log(error);
        cookies().delete("token");
        return ServerResponse.err({
          message: "Token Inválido.",
          status: 401,
          refreshSession: true,
        });
      }

      return await originalMethod!.apply(this, [newRequest]);
    };

    return descriptor;
  };
}
