import { z } from 'zod';
import { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput = Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | Prisma.NullTypes.DbNull | Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === 'DbNull') return Prisma.DbNull;
  if (v === 'JsonNull') return Prisma.JsonNull;
  return v;
};

export const JsonValueSchema: z.ZodType<Prisma.JsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.literal(null),
    z.record(z.lazy(() => JsonValueSchema.optional())),
    z.array(z.lazy(() => JsonValueSchema)),
  ])
);

export type JsonValueType = z.infer<typeof JsonValueSchema>;

export const NullableJsonValue = z
  .union([JsonValueSchema, z.literal('DbNull'), z.literal('JsonNull')])
  .nullable()
  .transform((v) => transformJsonNull(v));

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;

export const InputJsonValueSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.object({ toJSON: z.function(z.tuple([]), z.any()) }),
    z.record(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
    z.array(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
  ])
);

export type InputJsonValueType = z.infer<typeof InputJsonValueSchema>;


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','name','password','createdAt','updatedAt']);

export const CelebrityScalarFieldEnumSchema = z.enum(['id','name','birthDate','options','createdAt','updatedAt']);

export const MovieScalarFieldEnumSchema = z.enum(['id','title','releaseDate','rating','highlighted','options','createdAt','updatedAt','directorId']);

export const ShowScalarFieldEnumSchema = z.enum(['id','title','releaseDate','rating','highlighted','options','createdAt','updatedAt','directorId']);

export const ReviewScalarFieldEnumSchema = z.enum(['id','rating','comment','createdAt','updatedAt','movieId','showId','userId']);

export const GenreScalarFieldEnumSchema = z.enum(['id','name','createdAt','updatedAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullableJsonNullValueInputSchema = z.enum(['DbNull','JsonNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.DbNull : value);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.JsonNull : value === 'AnyNull' ? Prisma.AnyNull : value);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  password: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().nullable(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// CELEBRITY SCHEMA
/////////////////////////////////////////

export const CelebritySchema = z.object({
  id: z.string(),
  name: z.string(),
  birthDate: z.coerce.date().nullable(),
  /**
   * [CelebrityOptions]
   */
  options: JsonValueSchema.nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().nullable(),
})

export type Celebrity = z.infer<typeof CelebritySchema>

/////////////////////////////////////////
// MOVIE SCHEMA
/////////////////////////////////////////

export const MovieSchema = z.object({
  id: z.string(),
  title: z.string(),
  releaseDate: z.coerce.date().nullable(),
  rating: z.number().nullable(),
  highlighted: z.boolean(),
  /**
   * [MovieOptions]
   */
  options: JsonValueSchema.nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().nullable(),
  directorId: z.string().nullable(),
})

export type Movie = z.infer<typeof MovieSchema>

/////////////////////////////////////////
// SHOW SCHEMA
/////////////////////////////////////////

export const ShowSchema = z.object({
  id: z.string(),
  title: z.string(),
  releaseDate: z.coerce.date().nullable(),
  rating: z.number().nullable(),
  highlighted: z.boolean(),
  /**
   * [ShowOptions]
   */
  options: JsonValueSchema.nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().nullable(),
  directorId: z.string().nullable(),
})

export type Show = z.infer<typeof ShowSchema>

/////////////////////////////////////////
// REVIEW SCHEMA
/////////////////////////////////////////

export const ReviewSchema = z.object({
  id: z.string(),
  rating: z.number(),
  comment: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().nullable(),
  movieId: z.string(),
  showId: z.string(),
  userId: z.string(),
})

export type Review = z.infer<typeof ReviewSchema>

/////////////////////////////////////////
// GENRE SCHEMA
/////////////////////////////////////////

export const GenreSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().nullable(),
})

export type Genre = z.infer<typeof GenreSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  Review: z.union([z.boolean(),z.lazy(() => ReviewFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  Review: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  name: z.boolean().optional(),
  password: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  Review: z.union([z.boolean(),z.lazy(() => ReviewFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CELEBRITY
//------------------------------------------------------

export const CelebrityIncludeSchema: z.ZodType<Prisma.CelebrityInclude> = z.object({
  directedMovies: z.union([z.boolean(),z.lazy(() => MovieFindManyArgsSchema)]).optional(),
  writtenMovies: z.union([z.boolean(),z.lazy(() => MovieFindManyArgsSchema)]).optional(),
  starredMovies: z.union([z.boolean(),z.lazy(() => MovieFindManyArgsSchema)]).optional(),
  starredShows: z.union([z.boolean(),z.lazy(() => ShowFindManyArgsSchema)]).optional(),
  writtenShows: z.union([z.boolean(),z.lazy(() => ShowFindManyArgsSchema)]).optional(),
  directedShows: z.union([z.boolean(),z.lazy(() => ShowFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CelebrityCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CelebrityArgsSchema: z.ZodType<Prisma.CelebrityDefaultArgs> = z.object({
  select: z.lazy(() => CelebritySelectSchema).optional(),
  include: z.lazy(() => CelebrityIncludeSchema).optional(),
}).strict();

export const CelebrityCountOutputTypeArgsSchema: z.ZodType<Prisma.CelebrityCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CelebrityCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CelebrityCountOutputTypeSelectSchema: z.ZodType<Prisma.CelebrityCountOutputTypeSelect> = z.object({
  directedMovies: z.boolean().optional(),
  writtenMovies: z.boolean().optional(),
  starredMovies: z.boolean().optional(),
  starredShows: z.boolean().optional(),
  writtenShows: z.boolean().optional(),
  directedShows: z.boolean().optional(),
}).strict();

export const CelebritySelectSchema: z.ZodType<Prisma.CelebritySelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  birthDate: z.boolean().optional(),
  options: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  directedMovies: z.union([z.boolean(),z.lazy(() => MovieFindManyArgsSchema)]).optional(),
  writtenMovies: z.union([z.boolean(),z.lazy(() => MovieFindManyArgsSchema)]).optional(),
  starredMovies: z.union([z.boolean(),z.lazy(() => MovieFindManyArgsSchema)]).optional(),
  starredShows: z.union([z.boolean(),z.lazy(() => ShowFindManyArgsSchema)]).optional(),
  writtenShows: z.union([z.boolean(),z.lazy(() => ShowFindManyArgsSchema)]).optional(),
  directedShows: z.union([z.boolean(),z.lazy(() => ShowFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CelebrityCountOutputTypeArgsSchema)]).optional(),
}).strict()

// MOVIE
//------------------------------------------------------

export const MovieIncludeSchema: z.ZodType<Prisma.MovieInclude> = z.object({
  genres: z.union([z.boolean(),z.lazy(() => GenreFindManyArgsSchema)]).optional(),
  director: z.union([z.boolean(),z.lazy(() => CelebrityArgsSchema)]).optional(),
  writers: z.union([z.boolean(),z.lazy(() => CelebrityFindManyArgsSchema)]).optional(),
  starring: z.union([z.boolean(),z.lazy(() => CelebrityFindManyArgsSchema)]).optional(),
  Review: z.union([z.boolean(),z.lazy(() => ReviewFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => MovieCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const MovieArgsSchema: z.ZodType<Prisma.MovieDefaultArgs> = z.object({
  select: z.lazy(() => MovieSelectSchema).optional(),
  include: z.lazy(() => MovieIncludeSchema).optional(),
}).strict();

export const MovieCountOutputTypeArgsSchema: z.ZodType<Prisma.MovieCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => MovieCountOutputTypeSelectSchema).nullish(),
}).strict();

export const MovieCountOutputTypeSelectSchema: z.ZodType<Prisma.MovieCountOutputTypeSelect> = z.object({
  genres: z.boolean().optional(),
  writers: z.boolean().optional(),
  starring: z.boolean().optional(),
  Review: z.boolean().optional(),
}).strict();

export const MovieSelectSchema: z.ZodType<Prisma.MovieSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  releaseDate: z.boolean().optional(),
  rating: z.boolean().optional(),
  highlighted: z.boolean().optional(),
  options: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  directorId: z.boolean().optional(),
  genres: z.union([z.boolean(),z.lazy(() => GenreFindManyArgsSchema)]).optional(),
  director: z.union([z.boolean(),z.lazy(() => CelebrityArgsSchema)]).optional(),
  writers: z.union([z.boolean(),z.lazy(() => CelebrityFindManyArgsSchema)]).optional(),
  starring: z.union([z.boolean(),z.lazy(() => CelebrityFindManyArgsSchema)]).optional(),
  Review: z.union([z.boolean(),z.lazy(() => ReviewFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => MovieCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SHOW
//------------------------------------------------------

export const ShowIncludeSchema: z.ZodType<Prisma.ShowInclude> = z.object({
  genres: z.union([z.boolean(),z.lazy(() => GenreFindManyArgsSchema)]).optional(),
  director: z.union([z.boolean(),z.lazy(() => CelebrityArgsSchema)]).optional(),
  writers: z.union([z.boolean(),z.lazy(() => CelebrityFindManyArgsSchema)]).optional(),
  starring: z.union([z.boolean(),z.lazy(() => CelebrityFindManyArgsSchema)]).optional(),
  Review: z.union([z.boolean(),z.lazy(() => ReviewFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ShowCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ShowArgsSchema: z.ZodType<Prisma.ShowDefaultArgs> = z.object({
  select: z.lazy(() => ShowSelectSchema).optional(),
  include: z.lazy(() => ShowIncludeSchema).optional(),
}).strict();

export const ShowCountOutputTypeArgsSchema: z.ZodType<Prisma.ShowCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ShowCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ShowCountOutputTypeSelectSchema: z.ZodType<Prisma.ShowCountOutputTypeSelect> = z.object({
  genres: z.boolean().optional(),
  writers: z.boolean().optional(),
  starring: z.boolean().optional(),
  Review: z.boolean().optional(),
}).strict();

export const ShowSelectSchema: z.ZodType<Prisma.ShowSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  releaseDate: z.boolean().optional(),
  rating: z.boolean().optional(),
  highlighted: z.boolean().optional(),
  options: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  directorId: z.boolean().optional(),
  genres: z.union([z.boolean(),z.lazy(() => GenreFindManyArgsSchema)]).optional(),
  director: z.union([z.boolean(),z.lazy(() => CelebrityArgsSchema)]).optional(),
  writers: z.union([z.boolean(),z.lazy(() => CelebrityFindManyArgsSchema)]).optional(),
  starring: z.union([z.boolean(),z.lazy(() => CelebrityFindManyArgsSchema)]).optional(),
  Review: z.union([z.boolean(),z.lazy(() => ReviewFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ShowCountOutputTypeArgsSchema)]).optional(),
}).strict()

// REVIEW
//------------------------------------------------------

export const ReviewIncludeSchema: z.ZodType<Prisma.ReviewInclude> = z.object({
  movie: z.union([z.boolean(),z.lazy(() => MovieArgsSchema)]).optional(),
  show: z.union([z.boolean(),z.lazy(() => ShowArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const ReviewArgsSchema: z.ZodType<Prisma.ReviewDefaultArgs> = z.object({
  select: z.lazy(() => ReviewSelectSchema).optional(),
  include: z.lazy(() => ReviewIncludeSchema).optional(),
}).strict();

export const ReviewSelectSchema: z.ZodType<Prisma.ReviewSelect> = z.object({
  id: z.boolean().optional(),
  rating: z.boolean().optional(),
  comment: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  movieId: z.boolean().optional(),
  showId: z.boolean().optional(),
  userId: z.boolean().optional(),
  movie: z.union([z.boolean(),z.lazy(() => MovieArgsSchema)]).optional(),
  show: z.union([z.boolean(),z.lazy(() => ShowArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// GENRE
//------------------------------------------------------

export const GenreIncludeSchema: z.ZodType<Prisma.GenreInclude> = z.object({
  movies: z.union([z.boolean(),z.lazy(() => MovieFindManyArgsSchema)]).optional(),
  shows: z.union([z.boolean(),z.lazy(() => ShowFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => GenreCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const GenreArgsSchema: z.ZodType<Prisma.GenreDefaultArgs> = z.object({
  select: z.lazy(() => GenreSelectSchema).optional(),
  include: z.lazy(() => GenreIncludeSchema).optional(),
}).strict();

export const GenreCountOutputTypeArgsSchema: z.ZodType<Prisma.GenreCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => GenreCountOutputTypeSelectSchema).nullish(),
}).strict();

export const GenreCountOutputTypeSelectSchema: z.ZodType<Prisma.GenreCountOutputTypeSelect> = z.object({
  movies: z.boolean().optional(),
  shows: z.boolean().optional(),
}).strict();

export const GenreSelectSchema: z.ZodType<Prisma.GenreSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  movies: z.union([z.boolean(),z.lazy(() => MovieFindManyArgsSchema)]).optional(),
  shows: z.union([z.boolean(),z.lazy(() => ShowFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => GenreCountOutputTypeArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  Review: z.lazy(() => ReviewListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  Review: z.lazy(() => ReviewOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    email: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  Review: z.lazy(() => ReviewListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const CelebrityWhereInputSchema: z.ZodType<Prisma.CelebrityWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CelebrityWhereInputSchema),z.lazy(() => CelebrityWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CelebrityWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CelebrityWhereInputSchema),z.lazy(() => CelebrityWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  birthDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  options: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  directedMovies: z.lazy(() => MovieListRelationFilterSchema).optional(),
  writtenMovies: z.lazy(() => MovieListRelationFilterSchema).optional(),
  starredMovies: z.lazy(() => MovieListRelationFilterSchema).optional(),
  starredShows: z.lazy(() => ShowListRelationFilterSchema).optional(),
  writtenShows: z.lazy(() => ShowListRelationFilterSchema).optional(),
  directedShows: z.lazy(() => ShowListRelationFilterSchema).optional()
}).strict();

export const CelebrityOrderByWithRelationInputSchema: z.ZodType<Prisma.CelebrityOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  birthDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  directedMovies: z.lazy(() => MovieOrderByRelationAggregateInputSchema).optional(),
  writtenMovies: z.lazy(() => MovieOrderByRelationAggregateInputSchema).optional(),
  starredMovies: z.lazy(() => MovieOrderByRelationAggregateInputSchema).optional(),
  starredShows: z.lazy(() => ShowOrderByRelationAggregateInputSchema).optional(),
  writtenShows: z.lazy(() => ShowOrderByRelationAggregateInputSchema).optional(),
  directedShows: z.lazy(() => ShowOrderByRelationAggregateInputSchema).optional()
}).strict();

export const CelebrityWhereUniqueInputSchema: z.ZodType<Prisma.CelebrityWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => CelebrityWhereInputSchema),z.lazy(() => CelebrityWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CelebrityWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CelebrityWhereInputSchema),z.lazy(() => CelebrityWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  birthDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  options: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  directedMovies: z.lazy(() => MovieListRelationFilterSchema).optional(),
  writtenMovies: z.lazy(() => MovieListRelationFilterSchema).optional(),
  starredMovies: z.lazy(() => MovieListRelationFilterSchema).optional(),
  starredShows: z.lazy(() => ShowListRelationFilterSchema).optional(),
  writtenShows: z.lazy(() => ShowListRelationFilterSchema).optional(),
  directedShows: z.lazy(() => ShowListRelationFilterSchema).optional()
}).strict());

export const CelebrityOrderByWithAggregationInputSchema: z.ZodType<Prisma.CelebrityOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  birthDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => CelebrityCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CelebrityMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CelebrityMinOrderByAggregateInputSchema).optional()
}).strict();

export const CelebrityScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CelebrityScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CelebrityScalarWhereWithAggregatesInputSchema),z.lazy(() => CelebrityScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CelebrityScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CelebrityScalarWhereWithAggregatesInputSchema),z.lazy(() => CelebrityScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  birthDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  options: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const MovieWhereInputSchema: z.ZodType<Prisma.MovieWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MovieWhereInputSchema),z.lazy(() => MovieWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MovieWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MovieWhereInputSchema),z.lazy(() => MovieWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  releaseDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  rating: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  highlighted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  options: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  directorId: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  genres: z.lazy(() => GenreListRelationFilterSchema).optional(),
  director: z.union([ z.lazy(() => CelebrityNullableRelationFilterSchema),z.lazy(() => CelebrityWhereInputSchema) ]).optional().nullable(),
  writers: z.lazy(() => CelebrityListRelationFilterSchema).optional(),
  starring: z.lazy(() => CelebrityListRelationFilterSchema).optional(),
  Review: z.lazy(() => ReviewListRelationFilterSchema).optional()
}).strict();

export const MovieOrderByWithRelationInputSchema: z.ZodType<Prisma.MovieOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  releaseDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  rating: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  highlighted: z.lazy(() => SortOrderSchema).optional(),
  options: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  directorId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  genres: z.lazy(() => GenreOrderByRelationAggregateInputSchema).optional(),
  director: z.lazy(() => CelebrityOrderByWithRelationInputSchema).optional(),
  writers: z.lazy(() => CelebrityOrderByRelationAggregateInputSchema).optional(),
  starring: z.lazy(() => CelebrityOrderByRelationAggregateInputSchema).optional(),
  Review: z.lazy(() => ReviewOrderByRelationAggregateInputSchema).optional()
}).strict();

export const MovieWhereUniqueInputSchema: z.ZodType<Prisma.MovieWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => MovieWhereInputSchema),z.lazy(() => MovieWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MovieWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MovieWhereInputSchema),z.lazy(() => MovieWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  releaseDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  rating: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  highlighted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  options: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  directorId: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  genres: z.lazy(() => GenreListRelationFilterSchema).optional(),
  director: z.union([ z.lazy(() => CelebrityNullableRelationFilterSchema),z.lazy(() => CelebrityWhereInputSchema) ]).optional().nullable(),
  writers: z.lazy(() => CelebrityListRelationFilterSchema).optional(),
  starring: z.lazy(() => CelebrityListRelationFilterSchema).optional(),
  Review: z.lazy(() => ReviewListRelationFilterSchema).optional()
}).strict());

export const MovieOrderByWithAggregationInputSchema: z.ZodType<Prisma.MovieOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  releaseDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  rating: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  highlighted: z.lazy(() => SortOrderSchema).optional(),
  options: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  directorId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => MovieCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => MovieAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MovieMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MovieMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => MovieSumOrderByAggregateInputSchema).optional()
}).strict();

export const MovieScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MovieScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => MovieScalarWhereWithAggregatesInputSchema),z.lazy(() => MovieScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => MovieScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MovieScalarWhereWithAggregatesInputSchema),z.lazy(() => MovieScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  releaseDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  rating: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  highlighted: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  options: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  directorId: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const ShowWhereInputSchema: z.ZodType<Prisma.ShowWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ShowWhereInputSchema),z.lazy(() => ShowWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ShowWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ShowWhereInputSchema),z.lazy(() => ShowWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  releaseDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  rating: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  highlighted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  options: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  directorId: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  genres: z.lazy(() => GenreListRelationFilterSchema).optional(),
  director: z.union([ z.lazy(() => CelebrityNullableRelationFilterSchema),z.lazy(() => CelebrityWhereInputSchema) ]).optional().nullable(),
  writers: z.lazy(() => CelebrityListRelationFilterSchema).optional(),
  starring: z.lazy(() => CelebrityListRelationFilterSchema).optional(),
  Review: z.lazy(() => ReviewListRelationFilterSchema).optional()
}).strict();

export const ShowOrderByWithRelationInputSchema: z.ZodType<Prisma.ShowOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  releaseDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  rating: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  highlighted: z.lazy(() => SortOrderSchema).optional(),
  options: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  directorId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  genres: z.lazy(() => GenreOrderByRelationAggregateInputSchema).optional(),
  director: z.lazy(() => CelebrityOrderByWithRelationInputSchema).optional(),
  writers: z.lazy(() => CelebrityOrderByRelationAggregateInputSchema).optional(),
  starring: z.lazy(() => CelebrityOrderByRelationAggregateInputSchema).optional(),
  Review: z.lazy(() => ReviewOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ShowWhereUniqueInputSchema: z.ZodType<Prisma.ShowWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => ShowWhereInputSchema),z.lazy(() => ShowWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ShowWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ShowWhereInputSchema),z.lazy(() => ShowWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  releaseDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  rating: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  highlighted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  options: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  directorId: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  genres: z.lazy(() => GenreListRelationFilterSchema).optional(),
  director: z.union([ z.lazy(() => CelebrityNullableRelationFilterSchema),z.lazy(() => CelebrityWhereInputSchema) ]).optional().nullable(),
  writers: z.lazy(() => CelebrityListRelationFilterSchema).optional(),
  starring: z.lazy(() => CelebrityListRelationFilterSchema).optional(),
  Review: z.lazy(() => ReviewListRelationFilterSchema).optional()
}).strict());

export const ShowOrderByWithAggregationInputSchema: z.ZodType<Prisma.ShowOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  releaseDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  rating: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  highlighted: z.lazy(() => SortOrderSchema).optional(),
  options: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  directorId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => ShowCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ShowAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ShowMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ShowMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ShowSumOrderByAggregateInputSchema).optional()
}).strict();

export const ShowScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ShowScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ShowScalarWhereWithAggregatesInputSchema),z.lazy(() => ShowScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ShowScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ShowScalarWhereWithAggregatesInputSchema),z.lazy(() => ShowScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  releaseDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  rating: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  highlighted: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  options: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  directorId: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const ReviewWhereInputSchema: z.ZodType<Prisma.ReviewWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ReviewWhereInputSchema),z.lazy(() => ReviewWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReviewWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReviewWhereInputSchema),z.lazy(() => ReviewWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  rating: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  comment: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  movieId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  showId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  movie: z.union([ z.lazy(() => MovieRelationFilterSchema),z.lazy(() => MovieWhereInputSchema) ]).optional(),
  show: z.union([ z.lazy(() => ShowRelationFilterSchema),z.lazy(() => ShowWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const ReviewOrderByWithRelationInputSchema: z.ZodType<Prisma.ReviewOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  movieId: z.lazy(() => SortOrderSchema).optional(),
  showId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  movie: z.lazy(() => MovieOrderByWithRelationInputSchema).optional(),
  show: z.lazy(() => ShowOrderByWithRelationInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const ReviewWhereUniqueInputSchema: z.ZodType<Prisma.ReviewWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => ReviewWhereInputSchema),z.lazy(() => ReviewWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReviewWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReviewWhereInputSchema),z.lazy(() => ReviewWhereInputSchema).array() ]).optional(),
  rating: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  comment: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  movieId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  showId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  movie: z.union([ z.lazy(() => MovieRelationFilterSchema),z.lazy(() => MovieWhereInputSchema) ]).optional(),
  show: z.union([ z.lazy(() => ShowRelationFilterSchema),z.lazy(() => ShowWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const ReviewOrderByWithAggregationInputSchema: z.ZodType<Prisma.ReviewOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  movieId: z.lazy(() => SortOrderSchema).optional(),
  showId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ReviewCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ReviewAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ReviewMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ReviewMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ReviewSumOrderByAggregateInputSchema).optional()
}).strict();

export const ReviewScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ReviewScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ReviewScalarWhereWithAggregatesInputSchema),z.lazy(() => ReviewScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReviewScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReviewScalarWhereWithAggregatesInputSchema),z.lazy(() => ReviewScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  rating: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  comment: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  movieId: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  showId: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const GenreWhereInputSchema: z.ZodType<Prisma.GenreWhereInput> = z.object({
  AND: z.union([ z.lazy(() => GenreWhereInputSchema),z.lazy(() => GenreWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => GenreWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GenreWhereInputSchema),z.lazy(() => GenreWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  movies: z.lazy(() => MovieListRelationFilterSchema).optional(),
  shows: z.lazy(() => ShowListRelationFilterSchema).optional()
}).strict();

export const GenreOrderByWithRelationInputSchema: z.ZodType<Prisma.GenreOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  movies: z.lazy(() => MovieOrderByRelationAggregateInputSchema).optional(),
  shows: z.lazy(() => ShowOrderByRelationAggregateInputSchema).optional()
}).strict();

export const GenreWhereUniqueInputSchema: z.ZodType<Prisma.GenreWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => GenreWhereInputSchema),z.lazy(() => GenreWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => GenreWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GenreWhereInputSchema),z.lazy(() => GenreWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  movies: z.lazy(() => MovieListRelationFilterSchema).optional(),
  shows: z.lazy(() => ShowListRelationFilterSchema).optional()
}).strict());

export const GenreOrderByWithAggregationInputSchema: z.ZodType<Prisma.GenreOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => GenreCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => GenreAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => GenreMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => GenreMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => GenreSumOrderByAggregateInputSchema).optional()
}).strict();

export const GenreScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.GenreScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => GenreScalarWhereWithAggregatesInputSchema),z.lazy(() => GenreScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => GenreScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GenreScalarWhereWithAggregatesInputSchema),z.lazy(() => GenreScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  Review: z.lazy(() => ReviewCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  Review: z.lazy(() => ReviewUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Review: z.lazy(() => ReviewUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Review: z.lazy(() => ReviewUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CelebrityCreateInputSchema: z.ZodType<Prisma.CelebrityCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  birthDate: z.coerce.date().optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  directedMovies: z.lazy(() => MovieCreateNestedManyWithoutDirectorInputSchema).optional(),
  writtenMovies: z.lazy(() => MovieCreateNestedManyWithoutWritersInputSchema).optional(),
  starredMovies: z.lazy(() => MovieCreateNestedManyWithoutStarringInputSchema).optional(),
  starredShows: z.lazy(() => ShowCreateNestedManyWithoutStarringInputSchema).optional(),
  writtenShows: z.lazy(() => ShowCreateNestedManyWithoutWritersInputSchema).optional(),
  directedShows: z.lazy(() => ShowCreateNestedManyWithoutDirectorInputSchema).optional()
}).strict();

export const CelebrityUncheckedCreateInputSchema: z.ZodType<Prisma.CelebrityUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  birthDate: z.coerce.date().optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  directedMovies: z.lazy(() => MovieUncheckedCreateNestedManyWithoutDirectorInputSchema).optional(),
  writtenMovies: z.lazy(() => MovieUncheckedCreateNestedManyWithoutWritersInputSchema).optional(),
  starredMovies: z.lazy(() => MovieUncheckedCreateNestedManyWithoutStarringInputSchema).optional(),
  starredShows: z.lazy(() => ShowUncheckedCreateNestedManyWithoutStarringInputSchema).optional(),
  writtenShows: z.lazy(() => ShowUncheckedCreateNestedManyWithoutWritersInputSchema).optional(),
  directedShows: z.lazy(() => ShowUncheckedCreateNestedManyWithoutDirectorInputSchema).optional()
}).strict();

export const CelebrityUpdateInputSchema: z.ZodType<Prisma.CelebrityUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  directedMovies: z.lazy(() => MovieUpdateManyWithoutDirectorNestedInputSchema).optional(),
  writtenMovies: z.lazy(() => MovieUpdateManyWithoutWritersNestedInputSchema).optional(),
  starredMovies: z.lazy(() => MovieUpdateManyWithoutStarringNestedInputSchema).optional(),
  starredShows: z.lazy(() => ShowUpdateManyWithoutStarringNestedInputSchema).optional(),
  writtenShows: z.lazy(() => ShowUpdateManyWithoutWritersNestedInputSchema).optional(),
  directedShows: z.lazy(() => ShowUpdateManyWithoutDirectorNestedInputSchema).optional()
}).strict();

export const CelebrityUncheckedUpdateInputSchema: z.ZodType<Prisma.CelebrityUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  directedMovies: z.lazy(() => MovieUncheckedUpdateManyWithoutDirectorNestedInputSchema).optional(),
  writtenMovies: z.lazy(() => MovieUncheckedUpdateManyWithoutWritersNestedInputSchema).optional(),
  starredMovies: z.lazy(() => MovieUncheckedUpdateManyWithoutStarringNestedInputSchema).optional(),
  starredShows: z.lazy(() => ShowUncheckedUpdateManyWithoutStarringNestedInputSchema).optional(),
  writtenShows: z.lazy(() => ShowUncheckedUpdateManyWithoutWritersNestedInputSchema).optional(),
  directedShows: z.lazy(() => ShowUncheckedUpdateManyWithoutDirectorNestedInputSchema).optional()
}).strict();

