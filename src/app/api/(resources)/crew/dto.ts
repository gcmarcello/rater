import { z } from "zod";
import {
  CrewCreateArgsSchema,
  CrewFindManyArgsSchema,
  CrewUpdateArgsSchema,
} from "../../../../../prisma/generated/zod";

export const createCrewDto = CrewCreateArgsSchema;

export type CreateCrewDto = z.infer<typeof createCrewDto>;

export const readCrewDto = CrewFindManyArgsSchema;

export type ReadCrewDto = z.infer<typeof readCrewDto>;

export const updateCrewDto = CrewUpdateArgsSchema;

export type UpdateCrewDto = z.infer<typeof updateCrewDto>;
