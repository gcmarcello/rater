import { z } from "zod";
import {
  MovieCreateArgsSchema,
  MovieFindManyArgsSchema,
  MovieUpdateArgsSchema,
} from "../../../../../prisma/generated/zod";

export const createMovieDto = MovieCreateArgsSchema;

export type CreateMovieDto = z.infer<typeof createMovieDto>;

export const readMovieDto = MovieFindManyArgsSchema;

export type ReadMovieDto = z.infer<typeof readMovieDto>;

export const updateMovieDto = MovieUpdateArgsSchema;

export type UpdateMovieDto = z.infer<typeof updateMovieDto>;