export const CelebrityCreateManyInputSchema: z.ZodType<Prisma.CelebrityCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  birthDate: z.coerce.date().optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict();

export const CelebrityUpdateManyMutationInputSchema: z.ZodType<Prisma.CelebrityUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CelebrityUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CelebrityUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const MovieCreateInputSchema: z.ZodType<Prisma.MovieCreateInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  genres: z.lazy(() => GenreCreateNestedManyWithoutMoviesInputSchema).optional(),
  director: z.lazy(() => CelebrityCreateNestedOneWithoutDirectedMoviesInputSchema).optional(),
  writers: z.lazy(() => CelebrityCreateNestedManyWithoutWrittenMoviesInputSchema).optional(),
  starring: z.lazy(() => CelebrityCreateNestedManyWithoutStarredMoviesInputSchema).optional(),
  Review: z.lazy(() => ReviewCreateNestedManyWithoutMovieInputSchema).optional()
}).strict();

export const MovieUncheckedCreateInputSchema: z.ZodType<Prisma.MovieUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  directorId: z.string().optional().nullable(),
  genres: z.lazy(() => GenreUncheckedCreateNestedManyWithoutMoviesInputSchema).optional(),
  writers: z.lazy(() => CelebrityUncheckedCreateNestedManyWithoutWrittenMoviesInputSchema).optional(),
  starring: z.lazy(() => CelebrityUncheckedCreateNestedManyWithoutStarredMoviesInputSchema).optional(),
  Review: z.lazy(() => ReviewUncheckedCreateNestedManyWithoutMovieInputSchema).optional()
}).strict();

export const MovieUpdateInputSchema: z.ZodType<Prisma.MovieUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genres: z.lazy(() => GenreUpdateManyWithoutMoviesNestedInputSchema).optional(),
  director: z.lazy(() => CelebrityUpdateOneWithoutDirectedMoviesNestedInputSchema).optional(),
  writers: z.lazy(() => CelebrityUpdateManyWithoutWrittenMoviesNestedInputSchema).optional(),
  starring: z.lazy(() => CelebrityUpdateManyWithoutStarredMoviesNestedInputSchema).optional(),
  Review: z.lazy(() => ReviewUpdateManyWithoutMovieNestedInputSchema).optional()
}).strict();

export const MovieUncheckedUpdateInputSchema: z.ZodType<Prisma.MovieUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  directorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genres: z.lazy(() => GenreUncheckedUpdateManyWithoutMoviesNestedInputSchema).optional(),
  writers: z.lazy(() => CelebrityUncheckedUpdateManyWithoutWrittenMoviesNestedInputSchema).optional(),
  starring: z.lazy(() => CelebrityUncheckedUpdateManyWithoutStarredMoviesNestedInputSchema).optional(),
  Review: z.lazy(() => ReviewUncheckedUpdateManyWithoutMovieNestedInputSchema).optional()
}).strict();

export const MovieCreateManyInputSchema: z.ZodType<Prisma.MovieCreateManyInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  directorId: z.string().optional().nullable()
}).strict();

export const MovieUpdateManyMutationInputSchema: z.ZodType<Prisma.MovieUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const MovieUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MovieUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  directorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ShowCreateInputSchema: z.ZodType<Prisma.ShowCreateInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  genres: z.lazy(() => GenreCreateNestedManyWithoutShowsInputSchema).optional(),
  director: z.lazy(() => CelebrityCreateNestedOneWithoutDirectedShowsInputSchema).optional(),
  writers: z.lazy(() => CelebrityCreateNestedManyWithoutWrittenShowsInputSchema).optional(),
  starring: z.lazy(() => CelebrityCreateNestedManyWithoutStarredShowsInputSchema).optional(),
  Review: z.lazy(() => ReviewCreateNestedManyWithoutShowInputSchema).optional()
}).strict();

export const ShowUncheckedCreateInputSchema: z.ZodType<Prisma.ShowUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  directorId: z.string().optional().nullable(),
  genres: z.lazy(() => GenreUncheckedCreateNestedManyWithoutShowsInputSchema).optional(),
  writers: z.lazy(() => CelebrityUncheckedCreateNestedManyWithoutWrittenShowsInputSchema).optional(),
  starring: z.lazy(() => CelebrityUncheckedCreateNestedManyWithoutStarredShowsInputSchema).optional(),
  Review: z.lazy(() => ReviewUncheckedCreateNestedManyWithoutShowInputSchema).optional()
}).strict();

export const ShowUpdateInputSchema: z.ZodType<Prisma.ShowUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genres: z.lazy(() => GenreUpdateManyWithoutShowsNestedInputSchema).optional(),
  director: z.lazy(() => CelebrityUpdateOneWithoutDirectedShowsNestedInputSchema).optional(),
  writers: z.lazy(() => CelebrityUpdateManyWithoutWrittenShowsNestedInputSchema).optional(),
  starring: z.lazy(() => CelebrityUpdateManyWithoutStarredShowsNestedInputSchema).optional(),
  Review: z.lazy(() => ReviewUpdateManyWithoutShowNestedInputSchema).optional()
}).strict();

export const ShowUncheckedUpdateInputSchema: z.ZodType<Prisma.ShowUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  directorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genres: z.lazy(() => GenreUncheckedUpdateManyWithoutShowsNestedInputSchema).optional(),
  writers: z.lazy(() => CelebrityUncheckedUpdateManyWithoutWrittenShowsNestedInputSchema).optional(),
  starring: z.lazy(() => CelebrityUncheckedUpdateManyWithoutStarredShowsNestedInputSchema).optional(),
  Review: z.lazy(() => ReviewUncheckedUpdateManyWithoutShowNestedInputSchema).optional()
}).strict();

export const ShowCreateManyInputSchema: z.ZodType<Prisma.ShowCreateManyInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  directorId: z.string().optional().nullable()
}).strict();

export const ShowUpdateManyMutationInputSchema: z.ZodType<Prisma.ShowUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ShowUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ShowUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  directorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ReviewCreateInputSchema: z.ZodType<Prisma.ReviewCreateInput> = z.object({
  id: z.string().optional(),
  rating: z.number(),
  comment: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  movie: z.lazy(() => MovieCreateNestedOneWithoutReviewInputSchema),
  show: z.lazy(() => ShowCreateNestedOneWithoutReviewInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutReviewInputSchema)
}).strict();

export const ReviewUncheckedCreateInputSchema: z.ZodType<Prisma.ReviewUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  rating: z.number(),
  comment: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  movieId: z.string(),
  showId: z.string(),
  userId: z.string()
}).strict();

export const ReviewUpdateInputSchema: z.ZodType<Prisma.ReviewUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  movie: z.lazy(() => MovieUpdateOneRequiredWithoutReviewNestedInputSchema).optional(),
  show: z.lazy(() => ShowUpdateOneRequiredWithoutReviewNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutReviewNestedInputSchema).optional()
}).strict();

export const ReviewUncheckedUpdateInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  movieId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  showId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReviewCreateManyInputSchema: z.ZodType<Prisma.ReviewCreateManyInput> = z.object({
  id: z.string().optional(),
  rating: z.number(),
  comment: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  movieId: z.string(),
  showId: z.string(),
  userId: z.string()
}).strict();

export const ReviewUpdateManyMutationInputSchema: z.ZodType<Prisma.ReviewUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ReviewUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  movieId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  showId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const GenreCreateInputSchema: z.ZodType<Prisma.GenreCreateInput> = z.object({
  id: z.number().int(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  movies: z.lazy(() => MovieCreateNestedManyWithoutGenresInputSchema).optional(),
  shows: z.lazy(() => ShowCreateNestedManyWithoutGenresInputSchema).optional()
}).strict();

export const GenreUncheckedCreateInputSchema: z.ZodType<Prisma.GenreUncheckedCreateInput> = z.object({
  id: z.number().int(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  movies: z.lazy(() => MovieUncheckedCreateNestedManyWithoutGenresInputSchema).optional(),
  shows: z.lazy(() => ShowUncheckedCreateNestedManyWithoutGenresInputSchema).optional()
}).strict();

export const GenreUpdateInputSchema: z.ZodType<Prisma.GenreUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  movies: z.lazy(() => MovieUpdateManyWithoutGenresNestedInputSchema).optional(),
  shows: z.lazy(() => ShowUpdateManyWithoutGenresNestedInputSchema).optional()
}).strict();

export const GenreUncheckedUpdateInputSchema: z.ZodType<Prisma.GenreUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  movies: z.lazy(() => MovieUncheckedUpdateManyWithoutGenresNestedInputSchema).optional(),
  shows: z.lazy(() => ShowUncheckedUpdateManyWithoutGenresNestedInputSchema).optional()
}).strict();

