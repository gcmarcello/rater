import { ServerResponse } from "@/_shared/classes/ServerResponse";
import { NextResponse } from "next/server";

export interface IRequestHandler {
  (request: Request): Promise<NextResponse>;
}

export function routeHandler<T>(routeClass: new (...args: any[]) => T): T {
  const instance = new routeClass() as any;
  const exportedHandlers: { [key in keyof T]?: IRequestHandler } = {};

  Object.getOwnPropertyNames(Object.getPrototypeOf(instance)).forEach((key) => {
    if (key !== "constructor" && typeof instance[key] === "function") {
      exportedHandlers[key as keyof T] = instance[key].bind(
        instance
      ) as IRequestHandler;
    }
  });

  return exportedHandlers as T;
}

export async function response<T>(data: T) {
  try {
    return ServerResponse.json(await data);
  } catch (error) {
    console.log(error);
    return ServerResponse.err(error);
  }
}
