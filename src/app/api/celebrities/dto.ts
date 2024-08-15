import { z } from "zod";
import {
  CelebrityCreateArgsSchema,
  CelebrityFindManyArgsSchema,
  CelebrityUpdateArgsSchema,
} from "../../../../prisma/generated/zod";

export const createCelebrityDto = CelebrityCreateArgsSchema;

export type CreateCelebrityDto = z.infer<typeof createCelebrityDto>;

export const readCelebrityDto = CelebrityFindManyArgsSchema;

export type ReadCelebrityDto = z.infer<typeof readCelebrityDto>;

export const updateCelebrityDto = CelebrityUpdateArgsSchema;

export type UpdateCelebrityDto = z.infer<typeof updateCelebrityDto>;