export const GenreCreateManyInputSchema: z.ZodType<Prisma.GenreCreateManyInput> = z.object({
  id: z.number().int(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict();

export const GenreUpdateManyMutationInputSchema: z.ZodType<Prisma.GenreUpdateManyMutationInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const GenreUncheckedUpdateManyInputSchema: z.ZodType<Prisma.GenreUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UuidFilterSchema: z.ZodType<Prisma.UuidFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidFilterSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const ReviewListRelationFilterSchema: z.ZodType<Prisma.ReviewListRelationFilter> = z.object({
  every: z.lazy(() => ReviewWhereInputSchema).optional(),
  some: z.lazy(() => ReviewWhereInputSchema).optional(),
  none: z.lazy(() => ReviewWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const ReviewOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ReviewOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UuidWithAggregatesFilterSchema: z.ZodType<Prisma.UuidWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const JsonNullableFilterSchema: z.ZodType<Prisma.JsonNullableFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional()
}).strict();

export const MovieListRelationFilterSchema: z.ZodType<Prisma.MovieListRelationFilter> = z.object({
  every: z.lazy(() => MovieWhereInputSchema).optional(),
  some: z.lazy(() => MovieWhereInputSchema).optional(),
  none: z.lazy(() => MovieWhereInputSchema).optional()
}).strict();

export const ShowListRelationFilterSchema: z.ZodType<Prisma.ShowListRelationFilter> = z.object({
  every: z.lazy(() => ShowWhereInputSchema).optional(),
  some: z.lazy(() => ShowWhereInputSchema).optional(),
  none: z.lazy(() => ShowWhereInputSchema).optional()
}).strict();

export const MovieOrderByRelationAggregateInputSchema: z.ZodType<Prisma.MovieOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ShowOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ShowOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CelebrityCountOrderByAggregateInputSchema: z.ZodType<Prisma.CelebrityCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  birthDate: z.lazy(() => SortOrderSchema).optional(),
  options: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CelebrityMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CelebrityMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  birthDate: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CelebrityMinOrderByAggregateInputSchema: z.ZodType<Prisma.CelebrityMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  birthDate: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JsonNullableWithAggregatesFilterSchema: z.ZodType<Prisma.JsonNullableWithAggregatesFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedJsonNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedJsonNullableFilterSchema).optional()
}).strict();

export const FloatNullableFilterSchema: z.ZodType<Prisma.FloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const UuidNullableFilterSchema: z.ZodType<Prisma.UuidNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const GenreListRelationFilterSchema: z.ZodType<Prisma.GenreListRelationFilter> = z.object({
  every: z.lazy(() => GenreWhereInputSchema).optional(),
  some: z.lazy(() => GenreWhereInputSchema).optional(),
  none: z.lazy(() => GenreWhereInputSchema).optional()
}).strict();

export const CelebrityNullableRelationFilterSchema: z.ZodType<Prisma.CelebrityNullableRelationFilter> = z.object({
  is: z.lazy(() => CelebrityWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => CelebrityWhereInputSchema).optional().nullable()
}).strict();

export const CelebrityListRelationFilterSchema: z.ZodType<Prisma.CelebrityListRelationFilter> = z.object({
  every: z.lazy(() => CelebrityWhereInputSchema).optional(),
  some: z.lazy(() => CelebrityWhereInputSchema).optional(),
  none: z.lazy(() => CelebrityWhereInputSchema).optional()
}).strict();

export const GenreOrderByRelationAggregateInputSchema: z.ZodType<Prisma.GenreOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CelebrityOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CelebrityOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MovieCountOrderByAggregateInputSchema: z.ZodType<Prisma.MovieCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  releaseDate: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  highlighted: z.lazy(() => SortOrderSchema).optional(),
  options: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  directorId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MovieAvgOrderByAggregateInputSchema: z.ZodType<Prisma.MovieAvgOrderByAggregateInput> = z.object({
  rating: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MovieMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MovieMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  releaseDate: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  highlighted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  directorId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MovieMinOrderByAggregateInputSchema: z.ZodType<Prisma.MovieMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  releaseDate: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  highlighted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  directorId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MovieSumOrderByAggregateInputSchema: z.ZodType<Prisma.MovieSumOrderByAggregateInput> = z.object({
  rating: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.FloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const UuidNullableWithAggregatesFilterSchema: z.ZodType<Prisma.UuidNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const ShowCountOrderByAggregateInputSchema: z.ZodType<Prisma.ShowCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  releaseDate: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  highlighted: z.lazy(() => SortOrderSchema).optional(),
  options: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  directorId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ShowAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ShowAvgOrderByAggregateInput> = z.object({
  rating: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ShowMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ShowMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  releaseDate: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  highlighted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  directorId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ShowMinOrderByAggregateInputSchema: z.ZodType<Prisma.ShowMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  releaseDate: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  highlighted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  directorId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ShowSumOrderByAggregateInputSchema: z.ZodType<Prisma.ShowSumOrderByAggregateInput> = z.object({
  rating: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const MovieRelationFilterSchema: z.ZodType<Prisma.MovieRelationFilter> = z.object({
  is: z.lazy(() => MovieWhereInputSchema).optional(),
  isNot: z.lazy(() => MovieWhereInputSchema).optional()
}).strict();

export const ShowRelationFilterSchema: z.ZodType<Prisma.ShowRelationFilter> = z.object({
  is: z.lazy(() => ShowWhereInputSchema).optional(),
  isNot: z.lazy(() => ShowWhereInputSchema).optional()
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const ReviewCountOrderByAggregateInputSchema: z.ZodType<Prisma.ReviewCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  movieId: z.lazy(() => SortOrderSchema).optional(),
  showId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReviewAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ReviewAvgOrderByAggregateInput> = z.object({
  rating: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReviewMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ReviewMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  movieId: z.lazy(() => SortOrderSchema).optional(),
  showId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReviewMinOrderByAggregateInputSchema: z.ZodType<Prisma.ReviewMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  movieId: z.lazy(() => SortOrderSchema).optional(),
  showId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReviewSumOrderByAggregateInputSchema: z.ZodType<Prisma.ReviewSumOrderByAggregateInput> = z.object({
  rating: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const GenreCountOrderByAggregateInputSchema: z.ZodType<Prisma.GenreCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GenreAvgOrderByAggregateInputSchema: z.ZodType<Prisma.GenreAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GenreMaxOrderByAggregateInputSchema: z.ZodType<Prisma.GenreMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GenreMinOrderByAggregateInputSchema: z.ZodType<Prisma.GenreMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GenreSumOrderByAggregateInputSchema: z.ZodType<Prisma.GenreSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const ReviewCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ReviewCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ReviewCreateWithoutUserInputSchema),z.lazy(() => ReviewCreateWithoutUserInputSchema).array(),z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewCreateOrConnectWithoutUserInputSchema),z.lazy(() => ReviewCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReviewUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ReviewUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ReviewCreateWithoutUserInputSchema),z.lazy(() => ReviewCreateWithoutUserInputSchema).array(),z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewCreateOrConnectWithoutUserInputSchema),z.lazy(() => ReviewCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const ReviewUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ReviewUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReviewCreateWithoutUserInputSchema),z.lazy(() => ReviewCreateWithoutUserInputSchema).array(),z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewCreateOrConnectWithoutUserInputSchema),z.lazy(() => ReviewCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReviewUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ReviewUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReviewUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ReviewUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReviewUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ReviewUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReviewScalarWhereInputSchema),z.lazy(() => ReviewScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReviewUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReviewCreateWithoutUserInputSchema),z.lazy(() => ReviewCreateWithoutUserInputSchema).array(),z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewCreateOrConnectWithoutUserInputSchema),z.lazy(() => ReviewCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReviewUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ReviewUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReviewUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ReviewUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReviewUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ReviewUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReviewScalarWhereInputSchema),z.lazy(() => ReviewScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MovieCreateNestedManyWithoutDirectorInputSchema: z.ZodType<Prisma.MovieCreateNestedManyWithoutDirectorInput> = z.object({
  create: z.union([ z.lazy(() => MovieCreateWithoutDirectorInputSchema),z.lazy(() => MovieCreateWithoutDirectorInputSchema).array(),z.lazy(() => MovieUncheckedCreateWithoutDirectorInputSchema),z.lazy(() => MovieUncheckedCreateWithoutDirectorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MovieCreateOrConnectWithoutDirectorInputSchema),z.lazy(() => MovieCreateOrConnectWithoutDirectorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MovieCreateManyDirectorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MovieWhereUniqueInputSchema),z.lazy(() => MovieWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MovieCreateNestedManyWithoutWritersInputSchema: z.ZodType<Prisma.MovieCreateNestedManyWithoutWritersInput> = z.object({
  create: z.union([ z.lazy(() => MovieCreateWithoutWritersInputSchema),z.lazy(() => MovieCreateWithoutWritersInputSchema).array(),z.lazy(() => MovieUncheckedCreateWithoutWritersInputSchema),z.lazy(() => MovieUncheckedCreateWithoutWritersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MovieCreateOrConnectWithoutWritersInputSchema),z.lazy(() => MovieCreateOrConnectWithoutWritersInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MovieWhereUniqueInputSchema),z.lazy(() => MovieWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MovieCreateNestedManyWithoutStarringInputSchema: z.ZodType<Prisma.MovieCreateNestedManyWithoutStarringInput> = z.object({
  create: z.union([ z.lazy(() => MovieCreateWithoutStarringInputSchema),z.lazy(() => MovieCreateWithoutStarringInputSchema).array(),z.lazy(() => MovieUncheckedCreateWithoutStarringInputSchema),z.lazy(() => MovieUncheckedCreateWithoutStarringInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MovieCreateOrConnectWithoutStarringInputSchema),z.lazy(() => MovieCreateOrConnectWithoutStarringInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MovieWhereUniqueInputSchema),z.lazy(() => MovieWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ShowCreateNestedManyWithoutStarringInputSchema: z.ZodType<Prisma.ShowCreateNestedManyWithoutStarringInput> = z.object({
  create: z.union([ z.lazy(() => ShowCreateWithoutStarringInputSchema),z.lazy(() => ShowCreateWithoutStarringInputSchema).array(),z.lazy(() => ShowUncheckedCreateWithoutStarringInputSchema),z.lazy(() => ShowUncheckedCreateWithoutStarringInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShowCreateOrConnectWithoutStarringInputSchema),z.lazy(() => ShowCreateOrConnectWithoutStarringInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ShowCreateNestedManyWithoutWritersInputSchema: z.ZodType<Prisma.ShowCreateNestedManyWithoutWritersInput> = z.object({
  create: z.union([ z.lazy(() => ShowCreateWithoutWritersInputSchema),z.lazy(() => ShowCreateWithoutWritersInputSchema).array(),z.lazy(() => ShowUncheckedCreateWithoutWritersInputSchema),z.lazy(() => ShowUncheckedCreateWithoutWritersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShowCreateOrConnectWithoutWritersInputSchema),z.lazy(() => ShowCreateOrConnectWithoutWritersInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ShowCreateNestedManyWithoutDirectorInputSchema: z.ZodType<Prisma.ShowCreateNestedManyWithoutDirectorInput> = z.object({
  create: z.union([ z.lazy(() => ShowCreateWithoutDirectorInputSchema),z.lazy(() => ShowCreateWithoutDirectorInputSchema).array(),z.lazy(() => ShowUncheckedCreateWithoutDirectorInputSchema),z.lazy(() => ShowUncheckedCreateWithoutDirectorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShowCreateOrConnectWithoutDirectorInputSchema),z.lazy(() => ShowCreateOrConnectWithoutDirectorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShowCreateManyDirectorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MovieUncheckedCreateNestedManyWithoutDirectorInputSchema: z.ZodType<Prisma.MovieUncheckedCreateNestedManyWithoutDirectorInput> = z.object({
  create: z.union([ z.lazy(() => MovieCreateWithoutDirectorInputSchema),z.lazy(() => MovieCreateWithoutDirectorInputSchema).array(),z.lazy(() => MovieUncheckedCreateWithoutDirectorInputSchema),z.lazy(() => MovieUncheckedCreateWithoutDirectorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MovieCreateOrConnectWithoutDirectorInputSchema),z.lazy(() => MovieCreateOrConnectWithoutDirectorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MovieCreateManyDirectorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MovieWhereUniqueInputSchema),z.lazy(() => MovieWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MovieUncheckedCreateNestedManyWithoutWritersInputSchema: z.ZodType<Prisma.MovieUncheckedCreateNestedManyWithoutWritersInput> = z.object({
  create: z.union([ z.lazy(() => MovieCreateWithoutWritersInputSchema),z.lazy(() => MovieCreateWithoutWritersInputSchema).array(),z.lazy(() => MovieUncheckedCreateWithoutWritersInputSchema),z.lazy(() => MovieUncheckedCreateWithoutWritersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MovieCreateOrConnectWithoutWritersInputSchema),z.lazy(() => MovieCreateOrConnectWithoutWritersInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MovieWhereUniqueInputSchema),z.lazy(() => MovieWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MovieUncheckedCreateNestedManyWithoutStarringInputSchema: z.ZodType<Prisma.MovieUncheckedCreateNestedManyWithoutStarringInput> = z.object({
  create: z.union([ z.lazy(() => MovieCreateWithoutStarringInputSchema),z.lazy(() => MovieCreateWithoutStarringInputSchema).array(),z.lazy(() => MovieUncheckedCreateWithoutStarringInputSchema),z.lazy(() => MovieUncheckedCreateWithoutStarringInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MovieCreateOrConnectWithoutStarringInputSchema),z.lazy(() => MovieCreateOrConnectWithoutStarringInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MovieWhereUniqueInputSchema),z.lazy(() => MovieWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ShowUncheckedCreateNestedManyWithoutStarringInputSchema: z.ZodType<Prisma.ShowUncheckedCreateNestedManyWithoutStarringInput> = z.object({
  create: z.union([ z.lazy(() => ShowCreateWithoutStarringInputSchema),z.lazy(() => ShowCreateWithoutStarringInputSchema).array(),z.lazy(() => ShowUncheckedCreateWithoutStarringInputSchema),z.lazy(() => ShowUncheckedCreateWithoutStarringInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShowCreateOrConnectWithoutStarringInputSchema),z.lazy(() => ShowCreateOrConnectWithoutStarringInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ShowUncheckedCreateNestedManyWithoutWritersInputSchema: z.ZodType<Prisma.ShowUncheckedCreateNestedManyWithoutWritersInput> = z.object({
  create: z.union([ z.lazy(() => ShowCreateWithoutWritersInputSchema),z.lazy(() => ShowCreateWithoutWritersInputSchema).array(),z.lazy(() => ShowUncheckedCreateWithoutWritersInputSchema),z.lazy(() => ShowUncheckedCreateWithoutWritersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShowCreateOrConnectWithoutWritersInputSchema),z.lazy(() => ShowCreateOrConnectWithoutWritersInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ShowUncheckedCreateNestedManyWithoutDirectorInputSchema: z.ZodType<Prisma.ShowUncheckedCreateNestedManyWithoutDirectorInput> = z.object({
  create: z.union([ z.lazy(() => ShowCreateWithoutDirectorInputSchema),z.lazy(() => ShowCreateWithoutDirectorInputSchema).array(),z.lazy(() => ShowUncheckedCreateWithoutDirectorInputSchema),z.lazy(() => ShowUncheckedCreateWithoutDirectorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShowCreateOrConnectWithoutDirectorInputSchema),z.lazy(() => ShowCreateOrConnectWithoutDirectorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShowCreateManyDirectorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MovieUpdateManyWithoutDirectorNestedInputSchema: z.ZodType<Prisma.MovieUpdateManyWithoutDirectorNestedInput> = z.object({
  create: z.union([ z.lazy(() => MovieCreateWithoutDirectorInputSchema),z.lazy(() => MovieCreateWithoutDirectorInputSchema).array(),z.lazy(() => MovieUncheckedCreateWithoutDirectorInputSchema),z.lazy(() => MovieUncheckedCreateWithoutDirectorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MovieCreateOrConnectWithoutDirectorInputSchema),z.lazy(() => MovieCreateOrConnectWithoutDirectorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MovieUpsertWithWhereUniqueWithoutDirectorInputSchema),z.lazy(() => MovieUpsertWithWhereUniqueWithoutDirectorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MovieCreateManyDirectorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MovieWhereUniqueInputSchema),z.lazy(() => MovieWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MovieWhereUniqueInputSchema),z.lazy(() => MovieWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MovieWhereUniqueInputSchema),z.lazy(() => MovieWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MovieWhereUniqueInputSchema),z.lazy(() => MovieWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MovieUpdateWithWhereUniqueWithoutDirectorInputSchema),z.lazy(() => MovieUpdateWithWhereUniqueWithoutDirectorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MovieUpdateManyWithWhereWithoutDirectorInputSchema),z.lazy(() => MovieUpdateManyWithWhereWithoutDirectorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MovieScalarWhereInputSchema),z.lazy(() => MovieScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MovieUpdateManyWithoutWritersNestedInputSchema: z.ZodType<Prisma.MovieUpdateManyWithoutWritersNestedInput> = z.object({
  create: z.union([ z.lazy(() => MovieCreateWithoutWritersInputSchema),z.lazy(() => MovieCreateWithoutWritersInputSchema).array(),z.lazy(() => MovieUncheckedCreateWithoutWritersInputSchema),z.lazy(() => MovieUncheckedCreateWithoutWritersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MovieCreateOrConnectWithoutWritersInputSchema),z.lazy(() => MovieCreateOrConnectWithoutWritersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MovieUpsertWithWhereUniqueWithoutWritersInputSchema),z.lazy(() => MovieUpsertWithWhereUniqueWithoutWritersInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => MovieWhereUniqueInputSchema),z.lazy(() => MovieWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MovieWhereUniqueInputSchema),z.lazy(() => MovieWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MovieWhereUniqueInputSchema),z.lazy(() => MovieWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MovieWhereUniqueInputSchema),z.lazy(() => MovieWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MovieUpdateWithWhereUniqueWithoutWritersInputSchema),z.lazy(() => MovieUpdateWithWhereUniqueWithoutWritersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MovieUpdateManyWithWhereWithoutWritersInputSchema),z.lazy(() => MovieUpdateManyWithWhereWithoutWritersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MovieScalarWhereInputSchema),z.lazy(() => MovieScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MovieUpdateManyWithoutStarringNestedInputSchema: z.ZodType<Prisma.MovieUpdateManyWithoutStarringNestedInput> = z.object({
  create: z.union([ z.lazy(() => MovieCreateWithoutStarringInputSchema),z.lazy(() => MovieCreateWithoutStarringInputSchema).array(),z.lazy(() => MovieUncheckedCreateWithoutStarringInputSchema),z.lazy(() => MovieUncheckedCreateWithoutStarringInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MovieCreateOrConnectWithoutStarringInputSchema),z.lazy(() => MovieCreateOrConnectWithoutStarringInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MovieUpsertWithWhereUniqueWithoutStarringInputSchema),z.lazy(() => MovieUpsertWithWhereUniqueWithoutStarringInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => MovieWhereUniqueInputSchema),z.lazy(() => MovieWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MovieWhereUniqueInputSchema),z.lazy(() => MovieWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MovieWhereUniqueInputSchema),z.lazy(() => MovieWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MovieWhereUniqueInputSchema),z.lazy(() => MovieWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MovieUpdateWithWhereUniqueWithoutStarringInputSchema),z.lazy(() => MovieUpdateWithWhereUniqueWithoutStarringInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MovieUpdateManyWithWhereWithoutStarringInputSchema),z.lazy(() => MovieUpdateManyWithWhereWithoutStarringInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MovieScalarWhereInputSchema),z.lazy(() => MovieScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ShowUpdateManyWithoutStarringNestedInputSchema: z.ZodType<Prisma.ShowUpdateManyWithoutStarringNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShowCreateWithoutStarringInputSchema),z.lazy(() => ShowCreateWithoutStarringInputSchema).array(),z.lazy(() => ShowUncheckedCreateWithoutStarringInputSchema),z.lazy(() => ShowUncheckedCreateWithoutStarringInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShowCreateOrConnectWithoutStarringInputSchema),z.lazy(() => ShowCreateOrConnectWithoutStarringInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ShowUpsertWithWhereUniqueWithoutStarringInputSchema),z.lazy(() => ShowUpsertWithWhereUniqueWithoutStarringInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ShowUpdateWithWhereUniqueWithoutStarringInputSchema),z.lazy(() => ShowUpdateWithWhereUniqueWithoutStarringInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ShowUpdateManyWithWhereWithoutStarringInputSchema),z.lazy(() => ShowUpdateManyWithWhereWithoutStarringInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ShowScalarWhereInputSchema),z.lazy(() => ShowScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ShowUpdateManyWithoutWritersNestedInputSchema: z.ZodType<Prisma.ShowUpdateManyWithoutWritersNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShowCreateWithoutWritersInputSchema),z.lazy(() => ShowCreateWithoutWritersInputSchema).array(),z.lazy(() => ShowUncheckedCreateWithoutWritersInputSchema),z.lazy(() => ShowUncheckedCreateWithoutWritersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShowCreateOrConnectWithoutWritersInputSchema),z.lazy(() => ShowCreateOrConnectWithoutWritersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ShowUpsertWithWhereUniqueWithoutWritersInputSchema),z.lazy(() => ShowUpsertWithWhereUniqueWithoutWritersInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ShowUpdateWithWhereUniqueWithoutWritersInputSchema),z.lazy(() => ShowUpdateWithWhereUniqueWithoutWritersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ShowUpdateManyWithWhereWithoutWritersInputSchema),z.lazy(() => ShowUpdateManyWithWhereWithoutWritersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ShowScalarWhereInputSchema),z.lazy(() => ShowScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ShowUpdateManyWithoutDirectorNestedInputSchema: z.ZodType<Prisma.ShowUpdateManyWithoutDirectorNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShowCreateWithoutDirectorInputSchema),z.lazy(() => ShowCreateWithoutDirectorInputSchema).array(),z.lazy(() => ShowUncheckedCreateWithoutDirectorInputSchema),z.lazy(() => ShowUncheckedCreateWithoutDirectorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShowCreateOrConnectWithoutDirectorInputSchema),z.lazy(() => ShowCreateOrConnectWithoutDirectorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ShowUpsertWithWhereUniqueWithoutDirectorInputSchema),z.lazy(() => ShowUpsertWithWhereUniqueWithoutDirectorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShowCreateManyDirectorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ShowUpdateWithWhereUniqueWithoutDirectorInputSchema),z.lazy(() => ShowUpdateWithWhereUniqueWithoutDirectorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ShowUpdateManyWithWhereWithoutDirectorInputSchema),z.lazy(() => ShowUpdateManyWithWhereWithoutDirectorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ShowScalarWhereInputSchema),z.lazy(() => ShowScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MovieUncheckedUpdateManyWithoutDirectorNestedInputSchema: z.ZodType<Prisma.MovieUncheckedUpdateManyWithoutDirectorNestedInput> = z.object({
  create: z.union([ z.lazy(() => MovieCreateWithoutDirectorInputSchema),z.lazy(() => MovieCreateWithoutDirectorInputSchema).array(),z.lazy(() => MovieUncheckedCreateWithoutDirectorInputSchema),z.lazy(() => MovieUncheckedCreateWithoutDirectorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MovieCreateOrConnectWithoutDirectorInputSchema),z.lazy(() => MovieCreateOrConnectWithoutDirectorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MovieUpsertWithWhereUniqueWithoutDirectorInputSchema),z.lazy(() => MovieUpsertWithWhereUniqueWithoutDirectorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MovieCreateManyDirectorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MovieWhereUniqueInputSchema),z.lazy(() => MovieWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MovieWhereUniqueInputSchema),z.lazy(() => MovieWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MovieWhereUniqueInputSchema),z.lazy(() => MovieWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MovieWhereUniqueInputSchema),z.lazy(() => MovieWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MovieUpdateWithWhereUniqueWithoutDirectorInputSchema),z.lazy(() => MovieUpdateWithWhereUniqueWithoutDirectorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MovieUpdateManyWithWhereWithoutDirectorInputSchema),z.lazy(() => MovieUpdateManyWithWhereWithoutDirectorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MovieScalarWhereInputSchema),z.lazy(() => MovieScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MovieUncheckedUpdateManyWithoutWritersNestedInputSchema: z.ZodType<Prisma.MovieUncheckedUpdateManyWithoutWritersNestedInput> = z.object({
  create: z.union([ z.lazy(() => MovieCreateWithoutWritersInputSchema),z.lazy(() => MovieCreateWithoutWritersInputSchema).array(),z.lazy(() => MovieUncheckedCreateWithoutWritersInputSchema),z.lazy(() => MovieUncheckedCreateWithoutWritersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MovieCreateOrConnectWithoutWritersInputSchema),z.lazy(() => MovieCreateOrConnectWithoutWritersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MovieUpsertWithWhereUniqueWithoutWritersInputSchema),z.lazy(() => MovieUpsertWithWhereUniqueWithoutWritersInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => MovieWhereUniqueInputSchema),z.lazy(() => MovieWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MovieWhereUniqueInputSchema),z.lazy(() => MovieWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MovieWhereUniqueInputSchema),z.lazy(() => MovieWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MovieWhereUniqueInputSchema),z.lazy(() => MovieWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MovieUpdateWithWhereUniqueWithoutWritersInputSchema),z.lazy(() => MovieUpdateWithWhereUniqueWithoutWritersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MovieUpdateManyWithWhereWithoutWritersInputSchema),z.lazy(() => MovieUpdateManyWithWhereWithoutWritersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MovieScalarWhereInputSchema),z.lazy(() => MovieScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MovieUncheckedUpdateManyWithoutStarringNestedInputSchema: z.ZodType<Prisma.MovieUncheckedUpdateManyWithoutStarringNestedInput> = z.object({
  create: z.union([ z.lazy(() => MovieCreateWithoutStarringInputSchema),z.lazy(() => MovieCreateWithoutStarringInputSchema).array(),z.lazy(() => MovieUncheckedCreateWithoutStarringInputSchema),z.lazy(() => MovieUncheckedCreateWithoutStarringInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MovieCreateOrConnectWithoutStarringInputSchema),z.lazy(() => MovieCreateOrConnectWithoutStarringInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MovieUpsertWithWhereUniqueWithoutStarringInputSchema),z.lazy(() => MovieUpsertWithWhereUniqueWithoutStarringInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => MovieWhereUniqueInputSchema),z.lazy(() => MovieWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MovieWhereUniqueInputSchema),z.lazy(() => MovieWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MovieWhereUniqueInputSchema),z.lazy(() => MovieWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MovieWhereUniqueInputSchema),z.lazy(() => MovieWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MovieUpdateWithWhereUniqueWithoutStarringInputSchema),z.lazy(() => MovieUpdateWithWhereUniqueWithoutStarringInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MovieUpdateManyWithWhereWithoutStarringInputSchema),z.lazy(() => MovieUpdateManyWithWhereWithoutStarringInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MovieScalarWhereInputSchema),z.lazy(() => MovieScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ShowUncheckedUpdateManyWithoutStarringNestedInputSchema: z.ZodType<Prisma.ShowUncheckedUpdateManyWithoutStarringNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShowCreateWithoutStarringInputSchema),z.lazy(() => ShowCreateWithoutStarringInputSchema).array(),z.lazy(() => ShowUncheckedCreateWithoutStarringInputSchema),z.lazy(() => ShowUncheckedCreateWithoutStarringInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShowCreateOrConnectWithoutStarringInputSchema),z.lazy(() => ShowCreateOrConnectWithoutStarringInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ShowUpsertWithWhereUniqueWithoutStarringInputSchema),z.lazy(() => ShowUpsertWithWhereUniqueWithoutStarringInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ShowUpdateWithWhereUniqueWithoutStarringInputSchema),z.lazy(() => ShowUpdateWithWhereUniqueWithoutStarringInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ShowUpdateManyWithWhereWithoutStarringInputSchema),z.lazy(() => ShowUpdateManyWithWhereWithoutStarringInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ShowScalarWhereInputSchema),z.lazy(() => ShowScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ShowUncheckedUpdateManyWithoutWritersNestedInputSchema: z.ZodType<Prisma.ShowUncheckedUpdateManyWithoutWritersNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShowCreateWithoutWritersInputSchema),z.lazy(() => ShowCreateWithoutWritersInputSchema).array(),z.lazy(() => ShowUncheckedCreateWithoutWritersInputSchema),z.lazy(() => ShowUncheckedCreateWithoutWritersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShowCreateOrConnectWithoutWritersInputSchema),z.lazy(() => ShowCreateOrConnectWithoutWritersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ShowUpsertWithWhereUniqueWithoutWritersInputSchema),z.lazy(() => ShowUpsertWithWhereUniqueWithoutWritersInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ShowUpdateWithWhereUniqueWithoutWritersInputSchema),z.lazy(() => ShowUpdateWithWhereUniqueWithoutWritersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ShowUpdateManyWithWhereWithoutWritersInputSchema),z.lazy(() => ShowUpdateManyWithWhereWithoutWritersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ShowScalarWhereInputSchema),z.lazy(() => ShowScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ShowUncheckedUpdateManyWithoutDirectorNestedInputSchema: z.ZodType<Prisma.ShowUncheckedUpdateManyWithoutDirectorNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShowCreateWithoutDirectorInputSchema),z.lazy(() => ShowCreateWithoutDirectorInputSchema).array(),z.lazy(() => ShowUncheckedCreateWithoutDirectorInputSchema),z.lazy(() => ShowUncheckedCreateWithoutDirectorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShowCreateOrConnectWithoutDirectorInputSchema),z.lazy(() => ShowCreateOrConnectWithoutDirectorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ShowUpsertWithWhereUniqueWithoutDirectorInputSchema),z.lazy(() => ShowUpsertWithWhereUniqueWithoutDirectorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShowCreateManyDirectorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ShowUpdateWithWhereUniqueWithoutDirectorInputSchema),z.lazy(() => ShowUpdateWithWhereUniqueWithoutDirectorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ShowUpdateManyWithWhereWithoutDirectorInputSchema),z.lazy(() => ShowUpdateManyWithWhereWithoutDirectorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ShowScalarWhereInputSchema),z.lazy(() => ShowScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const GenreCreateNestedManyWithoutMoviesInputSchema: z.ZodType<Prisma.GenreCreateNestedManyWithoutMoviesInput> = z.object({
  create: z.union([ z.lazy(() => GenreCreateWithoutMoviesInputSchema),z.lazy(() => GenreCreateWithoutMoviesInputSchema).array(),z.lazy(() => GenreUncheckedCreateWithoutMoviesInputSchema),z.lazy(() => GenreUncheckedCreateWithoutMoviesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GenreCreateOrConnectWithoutMoviesInputSchema),z.lazy(() => GenreCreateOrConnectWithoutMoviesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GenreWhereUniqueInputSchema),z.lazy(() => GenreWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CelebrityCreateNestedOneWithoutDirectedMoviesInputSchema: z.ZodType<Prisma.CelebrityCreateNestedOneWithoutDirectedMoviesInput> = z.object({
  create: z.union([ z.lazy(() => CelebrityCreateWithoutDirectedMoviesInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutDirectedMoviesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CelebrityCreateOrConnectWithoutDirectedMoviesInputSchema).optional(),
  connect: z.lazy(() => CelebrityWhereUniqueInputSchema).optional()
}).strict();

export const CelebrityCreateNestedManyWithoutWrittenMoviesInputSchema: z.ZodType<Prisma.CelebrityCreateNestedManyWithoutWrittenMoviesInput> = z.object({
  create: z.union([ z.lazy(() => CelebrityCreateWithoutWrittenMoviesInputSchema),z.lazy(() => CelebrityCreateWithoutWrittenMoviesInputSchema).array(),z.lazy(() => CelebrityUncheckedCreateWithoutWrittenMoviesInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutWrittenMoviesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CelebrityCreateOrConnectWithoutWrittenMoviesInputSchema),z.lazy(() => CelebrityCreateOrConnectWithoutWrittenMoviesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CelebrityWhereUniqueInputSchema),z.lazy(() => CelebrityWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CelebrityCreateNestedManyWithoutStarredMoviesInputSchema: z.ZodType<Prisma.CelebrityCreateNestedManyWithoutStarredMoviesInput> = z.object({
  create: z.union([ z.lazy(() => CelebrityCreateWithoutStarredMoviesInputSchema),z.lazy(() => CelebrityCreateWithoutStarredMoviesInputSchema).array(),z.lazy(() => CelebrityUncheckedCreateWithoutStarredMoviesInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutStarredMoviesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CelebrityCreateOrConnectWithoutStarredMoviesInputSchema),z.lazy(() => CelebrityCreateOrConnectWithoutStarredMoviesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CelebrityWhereUniqueInputSchema),z.lazy(() => CelebrityWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReviewCreateNestedManyWithoutMovieInputSchema: z.ZodType<Prisma.ReviewCreateNestedManyWithoutMovieInput> = z.object({
  create: z.union([ z.lazy(() => ReviewCreateWithoutMovieInputSchema),z.lazy(() => ReviewCreateWithoutMovieInputSchema).array(),z.lazy(() => ReviewUncheckedCreateWithoutMovieInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutMovieInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewCreateOrConnectWithoutMovieInputSchema),z.lazy(() => ReviewCreateOrConnectWithoutMovieInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewCreateManyMovieInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const GenreUncheckedCreateNestedManyWithoutMoviesInputSchema: z.ZodType<Prisma.GenreUncheckedCreateNestedManyWithoutMoviesInput> = z.object({
  create: z.union([ z.lazy(() => GenreCreateWithoutMoviesInputSchema),z.lazy(() => GenreCreateWithoutMoviesInputSchema).array(),z.lazy(() => GenreUncheckedCreateWithoutMoviesInputSchema),z.lazy(() => GenreUncheckedCreateWithoutMoviesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GenreCreateOrConnectWithoutMoviesInputSchema),z.lazy(() => GenreCreateOrConnectWithoutMoviesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GenreWhereUniqueInputSchema),z.lazy(() => GenreWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CelebrityUncheckedCreateNestedManyWithoutWrittenMoviesInputSchema: z.ZodType<Prisma.CelebrityUncheckedCreateNestedManyWithoutWrittenMoviesInput> = z.object({
  create: z.union([ z.lazy(() => CelebrityCreateWithoutWrittenMoviesInputSchema),z.lazy(() => CelebrityCreateWithoutWrittenMoviesInputSchema).array(),z.lazy(() => CelebrityUncheckedCreateWithoutWrittenMoviesInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutWrittenMoviesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CelebrityCreateOrConnectWithoutWrittenMoviesInputSchema),z.lazy(() => CelebrityCreateOrConnectWithoutWrittenMoviesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CelebrityWhereUniqueInputSchema),z.lazy(() => CelebrityWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CelebrityUncheckedCreateNestedManyWithoutStarredMoviesInputSchema: z.ZodType<Prisma.CelebrityUncheckedCreateNestedManyWithoutStarredMoviesInput> = z.object({
  create: z.union([ z.lazy(() => CelebrityCreateWithoutStarredMoviesInputSchema),z.lazy(() => CelebrityCreateWithoutStarredMoviesInputSchema).array(),z.lazy(() => CelebrityUncheckedCreateWithoutStarredMoviesInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutStarredMoviesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CelebrityCreateOrConnectWithoutStarredMoviesInputSchema),z.lazy(() => CelebrityCreateOrConnectWithoutStarredMoviesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CelebrityWhereUniqueInputSchema),z.lazy(() => CelebrityWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReviewUncheckedCreateNestedManyWithoutMovieInputSchema: z.ZodType<Prisma.ReviewUncheckedCreateNestedManyWithoutMovieInput> = z.object({
  create: z.union([ z.lazy(() => ReviewCreateWithoutMovieInputSchema),z.lazy(() => ReviewCreateWithoutMovieInputSchema).array(),z.lazy(() => ReviewUncheckedCreateWithoutMovieInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutMovieInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewCreateOrConnectWithoutMovieInputSchema),z.lazy(() => ReviewCreateOrConnectWithoutMovieInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewCreateManyMovieInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableFloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableFloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const GenreUpdateManyWithoutMoviesNestedInputSchema: z.ZodType<Prisma.GenreUpdateManyWithoutMoviesNestedInput> = z.object({
  create: z.union([ z.lazy(() => GenreCreateWithoutMoviesInputSchema),z.lazy(() => GenreCreateWithoutMoviesInputSchema).array(),z.lazy(() => GenreUncheckedCreateWithoutMoviesInputSchema),z.lazy(() => GenreUncheckedCreateWithoutMoviesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GenreCreateOrConnectWithoutMoviesInputSchema),z.lazy(() => GenreCreateOrConnectWithoutMoviesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GenreUpsertWithWhereUniqueWithoutMoviesInputSchema),z.lazy(() => GenreUpsertWithWhereUniqueWithoutMoviesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => GenreWhereUniqueInputSchema),z.lazy(() => GenreWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GenreWhereUniqueInputSchema),z.lazy(() => GenreWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GenreWhereUniqueInputSchema),z.lazy(() => GenreWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GenreWhereUniqueInputSchema),z.lazy(() => GenreWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GenreUpdateWithWhereUniqueWithoutMoviesInputSchema),z.lazy(() => GenreUpdateWithWhereUniqueWithoutMoviesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GenreUpdateManyWithWhereWithoutMoviesInputSchema),z.lazy(() => GenreUpdateManyWithWhereWithoutMoviesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GenreScalarWhereInputSchema),z.lazy(() => GenreScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CelebrityUpdateOneWithoutDirectedMoviesNestedInputSchema: z.ZodType<Prisma.CelebrityUpdateOneWithoutDirectedMoviesNestedInput> = z.object({
  create: z.union([ z.lazy(() => CelebrityCreateWithoutDirectedMoviesInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutDirectedMoviesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CelebrityCreateOrConnectWithoutDirectedMoviesInputSchema).optional(),
  upsert: z.lazy(() => CelebrityUpsertWithoutDirectedMoviesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => CelebrityWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => CelebrityWhereInputSchema) ]).optional(),
  connect: z.lazy(() => CelebrityWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CelebrityUpdateToOneWithWhereWithoutDirectedMoviesInputSchema),z.lazy(() => CelebrityUpdateWithoutDirectedMoviesInputSchema),z.lazy(() => CelebrityUncheckedUpdateWithoutDirectedMoviesInputSchema) ]).optional(),
}).strict();

export const CelebrityUpdateManyWithoutWrittenMoviesNestedInputSchema: z.ZodType<Prisma.CelebrityUpdateManyWithoutWrittenMoviesNestedInput> = z.object({
  create: z.union([ z.lazy(() => CelebrityCreateWithoutWrittenMoviesInputSchema),z.lazy(() => CelebrityCreateWithoutWrittenMoviesInputSchema).array(),z.lazy(() => CelebrityUncheckedCreateWithoutWrittenMoviesInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutWrittenMoviesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CelebrityCreateOrConnectWithoutWrittenMoviesInputSchema),z.lazy(() => CelebrityCreateOrConnectWithoutWrittenMoviesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CelebrityUpsertWithWhereUniqueWithoutWrittenMoviesInputSchema),z.lazy(() => CelebrityUpsertWithWhereUniqueWithoutWrittenMoviesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => CelebrityWhereUniqueInputSchema),z.lazy(() => CelebrityWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CelebrityWhereUniqueInputSchema),z.lazy(() => CelebrityWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CelebrityWhereUniqueInputSchema),z.lazy(() => CelebrityWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CelebrityWhereUniqueInputSchema),z.lazy(() => CelebrityWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CelebrityUpdateWithWhereUniqueWithoutWrittenMoviesInputSchema),z.lazy(() => CelebrityUpdateWithWhereUniqueWithoutWrittenMoviesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CelebrityUpdateManyWithWhereWithoutWrittenMoviesInputSchema),z.lazy(() => CelebrityUpdateManyWithWhereWithoutWrittenMoviesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CelebrityScalarWhereInputSchema),z.lazy(() => CelebrityScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CelebrityUpdateManyWithoutStarredMoviesNestedInputSchema: z.ZodType<Prisma.CelebrityUpdateManyWithoutStarredMoviesNestedInput> = z.object({
  create: z.union([ z.lazy(() => CelebrityCreateWithoutStarredMoviesInputSchema),z.lazy(() => CelebrityCreateWithoutStarredMoviesInputSchema).array(),z.lazy(() => CelebrityUncheckedCreateWithoutStarredMoviesInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutStarredMoviesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CelebrityCreateOrConnectWithoutStarredMoviesInputSchema),z.lazy(() => CelebrityCreateOrConnectWithoutStarredMoviesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CelebrityUpsertWithWhereUniqueWithoutStarredMoviesInputSchema),z.lazy(() => CelebrityUpsertWithWhereUniqueWithoutStarredMoviesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => CelebrityWhereUniqueInputSchema),z.lazy(() => CelebrityWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CelebrityWhereUniqueInputSchema),z.lazy(() => CelebrityWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CelebrityWhereUniqueInputSchema),z.lazy(() => CelebrityWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CelebrityWhereUniqueInputSchema),z.lazy(() => CelebrityWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CelebrityUpdateWithWhereUniqueWithoutStarredMoviesInputSchema),z.lazy(() => CelebrityUpdateWithWhereUniqueWithoutStarredMoviesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CelebrityUpdateManyWithWhereWithoutStarredMoviesInputSchema),z.lazy(() => CelebrityUpdateManyWithWhereWithoutStarredMoviesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CelebrityScalarWhereInputSchema),z.lazy(() => CelebrityScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReviewUpdateManyWithoutMovieNestedInputSchema: z.ZodType<Prisma.ReviewUpdateManyWithoutMovieNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReviewCreateWithoutMovieInputSchema),z.lazy(() => ReviewCreateWithoutMovieInputSchema).array(),z.lazy(() => ReviewUncheckedCreateWithoutMovieInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutMovieInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewCreateOrConnectWithoutMovieInputSchema),z.lazy(() => ReviewCreateOrConnectWithoutMovieInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReviewUpsertWithWhereUniqueWithoutMovieInputSchema),z.lazy(() => ReviewUpsertWithWhereUniqueWithoutMovieInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewCreateManyMovieInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReviewUpdateWithWhereUniqueWithoutMovieInputSchema),z.lazy(() => ReviewUpdateWithWhereUniqueWithoutMovieInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReviewUpdateManyWithWhereWithoutMovieInputSchema),z.lazy(() => ReviewUpdateManyWithWhereWithoutMovieInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReviewScalarWhereInputSchema),z.lazy(() => ReviewScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const GenreUncheckedUpdateManyWithoutMoviesNestedInputSchema: z.ZodType<Prisma.GenreUncheckedUpdateManyWithoutMoviesNestedInput> = z.object({
  create: z.union([ z.lazy(() => GenreCreateWithoutMoviesInputSchema),z.lazy(() => GenreCreateWithoutMoviesInputSchema).array(),z.lazy(() => GenreUncheckedCreateWithoutMoviesInputSchema),z.lazy(() => GenreUncheckedCreateWithoutMoviesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GenreCreateOrConnectWithoutMoviesInputSchema),z.lazy(() => GenreCreateOrConnectWithoutMoviesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GenreUpsertWithWhereUniqueWithoutMoviesInputSchema),z.lazy(() => GenreUpsertWithWhereUniqueWithoutMoviesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => GenreWhereUniqueInputSchema),z.lazy(() => GenreWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GenreWhereUniqueInputSchema),z.lazy(() => GenreWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GenreWhereUniqueInputSchema),z.lazy(() => GenreWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GenreWhereUniqueInputSchema),z.lazy(() => GenreWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GenreUpdateWithWhereUniqueWithoutMoviesInputSchema),z.lazy(() => GenreUpdateWithWhereUniqueWithoutMoviesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GenreUpdateManyWithWhereWithoutMoviesInputSchema),z.lazy(() => GenreUpdateManyWithWhereWithoutMoviesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GenreScalarWhereInputSchema),z.lazy(() => GenreScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CelebrityUncheckedUpdateManyWithoutWrittenMoviesNestedInputSchema: z.ZodType<Prisma.CelebrityUncheckedUpdateManyWithoutWrittenMoviesNestedInput> = z.object({
  create: z.union([ z.lazy(() => CelebrityCreateWithoutWrittenMoviesInputSchema),z.lazy(() => CelebrityCreateWithoutWrittenMoviesInputSchema).array(),z.lazy(() => CelebrityUncheckedCreateWithoutWrittenMoviesInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutWrittenMoviesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CelebrityCreateOrConnectWithoutWrittenMoviesInputSchema),z.lazy(() => CelebrityCreateOrConnectWithoutWrittenMoviesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CelebrityUpsertWithWhereUniqueWithoutWrittenMoviesInputSchema),z.lazy(() => CelebrityUpsertWithWhereUniqueWithoutWrittenMoviesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => CelebrityWhereUniqueInputSchema),z.lazy(() => CelebrityWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CelebrityWhereUniqueInputSchema),z.lazy(() => CelebrityWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CelebrityWhereUniqueInputSchema),z.lazy(() => CelebrityWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CelebrityWhereUniqueInputSchema),z.lazy(() => CelebrityWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CelebrityUpdateWithWhereUniqueWithoutWrittenMoviesInputSchema),z.lazy(() => CelebrityUpdateWithWhereUniqueWithoutWrittenMoviesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CelebrityUpdateManyWithWhereWithoutWrittenMoviesInputSchema),z.lazy(() => CelebrityUpdateManyWithWhereWithoutWrittenMoviesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CelebrityScalarWhereInputSchema),z.lazy(() => CelebrityScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CelebrityUncheckedUpdateManyWithoutStarredMoviesNestedInputSchema: z.ZodType<Prisma.CelebrityUncheckedUpdateManyWithoutStarredMoviesNestedInput> = z.object({
  create: z.union([ z.lazy(() => CelebrityCreateWithoutStarredMoviesInputSchema),z.lazy(() => CelebrityCreateWithoutStarredMoviesInputSchema).array(),z.lazy(() => CelebrityUncheckedCreateWithoutStarredMoviesInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutStarredMoviesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CelebrityCreateOrConnectWithoutStarredMoviesInputSchema),z.lazy(() => CelebrityCreateOrConnectWithoutStarredMoviesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CelebrityUpsertWithWhereUniqueWithoutStarredMoviesInputSchema),z.lazy(() => CelebrityUpsertWithWhereUniqueWithoutStarredMoviesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => CelebrityWhereUniqueInputSchema),z.lazy(() => CelebrityWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CelebrityWhereUniqueInputSchema),z.lazy(() => CelebrityWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CelebrityWhereUniqueInputSchema),z.lazy(() => CelebrityWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CelebrityWhereUniqueInputSchema),z.lazy(() => CelebrityWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CelebrityUpdateWithWhereUniqueWithoutStarredMoviesInputSchema),z.lazy(() => CelebrityUpdateWithWhereUniqueWithoutStarredMoviesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CelebrityUpdateManyWithWhereWithoutStarredMoviesInputSchema),z.lazy(() => CelebrityUpdateManyWithWhereWithoutStarredMoviesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CelebrityScalarWhereInputSchema),z.lazy(() => CelebrityScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReviewUncheckedUpdateManyWithoutMovieNestedInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateManyWithoutMovieNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReviewCreateWithoutMovieInputSchema),z.lazy(() => ReviewCreateWithoutMovieInputSchema).array(),z.lazy(() => ReviewUncheckedCreateWithoutMovieInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutMovieInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewCreateOrConnectWithoutMovieInputSchema),z.lazy(() => ReviewCreateOrConnectWithoutMovieInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReviewUpsertWithWhereUniqueWithoutMovieInputSchema),z.lazy(() => ReviewUpsertWithWhereUniqueWithoutMovieInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewCreateManyMovieInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReviewUpdateWithWhereUniqueWithoutMovieInputSchema),z.lazy(() => ReviewUpdateWithWhereUniqueWithoutMovieInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReviewUpdateManyWithWhereWithoutMovieInputSchema),z.lazy(() => ReviewUpdateManyWithWhereWithoutMovieInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReviewScalarWhereInputSchema),z.lazy(() => ReviewScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const GenreCreateNestedManyWithoutShowsInputSchema: z.ZodType<Prisma.GenreCreateNestedManyWithoutShowsInput> = z.object({
  create: z.union([ z.lazy(() => GenreCreateWithoutShowsInputSchema),z.lazy(() => GenreCreateWithoutShowsInputSchema).array(),z.lazy(() => GenreUncheckedCreateWithoutShowsInputSchema),z.lazy(() => GenreUncheckedCreateWithoutShowsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GenreCreateOrConnectWithoutShowsInputSchema),z.lazy(() => GenreCreateOrConnectWithoutShowsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GenreWhereUniqueInputSchema),z.lazy(() => GenreWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CelebrityCreateNestedOneWithoutDirectedShowsInputSchema: z.ZodType<Prisma.CelebrityCreateNestedOneWithoutDirectedShowsInput> = z.object({
  create: z.union([ z.lazy(() => CelebrityCreateWithoutDirectedShowsInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutDirectedShowsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CelebrityCreateOrConnectWithoutDirectedShowsInputSchema).optional(),
  connect: z.lazy(() => CelebrityWhereUniqueInputSchema).optional()
}).strict();

export const CelebrityCreateNestedManyWithoutWrittenShowsInputSchema: z.ZodType<Prisma.CelebrityCreateNestedManyWithoutWrittenShowsInput> = z.object({
  create: z.union([ z.lazy(() => CelebrityCreateWithoutWrittenShowsInputSchema),z.lazy(() => CelebrityCreateWithoutWrittenShowsInputSchema).array(),z.lazy(() => CelebrityUncheckedCreateWithoutWrittenShowsInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutWrittenShowsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CelebrityCreateOrConnectWithoutWrittenShowsInputSchema),z.lazy(() => CelebrityCreateOrConnectWithoutWrittenShowsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CelebrityWhereUniqueInputSchema),z.lazy(() => CelebrityWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CelebrityCreateNestedManyWithoutStarredShowsInputSchema: z.ZodType<Prisma.CelebrityCreateNestedManyWithoutStarredShowsInput> = z.object({
  create: z.union([ z.lazy(() => CelebrityCreateWithoutStarredShowsInputSchema),z.lazy(() => CelebrityCreateWithoutStarredShowsInputSchema).array(),z.lazy(() => CelebrityUncheckedCreateWithoutStarredShowsInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutStarredShowsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CelebrityCreateOrConnectWithoutStarredShowsInputSchema),z.lazy(() => CelebrityCreateOrConnectWithoutStarredShowsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CelebrityWhereUniqueInputSchema),z.lazy(() => CelebrityWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReviewCreateNestedManyWithoutShowInputSchema: z.ZodType<Prisma.ReviewCreateNestedManyWithoutShowInput> = z.object({
  create: z.union([ z.lazy(() => ReviewCreateWithoutShowInputSchema),z.lazy(() => ReviewCreateWithoutShowInputSchema).array(),z.lazy(() => ReviewUncheckedCreateWithoutShowInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutShowInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewCreateOrConnectWithoutShowInputSchema),z.lazy(() => ReviewCreateOrConnectWithoutShowInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewCreateManyShowInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const GenreUncheckedCreateNestedManyWithoutShowsInputSchema: z.ZodType<Prisma.GenreUncheckedCreateNestedManyWithoutShowsInput> = z.object({
  create: z.union([ z.lazy(() => GenreCreateWithoutShowsInputSchema),z.lazy(() => GenreCreateWithoutShowsInputSchema).array(),z.lazy(() => GenreUncheckedCreateWithoutShowsInputSchema),z.lazy(() => GenreUncheckedCreateWithoutShowsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GenreCreateOrConnectWithoutShowsInputSchema),z.lazy(() => GenreCreateOrConnectWithoutShowsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GenreWhereUniqueInputSchema),z.lazy(() => GenreWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CelebrityUncheckedCreateNestedManyWithoutWrittenShowsInputSchema: z.ZodType<Prisma.CelebrityUncheckedCreateNestedManyWithoutWrittenShowsInput> = z.object({
  create: z.union([ z.lazy(() => CelebrityCreateWithoutWrittenShowsInputSchema),z.lazy(() => CelebrityCreateWithoutWrittenShowsInputSchema).array(),z.lazy(() => CelebrityUncheckedCreateWithoutWrittenShowsInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutWrittenShowsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CelebrityCreateOrConnectWithoutWrittenShowsInputSchema),z.lazy(() => CelebrityCreateOrConnectWithoutWrittenShowsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CelebrityWhereUniqueInputSchema),z.lazy(() => CelebrityWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CelebrityUncheckedCreateNestedManyWithoutStarredShowsInputSchema: z.ZodType<Prisma.CelebrityUncheckedCreateNestedManyWithoutStarredShowsInput> = z.object({
  create: z.union([ z.lazy(() => CelebrityCreateWithoutStarredShowsInputSchema),z.lazy(() => CelebrityCreateWithoutStarredShowsInputSchema).array(),z.lazy(() => CelebrityUncheckedCreateWithoutStarredShowsInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutStarredShowsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CelebrityCreateOrConnectWithoutStarredShowsInputSchema),z.lazy(() => CelebrityCreateOrConnectWithoutStarredShowsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CelebrityWhereUniqueInputSchema),z.lazy(() => CelebrityWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReviewUncheckedCreateNestedManyWithoutShowInputSchema: z.ZodType<Prisma.ReviewUncheckedCreateNestedManyWithoutShowInput> = z.object({
  create: z.union([ z.lazy(() => ReviewCreateWithoutShowInputSchema),z.lazy(() => ReviewCreateWithoutShowInputSchema).array(),z.lazy(() => ReviewUncheckedCreateWithoutShowInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutShowInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewCreateOrConnectWithoutShowInputSchema),z.lazy(() => ReviewCreateOrConnectWithoutShowInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewCreateManyShowInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const GenreUpdateManyWithoutShowsNestedInputSchema: z.ZodType<Prisma.GenreUpdateManyWithoutShowsNestedInput> = z.object({
  create: z.union([ z.lazy(() => GenreCreateWithoutShowsInputSchema),z.lazy(() => GenreCreateWithoutShowsInputSchema).array(),z.lazy(() => GenreUncheckedCreateWithoutShowsInputSchema),z.lazy(() => GenreUncheckedCreateWithoutShowsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GenreCreateOrConnectWithoutShowsInputSchema),z.lazy(() => GenreCreateOrConnectWithoutShowsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GenreUpsertWithWhereUniqueWithoutShowsInputSchema),z.lazy(() => GenreUpsertWithWhereUniqueWithoutShowsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => GenreWhereUniqueInputSchema),z.lazy(() => GenreWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GenreWhereUniqueInputSchema),z.lazy(() => GenreWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GenreWhereUniqueInputSchema),z.lazy(() => GenreWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GenreWhereUniqueInputSchema),z.lazy(() => GenreWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GenreUpdateWithWhereUniqueWithoutShowsInputSchema),z.lazy(() => GenreUpdateWithWhereUniqueWithoutShowsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GenreUpdateManyWithWhereWithoutShowsInputSchema),z.lazy(() => GenreUpdateManyWithWhereWithoutShowsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GenreScalarWhereInputSchema),z.lazy(() => GenreScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CelebrityUpdateOneWithoutDirectedShowsNestedInputSchema: z.ZodType<Prisma.CelebrityUpdateOneWithoutDirectedShowsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CelebrityCreateWithoutDirectedShowsInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutDirectedShowsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CelebrityCreateOrConnectWithoutDirectedShowsInputSchema).optional(),
  upsert: z.lazy(() => CelebrityUpsertWithoutDirectedShowsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => CelebrityWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => CelebrityWhereInputSchema) ]).optional(),
  connect: z.lazy(() => CelebrityWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CelebrityUpdateToOneWithWhereWithoutDirectedShowsInputSchema),z.lazy(() => CelebrityUpdateWithoutDirectedShowsInputSchema),z.lazy(() => CelebrityUncheckedUpdateWithoutDirectedShowsInputSchema) ]).optional(),
}).strict();

export const CelebrityUpdateManyWithoutWrittenShowsNestedInputSchema: z.ZodType<Prisma.CelebrityUpdateManyWithoutWrittenShowsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CelebrityCreateWithoutWrittenShowsInputSchema),z.lazy(() => CelebrityCreateWithoutWrittenShowsInputSchema).array(),z.lazy(() => CelebrityUncheckedCreateWithoutWrittenShowsInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutWrittenShowsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CelebrityCreateOrConnectWithoutWrittenShowsInputSchema),z.lazy(() => CelebrityCreateOrConnectWithoutWrittenShowsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CelebrityUpsertWithWhereUniqueWithoutWrittenShowsInputSchema),z.lazy(() => CelebrityUpsertWithWhereUniqueWithoutWrittenShowsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => CelebrityWhereUniqueInputSchema),z.lazy(() => CelebrityWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CelebrityWhereUniqueInputSchema),z.lazy(() => CelebrityWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CelebrityWhereUniqueInputSchema),z.lazy(() => CelebrityWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CelebrityWhereUniqueInputSchema),z.lazy(() => CelebrityWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CelebrityUpdateWithWhereUniqueWithoutWrittenShowsInputSchema),z.lazy(() => CelebrityUpdateWithWhereUniqueWithoutWrittenShowsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CelebrityUpdateManyWithWhereWithoutWrittenShowsInputSchema),z.lazy(() => CelebrityUpdateManyWithWhereWithoutWrittenShowsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CelebrityScalarWhereInputSchema),z.lazy(() => CelebrityScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CelebrityUpdateManyWithoutStarredShowsNestedInputSchema: z.ZodType<Prisma.CelebrityUpdateManyWithoutStarredShowsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CelebrityCreateWithoutStarredShowsInputSchema),z.lazy(() => CelebrityCreateWithoutStarredShowsInputSchema).array(),z.lazy(() => CelebrityUncheckedCreateWithoutStarredShowsInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutStarredShowsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CelebrityCreateOrConnectWithoutStarredShowsInputSchema),z.lazy(() => CelebrityCreateOrConnectWithoutStarredShowsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CelebrityUpsertWithWhereUniqueWithoutStarredShowsInputSchema),z.lazy(() => CelebrityUpsertWithWhereUniqueWithoutStarredShowsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => CelebrityWhereUniqueInputSchema),z.lazy(() => CelebrityWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CelebrityWhereUniqueInputSchema),z.lazy(() => CelebrityWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CelebrityWhereUniqueInputSchema),z.lazy(() => CelebrityWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CelebrityWhereUniqueInputSchema),z.lazy(() => CelebrityWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CelebrityUpdateWithWhereUniqueWithoutStarredShowsInputSchema),z.lazy(() => CelebrityUpdateWithWhereUniqueWithoutStarredShowsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CelebrityUpdateManyWithWhereWithoutStarredShowsInputSchema),z.lazy(() => CelebrityUpdateManyWithWhereWithoutStarredShowsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CelebrityScalarWhereInputSchema),z.lazy(() => CelebrityScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReviewUpdateManyWithoutShowNestedInputSchema: z.ZodType<Prisma.ReviewUpdateManyWithoutShowNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReviewCreateWithoutShowInputSchema),z.lazy(() => ReviewCreateWithoutShowInputSchema).array(),z.lazy(() => ReviewUncheckedCreateWithoutShowInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutShowInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewCreateOrConnectWithoutShowInputSchema),z.lazy(() => ReviewCreateOrConnectWithoutShowInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReviewUpsertWithWhereUniqueWithoutShowInputSchema),z.lazy(() => ReviewUpsertWithWhereUniqueWithoutShowInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewCreateManyShowInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReviewUpdateWithWhereUniqueWithoutShowInputSchema),z.lazy(() => ReviewUpdateWithWhereUniqueWithoutShowInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReviewUpdateManyWithWhereWithoutShowInputSchema),z.lazy(() => ReviewUpdateManyWithWhereWithoutShowInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReviewScalarWhereInputSchema),z.lazy(() => ReviewScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const GenreUncheckedUpdateManyWithoutShowsNestedInputSchema: z.ZodType<Prisma.GenreUncheckedUpdateManyWithoutShowsNestedInput> = z.object({
  create: z.union([ z.lazy(() => GenreCreateWithoutShowsInputSchema),z.lazy(() => GenreCreateWithoutShowsInputSchema).array(),z.lazy(() => GenreUncheckedCreateWithoutShowsInputSchema),z.lazy(() => GenreUncheckedCreateWithoutShowsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GenreCreateOrConnectWithoutShowsInputSchema),z.lazy(() => GenreCreateOrConnectWithoutShowsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GenreUpsertWithWhereUniqueWithoutShowsInputSchema),z.lazy(() => GenreUpsertWithWhereUniqueWithoutShowsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => GenreWhereUniqueInputSchema),z.lazy(() => GenreWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GenreWhereUniqueInputSchema),z.lazy(() => GenreWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GenreWhereUniqueInputSchema),z.lazy(() => GenreWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GenreWhereUniqueInputSchema),z.lazy(() => GenreWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GenreUpdateWithWhereUniqueWithoutShowsInputSchema),z.lazy(() => GenreUpdateWithWhereUniqueWithoutShowsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GenreUpdateManyWithWhereWithoutShowsInputSchema),z.lazy(() => GenreUpdateManyWithWhereWithoutShowsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GenreScalarWhereInputSchema),z.lazy(() => GenreScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CelebrityUncheckedUpdateManyWithoutWrittenShowsNestedInputSchema: z.ZodType<Prisma.CelebrityUncheckedUpdateManyWithoutWrittenShowsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CelebrityCreateWithoutWrittenShowsInputSchema),z.lazy(() => CelebrityCreateWithoutWrittenShowsInputSchema).array(),z.lazy(() => CelebrityUncheckedCreateWithoutWrittenShowsInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutWrittenShowsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CelebrityCreateOrConnectWithoutWrittenShowsInputSchema),z.lazy(() => CelebrityCreateOrConnectWithoutWrittenShowsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CelebrityUpsertWithWhereUniqueWithoutWrittenShowsInputSchema),z.lazy(() => CelebrityUpsertWithWhereUniqueWithoutWrittenShowsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => CelebrityWhereUniqueInputSchema),z.lazy(() => CelebrityWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CelebrityWhereUniqueInputSchema),z.lazy(() => CelebrityWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CelebrityWhereUniqueInputSchema),z.lazy(() => CelebrityWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CelebrityWhereUniqueInputSchema),z.lazy(() => CelebrityWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CelebrityUpdateWithWhereUniqueWithoutWrittenShowsInputSchema),z.lazy(() => CelebrityUpdateWithWhereUniqueWithoutWrittenShowsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CelebrityUpdateManyWithWhereWithoutWrittenShowsInputSchema),z.lazy(() => CelebrityUpdateManyWithWhereWithoutWrittenShowsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CelebrityScalarWhereInputSchema),z.lazy(() => CelebrityScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CelebrityUncheckedUpdateManyWithoutStarredShowsNestedInputSchema: z.ZodType<Prisma.CelebrityUncheckedUpdateManyWithoutStarredShowsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CelebrityCreateWithoutStarredShowsInputSchema),z.lazy(() => CelebrityCreateWithoutStarredShowsInputSchema).array(),z.lazy(() => CelebrityUncheckedCreateWithoutStarredShowsInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutStarredShowsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CelebrityCreateOrConnectWithoutStarredShowsInputSchema),z.lazy(() => CelebrityCreateOrConnectWithoutStarredShowsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CelebrityUpsertWithWhereUniqueWithoutStarredShowsInputSchema),z.lazy(() => CelebrityUpsertWithWhereUniqueWithoutStarredShowsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => CelebrityWhereUniqueInputSchema),z.lazy(() => CelebrityWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CelebrityWhereUniqueInputSchema),z.lazy(() => CelebrityWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CelebrityWhereUniqueInputSchema),z.lazy(() => CelebrityWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CelebrityWhereUniqueInputSchema),z.lazy(() => CelebrityWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CelebrityUpdateWithWhereUniqueWithoutStarredShowsInputSchema),z.lazy(() => CelebrityUpdateWithWhereUniqueWithoutStarredShowsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CelebrityUpdateManyWithWhereWithoutStarredShowsInputSchema),z.lazy(() => CelebrityUpdateManyWithWhereWithoutStarredShowsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CelebrityScalarWhereInputSchema),z.lazy(() => CelebrityScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReviewUncheckedUpdateManyWithoutShowNestedInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateManyWithoutShowNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReviewCreateWithoutShowInputSchema),z.lazy(() => ReviewCreateWithoutShowInputSchema).array(),z.lazy(() => ReviewUncheckedCreateWithoutShowInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutShowInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewCreateOrConnectWithoutShowInputSchema),z.lazy(() => ReviewCreateOrConnectWithoutShowInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReviewUpsertWithWhereUniqueWithoutShowInputSchema),z.lazy(() => ReviewUpsertWithWhereUniqueWithoutShowInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewCreateManyShowInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReviewUpdateWithWhereUniqueWithoutShowInputSchema),z.lazy(() => ReviewUpdateWithWhereUniqueWithoutShowInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReviewUpdateManyWithWhereWithoutShowInputSchema),z.lazy(() => ReviewUpdateManyWithWhereWithoutShowInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReviewScalarWhereInputSchema),z.lazy(() => ReviewScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MovieCreateNestedOneWithoutReviewInputSchema: z.ZodType<Prisma.MovieCreateNestedOneWithoutReviewInput> = z.object({
  create: z.union([ z.lazy(() => MovieCreateWithoutReviewInputSchema),z.lazy(() => MovieUncheckedCreateWithoutReviewInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MovieCreateOrConnectWithoutReviewInputSchema).optional(),
  connect: z.lazy(() => MovieWhereUniqueInputSchema).optional()
}).strict();

export const ShowCreateNestedOneWithoutReviewInputSchema: z.ZodType<Prisma.ShowCreateNestedOneWithoutReviewInput> = z.object({
  create: z.union([ z.lazy(() => ShowCreateWithoutReviewInputSchema),z.lazy(() => ShowUncheckedCreateWithoutReviewInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ShowCreateOrConnectWithoutReviewInputSchema).optional(),
  connect: z.lazy(() => ShowWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutReviewInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutReviewInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutReviewInputSchema),z.lazy(() => UserUncheckedCreateWithoutReviewInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutReviewInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const MovieUpdateOneRequiredWithoutReviewNestedInputSchema: z.ZodType<Prisma.MovieUpdateOneRequiredWithoutReviewNestedInput> = z.object({
  create: z.union([ z.lazy(() => MovieCreateWithoutReviewInputSchema),z.lazy(() => MovieUncheckedCreateWithoutReviewInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MovieCreateOrConnectWithoutReviewInputSchema).optional(),
  upsert: z.lazy(() => MovieUpsertWithoutReviewInputSchema).optional(),
  connect: z.lazy(() => MovieWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => MovieUpdateToOneWithWhereWithoutReviewInputSchema),z.lazy(() => MovieUpdateWithoutReviewInputSchema),z.lazy(() => MovieUncheckedUpdateWithoutReviewInputSchema) ]).optional(),
}).strict();

export const ShowUpdateOneRequiredWithoutReviewNestedInputSchema: z.ZodType<Prisma.ShowUpdateOneRequiredWithoutReviewNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShowCreateWithoutReviewInputSchema),z.lazy(() => ShowUncheckedCreateWithoutReviewInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ShowCreateOrConnectWithoutReviewInputSchema).optional(),
  upsert: z.lazy(() => ShowUpsertWithoutReviewInputSchema).optional(),
  connect: z.lazy(() => ShowWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ShowUpdateToOneWithWhereWithoutReviewInputSchema),z.lazy(() => ShowUpdateWithoutReviewInputSchema),z.lazy(() => ShowUncheckedUpdateWithoutReviewInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutReviewNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutReviewNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutReviewInputSchema),z.lazy(() => UserUncheckedCreateWithoutReviewInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutReviewInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutReviewInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutReviewInputSchema),z.lazy(() => UserUpdateWithoutReviewInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReviewInputSchema) ]).optional(),
}).strict();

export const MovieCreateNestedManyWithoutGenresInputSchema: z.ZodType<Prisma.MovieCreateNestedManyWithoutGenresInput> = z.object({
  create: z.union([ z.lazy(() => MovieCreateWithoutGenresInputSchema),z.lazy(() => MovieCreateWithoutGenresInputSchema).array(),z.lazy(() => MovieUncheckedCreateWithoutGenresInputSchema),z.lazy(() => MovieUncheckedCreateWithoutGenresInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MovieCreateOrConnectWithoutGenresInputSchema),z.lazy(() => MovieCreateOrConnectWithoutGenresInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MovieWhereUniqueInputSchema),z.lazy(() => MovieWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ShowCreateNestedManyWithoutGenresInputSchema: z.ZodType<Prisma.ShowCreateNestedManyWithoutGenresInput> = z.object({
  create: z.union([ z.lazy(() => ShowCreateWithoutGenresInputSchema),z.lazy(() => ShowCreateWithoutGenresInputSchema).array(),z.lazy(() => ShowUncheckedCreateWithoutGenresInputSchema),z.lazy(() => ShowUncheckedCreateWithoutGenresInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShowCreateOrConnectWithoutGenresInputSchema),z.lazy(() => ShowCreateOrConnectWithoutGenresInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MovieUncheckedCreateNestedManyWithoutGenresInputSchema: z.ZodType<Prisma.MovieUncheckedCreateNestedManyWithoutGenresInput> = z.object({
  create: z.union([ z.lazy(() => MovieCreateWithoutGenresInputSchema),z.lazy(() => MovieCreateWithoutGenresInputSchema).array(),z.lazy(() => MovieUncheckedCreateWithoutGenresInputSchema),z.lazy(() => MovieUncheckedCreateWithoutGenresInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MovieCreateOrConnectWithoutGenresInputSchema),z.lazy(() => MovieCreateOrConnectWithoutGenresInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MovieWhereUniqueInputSchema),z.lazy(() => MovieWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ShowUncheckedCreateNestedManyWithoutGenresInputSchema: z.ZodType<Prisma.ShowUncheckedCreateNestedManyWithoutGenresInput> = z.object({
  create: z.union([ z.lazy(() => ShowCreateWithoutGenresInputSchema),z.lazy(() => ShowCreateWithoutGenresInputSchema).array(),z.lazy(() => ShowUncheckedCreateWithoutGenresInputSchema),z.lazy(() => ShowUncheckedCreateWithoutGenresInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShowCreateOrConnectWithoutGenresInputSchema),z.lazy(() => ShowCreateOrConnectWithoutGenresInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const MovieUpdateManyWithoutGenresNestedInputSchema: z.ZodType<Prisma.MovieUpdateManyWithoutGenresNestedInput> = z.object({
  create: z.union([ z.lazy(() => MovieCreateWithoutGenresInputSchema),z.lazy(() => MovieCreateWithoutGenresInputSchema).array(),z.lazy(() => MovieUncheckedCreateWithoutGenresInputSchema),z.lazy(() => MovieUncheckedCreateWithoutGenresInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MovieCreateOrConnectWithoutGenresInputSchema),z.lazy(() => MovieCreateOrConnectWithoutGenresInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MovieUpsertWithWhereUniqueWithoutGenresInputSchema),z.lazy(() => MovieUpsertWithWhereUniqueWithoutGenresInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => MovieWhereUniqueInputSchema),z.lazy(() => MovieWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MovieWhereUniqueInputSchema),z.lazy(() => MovieWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MovieWhereUniqueInputSchema),z.lazy(() => MovieWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MovieWhereUniqueInputSchema),z.lazy(() => MovieWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MovieUpdateWithWhereUniqueWithoutGenresInputSchema),z.lazy(() => MovieUpdateWithWhereUniqueWithoutGenresInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MovieUpdateManyWithWhereWithoutGenresInputSchema),z.lazy(() => MovieUpdateManyWithWhereWithoutGenresInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MovieScalarWhereInputSchema),z.lazy(() => MovieScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ShowUpdateManyWithoutGenresNestedInputSchema: z.ZodType<Prisma.ShowUpdateManyWithoutGenresNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShowCreateWithoutGenresInputSchema),z.lazy(() => ShowCreateWithoutGenresInputSchema).array(),z.lazy(() => ShowUncheckedCreateWithoutGenresInputSchema),z.lazy(() => ShowUncheckedCreateWithoutGenresInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShowCreateOrConnectWithoutGenresInputSchema),z.lazy(() => ShowCreateOrConnectWithoutGenresInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ShowUpsertWithWhereUniqueWithoutGenresInputSchema),z.lazy(() => ShowUpsertWithWhereUniqueWithoutGenresInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ShowUpdateWithWhereUniqueWithoutGenresInputSchema),z.lazy(() => ShowUpdateWithWhereUniqueWithoutGenresInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ShowUpdateManyWithWhereWithoutGenresInputSchema),z.lazy(() => ShowUpdateManyWithWhereWithoutGenresInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ShowScalarWhereInputSchema),z.lazy(() => ShowScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MovieUncheckedUpdateManyWithoutGenresNestedInputSchema: z.ZodType<Prisma.MovieUncheckedUpdateManyWithoutGenresNestedInput> = z.object({
  create: z.union([ z.lazy(() => MovieCreateWithoutGenresInputSchema),z.lazy(() => MovieCreateWithoutGenresInputSchema).array(),z.lazy(() => MovieUncheckedCreateWithoutGenresInputSchema),z.lazy(() => MovieUncheckedCreateWithoutGenresInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MovieCreateOrConnectWithoutGenresInputSchema),z.lazy(() => MovieCreateOrConnectWithoutGenresInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MovieUpsertWithWhereUniqueWithoutGenresInputSchema),z.lazy(() => MovieUpsertWithWhereUniqueWithoutGenresInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => MovieWhereUniqueInputSchema),z.lazy(() => MovieWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MovieWhereUniqueInputSchema),z.lazy(() => MovieWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MovieWhereUniqueInputSchema),z.lazy(() => MovieWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MovieWhereUniqueInputSchema),z.lazy(() => MovieWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MovieUpdateWithWhereUniqueWithoutGenresInputSchema),z.lazy(() => MovieUpdateWithWhereUniqueWithoutGenresInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MovieUpdateManyWithWhereWithoutGenresInputSchema),z.lazy(() => MovieUpdateManyWithWhereWithoutGenresInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MovieScalarWhereInputSchema),z.lazy(() => MovieScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ShowUncheckedUpdateManyWithoutGenresNestedInputSchema: z.ZodType<Prisma.ShowUncheckedUpdateManyWithoutGenresNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShowCreateWithoutGenresInputSchema),z.lazy(() => ShowCreateWithoutGenresInputSchema).array(),z.lazy(() => ShowUncheckedCreateWithoutGenresInputSchema),z.lazy(() => ShowUncheckedCreateWithoutGenresInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShowCreateOrConnectWithoutGenresInputSchema),z.lazy(() => ShowCreateOrConnectWithoutGenresInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ShowUpsertWithWhereUniqueWithoutGenresInputSchema),z.lazy(() => ShowUpsertWithWhereUniqueWithoutGenresInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ShowUpdateWithWhereUniqueWithoutGenresInputSchema),z.lazy(() => ShowUpdateWithWhereUniqueWithoutGenresInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ShowUpdateManyWithWhereWithoutGenresInputSchema),z.lazy(() => ShowUpdateManyWithWhereWithoutGenresInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ShowScalarWhereInputSchema),z.lazy(() => ShowScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NestedUuidFilterSchema: z.ZodType<Prisma.NestedUuidFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidFilterSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedUuidWithAggregatesFilterSchema: z.ZodType<Prisma.NestedUuidWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedJsonNullableFilterSchema: z.ZodType<Prisma.NestedJsonNullableFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedUuidNullableFilterSchema: z.ZodType<Prisma.NestedUuidNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedFloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional()
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedUuidNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedUuidNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const ReviewCreateWithoutUserInputSchema: z.ZodType<Prisma.ReviewCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  rating: z.number(),
  comment: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  movie: z.lazy(() => MovieCreateNestedOneWithoutReviewInputSchema),
  show: z.lazy(() => ShowCreateNestedOneWithoutReviewInputSchema)
}).strict();

export const ReviewUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ReviewUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  rating: z.number(),
  comment: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  movieId: z.string(),
  showId: z.string()
}).strict();

export const ReviewCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ReviewCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ReviewWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReviewCreateWithoutUserInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ReviewCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.ReviewCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ReviewCreateManyUserInputSchema),z.lazy(() => ReviewCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ReviewUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ReviewUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ReviewWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ReviewUpdateWithoutUserInputSchema),z.lazy(() => ReviewUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ReviewCreateWithoutUserInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ReviewUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ReviewUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ReviewWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ReviewUpdateWithoutUserInputSchema),z.lazy(() => ReviewUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const ReviewUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ReviewUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => ReviewScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ReviewUpdateManyMutationInputSchema),z.lazy(() => ReviewUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const ReviewScalarWhereInputSchema: z.ZodType<Prisma.ReviewScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ReviewScalarWhereInputSchema),z.lazy(() => ReviewScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReviewScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReviewScalarWhereInputSchema),z.lazy(() => ReviewScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  rating: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  comment: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  movieId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  showId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
}).strict();

export const MovieCreateWithoutDirectorInputSchema: z.ZodType<Prisma.MovieCreateWithoutDirectorInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  genres: z.lazy(() => GenreCreateNestedManyWithoutMoviesInputSchema).optional(),
  writers: z.lazy(() => CelebrityCreateNestedManyWithoutWrittenMoviesInputSchema).optional(),
  starring: z.lazy(() => CelebrityCreateNestedManyWithoutStarredMoviesInputSchema).optional(),
  Review: z.lazy(() => ReviewCreateNestedManyWithoutMovieInputSchema).optional()
}).strict();

export const MovieUncheckedCreateWithoutDirectorInputSchema: z.ZodType<Prisma.MovieUncheckedCreateWithoutDirectorInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  genres: z.lazy(() => GenreUncheckedCreateNestedManyWithoutMoviesInputSchema).optional(),
  writers: z.lazy(() => CelebrityUncheckedCreateNestedManyWithoutWrittenMoviesInputSchema).optional(),
  starring: z.lazy(() => CelebrityUncheckedCreateNestedManyWithoutStarredMoviesInputSchema).optional(),
  Review: z.lazy(() => ReviewUncheckedCreateNestedManyWithoutMovieInputSchema).optional()
}).strict();

export const MovieCreateOrConnectWithoutDirectorInputSchema: z.ZodType<Prisma.MovieCreateOrConnectWithoutDirectorInput> = z.object({
  where: z.lazy(() => MovieWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MovieCreateWithoutDirectorInputSchema),z.lazy(() => MovieUncheckedCreateWithoutDirectorInputSchema) ]),
}).strict();

export const MovieCreateManyDirectorInputEnvelopeSchema: z.ZodType<Prisma.MovieCreateManyDirectorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MovieCreateManyDirectorInputSchema),z.lazy(() => MovieCreateManyDirectorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const MovieCreateWithoutWritersInputSchema: z.ZodType<Prisma.MovieCreateWithoutWritersInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  genres: z.lazy(() => GenreCreateNestedManyWithoutMoviesInputSchema).optional(),
  director: z.lazy(() => CelebrityCreateNestedOneWithoutDirectedMoviesInputSchema).optional(),
  starring: z.lazy(() => CelebrityCreateNestedManyWithoutStarredMoviesInputSchema).optional(),
  Review: z.lazy(() => ReviewCreateNestedManyWithoutMovieInputSchema).optional()
}).strict();

export const MovieUncheckedCreateWithoutWritersInputSchema: z.ZodType<Prisma.MovieUncheckedCreateWithoutWritersInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  directorId: z.string().optional().nullable(),
  genres: z.lazy(() => GenreUncheckedCreateNestedManyWithoutMoviesInputSchema).optional(),
  starring: z.lazy(() => CelebrityUncheckedCreateNestedManyWithoutStarredMoviesInputSchema).optional(),
  Review: z.lazy(() => ReviewUncheckedCreateNestedManyWithoutMovieInputSchema).optional()
}).strict();

export const MovieCreateOrConnectWithoutWritersInputSchema: z.ZodType<Prisma.MovieCreateOrConnectWithoutWritersInput> = z.object({
  where: z.lazy(() => MovieWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MovieCreateWithoutWritersInputSchema),z.lazy(() => MovieUncheckedCreateWithoutWritersInputSchema) ]),
}).strict();

export const MovieCreateWithoutStarringInputSchema: z.ZodType<Prisma.MovieCreateWithoutStarringInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  genres: z.lazy(() => GenreCreateNestedManyWithoutMoviesInputSchema).optional(),
  director: z.lazy(() => CelebrityCreateNestedOneWithoutDirectedMoviesInputSchema).optional(),
  writers: z.lazy(() => CelebrityCreateNestedManyWithoutWrittenMoviesInputSchema).optional(),
  Review: z.lazy(() => ReviewCreateNestedManyWithoutMovieInputSchema).optional()
}).strict();

export const MovieUncheckedCreateWithoutStarringInputSchema: z.ZodType<Prisma.MovieUncheckedCreateWithoutStarringInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  directorId: z.string().optional().nullable(),
  genres: z.lazy(() => GenreUncheckedCreateNestedManyWithoutMoviesInputSchema).optional(),
  writers: z.lazy(() => CelebrityUncheckedCreateNestedManyWithoutWrittenMoviesInputSchema).optional(),
  Review: z.lazy(() => ReviewUncheckedCreateNestedManyWithoutMovieInputSchema).optional()
}).strict();

export const MovieCreateOrConnectWithoutStarringInputSchema: z.ZodType<Prisma.MovieCreateOrConnectWithoutStarringInput> = z.object({
  where: z.lazy(() => MovieWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MovieCreateWithoutStarringInputSchema),z.lazy(() => MovieUncheckedCreateWithoutStarringInputSchema) ]),
}).strict();

export const ShowCreateWithoutStarringInputSchema: z.ZodType<Prisma.ShowCreateWithoutStarringInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  genres: z.lazy(() => GenreCreateNestedManyWithoutShowsInputSchema).optional(),
  director: z.lazy(() => CelebrityCreateNestedOneWithoutDirectedShowsInputSchema).optional(),
  writers: z.lazy(() => CelebrityCreateNestedManyWithoutWrittenShowsInputSchema).optional(),
  Review: z.lazy(() => ReviewCreateNestedManyWithoutShowInputSchema).optional()
}).strict();

export const ShowUncheckedCreateWithoutStarringInputSchema: z.ZodType<Prisma.ShowUncheckedCreateWithoutStarringInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  directorId: z.string().optional().nullable(),
  genres: z.lazy(() => GenreUncheckedCreateNestedManyWithoutShowsInputSchema).optional(),
  writers: z.lazy(() => CelebrityUncheckedCreateNestedManyWithoutWrittenShowsInputSchema).optional(),
  Review: z.lazy(() => ReviewUncheckedCreateNestedManyWithoutShowInputSchema).optional()
}).strict();

export const ShowCreateOrConnectWithoutStarringInputSchema: z.ZodType<Prisma.ShowCreateOrConnectWithoutStarringInput> = z.object({
  where: z.lazy(() => ShowWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ShowCreateWithoutStarringInputSchema),z.lazy(() => ShowUncheckedCreateWithoutStarringInputSchema) ]),
}).strict();

export const ShowCreateWithoutWritersInputSchema: z.ZodType<Prisma.ShowCreateWithoutWritersInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  genres: z.lazy(() => GenreCreateNestedManyWithoutShowsInputSchema).optional(),
  director: z.lazy(() => CelebrityCreateNestedOneWithoutDirectedShowsInputSchema).optional(),
  starring: z.lazy(() => CelebrityCreateNestedManyWithoutStarredShowsInputSchema).optional(),
  Review: z.lazy(() => ReviewCreateNestedManyWithoutShowInputSchema).optional()
}).strict();

export const ShowUncheckedCreateWithoutWritersInputSchema: z.ZodType<Prisma.ShowUncheckedCreateWithoutWritersInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  directorId: z.string().optional().nullable(),
  genres: z.lazy(() => GenreUncheckedCreateNestedManyWithoutShowsInputSchema).optional(),
  starring: z.lazy(() => CelebrityUncheckedCreateNestedManyWithoutStarredShowsInputSchema).optional(),
  Review: z.lazy(() => ReviewUncheckedCreateNestedManyWithoutShowInputSchema).optional()
}).strict();

export const ShowCreateOrConnectWithoutWritersInputSchema: z.ZodType<Prisma.ShowCreateOrConnectWithoutWritersInput> = z.object({
  where: z.lazy(() => ShowWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ShowCreateWithoutWritersInputSchema),z.lazy(() => ShowUncheckedCreateWithoutWritersInputSchema) ]),
}).strict();

export const ShowCreateWithoutDirectorInputSchema: z.ZodType<Prisma.ShowCreateWithoutDirectorInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  genres: z.lazy(() => GenreCreateNestedManyWithoutShowsInputSchema).optional(),
  writers: z.lazy(() => CelebrityCreateNestedManyWithoutWrittenShowsInputSchema).optional(),
  starring: z.lazy(() => CelebrityCreateNestedManyWithoutStarredShowsInputSchema).optional(),
  Review: z.lazy(() => ReviewCreateNestedManyWithoutShowInputSchema).optional()
}).strict();

export const ShowUncheckedCreateWithoutDirectorInputSchema: z.ZodType<Prisma.ShowUncheckedCreateWithoutDirectorInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  genres: z.lazy(() => GenreUncheckedCreateNestedManyWithoutShowsInputSchema).optional(),
  writers: z.lazy(() => CelebrityUncheckedCreateNestedManyWithoutWrittenShowsInputSchema).optional(),
  starring: z.lazy(() => CelebrityUncheckedCreateNestedManyWithoutStarredShowsInputSchema).optional(),
  Review: z.lazy(() => ReviewUncheckedCreateNestedManyWithoutShowInputSchema).optional()
}).strict();

export const ShowCreateOrConnectWithoutDirectorInputSchema: z.ZodType<Prisma.ShowCreateOrConnectWithoutDirectorInput> = z.object({
  where: z.lazy(() => ShowWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ShowCreateWithoutDirectorInputSchema),z.lazy(() => ShowUncheckedCreateWithoutDirectorInputSchema) ]),
}).strict();

export const ShowCreateManyDirectorInputEnvelopeSchema: z.ZodType<Prisma.ShowCreateManyDirectorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ShowCreateManyDirectorInputSchema),z.lazy(() => ShowCreateManyDirectorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const MovieUpsertWithWhereUniqueWithoutDirectorInputSchema: z.ZodType<Prisma.MovieUpsertWithWhereUniqueWithoutDirectorInput> = z.object({
  where: z.lazy(() => MovieWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MovieUpdateWithoutDirectorInputSchema),z.lazy(() => MovieUncheckedUpdateWithoutDirectorInputSchema) ]),
  create: z.union([ z.lazy(() => MovieCreateWithoutDirectorInputSchema),z.lazy(() => MovieUncheckedCreateWithoutDirectorInputSchema) ]),
}).strict();

export const MovieUpdateWithWhereUniqueWithoutDirectorInputSchema: z.ZodType<Prisma.MovieUpdateWithWhereUniqueWithoutDirectorInput> = z.object({
  where: z.lazy(() => MovieWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MovieUpdateWithoutDirectorInputSchema),z.lazy(() => MovieUncheckedUpdateWithoutDirectorInputSchema) ]),
}).strict();

export const MovieUpdateManyWithWhereWithoutDirectorInputSchema: z.ZodType<Prisma.MovieUpdateManyWithWhereWithoutDirectorInput> = z.object({
  where: z.lazy(() => MovieScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MovieUpdateManyMutationInputSchema),z.lazy(() => MovieUncheckedUpdateManyWithoutDirectorInputSchema) ]),
}).strict();

export const MovieScalarWhereInputSchema: z.ZodType<Prisma.MovieScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MovieScalarWhereInputSchema),z.lazy(() => MovieScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MovieScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MovieScalarWhereInputSchema),z.lazy(() => MovieScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  releaseDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  rating: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  highlighted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  options: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  directorId: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const MovieUpsertWithWhereUniqueWithoutWritersInputSchema: z.ZodType<Prisma.MovieUpsertWithWhereUniqueWithoutWritersInput> = z.object({
  where: z.lazy(() => MovieWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MovieUpdateWithoutWritersInputSchema),z.lazy(() => MovieUncheckedUpdateWithoutWritersInputSchema) ]),
  create: z.union([ z.lazy(() => MovieCreateWithoutWritersInputSchema),z.lazy(() => MovieUncheckedCreateWithoutWritersInputSchema) ]),
}).strict();

export const MovieUpdateWithWhereUniqueWithoutWritersInputSchema: z.ZodType<Prisma.MovieUpdateWithWhereUniqueWithoutWritersInput> = z.object({
  where: z.lazy(() => MovieWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MovieUpdateWithoutWritersInputSchema),z.lazy(() => MovieUncheckedUpdateWithoutWritersInputSchema) ]),
}).strict();

export const MovieUpdateManyWithWhereWithoutWritersInputSchema: z.ZodType<Prisma.MovieUpdateManyWithWhereWithoutWritersInput> = z.object({
  where: z.lazy(() => MovieScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MovieUpdateManyMutationInputSchema),z.lazy(() => MovieUncheckedUpdateManyWithoutWritersInputSchema) ]),
}).strict();

export const MovieUpsertWithWhereUniqueWithoutStarringInputSchema: z.ZodType<Prisma.MovieUpsertWithWhereUniqueWithoutStarringInput> = z.object({
  where: z.lazy(() => MovieWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MovieUpdateWithoutStarringInputSchema),z.lazy(() => MovieUncheckedUpdateWithoutStarringInputSchema) ]),
  create: z.union([ z.lazy(() => MovieCreateWithoutStarringInputSchema),z.lazy(() => MovieUncheckedCreateWithoutStarringInputSchema) ]),
}).strict();

export const MovieUpdateWithWhereUniqueWithoutStarringInputSchema: z.ZodType<Prisma.MovieUpdateWithWhereUniqueWithoutStarringInput> = z.object({
  where: z.lazy(() => MovieWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MovieUpdateWithoutStarringInputSchema),z.lazy(() => MovieUncheckedUpdateWithoutStarringInputSchema) ]),
}).strict();

export const MovieUpdateManyWithWhereWithoutStarringInputSchema: z.ZodType<Prisma.MovieUpdateManyWithWhereWithoutStarringInput> = z.object({
  where: z.lazy(() => MovieScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MovieUpdateManyMutationInputSchema),z.lazy(() => MovieUncheckedUpdateManyWithoutStarringInputSchema) ]),
}).strict();

export const ShowUpsertWithWhereUniqueWithoutStarringInputSchema: z.ZodType<Prisma.ShowUpsertWithWhereUniqueWithoutStarringInput> = z.object({
  where: z.lazy(() => ShowWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ShowUpdateWithoutStarringInputSchema),z.lazy(() => ShowUncheckedUpdateWithoutStarringInputSchema) ]),
  create: z.union([ z.lazy(() => ShowCreateWithoutStarringInputSchema),z.lazy(() => ShowUncheckedCreateWithoutStarringInputSchema) ]),
}).strict();

export const ShowUpdateWithWhereUniqueWithoutStarringInputSchema: z.ZodType<Prisma.ShowUpdateWithWhereUniqueWithoutStarringInput> = z.object({
  where: z.lazy(() => ShowWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ShowUpdateWithoutStarringInputSchema),z.lazy(() => ShowUncheckedUpdateWithoutStarringInputSchema) ]),
}).strict();

export const ShowUpdateManyWithWhereWithoutStarringInputSchema: z.ZodType<Prisma.ShowUpdateManyWithWhereWithoutStarringInput> = z.object({
  where: z.lazy(() => ShowScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ShowUpdateManyMutationInputSchema),z.lazy(() => ShowUncheckedUpdateManyWithoutStarringInputSchema) ]),
}).strict();

export const ShowScalarWhereInputSchema: z.ZodType<Prisma.ShowScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ShowScalarWhereInputSchema),z.lazy(() => ShowScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ShowScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ShowScalarWhereInputSchema),z.lazy(() => ShowScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  releaseDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  rating: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  highlighted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  options: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  directorId: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const ShowUpsertWithWhereUniqueWithoutWritersInputSchema: z.ZodType<Prisma.ShowUpsertWithWhereUniqueWithoutWritersInput> = z.object({
  where: z.lazy(() => ShowWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ShowUpdateWithoutWritersInputSchema),z.lazy(() => ShowUncheckedUpdateWithoutWritersInputSchema) ]),
  create: z.union([ z.lazy(() => ShowCreateWithoutWritersInputSchema),z.lazy(() => ShowUncheckedCreateWithoutWritersInputSchema) ]),
}).strict();

export const ShowUpdateWithWhereUniqueWithoutWritersInputSchema: z.ZodType<Prisma.ShowUpdateWithWhereUniqueWithoutWritersInput> = z.object({
  where: z.lazy(() => ShowWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ShowUpdateWithoutWritersInputSchema),z.lazy(() => ShowUncheckedUpdateWithoutWritersInputSchema) ]),
}).strict();

export const ShowUpdateManyWithWhereWithoutWritersInputSchema: z.ZodType<Prisma.ShowUpdateManyWithWhereWithoutWritersInput> = z.object({
  where: z.lazy(() => ShowScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ShowUpdateManyMutationInputSchema),z.lazy(() => ShowUncheckedUpdateManyWithoutWritersInputSchema) ]),
}).strict();

export const ShowUpsertWithWhereUniqueWithoutDirectorInputSchema: z.ZodType<Prisma.ShowUpsertWithWhereUniqueWithoutDirectorInput> = z.object({
  where: z.lazy(() => ShowWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ShowUpdateWithoutDirectorInputSchema),z.lazy(() => ShowUncheckedUpdateWithoutDirectorInputSchema) ]),
  create: z.union([ z.lazy(() => ShowCreateWithoutDirectorInputSchema),z.lazy(() => ShowUncheckedCreateWithoutDirectorInputSchema) ]),
}).strict();

export const ShowUpdateWithWhereUniqueWithoutDirectorInputSchema: z.ZodType<Prisma.ShowUpdateWithWhereUniqueWithoutDirectorInput> = z.object({
  where: z.lazy(() => ShowWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ShowUpdateWithoutDirectorInputSchema),z.lazy(() => ShowUncheckedUpdateWithoutDirectorInputSchema) ]),
}).strict();

export const ShowUpdateManyWithWhereWithoutDirectorInputSchema: z.ZodType<Prisma.ShowUpdateManyWithWhereWithoutDirectorInput> = z.object({
  where: z.lazy(() => ShowScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ShowUpdateManyMutationInputSchema),z.lazy(() => ShowUncheckedUpdateManyWithoutDirectorInputSchema) ]),
}).strict();

export const GenreCreateWithoutMoviesInputSchema: z.ZodType<Prisma.GenreCreateWithoutMoviesInput> = z.object({
  id: z.number().int(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  shows: z.lazy(() => ShowCreateNestedManyWithoutGenresInputSchema).optional()
}).strict();

export const GenreUncheckedCreateWithoutMoviesInputSchema: z.ZodType<Prisma.GenreUncheckedCreateWithoutMoviesInput> = z.object({
  id: z.number().int(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  shows: z.lazy(() => ShowUncheckedCreateNestedManyWithoutGenresInputSchema).optional()
}).strict();

export const GenreCreateOrConnectWithoutMoviesInputSchema: z.ZodType<Prisma.GenreCreateOrConnectWithoutMoviesInput> = z.object({
  where: z.lazy(() => GenreWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => GenreCreateWithoutMoviesInputSchema),z.lazy(() => GenreUncheckedCreateWithoutMoviesInputSchema) ]),
}).strict();

export const CelebrityCreateWithoutDirectedMoviesInputSchema: z.ZodType<Prisma.CelebrityCreateWithoutDirectedMoviesInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  birthDate: z.coerce.date().optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  writtenMovies: z.lazy(() => MovieCreateNestedManyWithoutWritersInputSchema).optional(),
  starredMovies: z.lazy(() => MovieCreateNestedManyWithoutStarringInputSchema).optional(),
  starredShows: z.lazy(() => ShowCreateNestedManyWithoutStarringInputSchema).optional(),
  writtenShows: z.lazy(() => ShowCreateNestedManyWithoutWritersInputSchema).optional(),
  directedShows: z.lazy(() => ShowCreateNestedManyWithoutDirectorInputSchema).optional()
}).strict();

export const CelebrityUncheckedCreateWithoutDirectedMoviesInputSchema: z.ZodType<Prisma.CelebrityUncheckedCreateWithoutDirectedMoviesInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  birthDate: z.coerce.date().optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  writtenMovies: z.lazy(() => MovieUncheckedCreateNestedManyWithoutWritersInputSchema).optional(),
  starredMovies: z.lazy(() => MovieUncheckedCreateNestedManyWithoutStarringInputSchema).optional(),
  starredShows: z.lazy(() => ShowUncheckedCreateNestedManyWithoutStarringInputSchema).optional(),
  writtenShows: z.lazy(() => ShowUncheckedCreateNestedManyWithoutWritersInputSchema).optional(),
  directedShows: z.lazy(() => ShowUncheckedCreateNestedManyWithoutDirectorInputSchema).optional()
}).strict();

export const CelebrityCreateOrConnectWithoutDirectedMoviesInputSchema: z.ZodType<Prisma.CelebrityCreateOrConnectWithoutDirectedMoviesInput> = z.object({
  where: z.lazy(() => CelebrityWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CelebrityCreateWithoutDirectedMoviesInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutDirectedMoviesInputSchema) ]),
}).strict();

export const CelebrityCreateWithoutWrittenMoviesInputSchema: z.ZodType<Prisma.CelebrityCreateWithoutWrittenMoviesInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  birthDate: z.coerce.date().optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  directedMovies: z.lazy(() => MovieCreateNestedManyWithoutDirectorInputSchema).optional(),
  starredMovies: z.lazy(() => MovieCreateNestedManyWithoutStarringInputSchema).optional(),
  starredShows: z.lazy(() => ShowCreateNestedManyWithoutStarringInputSchema).optional(),
  writtenShows: z.lazy(() => ShowCreateNestedManyWithoutWritersInputSchema).optional(),
  directedShows: z.lazy(() => ShowCreateNestedManyWithoutDirectorInputSchema).optional()
}).strict();

export const CelebrityUncheckedCreateWithoutWrittenMoviesInputSchema: z.ZodType<Prisma.CelebrityUncheckedCreateWithoutWrittenMoviesInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  birthDate: z.coerce.date().optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  directedMovies: z.lazy(() => MovieUncheckedCreateNestedManyWithoutDirectorInputSchema).optional(),
  starredMovies: z.lazy(() => MovieUncheckedCreateNestedManyWithoutStarringInputSchema).optional(),
  starredShows: z.lazy(() => ShowUncheckedCreateNestedManyWithoutStarringInputSchema).optional(),
  writtenShows: z.lazy(() => ShowUncheckedCreateNestedManyWithoutWritersInputSchema).optional(),
  directedShows: z.lazy(() => ShowUncheckedCreateNestedManyWithoutDirectorInputSchema).optional()
}).strict();

export const CelebrityCreateOrConnectWithoutWrittenMoviesInputSchema: z.ZodType<Prisma.CelebrityCreateOrConnectWithoutWrittenMoviesInput> = z.object({
  where: z.lazy(() => CelebrityWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CelebrityCreateWithoutWrittenMoviesInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutWrittenMoviesInputSchema) ]),
}).strict();

export const CelebrityCreateWithoutStarredMoviesInputSchema: z.ZodType<Prisma.CelebrityCreateWithoutStarredMoviesInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  birthDate: z.coerce.date().optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  directedMovies: z.lazy(() => MovieCreateNestedManyWithoutDirectorInputSchema).optional(),
  writtenMovies: z.lazy(() => MovieCreateNestedManyWithoutWritersInputSchema).optional(),
  starredShows: z.lazy(() => ShowCreateNestedManyWithoutStarringInputSchema).optional(),
  writtenShows: z.lazy(() => ShowCreateNestedManyWithoutWritersInputSchema).optional(),
  directedShows: z.lazy(() => ShowCreateNestedManyWithoutDirectorInputSchema).optional()
}).strict();

export const CelebrityUncheckedCreateWithoutStarredMoviesInputSchema: z.ZodType<Prisma.CelebrityUncheckedCreateWithoutStarredMoviesInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  birthDate: z.coerce.date().optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  directedMovies: z.lazy(() => MovieUncheckedCreateNestedManyWithoutDirectorInputSchema).optional(),
  writtenMovies: z.lazy(() => MovieUncheckedCreateNestedManyWithoutWritersInputSchema).optional(),
  starredShows: z.lazy(() => ShowUncheckedCreateNestedManyWithoutStarringInputSchema).optional(),
  writtenShows: z.lazy(() => ShowUncheckedCreateNestedManyWithoutWritersInputSchema).optional(),
  directedShows: z.lazy(() => ShowUncheckedCreateNestedManyWithoutDirectorInputSchema).optional()
}).strict();

export const CelebrityCreateOrConnectWithoutStarredMoviesInputSchema: z.ZodType<Prisma.CelebrityCreateOrConnectWithoutStarredMoviesInput> = z.object({
  where: z.lazy(() => CelebrityWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CelebrityCreateWithoutStarredMoviesInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutStarredMoviesInputSchema) ]),
}).strict();

export const ReviewCreateWithoutMovieInputSchema: z.ZodType<Prisma.ReviewCreateWithoutMovieInput> = z.object({
  id: z.string().optional(),
  rating: z.number(),
  comment: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  show: z.lazy(() => ShowCreateNestedOneWithoutReviewInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutReviewInputSchema)
}).strict();

export const ReviewUncheckedCreateWithoutMovieInputSchema: z.ZodType<Prisma.ReviewUncheckedCreateWithoutMovieInput> = z.object({
  id: z.string().optional(),
  rating: z.number(),
  comment: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  showId: z.string(),
  userId: z.string()
}).strict();

export const ReviewCreateOrConnectWithoutMovieInputSchema: z.ZodType<Prisma.ReviewCreateOrConnectWithoutMovieInput> = z.object({
  where: z.lazy(() => ReviewWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReviewCreateWithoutMovieInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutMovieInputSchema) ]),
}).strict();

export const ReviewCreateManyMovieInputEnvelopeSchema: z.ZodType<Prisma.ReviewCreateManyMovieInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ReviewCreateManyMovieInputSchema),z.lazy(() => ReviewCreateManyMovieInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const GenreUpsertWithWhereUniqueWithoutMoviesInputSchema: z.ZodType<Prisma.GenreUpsertWithWhereUniqueWithoutMoviesInput> = z.object({
  where: z.lazy(() => GenreWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => GenreUpdateWithoutMoviesInputSchema),z.lazy(() => GenreUncheckedUpdateWithoutMoviesInputSchema) ]),
  create: z.union([ z.lazy(() => GenreCreateWithoutMoviesInputSchema),z.lazy(() => GenreUncheckedCreateWithoutMoviesInputSchema) ]),
}).strict();

export const GenreUpdateWithWhereUniqueWithoutMoviesInputSchema: z.ZodType<Prisma.GenreUpdateWithWhereUniqueWithoutMoviesInput> = z.object({
  where: z.lazy(() => GenreWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => GenreUpdateWithoutMoviesInputSchema),z.lazy(() => GenreUncheckedUpdateWithoutMoviesInputSchema) ]),
}).strict();

export const GenreUpdateManyWithWhereWithoutMoviesInputSchema: z.ZodType<Prisma.GenreUpdateManyWithWhereWithoutMoviesInput> = z.object({
  where: z.lazy(() => GenreScalarWhereInputSchema),
  data: z.union([ z.lazy(() => GenreUpdateManyMutationInputSchema),z.lazy(() => GenreUncheckedUpdateManyWithoutMoviesInputSchema) ]),
}).strict();

export const GenreScalarWhereInputSchema: z.ZodType<Prisma.GenreScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => GenreScalarWhereInputSchema),z.lazy(() => GenreScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => GenreScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GenreScalarWhereInputSchema),z.lazy(() => GenreScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const CelebrityUpsertWithoutDirectedMoviesInputSchema: z.ZodType<Prisma.CelebrityUpsertWithoutDirectedMoviesInput> = z.object({
  update: z.union([ z.lazy(() => CelebrityUpdateWithoutDirectedMoviesInputSchema),z.lazy(() => CelebrityUncheckedUpdateWithoutDirectedMoviesInputSchema) ]),
  create: z.union([ z.lazy(() => CelebrityCreateWithoutDirectedMoviesInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutDirectedMoviesInputSchema) ]),
  where: z.lazy(() => CelebrityWhereInputSchema).optional()
}).strict();

export const CelebrityUpdateToOneWithWhereWithoutDirectedMoviesInputSchema: z.ZodType<Prisma.CelebrityUpdateToOneWithWhereWithoutDirectedMoviesInput> = z.object({
  where: z.lazy(() => CelebrityWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CelebrityUpdateWithoutDirectedMoviesInputSchema),z.lazy(() => CelebrityUncheckedUpdateWithoutDirectedMoviesInputSchema) ]),
}).strict();

export const CelebrityUpdateWithoutDirectedMoviesInputSchema: z.ZodType<Prisma.CelebrityUpdateWithoutDirectedMoviesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  writtenMovies: z.lazy(() => MovieUpdateManyWithoutWritersNestedInputSchema).optional(),
  starredMovies: z.lazy(() => MovieUpdateManyWithoutStarringNestedInputSchema).optional(),
  starredShows: z.lazy(() => ShowUpdateManyWithoutStarringNestedInputSchema).optional(),
  writtenShows: z.lazy(() => ShowUpdateManyWithoutWritersNestedInputSchema).optional(),
  directedShows: z.lazy(() => ShowUpdateManyWithoutDirectorNestedInputSchema).optional()
}).strict();

export const CelebrityUncheckedUpdateWithoutDirectedMoviesInputSchema: z.ZodType<Prisma.CelebrityUncheckedUpdateWithoutDirectedMoviesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  writtenMovies: z.lazy(() => MovieUncheckedUpdateManyWithoutWritersNestedInputSchema).optional(),
  starredMovies: z.lazy(() => MovieUncheckedUpdateManyWithoutStarringNestedInputSchema).optional(),
  starredShows: z.lazy(() => ShowUncheckedUpdateManyWithoutStarringNestedInputSchema).optional(),
  writtenShows: z.lazy(() => ShowUncheckedUpdateManyWithoutWritersNestedInputSchema).optional(),
  directedShows: z.lazy(() => ShowUncheckedUpdateManyWithoutDirectorNestedInputSchema).optional()
}).strict();

export const CelebrityUpsertWithWhereUniqueWithoutWrittenMoviesInputSchema: z.ZodType<Prisma.CelebrityUpsertWithWhereUniqueWithoutWrittenMoviesInput> = z.object({
  where: z.lazy(() => CelebrityWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CelebrityUpdateWithoutWrittenMoviesInputSchema),z.lazy(() => CelebrityUncheckedUpdateWithoutWrittenMoviesInputSchema) ]),
  create: z.union([ z.lazy(() => CelebrityCreateWithoutWrittenMoviesInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutWrittenMoviesInputSchema) ]),
}).strict();

export const CelebrityUpdateWithWhereUniqueWithoutWrittenMoviesInputSchema: z.ZodType<Prisma.CelebrityUpdateWithWhereUniqueWithoutWrittenMoviesInput> = z.object({
  where: z.lazy(() => CelebrityWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CelebrityUpdateWithoutWrittenMoviesInputSchema),z.lazy(() => CelebrityUncheckedUpdateWithoutWrittenMoviesInputSchema) ]),
}).strict();

export const CelebrityUpdateManyWithWhereWithoutWrittenMoviesInputSchema: z.ZodType<Prisma.CelebrityUpdateManyWithWhereWithoutWrittenMoviesInput> = z.object({
  where: z.lazy(() => CelebrityScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CelebrityUpdateManyMutationInputSchema),z.lazy(() => CelebrityUncheckedUpdateManyWithoutWrittenMoviesInputSchema) ]),
}).strict();

export const CelebrityScalarWhereInputSchema: z.ZodType<Prisma.CelebrityScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CelebrityScalarWhereInputSchema),z.lazy(() => CelebrityScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CelebrityScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CelebrityScalarWhereInputSchema),z.lazy(() => CelebrityScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  birthDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  options: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const CelebrityUpsertWithWhereUniqueWithoutStarredMoviesInputSchema: z.ZodType<Prisma.CelebrityUpsertWithWhereUniqueWithoutStarredMoviesInput> = z.object({
  where: z.lazy(() => CelebrityWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CelebrityUpdateWithoutStarredMoviesInputSchema),z.lazy(() => CelebrityUncheckedUpdateWithoutStarredMoviesInputSchema) ]),
  create: z.union([ z.lazy(() => CelebrityCreateWithoutStarredMoviesInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutStarredMoviesInputSchema) ]),
}).strict();

export const CelebrityUpdateWithWhereUniqueWithoutStarredMoviesInputSchema: z.ZodType<Prisma.CelebrityUpdateWithWhereUniqueWithoutStarredMoviesInput> = z.object({
  where: z.lazy(() => CelebrityWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CelebrityUpdateWithoutStarredMoviesInputSchema),z.lazy(() => CelebrityUncheckedUpdateWithoutStarredMoviesInputSchema) ]),
}).strict();

export const CelebrityUpdateManyWithWhereWithoutStarredMoviesInputSchema: z.ZodType<Prisma.CelebrityUpdateManyWithWhereWithoutStarredMoviesInput> = z.object({
  where: z.lazy(() => CelebrityScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CelebrityUpdateManyMutationInputSchema),z.lazy(() => CelebrityUncheckedUpdateManyWithoutStarredMoviesInputSchema) ]),
}).strict();

export const ReviewUpsertWithWhereUniqueWithoutMovieInputSchema: z.ZodType<Prisma.ReviewUpsertWithWhereUniqueWithoutMovieInput> = z.object({
  where: z.lazy(() => ReviewWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ReviewUpdateWithoutMovieInputSchema),z.lazy(() => ReviewUncheckedUpdateWithoutMovieInputSchema) ]),
  create: z.union([ z.lazy(() => ReviewCreateWithoutMovieInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutMovieInputSchema) ]),
}).strict();

export const ReviewUpdateWithWhereUniqueWithoutMovieInputSchema: z.ZodType<Prisma.ReviewUpdateWithWhereUniqueWithoutMovieInput> = z.object({
  where: z.lazy(() => ReviewWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ReviewUpdateWithoutMovieInputSchema),z.lazy(() => ReviewUncheckedUpdateWithoutMovieInputSchema) ]),
}).strict();

export const ReviewUpdateManyWithWhereWithoutMovieInputSchema: z.ZodType<Prisma.ReviewUpdateManyWithWhereWithoutMovieInput> = z.object({
  where: z.lazy(() => ReviewScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ReviewUpdateManyMutationInputSchema),z.lazy(() => ReviewUncheckedUpdateManyWithoutMovieInputSchema) ]),
}).strict();

export const GenreCreateWithoutShowsInputSchema: z.ZodType<Prisma.GenreCreateWithoutShowsInput> = z.object({
  id: z.number().int(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  movies: z.lazy(() => MovieCreateNestedManyWithoutGenresInputSchema).optional()
}).strict();

export const GenreUncheckedCreateWithoutShowsInputSchema: z.ZodType<Prisma.GenreUncheckedCreateWithoutShowsInput> = z.object({
  id: z.number().int(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  movies: z.lazy(() => MovieUncheckedCreateNestedManyWithoutGenresInputSchema).optional()
}).strict();

export const GenreCreateOrConnectWithoutShowsInputSchema: z.ZodType<Prisma.GenreCreateOrConnectWithoutShowsInput> = z.object({
  where: z.lazy(() => GenreWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => GenreCreateWithoutShowsInputSchema),z.lazy(() => GenreUncheckedCreateWithoutShowsInputSchema) ]),
}).strict();

export const CelebrityCreateWithoutDirectedShowsInputSchema: z.ZodType<Prisma.CelebrityCreateWithoutDirectedShowsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  birthDate: z.coerce.date().optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  directedMovies: z.lazy(() => MovieCreateNestedManyWithoutDirectorInputSchema).optional(),
  writtenMovies: z.lazy(() => MovieCreateNestedManyWithoutWritersInputSchema).optional(),
  starredMovies: z.lazy(() => MovieCreateNestedManyWithoutStarringInputSchema).optional(),
  starredShows: z.lazy(() => ShowCreateNestedManyWithoutStarringInputSchema).optional(),
  writtenShows: z.lazy(() => ShowCreateNestedManyWithoutWritersInputSchema).optional()
}).strict();

export const CelebrityUncheckedCreateWithoutDirectedShowsInputSchema: z.ZodType<Prisma.CelebrityUncheckedCreateWithoutDirectedShowsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  birthDate: z.coerce.date().optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  directedMovies: z.lazy(() => MovieUncheckedCreateNestedManyWithoutDirectorInputSchema).optional(),
  writtenMovies: z.lazy(() => MovieUncheckedCreateNestedManyWithoutWritersInputSchema).optional(),
  starredMovies: z.lazy(() => MovieUncheckedCreateNestedManyWithoutStarringInputSchema).optional(),
  starredShows: z.lazy(() => ShowUncheckedCreateNestedManyWithoutStarringInputSchema).optional(),
  writtenShows: z.lazy(() => ShowUncheckedCreateNestedManyWithoutWritersInputSchema).optional()
}).strict();

export const CelebrityCreateOrConnectWithoutDirectedShowsInputSchema: z.ZodType<Prisma.CelebrityCreateOrConnectWithoutDirectedShowsInput> = z.object({
  where: z.lazy(() => CelebrityWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CelebrityCreateWithoutDirectedShowsInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutDirectedShowsInputSchema) ]),
}).strict();

export const CelebrityCreateWithoutWrittenShowsInputSchema: z.ZodType<Prisma.CelebrityCreateWithoutWrittenShowsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  birthDate: z.coerce.date().optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  directedMovies: z.lazy(() => MovieCreateNestedManyWithoutDirectorInputSchema).optional(),
  writtenMovies: z.lazy(() => MovieCreateNestedManyWithoutWritersInputSchema).optional(),
  starredMovies: z.lazy(() => MovieCreateNestedManyWithoutStarringInputSchema).optional(),
  starredShows: z.lazy(() => ShowCreateNestedManyWithoutStarringInputSchema).optional(),
  directedShows: z.lazy(() => ShowCreateNestedManyWithoutDirectorInputSchema).optional()
}).strict();

export const CelebrityUncheckedCreateWithoutWrittenShowsInputSchema: z.ZodType<Prisma.CelebrityUncheckedCreateWithoutWrittenShowsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  birthDate: z.coerce.date().optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  directedMovies: z.lazy(() => MovieUncheckedCreateNestedManyWithoutDirectorInputSchema).optional(),
  writtenMovies: z.lazy(() => MovieUncheckedCreateNestedManyWithoutWritersInputSchema).optional(),
  starredMovies: z.lazy(() => MovieUncheckedCreateNestedManyWithoutStarringInputSchema).optional(),
  starredShows: z.lazy(() => ShowUncheckedCreateNestedManyWithoutStarringInputSchema).optional(),
  directedShows: z.lazy(() => ShowUncheckedCreateNestedManyWithoutDirectorInputSchema).optional()
}).strict();

export const CelebrityCreateOrConnectWithoutWrittenShowsInputSchema: z.ZodType<Prisma.CelebrityCreateOrConnectWithoutWrittenShowsInput> = z.object({
  where: z.lazy(() => CelebrityWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CelebrityCreateWithoutWrittenShowsInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutWrittenShowsInputSchema) ]),
}).strict();

export const CelebrityCreateWithoutStarredShowsInputSchema: z.ZodType<Prisma.CelebrityCreateWithoutStarredShowsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  birthDate: z.coerce.date().optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  directedMovies: z.lazy(() => MovieCreateNestedManyWithoutDirectorInputSchema).optional(),
  writtenMovies: z.lazy(() => MovieCreateNestedManyWithoutWritersInputSchema).optional(),
  starredMovies: z.lazy(() => MovieCreateNestedManyWithoutStarringInputSchema).optional(),
  writtenShows: z.lazy(() => ShowCreateNestedManyWithoutWritersInputSchema).optional(),
  directedShows: z.lazy(() => ShowCreateNestedManyWithoutDirectorInputSchema).optional()
}).strict();

export const CelebrityUncheckedCreateWithoutStarredShowsInputSchema: z.ZodType<Prisma.CelebrityUncheckedCreateWithoutStarredShowsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  birthDate: z.coerce.date().optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  directedMovies: z.lazy(() => MovieUncheckedCreateNestedManyWithoutDirectorInputSchema).optional(),
  writtenMovies: z.lazy(() => MovieUncheckedCreateNestedManyWithoutWritersInputSchema).optional(),
  starredMovies: z.lazy(() => MovieUncheckedCreateNestedManyWithoutStarringInputSchema).optional(),
  writtenShows: z.lazy(() => ShowUncheckedCreateNestedManyWithoutWritersInputSchema).optional(),
  directedShows: z.lazy(() => ShowUncheckedCreateNestedManyWithoutDirectorInputSchema).optional()
}).strict();

export const CelebrityCreateOrConnectWithoutStarredShowsInputSchema: z.ZodType<Prisma.CelebrityCreateOrConnectWithoutStarredShowsInput> = z.object({
  where: z.lazy(() => CelebrityWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CelebrityCreateWithoutStarredShowsInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutStarredShowsInputSchema) ]),
}).strict();

export const ReviewCreateWithoutShowInputSchema: z.ZodType<Prisma.ReviewCreateWithoutShowInput> = z.object({
  id: z.string().optional(),
  rating: z.number(),
  comment: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  movie: z.lazy(() => MovieCreateNestedOneWithoutReviewInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutReviewInputSchema)
}).strict();

export const ReviewUncheckedCreateWithoutShowInputSchema: z.ZodType<Prisma.ReviewUncheckedCreateWithoutShowInput> = z.object({
  id: z.string().optional(),
  rating: z.number(),
  comment: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  movieId: z.string(),
  userId: z.string()
}).strict();

export const ReviewCreateOrConnectWithoutShowInputSchema: z.ZodType<Prisma.ReviewCreateOrConnectWithoutShowInput> = z.object({
  where: z.lazy(() => ReviewWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReviewCreateWithoutShowInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutShowInputSchema) ]),
}).strict();

export const ReviewCreateManyShowInputEnvelopeSchema: z.ZodType<Prisma.ReviewCreateManyShowInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ReviewCreateManyShowInputSchema),z.lazy(() => ReviewCreateManyShowInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const GenreUpsertWithWhereUniqueWithoutShowsInputSchema: z.ZodType<Prisma.GenreUpsertWithWhereUniqueWithoutShowsInput> = z.object({
  where: z.lazy(() => GenreWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => GenreUpdateWithoutShowsInputSchema),z.lazy(() => GenreUncheckedUpdateWithoutShowsInputSchema) ]),
  create: z.union([ z.lazy(() => GenreCreateWithoutShowsInputSchema),z.lazy(() => GenreUncheckedCreateWithoutShowsInputSchema) ]),
}).strict();

export const GenreUpdateWithWhereUniqueWithoutShowsInputSchema: z.ZodType<Prisma.GenreUpdateWithWhereUniqueWithoutShowsInput> = z.object({
  where: z.lazy(() => GenreWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => GenreUpdateWithoutShowsInputSchema),z.lazy(() => GenreUncheckedUpdateWithoutShowsInputSchema) ]),
}).strict();

export const GenreUpdateManyWithWhereWithoutShowsInputSchema: z.ZodType<Prisma.GenreUpdateManyWithWhereWithoutShowsInput> = z.object({
  where: z.lazy(() => GenreScalarWhereInputSchema),
  data: z.union([ z.lazy(() => GenreUpdateManyMutationInputSchema),z.lazy(() => GenreUncheckedUpdateManyWithoutShowsInputSchema) ]),
}).strict();

export const CelebrityUpsertWithoutDirectedShowsInputSchema: z.ZodType<Prisma.CelebrityUpsertWithoutDirectedShowsInput> = z.object({
  update: z.union([ z.lazy(() => CelebrityUpdateWithoutDirectedShowsInputSchema),z.lazy(() => CelebrityUncheckedUpdateWithoutDirectedShowsInputSchema) ]),
  create: z.union([ z.lazy(() => CelebrityCreateWithoutDirectedShowsInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutDirectedShowsInputSchema) ]),
  where: z.lazy(() => CelebrityWhereInputSchema).optional()
}).strict();

export const CelebrityUpdateToOneWithWhereWithoutDirectedShowsInputSchema: z.ZodType<Prisma.CelebrityUpdateToOneWithWhereWithoutDirectedShowsInput> = z.object({
  where: z.lazy(() => CelebrityWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CelebrityUpdateWithoutDirectedShowsInputSchema),z.lazy(() => CelebrityUncheckedUpdateWithoutDirectedShowsInputSchema) ]),
}).strict();

export const CelebrityUpdateWithoutDirectedShowsInputSchema: z.ZodType<Prisma.CelebrityUpdateWithoutDirectedShowsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  directedMovies: z.lazy(() => MovieUpdateManyWithoutDirectorNestedInputSchema).optional(),
  writtenMovies: z.lazy(() => MovieUpdateManyWithoutWritersNestedInputSchema).optional(),
  starredMovies: z.lazy(() => MovieUpdateManyWithoutStarringNestedInputSchema).optional(),
  starredShows: z.lazy(() => ShowUpdateManyWithoutStarringNestedInputSchema).optional(),
  writtenShows: z.lazy(() => ShowUpdateManyWithoutWritersNestedInputSchema).optional()
}).strict();

export const CelebrityUncheckedUpdateWithoutDirectedShowsInputSchema: z.ZodType<Prisma.CelebrityUncheckedUpdateWithoutDirectedShowsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  directedMovies: z.lazy(() => MovieUncheckedUpdateManyWithoutDirectorNestedInputSchema).optional(),
  writtenMovies: z.lazy(() => MovieUncheckedUpdateManyWithoutWritersNestedInputSchema).optional(),
  starredMovies: z.lazy(() => MovieUncheckedUpdateManyWithoutStarringNestedInputSchema).optional(),
  starredShows: z.lazy(() => ShowUncheckedUpdateManyWithoutStarringNestedInputSchema).optional(),
  writtenShows: z.lazy(() => ShowUncheckedUpdateManyWithoutWritersNestedInputSchema).optional()
}).strict();

export const CelebrityUpsertWithWhereUniqueWithoutWrittenShowsInputSchema: z.ZodType<Prisma.CelebrityUpsertWithWhereUniqueWithoutWrittenShowsInput> = z.object({
  where: z.lazy(() => CelebrityWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CelebrityUpdateWithoutWrittenShowsInputSchema),z.lazy(() => CelebrityUncheckedUpdateWithoutWrittenShowsInputSchema) ]),
  create: z.union([ z.lazy(() => CelebrityCreateWithoutWrittenShowsInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutWrittenShowsInputSchema) ]),
}).strict();

export const CelebrityUpdateWithWhereUniqueWithoutWrittenShowsInputSchema: z.ZodType<Prisma.CelebrityUpdateWithWhereUniqueWithoutWrittenShowsInput> = z.object({
  where: z.lazy(() => CelebrityWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CelebrityUpdateWithoutWrittenShowsInputSchema),z.lazy(() => CelebrityUncheckedUpdateWithoutWrittenShowsInputSchema) ]),
}).strict();

export const CelebrityUpdateManyWithWhereWithoutWrittenShowsInputSchema: z.ZodType<Prisma.CelebrityUpdateManyWithWhereWithoutWrittenShowsInput> = z.object({
  where: z.lazy(() => CelebrityScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CelebrityUpdateManyMutationInputSchema),z.lazy(() => CelebrityUncheckedUpdateManyWithoutWrittenShowsInputSchema) ]),
}).strict();

export const CelebrityUpsertWithWhereUniqueWithoutStarredShowsInputSchema: z.ZodType<Prisma.CelebrityUpsertWithWhereUniqueWithoutStarredShowsInput> = z.object({
  where: z.lazy(() => CelebrityWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CelebrityUpdateWithoutStarredShowsInputSchema),z.lazy(() => CelebrityUncheckedUpdateWithoutStarredShowsInputSchema) ]),
  create: z.union([ z.lazy(() => CelebrityCreateWithoutStarredShowsInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutStarredShowsInputSchema) ]),
}).strict();

export const CelebrityUpdateWithWhereUniqueWithoutStarredShowsInputSchema: z.ZodType<Prisma.CelebrityUpdateWithWhereUniqueWithoutStarredShowsInput> = z.object({
  where: z.lazy(() => CelebrityWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CelebrityUpdateWithoutStarredShowsInputSchema),z.lazy(() => CelebrityUncheckedUpdateWithoutStarredShowsInputSchema) ]),
}).strict();

export const CelebrityUpdateManyWithWhereWithoutStarredShowsInputSchema: z.ZodType<Prisma.CelebrityUpdateManyWithWhereWithoutStarredShowsInput> = z.object({
  where: z.lazy(() => CelebrityScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CelebrityUpdateManyMutationInputSchema),z.lazy(() => CelebrityUncheckedUpdateManyWithoutStarredShowsInputSchema) ]),
}).strict();

export const ReviewUpsertWithWhereUniqueWithoutShowInputSchema: z.ZodType<Prisma.ReviewUpsertWithWhereUniqueWithoutShowInput> = z.object({
  where: z.lazy(() => ReviewWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ReviewUpdateWithoutShowInputSchema),z.lazy(() => ReviewUncheckedUpdateWithoutShowInputSchema) ]),
  create: z.union([ z.lazy(() => ReviewCreateWithoutShowInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutShowInputSchema) ]),
}).strict();

export const ReviewUpdateWithWhereUniqueWithoutShowInputSchema: z.ZodType<Prisma.ReviewUpdateWithWhereUniqueWithoutShowInput> = z.object({
  where: z.lazy(() => ReviewWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ReviewUpdateWithoutShowInputSchema),z.lazy(() => ReviewUncheckedUpdateWithoutShowInputSchema) ]),
}).strict();

export const ReviewUpdateManyWithWhereWithoutShowInputSchema: z.ZodType<Prisma.ReviewUpdateManyWithWhereWithoutShowInput> = z.object({
  where: z.lazy(() => ReviewScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ReviewUpdateManyMutationInputSchema),z.lazy(() => ReviewUncheckedUpdateManyWithoutShowInputSchema) ]),
}).strict();

export const MovieCreateWithoutReviewInputSchema: z.ZodType<Prisma.MovieCreateWithoutReviewInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  genres: z.lazy(() => GenreCreateNestedManyWithoutMoviesInputSchema).optional(),
  director: z.lazy(() => CelebrityCreateNestedOneWithoutDirectedMoviesInputSchema).optional(),
  writers: z.lazy(() => CelebrityCreateNestedManyWithoutWrittenMoviesInputSchema).optional(),
  starring: z.lazy(() => CelebrityCreateNestedManyWithoutStarredMoviesInputSchema).optional()
}).strict();

export const MovieUncheckedCreateWithoutReviewInputSchema: z.ZodType<Prisma.MovieUncheckedCreateWithoutReviewInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  directorId: z.string().optional().nullable(),
  genres: z.lazy(() => GenreUncheckedCreateNestedManyWithoutMoviesInputSchema).optional(),
  writers: z.lazy(() => CelebrityUncheckedCreateNestedManyWithoutWrittenMoviesInputSchema).optional(),
  starring: z.lazy(() => CelebrityUncheckedCreateNestedManyWithoutStarredMoviesInputSchema).optional()
}).strict();

export const MovieCreateOrConnectWithoutReviewInputSchema: z.ZodType<Prisma.MovieCreateOrConnectWithoutReviewInput> = z.object({
  where: z.lazy(() => MovieWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MovieCreateWithoutReviewInputSchema),z.lazy(() => MovieUncheckedCreateWithoutReviewInputSchema) ]),
}).strict();

export const ShowCreateWithoutReviewInputSchema: z.ZodType<Prisma.ShowCreateWithoutReviewInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  genres: z.lazy(() => GenreCreateNestedManyWithoutShowsInputSchema).optional(),
  director: z.lazy(() => CelebrityCreateNestedOneWithoutDirectedShowsInputSchema).optional(),
  writers: z.lazy(() => CelebrityCreateNestedManyWithoutWrittenShowsInputSchema).optional(),
  starring: z.lazy(() => CelebrityCreateNestedManyWithoutStarredShowsInputSchema).optional()
}).strict();

export const ShowUncheckedCreateWithoutReviewInputSchema: z.ZodType<Prisma.ShowUncheckedCreateWithoutReviewInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  directorId: z.string().optional().nullable(),
  genres: z.lazy(() => GenreUncheckedCreateNestedManyWithoutShowsInputSchema).optional(),
  writers: z.lazy(() => CelebrityUncheckedCreateNestedManyWithoutWrittenShowsInputSchema).optional(),
  starring: z.lazy(() => CelebrityUncheckedCreateNestedManyWithoutStarredShowsInputSchema).optional()
}).strict();

export const ShowCreateOrConnectWithoutReviewInputSchema: z.ZodType<Prisma.ShowCreateOrConnectWithoutReviewInput> = z.object({
  where: z.lazy(() => ShowWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ShowCreateWithoutReviewInputSchema),z.lazy(() => ShowUncheckedCreateWithoutReviewInputSchema) ]),
}).strict();

export const UserCreateWithoutReviewInputSchema: z.ZodType<Prisma.UserCreateWithoutReviewInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict();

export const UserUncheckedCreateWithoutReviewInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutReviewInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict();

export const UserCreateOrConnectWithoutReviewInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutReviewInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutReviewInputSchema),z.lazy(() => UserUncheckedCreateWithoutReviewInputSchema) ]),
}).strict();

export const MovieUpsertWithoutReviewInputSchema: z.ZodType<Prisma.MovieUpsertWithoutReviewInput> = z.object({
  update: z.union([ z.lazy(() => MovieUpdateWithoutReviewInputSchema),z.lazy(() => MovieUncheckedUpdateWithoutReviewInputSchema) ]),
  create: z.union([ z.lazy(() => MovieCreateWithoutReviewInputSchema),z.lazy(() => MovieUncheckedCreateWithoutReviewInputSchema) ]),
  where: z.lazy(() => MovieWhereInputSchema).optional()
}).strict();

export const MovieUpdateToOneWithWhereWithoutReviewInputSchema: z.ZodType<Prisma.MovieUpdateToOneWithWhereWithoutReviewInput> = z.object({
  where: z.lazy(() => MovieWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => MovieUpdateWithoutReviewInputSchema),z.lazy(() => MovieUncheckedUpdateWithoutReviewInputSchema) ]),
}).strict();

export const MovieUpdateWithoutReviewInputSchema: z.ZodType<Prisma.MovieUpdateWithoutReviewInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genres: z.lazy(() => GenreUpdateManyWithoutMoviesNestedInputSchema).optional(),
  director: z.lazy(() => CelebrityUpdateOneWithoutDirectedMoviesNestedInputSchema).optional(),
  writers: z.lazy(() => CelebrityUpdateManyWithoutWrittenMoviesNestedInputSchema).optional(),
  starring: z.lazy(() => CelebrityUpdateManyWithoutStarredMoviesNestedInputSchema).optional()
}).strict();

export const MovieUncheckedUpdateWithoutReviewInputSchema: z.ZodType<Prisma.MovieUncheckedUpdateWithoutReviewInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  directorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genres: z.lazy(() => GenreUncheckedUpdateManyWithoutMoviesNestedInputSchema).optional(),
  writers: z.lazy(() => CelebrityUncheckedUpdateManyWithoutWrittenMoviesNestedInputSchema).optional(),
  starring: z.lazy(() => CelebrityUncheckedUpdateManyWithoutStarredMoviesNestedInputSchema).optional()
}).strict();

export const ShowUpsertWithoutReviewInputSchema: z.ZodType<Prisma.ShowUpsertWithoutReviewInput> = z.object({
  update: z.union([ z.lazy(() => ShowUpdateWithoutReviewInputSchema),z.lazy(() => ShowUncheckedUpdateWithoutReviewInputSchema) ]),
  create: z.union([ z.lazy(() => ShowCreateWithoutReviewInputSchema),z.lazy(() => ShowUncheckedCreateWithoutReviewInputSchema) ]),
  where: z.lazy(() => ShowWhereInputSchema).optional()
}).strict();

export const ShowUpdateToOneWithWhereWithoutReviewInputSchema: z.ZodType<Prisma.ShowUpdateToOneWithWhereWithoutReviewInput> = z.object({
  where: z.lazy(() => ShowWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ShowUpdateWithoutReviewInputSchema),z.lazy(() => ShowUncheckedUpdateWithoutReviewInputSchema) ]),
}).strict();

export const ShowUpdateWithoutReviewInputSchema: z.ZodType<Prisma.ShowUpdateWithoutReviewInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genres: z.lazy(() => GenreUpdateManyWithoutShowsNestedInputSchema).optional(),
  director: z.lazy(() => CelebrityUpdateOneWithoutDirectedShowsNestedInputSchema).optional(),
  writers: z.lazy(() => CelebrityUpdateManyWithoutWrittenShowsNestedInputSchema).optional(),
  starring: z.lazy(() => CelebrityUpdateManyWithoutStarredShowsNestedInputSchema).optional()
}).strict();

export const ShowUncheckedUpdateWithoutReviewInputSchema: z.ZodType<Prisma.ShowUncheckedUpdateWithoutReviewInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  directorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genres: z.lazy(() => GenreUncheckedUpdateManyWithoutShowsNestedInputSchema).optional(),
  writers: z.lazy(() => CelebrityUncheckedUpdateManyWithoutWrittenShowsNestedInputSchema).optional(),
  starring: z.lazy(() => CelebrityUncheckedUpdateManyWithoutStarredShowsNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutReviewInputSchema: z.ZodType<Prisma.UserUpsertWithoutReviewInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutReviewInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReviewInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutReviewInputSchema),z.lazy(() => UserUncheckedCreateWithoutReviewInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutReviewInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutReviewInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutReviewInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReviewInputSchema) ]),
}).strict();

export const UserUpdateWithoutReviewInputSchema: z.ZodType<Prisma.UserUpdateWithoutReviewInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserUncheckedUpdateWithoutReviewInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutReviewInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const MovieCreateWithoutGenresInputSchema: z.ZodType<Prisma.MovieCreateWithoutGenresInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  director: z.lazy(() => CelebrityCreateNestedOneWithoutDirectedMoviesInputSchema).optional(),
  writers: z.lazy(() => CelebrityCreateNestedManyWithoutWrittenMoviesInputSchema).optional(),
  starring: z.lazy(() => CelebrityCreateNestedManyWithoutStarredMoviesInputSchema).optional(),
  Review: z.lazy(() => ReviewCreateNestedManyWithoutMovieInputSchema).optional()
}).strict();

export const MovieUncheckedCreateWithoutGenresInputSchema: z.ZodType<Prisma.MovieUncheckedCreateWithoutGenresInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  directorId: z.string().optional().nullable(),
  writers: z.lazy(() => CelebrityUncheckedCreateNestedManyWithoutWrittenMoviesInputSchema).optional(),
  starring: z.lazy(() => CelebrityUncheckedCreateNestedManyWithoutStarredMoviesInputSchema).optional(),
  Review: z.lazy(() => ReviewUncheckedCreateNestedManyWithoutMovieInputSchema).optional()
}).strict();

export const MovieCreateOrConnectWithoutGenresInputSchema: z.ZodType<Prisma.MovieCreateOrConnectWithoutGenresInput> = z.object({
  where: z.lazy(() => MovieWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MovieCreateWithoutGenresInputSchema),z.lazy(() => MovieUncheckedCreateWithoutGenresInputSchema) ]),
}).strict();

export const ShowCreateWithoutGenresInputSchema: z.ZodType<Prisma.ShowCreateWithoutGenresInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  director: z.lazy(() => CelebrityCreateNestedOneWithoutDirectedShowsInputSchema).optional(),
  writers: z.lazy(() => CelebrityCreateNestedManyWithoutWrittenShowsInputSchema).optional(),
  starring: z.lazy(() => CelebrityCreateNestedManyWithoutStarredShowsInputSchema).optional(),
  Review: z.lazy(() => ReviewCreateNestedManyWithoutShowInputSchema).optional()
}).strict();

export const ShowUncheckedCreateWithoutGenresInputSchema: z.ZodType<Prisma.ShowUncheckedCreateWithoutGenresInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  directorId: z.string().optional().nullable(),
  writers: z.lazy(() => CelebrityUncheckedCreateNestedManyWithoutWrittenShowsInputSchema).optional(),
  starring: z.lazy(() => CelebrityUncheckedCreateNestedManyWithoutStarredShowsInputSchema).optional(),
  Review: z.lazy(() => ReviewUncheckedCreateNestedManyWithoutShowInputSchema).optional()
}).strict();

export const ShowCreateOrConnectWithoutGenresInputSchema: z.ZodType<Prisma.ShowCreateOrConnectWithoutGenresInput> = z.object({
  where: z.lazy(() => ShowWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ShowCreateWithoutGenresInputSchema),z.lazy(() => ShowUncheckedCreateWithoutGenresInputSchema) ]),
}).strict();

export const MovieUpsertWithWhereUniqueWithoutGenresInputSchema: z.ZodType<Prisma.MovieUpsertWithWhereUniqueWithoutGenresInput> = z.object({
  where: z.lazy(() => MovieWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MovieUpdateWithoutGenresInputSchema),z.lazy(() => MovieUncheckedUpdateWithoutGenresInputSchema) ]),
  create: z.union([ z.lazy(() => MovieCreateWithoutGenresInputSchema),z.lazy(() => MovieUncheckedCreateWithoutGenresInputSchema) ]),
}).strict();

export const MovieUpdateWithWhereUniqueWithoutGenresInputSchema: z.ZodType<Prisma.MovieUpdateWithWhereUniqueWithoutGenresInput> = z.object({
  where: z.lazy(() => MovieWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MovieUpdateWithoutGenresInputSchema),z.lazy(() => MovieUncheckedUpdateWithoutGenresInputSchema) ]),
}).strict();

export const MovieUpdateManyWithWhereWithoutGenresInputSchema: z.ZodType<Prisma.MovieUpdateManyWithWhereWithoutGenresInput> = z.object({
  where: z.lazy(() => MovieScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MovieUpdateManyMutationInputSchema),z.lazy(() => MovieUncheckedUpdateManyWithoutGenresInputSchema) ]),
}).strict();

export const ShowUpsertWithWhereUniqueWithoutGenresInputSchema: z.ZodType<Prisma.ShowUpsertWithWhereUniqueWithoutGenresInput> = z.object({
  where: z.lazy(() => ShowWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ShowUpdateWithoutGenresInputSchema),z.lazy(() => ShowUncheckedUpdateWithoutGenresInputSchema) ]),
  create: z.union([ z.lazy(() => ShowCreateWithoutGenresInputSchema),z.lazy(() => ShowUncheckedCreateWithoutGenresInputSchema) ]),
}).strict();

export const ShowUpdateWithWhereUniqueWithoutGenresInputSchema: z.ZodType<Prisma.ShowUpdateWithWhereUniqueWithoutGenresInput> = z.object({
  where: z.lazy(() => ShowWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ShowUpdateWithoutGenresInputSchema),z.lazy(() => ShowUncheckedUpdateWithoutGenresInputSchema) ]),
}).strict();

export const ShowUpdateManyWithWhereWithoutGenresInputSchema: z.ZodType<Prisma.ShowUpdateManyWithWhereWithoutGenresInput> = z.object({
  where: z.lazy(() => ShowScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ShowUpdateManyMutationInputSchema),z.lazy(() => ShowUncheckedUpdateManyWithoutGenresInputSchema) ]),
}).strict();

export const ReviewCreateManyUserInputSchema: z.ZodType<Prisma.ReviewCreateManyUserInput> = z.object({
  id: z.string().optional(),
  rating: z.number(),
  comment: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  movieId: z.string(),
  showId: z.string()
}).strict();

export const ReviewUpdateWithoutUserInputSchema: z.ZodType<Prisma.ReviewUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  movie: z.lazy(() => MovieUpdateOneRequiredWithoutReviewNestedInputSchema).optional(),
  show: z.lazy(() => ShowUpdateOneRequiredWithoutReviewNestedInputSchema).optional()
}).strict();

export const ReviewUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  movieId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  showId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReviewUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  movieId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  showId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MovieCreateManyDirectorInputSchema: z.ZodType<Prisma.MovieCreateManyDirectorInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict();

export const ShowCreateManyDirectorInputSchema: z.ZodType<Prisma.ShowCreateManyDirectorInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict();

export const MovieUpdateWithoutDirectorInputSchema: z.ZodType<Prisma.MovieUpdateWithoutDirectorInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genres: z.lazy(() => GenreUpdateManyWithoutMoviesNestedInputSchema).optional(),
  writers: z.lazy(() => CelebrityUpdateManyWithoutWrittenMoviesNestedInputSchema).optional(),
  starring: z.lazy(() => CelebrityUpdateManyWithoutStarredMoviesNestedInputSchema).optional(),
  Review: z.lazy(() => ReviewUpdateManyWithoutMovieNestedInputSchema).optional()
}).strict();

export const MovieUncheckedUpdateWithoutDirectorInputSchema: z.ZodType<Prisma.MovieUncheckedUpdateWithoutDirectorInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genres: z.lazy(() => GenreUncheckedUpdateManyWithoutMoviesNestedInputSchema).optional(),
  writers: z.lazy(() => CelebrityUncheckedUpdateManyWithoutWrittenMoviesNestedInputSchema).optional(),
  starring: z.lazy(() => CelebrityUncheckedUpdateManyWithoutStarredMoviesNestedInputSchema).optional(),
  Review: z.lazy(() => ReviewUncheckedUpdateManyWithoutMovieNestedInputSchema).optional()
}).strict();

export const MovieUncheckedUpdateManyWithoutDirectorInputSchema: z.ZodType<Prisma.MovieUncheckedUpdateManyWithoutDirectorInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const MovieUpdateWithoutWritersInputSchema: z.ZodType<Prisma.MovieUpdateWithoutWritersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genres: z.lazy(() => GenreUpdateManyWithoutMoviesNestedInputSchema).optional(),
  director: z.lazy(() => CelebrityUpdateOneWithoutDirectedMoviesNestedInputSchema).optional(),
  starring: z.lazy(() => CelebrityUpdateManyWithoutStarredMoviesNestedInputSchema).optional(),
  Review: z.lazy(() => ReviewUpdateManyWithoutMovieNestedInputSchema).optional()
}).strict();

export const MovieUncheckedUpdateWithoutWritersInputSchema: z.ZodType<Prisma.MovieUncheckedUpdateWithoutWritersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  directorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genres: z.lazy(() => GenreUncheckedUpdateManyWithoutMoviesNestedInputSchema).optional(),
  starring: z.lazy(() => CelebrityUncheckedUpdateManyWithoutStarredMoviesNestedInputSchema).optional(),
  Review: z.lazy(() => ReviewUncheckedUpdateManyWithoutMovieNestedInputSchema).optional()
}).strict();

export const MovieUncheckedUpdateManyWithoutWritersInputSchema: z.ZodType<Prisma.MovieUncheckedUpdateManyWithoutWritersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  directorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const MovieUpdateWithoutStarringInputSchema: z.ZodType<Prisma.MovieUpdateWithoutStarringInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genres: z.lazy(() => GenreUpdateManyWithoutMoviesNestedInputSchema).optional(),
  director: z.lazy(() => CelebrityUpdateOneWithoutDirectedMoviesNestedInputSchema).optional(),
  writers: z.lazy(() => CelebrityUpdateManyWithoutWrittenMoviesNestedInputSchema).optional(),
  Review: z.lazy(() => ReviewUpdateManyWithoutMovieNestedInputSchema).optional()
}).strict();

export const MovieUncheckedUpdateWithoutStarringInputSchema: z.ZodType<Prisma.MovieUncheckedUpdateWithoutStarringInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  directorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genres: z.lazy(() => GenreUncheckedUpdateManyWithoutMoviesNestedInputSchema).optional(),
  writers: z.lazy(() => CelebrityUncheckedUpdateManyWithoutWrittenMoviesNestedInputSchema).optional(),
  Review: z.lazy(() => ReviewUncheckedUpdateManyWithoutMovieNestedInputSchema).optional()
}).strict();

export const MovieUncheckedUpdateManyWithoutStarringInputSchema: z.ZodType<Prisma.MovieUncheckedUpdateManyWithoutStarringInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  directorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ShowUpdateWithoutStarringInputSchema: z.ZodType<Prisma.ShowUpdateWithoutStarringInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genres: z.lazy(() => GenreUpdateManyWithoutShowsNestedInputSchema).optional(),
  director: z.lazy(() => CelebrityUpdateOneWithoutDirectedShowsNestedInputSchema).optional(),
  writers: z.lazy(() => CelebrityUpdateManyWithoutWrittenShowsNestedInputSchema).optional(),
  Review: z.lazy(() => ReviewUpdateManyWithoutShowNestedInputSchema).optional()
}).strict();

export const ShowUncheckedUpdateWithoutStarringInputSchema: z.ZodType<Prisma.ShowUncheckedUpdateWithoutStarringInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  directorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genres: z.lazy(() => GenreUncheckedUpdateManyWithoutShowsNestedInputSchema).optional(),
  writers: z.lazy(() => CelebrityUncheckedUpdateManyWithoutWrittenShowsNestedInputSchema).optional(),
  Review: z.lazy(() => ReviewUncheckedUpdateManyWithoutShowNestedInputSchema).optional()
}).strict();

export const ShowUncheckedUpdateManyWithoutStarringInputSchema: z.ZodType<Prisma.ShowUncheckedUpdateManyWithoutStarringInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  directorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ShowUpdateWithoutWritersInputSchema: z.ZodType<Prisma.ShowUpdateWithoutWritersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genres: z.lazy(() => GenreUpdateManyWithoutShowsNestedInputSchema).optional(),
  director: z.lazy(() => CelebrityUpdateOneWithoutDirectedShowsNestedInputSchema).optional(),
  starring: z.lazy(() => CelebrityUpdateManyWithoutStarredShowsNestedInputSchema).optional(),
  Review: z.lazy(() => ReviewUpdateManyWithoutShowNestedInputSchema).optional()
}).strict();

