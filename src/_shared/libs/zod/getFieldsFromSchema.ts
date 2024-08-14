import * as z from "zod";

export const getZodFields = <T extends z.ZodTypeAny>(schema: T): any => {
  if (schema === null || schema === undefined) return [];

  if (schema instanceof z.ZodNullable || schema instanceof z.ZodOptional) {
    return getZodFields(schema.unwrap());
  }

  if (schema instanceof z.ZodEffects) return getZodFields(schema._def.schema);

  if (schema instanceof z.ZodArray) return getZodFields(schema.element);

  if (schema instanceof z.ZodObject) {
    return schema.shape;
  }

  return [];
};
