import { NextResponse } from "next/server";
import { ZodSchema } from "zod";
import { ParsedRequest } from "../types/ParsedRequest";

export function Validation<T>(zodSchema: ZodSchema) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<
      (request: ParsedRequest<T>) => Promise<any>
    >
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (request: ParsedRequest<T>) {
      const body = await request.json();
      const parsedBody = zodSchema.safeParse(body);

      if (!parsedBody.success) {
        throw { error: parsedBody.error.issues };
      }

      // Attach the parsed body to the request
      (request as any).parsedBody = parsedBody.data;
      return await originalMethod!.apply(this, [request]);
    };

    return descriptor;
  };
}