export const ShowUncheckedUpdateWithoutWritersInputSchema: z.ZodType<Prisma.ShowUncheckedUpdateWithoutWritersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  directorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genres: z.lazy(() => GenreUncheckedUpdateManyWithoutShowsNestedInputSchema).optional(),
  starring: z.lazy(() => CelebrityUncheckedUpdateManyWithoutStarredShowsNestedInputSchema).optional(),
  Review: z.lazy(() => ReviewUncheckedUpdateManyWithoutShowNestedInputSchema).optional()
}).strict();

export const ShowUncheckedUpdateManyWithoutWritersInputSchema: z.ZodType<Prisma.ShowUncheckedUpdateManyWithoutWritersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  directorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ShowUpdateWithoutDirectorInputSchema: z.ZodType<Prisma.ShowUpdateWithoutDirectorInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genres: z.lazy(() => GenreUpdateManyWithoutShowsNestedInputSchema).optional(),
  writers: z.lazy(() => CelebrityUpdateManyWithoutWrittenShowsNestedInputSchema).optional(),
  starring: z.lazy(() => CelebrityUpdateManyWithoutStarredShowsNestedInputSchema).optional(),
  Review: z.lazy(() => ReviewUpdateManyWithoutShowNestedInputSchema).optional()
}).strict();

