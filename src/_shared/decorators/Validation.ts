import { ZodSchema } from "zod";
import {
  type ParsedRequestWithUser,
  type ParsedRequest,
} from "@/_shared/types/Request";
import { ServerResponse } from "../classes/ServerResponse";
import { error } from "console";

type ValidationOptions = {
  validateSearchParams?: boolean;
  validateBody?: boolean;
};

export function Validation<T>(
  zodSchema: ZodSchema,
  options?: ValidationOptions
) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<
      (request: ParsedRequestWithUser<T>, params?: any) => Promise<any>
    >
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (
      request: ParsedRequest<T>,
      params?: any
    ) {
      let newRequest = request as ParsedRequestWithUser<T>;
      if (options?.validateSearchParams && request.nextUrl.searchParams) {
        try {
          const validation = validateSearchParams(request, zodSchema);
          if (validation.error) {
            throw validation.error;
          }
          (newRequest as any).parsedSearchParams = validation;
          return await originalMethod!.apply(this, [newRequest, params]);
        } catch (error) {
          console.log(error);
          return ServerResponse.err({
            message: "Parâmetros de Requisição Inválidos",
            error,
            status: 400,
          });
        }
      }

      if (request.body) {
        (request as any).parsedBody = await request.json();

        const validation = await validateBody(request.parsedBody, zodSchema);

        if (validation.error) {
          return ServerResponse.err({
            message: "Corpo da Requisição Inválido",
            error: validation.error,
            status: 400,
          });
        }

        return await originalMethod!.apply(this, [newRequest, params]);
      }

      return await originalMethod!.apply(this, [newRequest, params]);
    };

    return descriptor;
  };
}

function validateSearchParams<T>(
  request: ParsedRequest<T>,
  zodSchema: ZodSchema
) {
  const params = request.nextUrl.searchParams;
  const parsedParams: any = {};
  params.forEach((value, key) => {
    parsedParams[key] = JSON.parse(value);
  });
  const validateParams = zodSchema.safeParse(parsedParams);
  if (!validateParams.success) {
    return { error: validateParams.error.issues };
  }
  return validateParams.data;
}

export async function validateBody<T>(body: T, zodSchema: ZodSchema) {
  const parsedBody = zodSchema.safeParse(body);

  if (!parsedBody.success) {
    return { error: parsedBody.error.issues };
  }

  return parsedBody.data;
}
