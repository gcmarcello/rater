import {
  CastedRoleCreateArgsSchema,
  CastedRoleFindManyArgsSchema,
  CastedRoleUpdateArgsSchema,
} from "../../../../prisma/generated/zod";

export const createCastDto = CastedRoleCreateArgsSchema._output.data;

export type CreateCastDto = typeof createCastDto;

export const readCastDto = CastedRoleFindManyArgsSchema._input;

export type ReadCastDto = typeof readCastDto;

export const updateCastDto = CastedRoleUpdateArgsSchema._output.data;

export type UpdateCastDto = typeof updateCastDto;