export const ShowUncheckedUpdateWithoutDirectorInputSchema: z.ZodType<Prisma.ShowUncheckedUpdateWithoutDirectorInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genres: z.lazy(() => GenreUncheckedUpdateManyWithoutShowsNestedInputSchema).optional(),
  writers: z.lazy(() => CelebrityUncheckedUpdateManyWithoutWrittenShowsNestedInputSchema).optional(),
  starring: z.lazy(() => CelebrityUncheckedUpdateManyWithoutStarredShowsNestedInputSchema).optional(),
  Review: z.lazy(() => ReviewUncheckedUpdateManyWithoutShowNestedInputSchema).optional()
}).strict();

export const ShowUncheckedUpdateManyWithoutDirectorInputSchema: z.ZodType<Prisma.ShowUncheckedUpdateManyWithoutDirectorInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ReviewCreateManyMovieInputSchema: z.ZodType<Prisma.ReviewCreateManyMovieInput> = z.object({
  id: z.string().optional(),
  rating: z.number(),
  comment: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  showId: z.string(),
  userId: z.string()
}).strict();

export const GenreUpdateWithoutMoviesInputSchema: z.ZodType<Prisma.GenreUpdateWithoutMoviesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  shows: z.lazy(() => ShowUpdateManyWithoutGenresNestedInputSchema).optional()
}).strict();

