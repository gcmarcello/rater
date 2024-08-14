import { ZodSchema } from "zod";
import {
  type ParsedRequestWithUser,
  type ParsedRequest,
} from "@/_shared/types/Request";

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
        (request as any).parsedSearchParams = validateSearchParams(
          request,
          zodSchema
        );
        return await originalMethod!.apply(this, [newRequest, params]);
      }

      if (request.body) {
        (request as any).parsedBody = await request.json();

        await validateBody(request.parsedBody, zodSchema);

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
    throw validateParams.error.issues;
  }
  return validateParams.data;
}

export async function validateBody<T>(body: T, zodSchema: ZodSchema) {
  const parsedBody = zodSchema.safeParse(body);

  if (!parsedBody.success) {
    throw parsedBody.error.issues;
  }

  return parsedBody.data;
}
