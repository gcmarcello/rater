import { z } from "zod";
import { RatingFindManyArgsSchema } from "../../../../../prisma/generated/zod";

export const readShowRatingDto = z.object({
  showId: z.number(),
});

export type ReadShowRatingDto = z.infer<typeof readShowRatingDto>;

export const readMovieRatingDto = z.object({
  movieId: z.number(),
});

export type ReadMovieRatingDto = z.infer<typeof readMovieRatingDto>;

export const upsertRatingDto = z
  .object({
    movieId: z.number().optional(),
    showId: z.number().optional(),
    rating: z.number({ coerce: true }).min(0).max(10),
    comment: z.string().optional(),
  })
  .refine(
    (data) => {
      return (data.movieId && !data.showId) || (!data.movieId && data.showId);
    },
    { message: "Choose one movie or show to rate" }
  );

export type UpsertRatingDto = z.infer<typeof upsertRatingDto>;