export const GenreUncheckedUpdateWithoutMoviesInputSchema: z.ZodType<Prisma.GenreUncheckedUpdateWithoutMoviesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  shows: z.lazy(() => ShowUncheckedUpdateManyWithoutGenresNestedInputSchema).optional()
}).strict();

export const GenreUncheckedUpdateManyWithoutMoviesInputSchema: z.ZodType<Prisma.GenreUncheckedUpdateManyWithoutMoviesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CelebrityUpdateWithoutWrittenMoviesInputSchema: z.ZodType<Prisma.CelebrityUpdateWithoutWrittenMoviesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  directedMovies: z.lazy(() => MovieUpdateManyWithoutDirectorNestedInputSchema).optional(),
  starredMovies: z.lazy(() => MovieUpdateManyWithoutStarringNestedInputSchema).optional(),
  starredShows: z.lazy(() => ShowUpdateManyWithoutStarringNestedInputSchema).optional(),
  writtenShows: z.lazy(() => ShowUpdateManyWithoutWritersNestedInputSchema).optional(),
  directedShows: z.lazy(() => ShowUpdateManyWithoutDirectorNestedInputSchema).optional()
}).strict();

export const CelebrityUncheckedUpdateWithoutWrittenMoviesInputSchema: z.ZodType<Prisma.CelebrityUncheckedUpdateWithoutWrittenMoviesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  directedMovies: z.lazy(() => MovieUncheckedUpdateManyWithoutDirectorNestedInputSchema).optional(),
  starredMovies: z.lazy(() => MovieUncheckedUpdateManyWithoutStarringNestedInputSchema).optional(),
  starredShows: z.lazy(() => ShowUncheckedUpdateManyWithoutStarringNestedInputSchema).optional(),
  writtenShows: z.lazy(() => ShowUncheckedUpdateManyWithoutWritersNestedInputSchema).optional(),
  directedShows: z.lazy(() => ShowUncheckedUpdateManyWithoutDirectorNestedInputSchema).optional()
}).strict();

