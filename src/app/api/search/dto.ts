import { start } from "repl";
import { z } from "zod";

export const searchDto = z.object({
  search: z.string().min(1),
  genre: z.any().optional(),
  releaseDate: z
    .object({ start: z.string().optional(), end: z.string().optional() })
    .optional(),
});

export type SearchDto = z.infer<typeof searchDto>;
