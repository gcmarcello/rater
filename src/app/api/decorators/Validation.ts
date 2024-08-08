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
      try {
        const body = await request.json();
        const parsedBody = zodSchema.safeParse(body);

        if (!parsedBody.success) {
          return NextResponse.json(
            { error: parsedBody.error.issues },
            { status: 400 }
          );
        }

        // Attach the parsed body to the request
        (request as any).parsedBody = parsedBody.data;
        return await originalMethod!.apply(this, [request]);
      } catch (error) {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
      }
    };

    return descriptor;
  };
}