export const CelebrityUncheckedUpdateManyWithoutWrittenMoviesInputSchema: z.ZodType<Prisma.CelebrityUncheckedUpdateManyWithoutWrittenMoviesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CelebrityUpdateWithoutStarredMoviesInputSchema: z.ZodType<Prisma.CelebrityUpdateWithoutStarredMoviesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  directedMovies: z.lazy(() => MovieUpdateManyWithoutDirectorNestedInputSchema).optional(),
  writtenMovies: z.lazy(() => MovieUpdateManyWithoutWritersNestedInputSchema).optional(),
  starredShows: z.lazy(() => ShowUpdateManyWithoutStarringNestedInputSchema).optional(),
  writtenShows: z.lazy(() => ShowUpdateManyWithoutWritersNestedInputSchema).optional(),
  directedShows: z.lazy(() => ShowUpdateManyWithoutDirectorNestedInputSchema).optional()
}).strict();

export const CelebrityUncheckedUpdateWithoutStarredMoviesInputSchema: z.ZodType<Prisma.CelebrityUncheckedUpdateWithoutStarredMoviesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  directedMovies: z.lazy(() => MovieUncheckedUpdateManyWithoutDirectorNestedInputSchema).optional(),
  writtenMovies: z.lazy(() => MovieUncheckedUpdateManyWithoutWritersNestedInputSchema).optional(),
  starredShows: z.lazy(() => ShowUncheckedUpdateManyWithoutStarringNestedInputSchema).optional(),
  writtenShows: z.lazy(() => ShowUncheckedUpdateManyWithoutWritersNestedInputSchema).optional(),
  directedShows: z.lazy(() => ShowUncheckedUpdateManyWithoutDirectorNestedInputSchema).optional()
}).strict();

export const CelebrityUncheckedUpdateManyWithoutStarredMoviesInputSchema: z.ZodType<Prisma.CelebrityUncheckedUpdateManyWithoutStarredMoviesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ReviewUpdateWithoutMovieInputSchema: z.ZodType<Prisma.ReviewUpdateWithoutMovieInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  show: z.lazy(() => ShowUpdateOneRequiredWithoutReviewNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutReviewNestedInputSchema).optional()
}).strict();

export const ReviewUncheckedUpdateWithoutMovieInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateWithoutMovieInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  showId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReviewUncheckedUpdateManyWithoutMovieInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateManyWithoutMovieInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  showId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReviewCreateManyShowInputSchema: z.ZodType<Prisma.ReviewCreateManyShowInput> = z.object({
  id: z.string().optional(),
  rating: z.number(),
  comment: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  movieId: z.string(),
  userId: z.string()
}).strict();

export const GenreUpdateWithoutShowsInputSchema: z.ZodType<Prisma.GenreUpdateWithoutShowsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  movies: z.lazy(() => MovieUpdateManyWithoutGenresNestedInputSchema).optional()
}).strict();

export const GenreUncheckedUpdateWithoutShowsInputSchema: z.ZodType<Prisma.GenreUncheckedUpdateWithoutShowsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  movies: z.lazy(() => MovieUncheckedUpdateManyWithoutGenresNestedInputSchema).optional()
}).strict();

export const GenreUncheckedUpdateManyWithoutShowsInputSchema: z.ZodType<Prisma.GenreUncheckedUpdateManyWithoutShowsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CelebrityUpdateWithoutWrittenShowsInputSchema: z.ZodType<Prisma.CelebrityUpdateWithoutWrittenShowsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  directedMovies: z.lazy(() => MovieUpdateManyWithoutDirectorNestedInputSchema).optional(),
  writtenMovies: z.lazy(() => MovieUpdateManyWithoutWritersNestedInputSchema).optional(),
  starredMovies: z.lazy(() => MovieUpdateManyWithoutStarringNestedInputSchema).optional(),
  starredShows: z.lazy(() => ShowUpdateManyWithoutStarringNestedInputSchema).optional(),
  directedShows: z.lazy(() => ShowUpdateManyWithoutDirectorNestedInputSchema).optional()
}).strict();

export const CelebrityUncheckedUpdateWithoutWrittenShowsInputSchema: z.ZodType<Prisma.CelebrityUncheckedUpdateWithoutWrittenShowsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  directedMovies: z.lazy(() => MovieUncheckedUpdateManyWithoutDirectorNestedInputSchema).optional(),
  writtenMovies: z.lazy(() => MovieUncheckedUpdateManyWithoutWritersNestedInputSchema).optional(),
  starredMovies: z.lazy(() => MovieUncheckedUpdateManyWithoutStarringNestedInputSchema).optional(),
  starredShows: z.lazy(() => ShowUncheckedUpdateManyWithoutStarringNestedInputSchema).optional(),
  directedShows: z.lazy(() => ShowUncheckedUpdateManyWithoutDirectorNestedInputSchema).optional()
}).strict();

export const CelebrityUncheckedUpdateManyWithoutWrittenShowsInputSchema: z.ZodType<Prisma.CelebrityUncheckedUpdateManyWithoutWrittenShowsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CelebrityUpdateWithoutStarredShowsInputSchema: z.ZodType<Prisma.CelebrityUpdateWithoutStarredShowsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  directedMovies: z.lazy(() => MovieUpdateManyWithoutDirectorNestedInputSchema).optional(),
  writtenMovies: z.lazy(() => MovieUpdateManyWithoutWritersNestedInputSchema).optional(),
  starredMovies: z.lazy(() => MovieUpdateManyWithoutStarringNestedInputSchema).optional(),
  writtenShows: z.lazy(() => ShowUpdateManyWithoutWritersNestedInputSchema).optional(),
  directedShows: z.lazy(() => ShowUpdateManyWithoutDirectorNestedInputSchema).optional()
}).strict();

export const CelebrityUncheckedUpdateWithoutStarredShowsInputSchema: z.ZodType<Prisma.CelebrityUncheckedUpdateWithoutStarredShowsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  directedMovies: z.lazy(() => MovieUncheckedUpdateManyWithoutDirectorNestedInputSchema).optional(),
  writtenMovies: z.lazy(() => MovieUncheckedUpdateManyWithoutWritersNestedInputSchema).optional(),
  starredMovies: z.lazy(() => MovieUncheckedUpdateManyWithoutStarringNestedInputSchema).optional(),
  writtenShows: z.lazy(() => ShowUncheckedUpdateManyWithoutWritersNestedInputSchema).optional(),
  directedShows: z.lazy(() => ShowUncheckedUpdateManyWithoutDirectorNestedInputSchema).optional()
}).strict();

export const CelebrityUncheckedUpdateManyWithoutStarredShowsInputSchema: z.ZodType<Prisma.CelebrityUncheckedUpdateManyWithoutStarredShowsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ReviewUpdateWithoutShowInputSchema: z.ZodType<Prisma.ReviewUpdateWithoutShowInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  movie: z.lazy(() => MovieUpdateOneRequiredWithoutReviewNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutReviewNestedInputSchema).optional()
}).strict();

export const ReviewUncheckedUpdateWithoutShowInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateWithoutShowInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  movieId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReviewUncheckedUpdateManyWithoutShowInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateManyWithoutShowInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  movieId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MovieUpdateWithoutGenresInputSchema: z.ZodType<Prisma.MovieUpdateWithoutGenresInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  director: z.lazy(() => CelebrityUpdateOneWithoutDirectedMoviesNestedInputSchema).optional(),
  writers: z.lazy(() => CelebrityUpdateManyWithoutWrittenMoviesNestedInputSchema).optional(),
  starring: z.lazy(() => CelebrityUpdateManyWithoutStarredMoviesNestedInputSchema).optional(),
  Review: z.lazy(() => ReviewUpdateManyWithoutMovieNestedInputSchema).optional()
}).strict();

export const MovieUncheckedUpdateWithoutGenresInputSchema: z.ZodType<Prisma.MovieUncheckedUpdateWithoutGenresInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  directorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  writers: z.lazy(() => CelebrityUncheckedUpdateManyWithoutWrittenMoviesNestedInputSchema).optional(),
  starring: z.lazy(() => CelebrityUncheckedUpdateManyWithoutStarredMoviesNestedInputSchema).optional(),
  Review: z.lazy(() => ReviewUncheckedUpdateManyWithoutMovieNestedInputSchema).optional()
}).strict();

export const MovieUncheckedUpdateManyWithoutGenresInputSchema: z.ZodType<Prisma.MovieUncheckedUpdateManyWithoutGenresInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  directorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ShowUpdateWithoutGenresInputSchema: z.ZodType<Prisma.ShowUpdateWithoutGenresInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  director: z.lazy(() => CelebrityUpdateOneWithoutDirectedShowsNestedInputSchema).optional(),
  writers: z.lazy(() => CelebrityUpdateManyWithoutWrittenShowsNestedInputSchema).optional(),
  starring: z.lazy(() => CelebrityUpdateManyWithoutStarredShowsNestedInputSchema).optional(),
  Review: z.lazy(() => ReviewUpdateManyWithoutShowNestedInputSchema).optional()
}).strict();

export const ShowUncheckedUpdateWithoutGenresInputSchema: z.ZodType<Prisma.ShowUncheckedUpdateWithoutGenresInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  directorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  writers: z.lazy(() => CelebrityUncheckedUpdateManyWithoutWrittenShowsNestedInputSchema).optional(),
  starring: z.lazy(() => CelebrityUncheckedUpdateManyWithoutStarredShowsNestedInputSchema).optional(),
  Review: z.lazy(() => ReviewUncheckedUpdateManyWithoutShowNestedInputSchema).optional()
}).strict();

export const ShowUncheckedUpdateManyWithoutGenresInputSchema: z.ZodType<Prisma.ShowUncheckedUpdateManyWithoutGenresInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  directorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const CelebrityFindFirstArgsSchema: z.ZodType<Prisma.CelebrityFindFirstArgs> = z.object({
  select: CelebritySelectSchema.optional(),
  include: CelebrityIncludeSchema.optional(),
  where: CelebrityWhereInputSchema.optional(),
  orderBy: z.union([ CelebrityOrderByWithRelationInputSchema.array(),CelebrityOrderByWithRelationInputSchema ]).optional(),
  cursor: CelebrityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CelebrityScalarFieldEnumSchema,CelebrityScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CelebrityFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CelebrityFindFirstOrThrowArgs> = z.object({
  select: CelebritySelectSchema.optional(),
  include: CelebrityIncludeSchema.optional(),
  where: CelebrityWhereInputSchema.optional(),
  orderBy: z.union([ CelebrityOrderByWithRelationInputSchema.array(),CelebrityOrderByWithRelationInputSchema ]).optional(),
  cursor: CelebrityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CelebrityScalarFieldEnumSchema,CelebrityScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CelebrityFindManyArgsSchema: z.ZodType<Prisma.CelebrityFindManyArgs> = z.object({
  select: CelebritySelectSchema.optional(),
  include: CelebrityIncludeSchema.optional(),
  where: CelebrityWhereInputSchema.optional(),
  orderBy: z.union([ CelebrityOrderByWithRelationInputSchema.array(),CelebrityOrderByWithRelationInputSchema ]).optional(),
  cursor: CelebrityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CelebrityScalarFieldEnumSchema,CelebrityScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CelebrityAggregateArgsSchema: z.ZodType<Prisma.CelebrityAggregateArgs> = z.object({
  where: CelebrityWhereInputSchema.optional(),
  orderBy: z.union([ CelebrityOrderByWithRelationInputSchema.array(),CelebrityOrderByWithRelationInputSchema ]).optional(),
  cursor: CelebrityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CelebrityGroupByArgsSchema: z.ZodType<Prisma.CelebrityGroupByArgs> = z.object({
  where: CelebrityWhereInputSchema.optional(),
  orderBy: z.union([ CelebrityOrderByWithAggregationInputSchema.array(),CelebrityOrderByWithAggregationInputSchema ]).optional(),
  by: CelebrityScalarFieldEnumSchema.array(),
  having: CelebrityScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CelebrityFindUniqueArgsSchema: z.ZodType<Prisma.CelebrityFindUniqueArgs> = z.object({
  select: CelebritySelectSchema.optional(),
  include: CelebrityIncludeSchema.optional(),
  where: CelebrityWhereUniqueInputSchema,
}).strict() ;

export const CelebrityFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CelebrityFindUniqueOrThrowArgs> = z.object({
  select: CelebritySelectSchema.optional(),
  include: CelebrityIncludeSchema.optional(),
  where: CelebrityWhereUniqueInputSchema,
}).strict() ;

export const MovieFindFirstArgsSchema: z.ZodType<Prisma.MovieFindFirstArgs> = z.object({
  select: MovieSelectSchema.optional(),
  include: MovieIncludeSchema.optional(),
  where: MovieWhereInputSchema.optional(),
  orderBy: z.union([ MovieOrderByWithRelationInputSchema.array(),MovieOrderByWithRelationInputSchema ]).optional(),
  cursor: MovieWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MovieScalarFieldEnumSchema,MovieScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MovieFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MovieFindFirstOrThrowArgs> = z.object({
  select: MovieSelectSchema.optional(),
  include: MovieIncludeSchema.optional(),
  where: MovieWhereInputSchema.optional(),
  orderBy: z.union([ MovieOrderByWithRelationInputSchema.array(),MovieOrderByWithRelationInputSchema ]).optional(),
  cursor: MovieWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MovieScalarFieldEnumSchema,MovieScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MovieFindManyArgsSchema: z.ZodType<Prisma.MovieFindManyArgs> = z.object({
  select: MovieSelectSchema.optional(),
  include: MovieIncludeSchema.optional(),
  where: MovieWhereInputSchema.optional(),
  orderBy: z.union([ MovieOrderByWithRelationInputSchema.array(),MovieOrderByWithRelationInputSchema ]).optional(),
  cursor: MovieWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MovieScalarFieldEnumSchema,MovieScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MovieAggregateArgsSchema: z.ZodType<Prisma.MovieAggregateArgs> = z.object({
  where: MovieWhereInputSchema.optional(),
  orderBy: z.union([ MovieOrderByWithRelationInputSchema.array(),MovieOrderByWithRelationInputSchema ]).optional(),
  cursor: MovieWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MovieGroupByArgsSchema: z.ZodType<Prisma.MovieGroupByArgs> = z.object({
  where: MovieWhereInputSchema.optional(),
  orderBy: z.union([ MovieOrderByWithAggregationInputSchema.array(),MovieOrderByWithAggregationInputSchema ]).optional(),
  by: MovieScalarFieldEnumSchema.array(),
  having: MovieScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MovieFindUniqueArgsSchema: z.ZodType<Prisma.MovieFindUniqueArgs> = z.object({
  select: MovieSelectSchema.optional(),
  include: MovieIncludeSchema.optional(),
  where: MovieWhereUniqueInputSchema,
}).strict() ;

export const MovieFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MovieFindUniqueOrThrowArgs> = z.object({
  select: MovieSelectSchema.optional(),
  include: MovieIncludeSchema.optional(),
  where: MovieWhereUniqueInputSchema,
}).strict() ;

export const ShowFindFirstArgsSchema: z.ZodType<Prisma.ShowFindFirstArgs> = z.object({
  select: ShowSelectSchema.optional(),
  include: ShowIncludeSchema.optional(),
  where: ShowWhereInputSchema.optional(),
  orderBy: z.union([ ShowOrderByWithRelationInputSchema.array(),ShowOrderByWithRelationInputSchema ]).optional(),
  cursor: ShowWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ShowScalarFieldEnumSchema,ShowScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ShowFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ShowFindFirstOrThrowArgs> = z.object({
  select: ShowSelectSchema.optional(),
  include: ShowIncludeSchema.optional(),
  where: ShowWhereInputSchema.optional(),
  orderBy: z.union([ ShowOrderByWithRelationInputSchema.array(),ShowOrderByWithRelationInputSchema ]).optional(),
  cursor: ShowWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ShowScalarFieldEnumSchema,ShowScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ShowFindManyArgsSchema: z.ZodType<Prisma.ShowFindManyArgs> = z.object({
  select: ShowSelectSchema.optional(),
  include: ShowIncludeSchema.optional(),
  where: ShowWhereInputSchema.optional(),
  orderBy: z.union([ ShowOrderByWithRelationInputSchema.array(),ShowOrderByWithRelationInputSchema ]).optional(),
  cursor: ShowWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ShowScalarFieldEnumSchema,ShowScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ShowAggregateArgsSchema: z.ZodType<Prisma.ShowAggregateArgs> = z.object({
  where: ShowWhereInputSchema.optional(),
  orderBy: z.union([ ShowOrderByWithRelationInputSchema.array(),ShowOrderByWithRelationInputSchema ]).optional(),
  cursor: ShowWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ShowGroupByArgsSchema: z.ZodType<Prisma.ShowGroupByArgs> = z.object({
  where: ShowWhereInputSchema.optional(),
  orderBy: z.union([ ShowOrderByWithAggregationInputSchema.array(),ShowOrderByWithAggregationInputSchema ]).optional(),
  by: ShowScalarFieldEnumSchema.array(),
  having: ShowScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ShowFindUniqueArgsSchema: z.ZodType<Prisma.ShowFindUniqueArgs> = z.object({
  select: ShowSelectSchema.optional(),
  include: ShowIncludeSchema.optional(),
  where: ShowWhereUniqueInputSchema,
}).strict() ;

export const ShowFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ShowFindUniqueOrThrowArgs> = z.object({
  select: ShowSelectSchema.optional(),
  include: ShowIncludeSchema.optional(),
  where: ShowWhereUniqueInputSchema,
}).strict() ;

export const ReviewFindFirstArgsSchema: z.ZodType<Prisma.ReviewFindFirstArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  include: ReviewIncludeSchema.optional(),
  where: ReviewWhereInputSchema.optional(),
  orderBy: z.union([ ReviewOrderByWithRelationInputSchema.array(),ReviewOrderByWithRelationInputSchema ]).optional(),
  cursor: ReviewWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReviewScalarFieldEnumSchema,ReviewScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReviewFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ReviewFindFirstOrThrowArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  include: ReviewIncludeSchema.optional(),
  where: ReviewWhereInputSchema.optional(),
  orderBy: z.union([ ReviewOrderByWithRelationInputSchema.array(),ReviewOrderByWithRelationInputSchema ]).optional(),
  cursor: ReviewWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReviewScalarFieldEnumSchema,ReviewScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReviewFindManyArgsSchema: z.ZodType<Prisma.ReviewFindManyArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  include: ReviewIncludeSchema.optional(),
  where: ReviewWhereInputSchema.optional(),
  orderBy: z.union([ ReviewOrderByWithRelationInputSchema.array(),ReviewOrderByWithRelationInputSchema ]).optional(),
  cursor: ReviewWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReviewScalarFieldEnumSchema,ReviewScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReviewAggregateArgsSchema: z.ZodType<Prisma.ReviewAggregateArgs> = z.object({
  where: ReviewWhereInputSchema.optional(),
  orderBy: z.union([ ReviewOrderByWithRelationInputSchema.array(),ReviewOrderByWithRelationInputSchema ]).optional(),
  cursor: ReviewWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ReviewGroupByArgsSchema: z.ZodType<Prisma.ReviewGroupByArgs> = z.object({
  where: ReviewWhereInputSchema.optional(),
  orderBy: z.union([ ReviewOrderByWithAggregationInputSchema.array(),ReviewOrderByWithAggregationInputSchema ]).optional(),
  by: ReviewScalarFieldEnumSchema.array(),
  having: ReviewScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ReviewFindUniqueArgsSchema: z.ZodType<Prisma.ReviewFindUniqueArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  include: ReviewIncludeSchema.optional(),
  where: ReviewWhereUniqueInputSchema,
}).strict() ;

export const ReviewFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ReviewFindUniqueOrThrowArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  include: ReviewIncludeSchema.optional(),
  where: ReviewWhereUniqueInputSchema,
}).strict() ;

export const GenreFindFirstArgsSchema: z.ZodType<Prisma.GenreFindFirstArgs> = z.object({
  select: GenreSelectSchema.optional(),
  include: GenreIncludeSchema.optional(),
  where: GenreWhereInputSchema.optional(),
  orderBy: z.union([ GenreOrderByWithRelationInputSchema.array(),GenreOrderByWithRelationInputSchema ]).optional(),
  cursor: GenreWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GenreScalarFieldEnumSchema,GenreScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const GenreFindFirstOrThrowArgsSchema: z.ZodType<Prisma.GenreFindFirstOrThrowArgs> = z.object({
  select: GenreSelectSchema.optional(),
  include: GenreIncludeSchema.optional(),
  where: GenreWhereInputSchema.optional(),
  orderBy: z.union([ GenreOrderByWithRelationInputSchema.array(),GenreOrderByWithRelationInputSchema ]).optional(),
  cursor: GenreWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GenreScalarFieldEnumSchema,GenreScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const GenreFindManyArgsSchema: z.ZodType<Prisma.GenreFindManyArgs> = z.object({
  select: GenreSelectSchema.optional(),
  include: GenreIncludeSchema.optional(),
  where: GenreWhereInputSchema.optional(),
  orderBy: z.union([ GenreOrderByWithRelationInputSchema.array(),GenreOrderByWithRelationInputSchema ]).optional(),
  cursor: GenreWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GenreScalarFieldEnumSchema,GenreScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const GenreAggregateArgsSchema: z.ZodType<Prisma.GenreAggregateArgs> = z.object({
  where: GenreWhereInputSchema.optional(),
  orderBy: z.union([ GenreOrderByWithRelationInputSchema.array(),GenreOrderByWithRelationInputSchema ]).optional(),
  cursor: GenreWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const GenreGroupByArgsSchema: z.ZodType<Prisma.GenreGroupByArgs> = z.object({
  where: GenreWhereInputSchema.optional(),
  orderBy: z.union([ GenreOrderByWithAggregationInputSchema.array(),GenreOrderByWithAggregationInputSchema ]).optional(),
  by: GenreScalarFieldEnumSchema.array(),
  having: GenreScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const GenreFindUniqueArgsSchema: z.ZodType<Prisma.GenreFindUniqueArgs> = z.object({
  select: GenreSelectSchema.optional(),
  include: GenreIncludeSchema.optional(),
  where: GenreWhereUniqueInputSchema,
}).strict() ;

export const GenreFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.GenreFindUniqueOrThrowArgs> = z.object({
  select: GenreSelectSchema.optional(),
  include: GenreIncludeSchema.optional(),
  where: GenreWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const CelebrityCreateArgsSchema: z.ZodType<Prisma.CelebrityCreateArgs> = z.object({
  select: CelebritySelectSchema.optional(),
  include: CelebrityIncludeSchema.optional(),
  data: z.union([ CelebrityCreateInputSchema,CelebrityUncheckedCreateInputSchema ]),
}).strict() ;

export const CelebrityUpsertArgsSchema: z.ZodType<Prisma.CelebrityUpsertArgs> = z.object({
  select: CelebritySelectSchema.optional(),
  include: CelebrityIncludeSchema.optional(),
  where: CelebrityWhereUniqueInputSchema,
  create: z.union([ CelebrityCreateInputSchema,CelebrityUncheckedCreateInputSchema ]),
  update: z.union([ CelebrityUpdateInputSchema,CelebrityUncheckedUpdateInputSchema ]),
}).strict() ;

export const CelebrityCreateManyArgsSchema: z.ZodType<Prisma.CelebrityCreateManyArgs> = z.object({
  data: z.union([ CelebrityCreateManyInputSchema,CelebrityCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CelebrityCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CelebrityCreateManyAndReturnArgs> = z.object({
  data: z.union([ CelebrityCreateManyInputSchema,CelebrityCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CelebrityDeleteArgsSchema: z.ZodType<Prisma.CelebrityDeleteArgs> = z.object({
  select: CelebritySelectSchema.optional(),
  include: CelebrityIncludeSchema.optional(),
  where: CelebrityWhereUniqueInputSchema,
}).strict() ;

export const CelebrityUpdateArgsSchema: z.ZodType<Prisma.CelebrityUpdateArgs> = z.object({
  select: CelebritySelectSchema.optional(),
  include: CelebrityIncludeSchema.optional(),
  data: z.union([ CelebrityUpdateInputSchema,CelebrityUncheckedUpdateInputSchema ]),
  where: CelebrityWhereUniqueInputSchema,
}).strict() ;

export const CelebrityUpdateManyArgsSchema: z.ZodType<Prisma.CelebrityUpdateManyArgs> = z.object({
  data: z.union([ CelebrityUpdateManyMutationInputSchema,CelebrityUncheckedUpdateManyInputSchema ]),
  where: CelebrityWhereInputSchema.optional(),
}).strict() ;

export const CelebrityDeleteManyArgsSchema: z.ZodType<Prisma.CelebrityDeleteManyArgs> = z.object({
  where: CelebrityWhereInputSchema.optional(),
}).strict() ;

export const MovieCreateArgsSchema: z.ZodType<Prisma.MovieCreateArgs> = z.object({
  select: MovieSelectSchema.optional(),
  include: MovieIncludeSchema.optional(),
  data: z.union([ MovieCreateInputSchema,MovieUncheckedCreateInputSchema ]),
}).strict() ;

export const MovieUpsertArgsSchema: z.ZodType<Prisma.MovieUpsertArgs> = z.object({
  select: MovieSelectSchema.optional(),
  include: MovieIncludeSchema.optional(),
  where: MovieWhereUniqueInputSchema,
  create: z.union([ MovieCreateInputSchema,MovieUncheckedCreateInputSchema ]),
  update: z.union([ MovieUpdateInputSchema,MovieUncheckedUpdateInputSchema ]),
}).strict() ;

export const MovieCreateManyArgsSchema: z.ZodType<Prisma.MovieCreateManyArgs> = z.object({
  data: z.union([ MovieCreateManyInputSchema,MovieCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const MovieCreateManyAndReturnArgsSchema: z.ZodType<Prisma.MovieCreateManyAndReturnArgs> = z.object({
  data: z.union([ MovieCreateManyInputSchema,MovieCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const MovieDeleteArgsSchema: z.ZodType<Prisma.MovieDeleteArgs> = z.object({
  select: MovieSelectSchema.optional(),
  include: MovieIncludeSchema.optional(),
  where: MovieWhereUniqueInputSchema,
}).strict() ;

export const MovieUpdateArgsSchema: z.ZodType<Prisma.MovieUpdateArgs> = z.object({
  select: MovieSelectSchema.optional(),
  include: MovieIncludeSchema.optional(),
  data: z.union([ MovieUpdateInputSchema,MovieUncheckedUpdateInputSchema ]),
  where: MovieWhereUniqueInputSchema,
}).strict() ;

export const MovieUpdateManyArgsSchema: z.ZodType<Prisma.MovieUpdateManyArgs> = z.object({
  data: z.union([ MovieUpdateManyMutationInputSchema,MovieUncheckedUpdateManyInputSchema ]),
  where: MovieWhereInputSchema.optional(),
}).strict() ;

export const MovieDeleteManyArgsSchema: z.ZodType<Prisma.MovieDeleteManyArgs> = z.object({
  where: MovieWhereInputSchema.optional(),
}).strict() ;

export const ShowCreateArgsSchema: z.ZodType<Prisma.ShowCreateArgs> = z.object({
  select: ShowSelectSchema.optional(),
  include: ShowIncludeSchema.optional(),
  data: z.union([ ShowCreateInputSchema,ShowUncheckedCreateInputSchema ]),
}).strict() ;

export const ShowUpsertArgsSchema: z.ZodType<Prisma.ShowUpsertArgs> = z.object({
  select: ShowSelectSchema.optional(),
  include: ShowIncludeSchema.optional(),
  where: ShowWhereUniqueInputSchema,
  create: z.union([ ShowCreateInputSchema,ShowUncheckedCreateInputSchema ]),
  update: z.union([ ShowUpdateInputSchema,ShowUncheckedUpdateInputSchema ]),
}).strict() ;

export const ShowCreateManyArgsSchema: z.ZodType<Prisma.ShowCreateManyArgs> = z.object({
  data: z.union([ ShowCreateManyInputSchema,ShowCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ShowCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ShowCreateManyAndReturnArgs> = z.object({
  data: z.union([ ShowCreateManyInputSchema,ShowCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ShowDeleteArgsSchema: z.ZodType<Prisma.ShowDeleteArgs> = z.object({
  select: ShowSelectSchema.optional(),
  include: ShowIncludeSchema.optional(),
  where: ShowWhereUniqueInputSchema,
}).strict() ;

export const ShowUpdateArgsSchema: z.ZodType<Prisma.ShowUpdateArgs> = z.object({
  select: ShowSelectSchema.optional(),
  include: ShowIncludeSchema.optional(),
  data: z.union([ ShowUpdateInputSchema,ShowUncheckedUpdateInputSchema ]),
  where: ShowWhereUniqueInputSchema,
}).strict() ;

export const ShowUpdateManyArgsSchema: z.ZodType<Prisma.ShowUpdateManyArgs> = z.object({
  data: z.union([ ShowUpdateManyMutationInputSchema,ShowUncheckedUpdateManyInputSchema ]),
  where: ShowWhereInputSchema.optional(),
}).strict() ;

export const ShowDeleteManyArgsSchema: z.ZodType<Prisma.ShowDeleteManyArgs> = z.object({
  where: ShowWhereInputSchema.optional(),
}).strict() ;

export const ReviewCreateArgsSchema: z.ZodType<Prisma.ReviewCreateArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  include: ReviewIncludeSchema.optional(),
  data: z.union([ ReviewCreateInputSchema,ReviewUncheckedCreateInputSchema ]),
}).strict() ;

export const ReviewUpsertArgsSchema: z.ZodType<Prisma.ReviewUpsertArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  include: ReviewIncludeSchema.optional(),
  where: ReviewWhereUniqueInputSchema,
  create: z.union([ ReviewCreateInputSchema,ReviewUncheckedCreateInputSchema ]),
  update: z.union([ ReviewUpdateInputSchema,ReviewUncheckedUpdateInputSchema ]),
}).strict() ;

export const ReviewCreateManyArgsSchema: z.ZodType<Prisma.ReviewCreateManyArgs> = z.object({
  data: z.union([ ReviewCreateManyInputSchema,ReviewCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ReviewCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ReviewCreateManyAndReturnArgs> = z.object({
  data: z.union([ ReviewCreateManyInputSchema,ReviewCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ReviewDeleteArgsSchema: z.ZodType<Prisma.ReviewDeleteArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  include: ReviewIncludeSchema.optional(),
  where: ReviewWhereUniqueInputSchema,
}).strict() ;

export const ReviewUpdateArgsSchema: z.ZodType<Prisma.ReviewUpdateArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  include: ReviewIncludeSchema.optional(),
  data: z.union([ ReviewUpdateInputSchema,ReviewUncheckedUpdateInputSchema ]),
  where: ReviewWhereUniqueInputSchema,
}).strict() ;

export const ReviewUpdateManyArgsSchema: z.ZodType<Prisma.ReviewUpdateManyArgs> = z.object({
  data: z.union([ ReviewUpdateManyMutationInputSchema,ReviewUncheckedUpdateManyInputSchema ]),
  where: ReviewWhereInputSchema.optional(),
}).strict() ;

export const ReviewDeleteManyArgsSchema: z.ZodType<Prisma.ReviewDeleteManyArgs> = z.object({
  where: ReviewWhereInputSchema.optional(),
}).strict() ;

export const GenreCreateArgsSchema: z.ZodType<Prisma.GenreCreateArgs> = z.object({
  select: GenreSelectSchema.optional(),
  include: GenreIncludeSchema.optional(),
  data: z.union([ GenreCreateInputSchema,GenreUncheckedCreateInputSchema ]),
}).strict() ;

export const GenreUpsertArgsSchema: z.ZodType<Prisma.GenreUpsertArgs> = z.object({
  select: GenreSelectSchema.optional(),
  include: GenreIncludeSchema.optional(),
  where: GenreWhereUniqueInputSchema,
  create: z.union([ GenreCreateInputSchema,GenreUncheckedCreateInputSchema ]),
  update: z.union([ GenreUpdateInputSchema,GenreUncheckedUpdateInputSchema ]),
}).strict() ;

export const GenreCreateManyArgsSchema: z.ZodType<Prisma.GenreCreateManyArgs> = z.object({
  data: z.union([ GenreCreateManyInputSchema,GenreCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const GenreCreateManyAndReturnArgsSchema: z.ZodType<Prisma.GenreCreateManyAndReturnArgs> = z.object({
  data: z.union([ GenreCreateManyInputSchema,GenreCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const GenreDeleteArgsSchema: z.ZodType<Prisma.GenreDeleteArgs> = z.object({
  select: GenreSelectSchema.optional(),
  include: GenreIncludeSchema.optional(),
  where: GenreWhereUniqueInputSchema,
}).strict() ;

export const GenreUpdateArgsSchema: z.ZodType<Prisma.GenreUpdateArgs> = z.object({
  select: GenreSelectSchema.optional(),
  include: GenreIncludeSchema.optional(),
  data: z.union([ GenreUpdateInputSchema,GenreUncheckedUpdateInputSchema ]),
  where: GenreWhereUniqueInputSchema,
}).strict() ;

export const GenreUpdateManyArgsSchema: z.ZodType<Prisma.GenreUpdateManyArgs> = z.object({
  data: z.union([ GenreUpdateManyMutationInputSchema,GenreUncheckedUpdateManyInputSchema ]),
  where: GenreWhereInputSchema.optional(),
}).strict() ;

export const GenreDeleteManyArgsSchema: z.ZodType<Prisma.GenreDeleteManyArgs> = z.object({
  where: GenreWhereInputSchema.optional(),
}).strict() ;