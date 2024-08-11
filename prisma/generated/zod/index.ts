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

export const UserScalarFieldEnumSchema = z.enum(['id','email','name','realName','password','createdAt','updatedAt']);

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
  realName: z.string().nullable(),
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
  realName: z.boolean().optional(),
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
  realName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  Review: z.lazy(() => ReviewListRelationFilterSchema).optional()
}).strict() as z.ZodType<Prisma.UserWhereInput>;

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  realName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  Review: z.lazy(() => ReviewOrderByRelationAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserOrderByWithRelationInput>;

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
  realName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  Review: z.lazy(() => ReviewListRelationFilterSchema).optional()
}).strict()) as z.ZodType<Prisma.UserWhereUniqueInput>;

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  realName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserOrderByWithAggregationInput>;

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  realName: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.UserScalarWhereWithAggregatesInput>;

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
}).strict() as z.ZodType<Prisma.CelebrityWhereInput>;

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
}).strict() as z.ZodType<Prisma.CelebrityOrderByWithRelationInput>;

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
}).strict()) as z.ZodType<Prisma.CelebrityWhereUniqueInput>;

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
}).strict() as z.ZodType<Prisma.CelebrityOrderByWithAggregationInput>;

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
}).strict() as z.ZodType<Prisma.CelebrityScalarWhereWithAggregatesInput>;

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
}).strict() as z.ZodType<Prisma.MovieWhereInput>;

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
}).strict() as z.ZodType<Prisma.MovieOrderByWithRelationInput>;

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
}).strict()) as z.ZodType<Prisma.MovieWhereUniqueInput>;

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
}).strict() as z.ZodType<Prisma.MovieOrderByWithAggregationInput>;

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
}).strict() as z.ZodType<Prisma.MovieScalarWhereWithAggregatesInput>;

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
}).strict() as z.ZodType<Prisma.ShowWhereInput>;

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
}).strict() as z.ZodType<Prisma.ShowOrderByWithRelationInput>;

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
}).strict()) as z.ZodType<Prisma.ShowWhereUniqueInput>;

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
}).strict() as z.ZodType<Prisma.ShowOrderByWithAggregationInput>;

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
}).strict() as z.ZodType<Prisma.ShowScalarWhereWithAggregatesInput>;

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
}).strict() as z.ZodType<Prisma.ReviewWhereInput>;

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
}).strict() as z.ZodType<Prisma.ReviewOrderByWithRelationInput>;

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
}).strict()) as z.ZodType<Prisma.ReviewWhereUniqueInput>;

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
}).strict() as z.ZodType<Prisma.ReviewOrderByWithAggregationInput>;

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
}).strict() as z.ZodType<Prisma.ReviewScalarWhereWithAggregatesInput>;

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
}).strict() as z.ZodType<Prisma.GenreWhereInput>;

export const GenreOrderByWithRelationInputSchema: z.ZodType<Prisma.GenreOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  movies: z.lazy(() => MovieOrderByRelationAggregateInputSchema).optional(),
  shows: z.lazy(() => ShowOrderByRelationAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.GenreOrderByWithRelationInput>;

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
}).strict()) as z.ZodType<Prisma.GenreWhereUniqueInput>;

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
}).strict() as z.ZodType<Prisma.GenreOrderByWithAggregationInput>;

export const GenreScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.GenreScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => GenreScalarWhereWithAggregatesInputSchema),z.lazy(() => GenreScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => GenreScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GenreScalarWhereWithAggregatesInputSchema),z.lazy(() => GenreScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.GenreScalarWhereWithAggregatesInput>;

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string(),
  realName: z.string().optional().nullable(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  Review: z.lazy(() => ReviewCreateNestedManyWithoutUserInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserCreateInput>;

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string(),
  realName: z.string().optional().nullable(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  Review: z.lazy(() => ReviewUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUncheckedCreateInput>;

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  realName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Review: z.lazy(() => ReviewUpdateManyWithoutUserNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUpdateInput>;

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  realName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Review: z.lazy(() => ReviewUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUncheckedUpdateInput>;

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string(),
  realName: z.string().optional().nullable(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict() as z.ZodType<Prisma.UserCreateManyInput>;

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  realName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.UserUpdateManyMutationInput>;

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  realName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.UserUncheckedUpdateManyInput>;

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
}).strict() as z.ZodType<Prisma.CelebrityCreateInput>;

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
}).strict() as z.ZodType<Prisma.CelebrityUncheckedCreateInput>;

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
}).strict() as z.ZodType<Prisma.CelebrityUpdateInput>;

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
}).strict() as z.ZodType<Prisma.CelebrityUncheckedUpdateInput>;

export const CelebrityCreateManyInputSchema: z.ZodType<Prisma.CelebrityCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  birthDate: z.coerce.date().optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict() as z.ZodType<Prisma.CelebrityCreateManyInput>;

export const CelebrityUpdateManyMutationInputSchema: z.ZodType<Prisma.CelebrityUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.CelebrityUpdateManyMutationInput>;

export const CelebrityUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CelebrityUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.CelebrityUncheckedUpdateManyInput>;

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
}).strict() as z.ZodType<Prisma.MovieCreateInput>;

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
}).strict() as z.ZodType<Prisma.MovieUncheckedCreateInput>;

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
}).strict() as z.ZodType<Prisma.MovieUpdateInput>;

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
}).strict() as z.ZodType<Prisma.MovieUncheckedUpdateInput>;

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
}).strict() as z.ZodType<Prisma.MovieCreateManyInput>;

export const MovieUpdateManyMutationInputSchema: z.ZodType<Prisma.MovieUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.MovieUpdateManyMutationInput>;

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
}).strict() as z.ZodType<Prisma.MovieUncheckedUpdateManyInput>;

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
}).strict() as z.ZodType<Prisma.ShowCreateInput>;

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
}).strict() as z.ZodType<Prisma.ShowUncheckedCreateInput>;

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
}).strict() as z.ZodType<Prisma.ShowUpdateInput>;

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
}).strict() as z.ZodType<Prisma.ShowUncheckedUpdateInput>;

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
}).strict() as z.ZodType<Prisma.ShowCreateManyInput>;

export const ShowUpdateManyMutationInputSchema: z.ZodType<Prisma.ShowUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.ShowUpdateManyMutationInput>;

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
}).strict() as z.ZodType<Prisma.ShowUncheckedUpdateManyInput>;

export const ReviewCreateInputSchema: z.ZodType<Prisma.ReviewCreateInput> = z.object({
  id: z.string().optional(),
  rating: z.number(),
  comment: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  movie: z.lazy(() => MovieCreateNestedOneWithoutReviewInputSchema),
  show: z.lazy(() => ShowCreateNestedOneWithoutReviewInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutReviewInputSchema)
}).strict() as z.ZodType<Prisma.ReviewCreateInput>;

export const ReviewUncheckedCreateInputSchema: z.ZodType<Prisma.ReviewUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  rating: z.number(),
  comment: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  movieId: z.string(),
  showId: z.string(),
  userId: z.string()
}).strict() as z.ZodType<Prisma.ReviewUncheckedCreateInput>;

export const ReviewUpdateInputSchema: z.ZodType<Prisma.ReviewUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  movie: z.lazy(() => MovieUpdateOneRequiredWithoutReviewNestedInputSchema).optional(),
  show: z.lazy(() => ShowUpdateOneRequiredWithoutReviewNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutReviewNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.ReviewUpdateInput>;

export const ReviewUncheckedUpdateInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  movieId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  showId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.ReviewUncheckedUpdateInput>;

export const ReviewCreateManyInputSchema: z.ZodType<Prisma.ReviewCreateManyInput> = z.object({
  id: z.string().optional(),
  rating: z.number(),
  comment: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  movieId: z.string(),
  showId: z.string(),
  userId: z.string()
}).strict() as z.ZodType<Prisma.ReviewCreateManyInput>;

export const ReviewUpdateManyMutationInputSchema: z.ZodType<Prisma.ReviewUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.ReviewUpdateManyMutationInput>;

export const ReviewUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  movieId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  showId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.ReviewUncheckedUpdateManyInput>;

export const GenreCreateInputSchema: z.ZodType<Prisma.GenreCreateInput> = z.object({
  id: z.number().int(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  movies: z.lazy(() => MovieCreateNestedManyWithoutGenresInputSchema).optional(),
  shows: z.lazy(() => ShowCreateNestedManyWithoutGenresInputSchema).optional()
}).strict() as z.ZodType<Prisma.GenreCreateInput>;

export const GenreUncheckedCreateInputSchema: z.ZodType<Prisma.GenreUncheckedCreateInput> = z.object({
  id: z.number().int(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  movies: z.lazy(() => MovieUncheckedCreateNestedManyWithoutGenresInputSchema).optional(),
  shows: z.lazy(() => ShowUncheckedCreateNestedManyWithoutGenresInputSchema).optional()
}).strict() as z.ZodType<Prisma.GenreUncheckedCreateInput>;

export const GenreUpdateInputSchema: z.ZodType<Prisma.GenreUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  movies: z.lazy(() => MovieUpdateManyWithoutGenresNestedInputSchema).optional(),
  shows: z.lazy(() => ShowUpdateManyWithoutGenresNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.GenreUpdateInput>;

export const GenreUncheckedUpdateInputSchema: z.ZodType<Prisma.GenreUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  movies: z.lazy(() => MovieUncheckedUpdateManyWithoutGenresNestedInputSchema).optional(),
  shows: z.lazy(() => ShowUncheckedUpdateManyWithoutGenresNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.GenreUncheckedUpdateInput>;

export const GenreCreateManyInputSchema: z.ZodType<Prisma.GenreCreateManyInput> = z.object({
  id: z.number().int(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict() as z.ZodType<Prisma.GenreCreateManyInput>;

export const GenreUpdateManyMutationInputSchema: z.ZodType<Prisma.GenreUpdateManyMutationInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.GenreUpdateManyMutationInput>;

export const GenreUncheckedUpdateManyInputSchema: z.ZodType<Prisma.GenreUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.GenreUncheckedUpdateManyInput>;

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
}).strict() as z.ZodType<Prisma.UuidFilter>;

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
}).strict() as z.ZodType<Prisma.StringFilter>;

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
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
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.StringNullableFilter>;

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.DateTimeFilter>;

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.DateTimeNullableFilter>;

export const ReviewListRelationFilterSchema: z.ZodType<Prisma.ReviewListRelationFilter> = z.object({
  every: z.lazy(() => ReviewWhereInputSchema).optional(),
  some: z.lazy(() => ReviewWhereInputSchema).optional(),
  none: z.lazy(() => ReviewWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.ReviewListRelationFilter>;

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict() as z.ZodType<Prisma.SortOrderInput>;

export const ReviewOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ReviewOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.ReviewOrderByRelationAggregateInput>;

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  realName: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.UserCountOrderByAggregateInput>;

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  realName: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.UserMaxOrderByAggregateInput>;

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  realName: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.UserMinOrderByAggregateInput>;

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
}).strict() as z.ZodType<Prisma.UuidWithAggregatesFilter>;

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
}).strict() as z.ZodType<Prisma.StringWithAggregatesFilter>;

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
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
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict() as z.ZodType<Prisma.StringNullableWithAggregatesFilter>;

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
}).strict() as z.ZodType<Prisma.DateTimeWithAggregatesFilter>;

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
}).strict() as z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter>;

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
}).strict() as z.ZodType<Prisma.JsonNullableFilter>;

export const MovieListRelationFilterSchema: z.ZodType<Prisma.MovieListRelationFilter> = z.object({
  every: z.lazy(() => MovieWhereInputSchema).optional(),
  some: z.lazy(() => MovieWhereInputSchema).optional(),
  none: z.lazy(() => MovieWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.MovieListRelationFilter>;

export const ShowListRelationFilterSchema: z.ZodType<Prisma.ShowListRelationFilter> = z.object({
  every: z.lazy(() => ShowWhereInputSchema).optional(),
  some: z.lazy(() => ShowWhereInputSchema).optional(),
  none: z.lazy(() => ShowWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.ShowListRelationFilter>;

export const MovieOrderByRelationAggregateInputSchema: z.ZodType<Prisma.MovieOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.MovieOrderByRelationAggregateInput>;

export const ShowOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ShowOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.ShowOrderByRelationAggregateInput>;

export const CelebrityCountOrderByAggregateInputSchema: z.ZodType<Prisma.CelebrityCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  birthDate: z.lazy(() => SortOrderSchema).optional(),
  options: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CelebrityCountOrderByAggregateInput>;

export const CelebrityMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CelebrityMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  birthDate: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CelebrityMaxOrderByAggregateInput>;

export const CelebrityMinOrderByAggregateInputSchema: z.ZodType<Prisma.CelebrityMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  birthDate: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CelebrityMinOrderByAggregateInput>;

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
}).strict() as z.ZodType<Prisma.JsonNullableWithAggregatesFilter>;

export const FloatNullableFilterSchema: z.ZodType<Prisma.FloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.FloatNullableFilter>;

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.BoolFilter>;

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
}).strict() as z.ZodType<Prisma.UuidNullableFilter>;

export const GenreListRelationFilterSchema: z.ZodType<Prisma.GenreListRelationFilter> = z.object({
  every: z.lazy(() => GenreWhereInputSchema).optional(),
  some: z.lazy(() => GenreWhereInputSchema).optional(),
  none: z.lazy(() => GenreWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.GenreListRelationFilter>;

export const CelebrityNullableRelationFilterSchema: z.ZodType<Prisma.CelebrityNullableRelationFilter> = z.object({
  is: z.lazy(() => CelebrityWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => CelebrityWhereInputSchema).optional().nullable()
}).strict() as z.ZodType<Prisma.CelebrityNullableRelationFilter>;

export const CelebrityListRelationFilterSchema: z.ZodType<Prisma.CelebrityListRelationFilter> = z.object({
  every: z.lazy(() => CelebrityWhereInputSchema).optional(),
  some: z.lazy(() => CelebrityWhereInputSchema).optional(),
  none: z.lazy(() => CelebrityWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.CelebrityListRelationFilter>;

export const GenreOrderByRelationAggregateInputSchema: z.ZodType<Prisma.GenreOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.GenreOrderByRelationAggregateInput>;

export const CelebrityOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CelebrityOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CelebrityOrderByRelationAggregateInput>;

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
}).strict() as z.ZodType<Prisma.MovieCountOrderByAggregateInput>;

export const MovieAvgOrderByAggregateInputSchema: z.ZodType<Prisma.MovieAvgOrderByAggregateInput> = z.object({
  rating: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.MovieAvgOrderByAggregateInput>;

export const MovieMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MovieMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  releaseDate: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  highlighted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  directorId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.MovieMaxOrderByAggregateInput>;

export const MovieMinOrderByAggregateInputSchema: z.ZodType<Prisma.MovieMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  releaseDate: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  highlighted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  directorId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.MovieMinOrderByAggregateInput>;

export const MovieSumOrderByAggregateInputSchema: z.ZodType<Prisma.MovieSumOrderByAggregateInput> = z.object({
  rating: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.MovieSumOrderByAggregateInput>;

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
}).strict() as z.ZodType<Prisma.FloatNullableWithAggregatesFilter>;

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict() as z.ZodType<Prisma.BoolWithAggregatesFilter>;

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
}).strict() as z.ZodType<Prisma.UuidNullableWithAggregatesFilter>;

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
}).strict() as z.ZodType<Prisma.ShowCountOrderByAggregateInput>;

export const ShowAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ShowAvgOrderByAggregateInput> = z.object({
  rating: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.ShowAvgOrderByAggregateInput>;

export const ShowMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ShowMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  releaseDate: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  highlighted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  directorId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.ShowMaxOrderByAggregateInput>;

export const ShowMinOrderByAggregateInputSchema: z.ZodType<Prisma.ShowMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  releaseDate: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  highlighted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  directorId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.ShowMinOrderByAggregateInput>;

export const ShowSumOrderByAggregateInputSchema: z.ZodType<Prisma.ShowSumOrderByAggregateInput> = z.object({
  rating: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.ShowSumOrderByAggregateInput>;

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.FloatFilter>;

export const MovieRelationFilterSchema: z.ZodType<Prisma.MovieRelationFilter> = z.object({
  is: z.lazy(() => MovieWhereInputSchema).optional(),
  isNot: z.lazy(() => MovieWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.MovieRelationFilter>;

export const ShowRelationFilterSchema: z.ZodType<Prisma.ShowRelationFilter> = z.object({
  is: z.lazy(() => ShowWhereInputSchema).optional(),
  isNot: z.lazy(() => ShowWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.ShowRelationFilter>;

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserRelationFilter>;

export const ReviewCountOrderByAggregateInputSchema: z.ZodType<Prisma.ReviewCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  movieId: z.lazy(() => SortOrderSchema).optional(),
  showId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.ReviewCountOrderByAggregateInput>;

export const ReviewAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ReviewAvgOrderByAggregateInput> = z.object({
  rating: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.ReviewAvgOrderByAggregateInput>;

export const ReviewMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ReviewMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  movieId: z.lazy(() => SortOrderSchema).optional(),
  showId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.ReviewMaxOrderByAggregateInput>;

export const ReviewMinOrderByAggregateInputSchema: z.ZodType<Prisma.ReviewMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  movieId: z.lazy(() => SortOrderSchema).optional(),
  showId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.ReviewMinOrderByAggregateInput>;

export const ReviewSumOrderByAggregateInputSchema: z.ZodType<Prisma.ReviewSumOrderByAggregateInput> = z.object({
  rating: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.ReviewSumOrderByAggregateInput>;

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
}).strict() as z.ZodType<Prisma.FloatWithAggregatesFilter>;

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.IntFilter>;

export const GenreCountOrderByAggregateInputSchema: z.ZodType<Prisma.GenreCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.GenreCountOrderByAggregateInput>;

export const GenreAvgOrderByAggregateInputSchema: z.ZodType<Prisma.GenreAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.GenreAvgOrderByAggregateInput>;

export const GenreMaxOrderByAggregateInputSchema: z.ZodType<Prisma.GenreMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.GenreMaxOrderByAggregateInput>;

export const GenreMinOrderByAggregateInputSchema: z.ZodType<Prisma.GenreMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.GenreMinOrderByAggregateInput>;

export const GenreSumOrderByAggregateInputSchema: z.ZodType<Prisma.GenreSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.GenreSumOrderByAggregateInput>;

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
}).strict() as z.ZodType<Prisma.IntWithAggregatesFilter>;

export const ReviewCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ReviewCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ReviewCreateWithoutUserInputSchema),z.lazy(() => ReviewCreateWithoutUserInputSchema).array(),z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewCreateOrConnectWithoutUserInputSchema),z.lazy(() => ReviewCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.ReviewCreateNestedManyWithoutUserInput>;

export const ReviewUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ReviewUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ReviewCreateWithoutUserInputSchema),z.lazy(() => ReviewCreateWithoutUserInputSchema).array(),z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewCreateOrConnectWithoutUserInputSchema),z.lazy(() => ReviewCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.ReviewUncheckedCreateNestedManyWithoutUserInput>;

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict() as z.ZodType<Prisma.StringFieldUpdateOperationsInput>;

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict() as z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput>;

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput>;

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict() as z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput>;

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
}).strict() as z.ZodType<Prisma.ReviewUpdateManyWithoutUserNestedInput>;

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
}).strict() as z.ZodType<Prisma.ReviewUncheckedUpdateManyWithoutUserNestedInput>;

export const MovieCreateNestedManyWithoutDirectorInputSchema: z.ZodType<Prisma.MovieCreateNestedManyWithoutDirectorInput> = z.object({
  create: z.union([ z.lazy(() => MovieCreateWithoutDirectorInputSchema),z.lazy(() => MovieCreateWithoutDirectorInputSchema).array(),z.lazy(() => MovieUncheckedCreateWithoutDirectorInputSchema),z.lazy(() => MovieUncheckedCreateWithoutDirectorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MovieCreateOrConnectWithoutDirectorInputSchema),z.lazy(() => MovieCreateOrConnectWithoutDirectorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MovieCreateManyDirectorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MovieWhereUniqueInputSchema),z.lazy(() => MovieWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.MovieCreateNestedManyWithoutDirectorInput>;

export const MovieCreateNestedManyWithoutWritersInputSchema: z.ZodType<Prisma.MovieCreateNestedManyWithoutWritersInput> = z.object({
  create: z.union([ z.lazy(() => MovieCreateWithoutWritersInputSchema),z.lazy(() => MovieCreateWithoutWritersInputSchema).array(),z.lazy(() => MovieUncheckedCreateWithoutWritersInputSchema),z.lazy(() => MovieUncheckedCreateWithoutWritersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MovieCreateOrConnectWithoutWritersInputSchema),z.lazy(() => MovieCreateOrConnectWithoutWritersInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MovieWhereUniqueInputSchema),z.lazy(() => MovieWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.MovieCreateNestedManyWithoutWritersInput>;

export const MovieCreateNestedManyWithoutStarringInputSchema: z.ZodType<Prisma.MovieCreateNestedManyWithoutStarringInput> = z.object({
  create: z.union([ z.lazy(() => MovieCreateWithoutStarringInputSchema),z.lazy(() => MovieCreateWithoutStarringInputSchema).array(),z.lazy(() => MovieUncheckedCreateWithoutStarringInputSchema),z.lazy(() => MovieUncheckedCreateWithoutStarringInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MovieCreateOrConnectWithoutStarringInputSchema),z.lazy(() => MovieCreateOrConnectWithoutStarringInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MovieWhereUniqueInputSchema),z.lazy(() => MovieWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.MovieCreateNestedManyWithoutStarringInput>;

export const ShowCreateNestedManyWithoutStarringInputSchema: z.ZodType<Prisma.ShowCreateNestedManyWithoutStarringInput> = z.object({
  create: z.union([ z.lazy(() => ShowCreateWithoutStarringInputSchema),z.lazy(() => ShowCreateWithoutStarringInputSchema).array(),z.lazy(() => ShowUncheckedCreateWithoutStarringInputSchema),z.lazy(() => ShowUncheckedCreateWithoutStarringInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShowCreateOrConnectWithoutStarringInputSchema),z.lazy(() => ShowCreateOrConnectWithoutStarringInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.ShowCreateNestedManyWithoutStarringInput>;

export const ShowCreateNestedManyWithoutWritersInputSchema: z.ZodType<Prisma.ShowCreateNestedManyWithoutWritersInput> = z.object({
  create: z.union([ z.lazy(() => ShowCreateWithoutWritersInputSchema),z.lazy(() => ShowCreateWithoutWritersInputSchema).array(),z.lazy(() => ShowUncheckedCreateWithoutWritersInputSchema),z.lazy(() => ShowUncheckedCreateWithoutWritersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShowCreateOrConnectWithoutWritersInputSchema),z.lazy(() => ShowCreateOrConnectWithoutWritersInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.ShowCreateNestedManyWithoutWritersInput>;

export const ShowCreateNestedManyWithoutDirectorInputSchema: z.ZodType<Prisma.ShowCreateNestedManyWithoutDirectorInput> = z.object({
  create: z.union([ z.lazy(() => ShowCreateWithoutDirectorInputSchema),z.lazy(() => ShowCreateWithoutDirectorInputSchema).array(),z.lazy(() => ShowUncheckedCreateWithoutDirectorInputSchema),z.lazy(() => ShowUncheckedCreateWithoutDirectorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShowCreateOrConnectWithoutDirectorInputSchema),z.lazy(() => ShowCreateOrConnectWithoutDirectorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShowCreateManyDirectorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.ShowCreateNestedManyWithoutDirectorInput>;

export const MovieUncheckedCreateNestedManyWithoutDirectorInputSchema: z.ZodType<Prisma.MovieUncheckedCreateNestedManyWithoutDirectorInput> = z.object({
  create: z.union([ z.lazy(() => MovieCreateWithoutDirectorInputSchema),z.lazy(() => MovieCreateWithoutDirectorInputSchema).array(),z.lazy(() => MovieUncheckedCreateWithoutDirectorInputSchema),z.lazy(() => MovieUncheckedCreateWithoutDirectorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MovieCreateOrConnectWithoutDirectorInputSchema),z.lazy(() => MovieCreateOrConnectWithoutDirectorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MovieCreateManyDirectorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MovieWhereUniqueInputSchema),z.lazy(() => MovieWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.MovieUncheckedCreateNestedManyWithoutDirectorInput>;

export const MovieUncheckedCreateNestedManyWithoutWritersInputSchema: z.ZodType<Prisma.MovieUncheckedCreateNestedManyWithoutWritersInput> = z.object({
  create: z.union([ z.lazy(() => MovieCreateWithoutWritersInputSchema),z.lazy(() => MovieCreateWithoutWritersInputSchema).array(),z.lazy(() => MovieUncheckedCreateWithoutWritersInputSchema),z.lazy(() => MovieUncheckedCreateWithoutWritersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MovieCreateOrConnectWithoutWritersInputSchema),z.lazy(() => MovieCreateOrConnectWithoutWritersInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MovieWhereUniqueInputSchema),z.lazy(() => MovieWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.MovieUncheckedCreateNestedManyWithoutWritersInput>;

export const MovieUncheckedCreateNestedManyWithoutStarringInputSchema: z.ZodType<Prisma.MovieUncheckedCreateNestedManyWithoutStarringInput> = z.object({
  create: z.union([ z.lazy(() => MovieCreateWithoutStarringInputSchema),z.lazy(() => MovieCreateWithoutStarringInputSchema).array(),z.lazy(() => MovieUncheckedCreateWithoutStarringInputSchema),z.lazy(() => MovieUncheckedCreateWithoutStarringInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MovieCreateOrConnectWithoutStarringInputSchema),z.lazy(() => MovieCreateOrConnectWithoutStarringInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MovieWhereUniqueInputSchema),z.lazy(() => MovieWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.MovieUncheckedCreateNestedManyWithoutStarringInput>;

export const ShowUncheckedCreateNestedManyWithoutStarringInputSchema: z.ZodType<Prisma.ShowUncheckedCreateNestedManyWithoutStarringInput> = z.object({
  create: z.union([ z.lazy(() => ShowCreateWithoutStarringInputSchema),z.lazy(() => ShowCreateWithoutStarringInputSchema).array(),z.lazy(() => ShowUncheckedCreateWithoutStarringInputSchema),z.lazy(() => ShowUncheckedCreateWithoutStarringInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShowCreateOrConnectWithoutStarringInputSchema),z.lazy(() => ShowCreateOrConnectWithoutStarringInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.ShowUncheckedCreateNestedManyWithoutStarringInput>;

export const ShowUncheckedCreateNestedManyWithoutWritersInputSchema: z.ZodType<Prisma.ShowUncheckedCreateNestedManyWithoutWritersInput> = z.object({
  create: z.union([ z.lazy(() => ShowCreateWithoutWritersInputSchema),z.lazy(() => ShowCreateWithoutWritersInputSchema).array(),z.lazy(() => ShowUncheckedCreateWithoutWritersInputSchema),z.lazy(() => ShowUncheckedCreateWithoutWritersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShowCreateOrConnectWithoutWritersInputSchema),z.lazy(() => ShowCreateOrConnectWithoutWritersInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.ShowUncheckedCreateNestedManyWithoutWritersInput>;

export const ShowUncheckedCreateNestedManyWithoutDirectorInputSchema: z.ZodType<Prisma.ShowUncheckedCreateNestedManyWithoutDirectorInput> = z.object({
  create: z.union([ z.lazy(() => ShowCreateWithoutDirectorInputSchema),z.lazy(() => ShowCreateWithoutDirectorInputSchema).array(),z.lazy(() => ShowUncheckedCreateWithoutDirectorInputSchema),z.lazy(() => ShowUncheckedCreateWithoutDirectorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShowCreateOrConnectWithoutDirectorInputSchema),z.lazy(() => ShowCreateOrConnectWithoutDirectorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShowCreateManyDirectorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.ShowUncheckedCreateNestedManyWithoutDirectorInput>;

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
}).strict() as z.ZodType<Prisma.MovieUpdateManyWithoutDirectorNestedInput>;

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
}).strict() as z.ZodType<Prisma.MovieUpdateManyWithoutWritersNestedInput>;

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
}).strict() as z.ZodType<Prisma.MovieUpdateManyWithoutStarringNestedInput>;

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
}).strict() as z.ZodType<Prisma.ShowUpdateManyWithoutStarringNestedInput>;

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
}).strict() as z.ZodType<Prisma.ShowUpdateManyWithoutWritersNestedInput>;

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
}).strict() as z.ZodType<Prisma.ShowUpdateManyWithoutDirectorNestedInput>;

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
}).strict() as z.ZodType<Prisma.MovieUncheckedUpdateManyWithoutDirectorNestedInput>;

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
}).strict() as z.ZodType<Prisma.MovieUncheckedUpdateManyWithoutWritersNestedInput>;

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
}).strict() as z.ZodType<Prisma.MovieUncheckedUpdateManyWithoutStarringNestedInput>;

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
}).strict() as z.ZodType<Prisma.ShowUncheckedUpdateManyWithoutStarringNestedInput>;

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
}).strict() as z.ZodType<Prisma.ShowUncheckedUpdateManyWithoutWritersNestedInput>;

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
}).strict() as z.ZodType<Prisma.ShowUncheckedUpdateManyWithoutDirectorNestedInput>;

export const GenreCreateNestedManyWithoutMoviesInputSchema: z.ZodType<Prisma.GenreCreateNestedManyWithoutMoviesInput> = z.object({
  create: z.union([ z.lazy(() => GenreCreateWithoutMoviesInputSchema),z.lazy(() => GenreCreateWithoutMoviesInputSchema).array(),z.lazy(() => GenreUncheckedCreateWithoutMoviesInputSchema),z.lazy(() => GenreUncheckedCreateWithoutMoviesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GenreCreateOrConnectWithoutMoviesInputSchema),z.lazy(() => GenreCreateOrConnectWithoutMoviesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GenreWhereUniqueInputSchema),z.lazy(() => GenreWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.GenreCreateNestedManyWithoutMoviesInput>;

export const CelebrityCreateNestedOneWithoutDirectedMoviesInputSchema: z.ZodType<Prisma.CelebrityCreateNestedOneWithoutDirectedMoviesInput> = z.object({
  create: z.union([ z.lazy(() => CelebrityCreateWithoutDirectedMoviesInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutDirectedMoviesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CelebrityCreateOrConnectWithoutDirectedMoviesInputSchema).optional(),
  connect: z.lazy(() => CelebrityWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.CelebrityCreateNestedOneWithoutDirectedMoviesInput>;

export const CelebrityCreateNestedManyWithoutWrittenMoviesInputSchema: z.ZodType<Prisma.CelebrityCreateNestedManyWithoutWrittenMoviesInput> = z.object({
  create: z.union([ z.lazy(() => CelebrityCreateWithoutWrittenMoviesInputSchema),z.lazy(() => CelebrityCreateWithoutWrittenMoviesInputSchema).array(),z.lazy(() => CelebrityUncheckedCreateWithoutWrittenMoviesInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutWrittenMoviesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CelebrityCreateOrConnectWithoutWrittenMoviesInputSchema),z.lazy(() => CelebrityCreateOrConnectWithoutWrittenMoviesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CelebrityWhereUniqueInputSchema),z.lazy(() => CelebrityWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CelebrityCreateNestedManyWithoutWrittenMoviesInput>;

export const CelebrityCreateNestedManyWithoutStarredMoviesInputSchema: z.ZodType<Prisma.CelebrityCreateNestedManyWithoutStarredMoviesInput> = z.object({
  create: z.union([ z.lazy(() => CelebrityCreateWithoutStarredMoviesInputSchema),z.lazy(() => CelebrityCreateWithoutStarredMoviesInputSchema).array(),z.lazy(() => CelebrityUncheckedCreateWithoutStarredMoviesInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutStarredMoviesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CelebrityCreateOrConnectWithoutStarredMoviesInputSchema),z.lazy(() => CelebrityCreateOrConnectWithoutStarredMoviesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CelebrityWhereUniqueInputSchema),z.lazy(() => CelebrityWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CelebrityCreateNestedManyWithoutStarredMoviesInput>;

export const ReviewCreateNestedManyWithoutMovieInputSchema: z.ZodType<Prisma.ReviewCreateNestedManyWithoutMovieInput> = z.object({
  create: z.union([ z.lazy(() => ReviewCreateWithoutMovieInputSchema),z.lazy(() => ReviewCreateWithoutMovieInputSchema).array(),z.lazy(() => ReviewUncheckedCreateWithoutMovieInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutMovieInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewCreateOrConnectWithoutMovieInputSchema),z.lazy(() => ReviewCreateOrConnectWithoutMovieInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewCreateManyMovieInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.ReviewCreateNestedManyWithoutMovieInput>;

export const GenreUncheckedCreateNestedManyWithoutMoviesInputSchema: z.ZodType<Prisma.GenreUncheckedCreateNestedManyWithoutMoviesInput> = z.object({
  create: z.union([ z.lazy(() => GenreCreateWithoutMoviesInputSchema),z.lazy(() => GenreCreateWithoutMoviesInputSchema).array(),z.lazy(() => GenreUncheckedCreateWithoutMoviesInputSchema),z.lazy(() => GenreUncheckedCreateWithoutMoviesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GenreCreateOrConnectWithoutMoviesInputSchema),z.lazy(() => GenreCreateOrConnectWithoutMoviesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GenreWhereUniqueInputSchema),z.lazy(() => GenreWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.GenreUncheckedCreateNestedManyWithoutMoviesInput>;

export const CelebrityUncheckedCreateNestedManyWithoutWrittenMoviesInputSchema: z.ZodType<Prisma.CelebrityUncheckedCreateNestedManyWithoutWrittenMoviesInput> = z.object({
  create: z.union([ z.lazy(() => CelebrityCreateWithoutWrittenMoviesInputSchema),z.lazy(() => CelebrityCreateWithoutWrittenMoviesInputSchema).array(),z.lazy(() => CelebrityUncheckedCreateWithoutWrittenMoviesInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutWrittenMoviesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CelebrityCreateOrConnectWithoutWrittenMoviesInputSchema),z.lazy(() => CelebrityCreateOrConnectWithoutWrittenMoviesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CelebrityWhereUniqueInputSchema),z.lazy(() => CelebrityWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CelebrityUncheckedCreateNestedManyWithoutWrittenMoviesInput>;

export const CelebrityUncheckedCreateNestedManyWithoutStarredMoviesInputSchema: z.ZodType<Prisma.CelebrityUncheckedCreateNestedManyWithoutStarredMoviesInput> = z.object({
  create: z.union([ z.lazy(() => CelebrityCreateWithoutStarredMoviesInputSchema),z.lazy(() => CelebrityCreateWithoutStarredMoviesInputSchema).array(),z.lazy(() => CelebrityUncheckedCreateWithoutStarredMoviesInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutStarredMoviesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CelebrityCreateOrConnectWithoutStarredMoviesInputSchema),z.lazy(() => CelebrityCreateOrConnectWithoutStarredMoviesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CelebrityWhereUniqueInputSchema),z.lazy(() => CelebrityWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CelebrityUncheckedCreateNestedManyWithoutStarredMoviesInput>;

export const ReviewUncheckedCreateNestedManyWithoutMovieInputSchema: z.ZodType<Prisma.ReviewUncheckedCreateNestedManyWithoutMovieInput> = z.object({
  create: z.union([ z.lazy(() => ReviewCreateWithoutMovieInputSchema),z.lazy(() => ReviewCreateWithoutMovieInputSchema).array(),z.lazy(() => ReviewUncheckedCreateWithoutMovieInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutMovieInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewCreateOrConnectWithoutMovieInputSchema),z.lazy(() => ReviewCreateOrConnectWithoutMovieInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewCreateManyMovieInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.ReviewUncheckedCreateNestedManyWithoutMovieInput>;

export const NullableFloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableFloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict() as z.ZodType<Prisma.NullableFloatFieldUpdateOperationsInput>;

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict() as z.ZodType<Prisma.BoolFieldUpdateOperationsInput>;

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
}).strict() as z.ZodType<Prisma.GenreUpdateManyWithoutMoviesNestedInput>;

export const CelebrityUpdateOneWithoutDirectedMoviesNestedInputSchema: z.ZodType<Prisma.CelebrityUpdateOneWithoutDirectedMoviesNestedInput> = z.object({
  create: z.union([ z.lazy(() => CelebrityCreateWithoutDirectedMoviesInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutDirectedMoviesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CelebrityCreateOrConnectWithoutDirectedMoviesInputSchema).optional(),
  upsert: z.lazy(() => CelebrityUpsertWithoutDirectedMoviesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => CelebrityWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => CelebrityWhereInputSchema) ]).optional(),
  connect: z.lazy(() => CelebrityWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CelebrityUpdateToOneWithWhereWithoutDirectedMoviesInputSchema),z.lazy(() => CelebrityUpdateWithoutDirectedMoviesInputSchema),z.lazy(() => CelebrityUncheckedUpdateWithoutDirectedMoviesInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CelebrityUpdateOneWithoutDirectedMoviesNestedInput>;

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
}).strict() as z.ZodType<Prisma.CelebrityUpdateManyWithoutWrittenMoviesNestedInput>;

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
}).strict() as z.ZodType<Prisma.CelebrityUpdateManyWithoutStarredMoviesNestedInput>;

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
}).strict() as z.ZodType<Prisma.ReviewUpdateManyWithoutMovieNestedInput>;

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
}).strict() as z.ZodType<Prisma.GenreUncheckedUpdateManyWithoutMoviesNestedInput>;

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
}).strict() as z.ZodType<Prisma.CelebrityUncheckedUpdateManyWithoutWrittenMoviesNestedInput>;

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
}).strict() as z.ZodType<Prisma.CelebrityUncheckedUpdateManyWithoutStarredMoviesNestedInput>;

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
}).strict() as z.ZodType<Prisma.ReviewUncheckedUpdateManyWithoutMovieNestedInput>;

export const GenreCreateNestedManyWithoutShowsInputSchema: z.ZodType<Prisma.GenreCreateNestedManyWithoutShowsInput> = z.object({
  create: z.union([ z.lazy(() => GenreCreateWithoutShowsInputSchema),z.lazy(() => GenreCreateWithoutShowsInputSchema).array(),z.lazy(() => GenreUncheckedCreateWithoutShowsInputSchema),z.lazy(() => GenreUncheckedCreateWithoutShowsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GenreCreateOrConnectWithoutShowsInputSchema),z.lazy(() => GenreCreateOrConnectWithoutShowsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GenreWhereUniqueInputSchema),z.lazy(() => GenreWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.GenreCreateNestedManyWithoutShowsInput>;

export const CelebrityCreateNestedOneWithoutDirectedShowsInputSchema: z.ZodType<Prisma.CelebrityCreateNestedOneWithoutDirectedShowsInput> = z.object({
  create: z.union([ z.lazy(() => CelebrityCreateWithoutDirectedShowsInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutDirectedShowsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CelebrityCreateOrConnectWithoutDirectedShowsInputSchema).optional(),
  connect: z.lazy(() => CelebrityWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.CelebrityCreateNestedOneWithoutDirectedShowsInput>;

export const CelebrityCreateNestedManyWithoutWrittenShowsInputSchema: z.ZodType<Prisma.CelebrityCreateNestedManyWithoutWrittenShowsInput> = z.object({
  create: z.union([ z.lazy(() => CelebrityCreateWithoutWrittenShowsInputSchema),z.lazy(() => CelebrityCreateWithoutWrittenShowsInputSchema).array(),z.lazy(() => CelebrityUncheckedCreateWithoutWrittenShowsInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutWrittenShowsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CelebrityCreateOrConnectWithoutWrittenShowsInputSchema),z.lazy(() => CelebrityCreateOrConnectWithoutWrittenShowsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CelebrityWhereUniqueInputSchema),z.lazy(() => CelebrityWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CelebrityCreateNestedManyWithoutWrittenShowsInput>;

export const CelebrityCreateNestedManyWithoutStarredShowsInputSchema: z.ZodType<Prisma.CelebrityCreateNestedManyWithoutStarredShowsInput> = z.object({
  create: z.union([ z.lazy(() => CelebrityCreateWithoutStarredShowsInputSchema),z.lazy(() => CelebrityCreateWithoutStarredShowsInputSchema).array(),z.lazy(() => CelebrityUncheckedCreateWithoutStarredShowsInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutStarredShowsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CelebrityCreateOrConnectWithoutStarredShowsInputSchema),z.lazy(() => CelebrityCreateOrConnectWithoutStarredShowsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CelebrityWhereUniqueInputSchema),z.lazy(() => CelebrityWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CelebrityCreateNestedManyWithoutStarredShowsInput>;

export const ReviewCreateNestedManyWithoutShowInputSchema: z.ZodType<Prisma.ReviewCreateNestedManyWithoutShowInput> = z.object({
  create: z.union([ z.lazy(() => ReviewCreateWithoutShowInputSchema),z.lazy(() => ReviewCreateWithoutShowInputSchema).array(),z.lazy(() => ReviewUncheckedCreateWithoutShowInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutShowInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewCreateOrConnectWithoutShowInputSchema),z.lazy(() => ReviewCreateOrConnectWithoutShowInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewCreateManyShowInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.ReviewCreateNestedManyWithoutShowInput>;

export const GenreUncheckedCreateNestedManyWithoutShowsInputSchema: z.ZodType<Prisma.GenreUncheckedCreateNestedManyWithoutShowsInput> = z.object({
  create: z.union([ z.lazy(() => GenreCreateWithoutShowsInputSchema),z.lazy(() => GenreCreateWithoutShowsInputSchema).array(),z.lazy(() => GenreUncheckedCreateWithoutShowsInputSchema),z.lazy(() => GenreUncheckedCreateWithoutShowsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GenreCreateOrConnectWithoutShowsInputSchema),z.lazy(() => GenreCreateOrConnectWithoutShowsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GenreWhereUniqueInputSchema),z.lazy(() => GenreWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.GenreUncheckedCreateNestedManyWithoutShowsInput>;

export const CelebrityUncheckedCreateNestedManyWithoutWrittenShowsInputSchema: z.ZodType<Prisma.CelebrityUncheckedCreateNestedManyWithoutWrittenShowsInput> = z.object({
  create: z.union([ z.lazy(() => CelebrityCreateWithoutWrittenShowsInputSchema),z.lazy(() => CelebrityCreateWithoutWrittenShowsInputSchema).array(),z.lazy(() => CelebrityUncheckedCreateWithoutWrittenShowsInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutWrittenShowsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CelebrityCreateOrConnectWithoutWrittenShowsInputSchema),z.lazy(() => CelebrityCreateOrConnectWithoutWrittenShowsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CelebrityWhereUniqueInputSchema),z.lazy(() => CelebrityWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CelebrityUncheckedCreateNestedManyWithoutWrittenShowsInput>;

export const CelebrityUncheckedCreateNestedManyWithoutStarredShowsInputSchema: z.ZodType<Prisma.CelebrityUncheckedCreateNestedManyWithoutStarredShowsInput> = z.object({
  create: z.union([ z.lazy(() => CelebrityCreateWithoutStarredShowsInputSchema),z.lazy(() => CelebrityCreateWithoutStarredShowsInputSchema).array(),z.lazy(() => CelebrityUncheckedCreateWithoutStarredShowsInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutStarredShowsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CelebrityCreateOrConnectWithoutStarredShowsInputSchema),z.lazy(() => CelebrityCreateOrConnectWithoutStarredShowsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CelebrityWhereUniqueInputSchema),z.lazy(() => CelebrityWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CelebrityUncheckedCreateNestedManyWithoutStarredShowsInput>;

export const ReviewUncheckedCreateNestedManyWithoutShowInputSchema: z.ZodType<Prisma.ReviewUncheckedCreateNestedManyWithoutShowInput> = z.object({
  create: z.union([ z.lazy(() => ReviewCreateWithoutShowInputSchema),z.lazy(() => ReviewCreateWithoutShowInputSchema).array(),z.lazy(() => ReviewUncheckedCreateWithoutShowInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutShowInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewCreateOrConnectWithoutShowInputSchema),z.lazy(() => ReviewCreateOrConnectWithoutShowInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewCreateManyShowInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.ReviewUncheckedCreateNestedManyWithoutShowInput>;

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
}).strict() as z.ZodType<Prisma.GenreUpdateManyWithoutShowsNestedInput>;

export const CelebrityUpdateOneWithoutDirectedShowsNestedInputSchema: z.ZodType<Prisma.CelebrityUpdateOneWithoutDirectedShowsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CelebrityCreateWithoutDirectedShowsInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutDirectedShowsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CelebrityCreateOrConnectWithoutDirectedShowsInputSchema).optional(),
  upsert: z.lazy(() => CelebrityUpsertWithoutDirectedShowsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => CelebrityWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => CelebrityWhereInputSchema) ]).optional(),
  connect: z.lazy(() => CelebrityWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CelebrityUpdateToOneWithWhereWithoutDirectedShowsInputSchema),z.lazy(() => CelebrityUpdateWithoutDirectedShowsInputSchema),z.lazy(() => CelebrityUncheckedUpdateWithoutDirectedShowsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CelebrityUpdateOneWithoutDirectedShowsNestedInput>;

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
}).strict() as z.ZodType<Prisma.CelebrityUpdateManyWithoutWrittenShowsNestedInput>;

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
}).strict() as z.ZodType<Prisma.CelebrityUpdateManyWithoutStarredShowsNestedInput>;

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
}).strict() as z.ZodType<Prisma.ReviewUpdateManyWithoutShowNestedInput>;

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
}).strict() as z.ZodType<Prisma.GenreUncheckedUpdateManyWithoutShowsNestedInput>;

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
}).strict() as z.ZodType<Prisma.CelebrityUncheckedUpdateManyWithoutWrittenShowsNestedInput>;

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
}).strict() as z.ZodType<Prisma.CelebrityUncheckedUpdateManyWithoutStarredShowsNestedInput>;

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
}).strict() as z.ZodType<Prisma.ReviewUncheckedUpdateManyWithoutShowNestedInput>;

export const MovieCreateNestedOneWithoutReviewInputSchema: z.ZodType<Prisma.MovieCreateNestedOneWithoutReviewInput> = z.object({
  create: z.union([ z.lazy(() => MovieCreateWithoutReviewInputSchema),z.lazy(() => MovieUncheckedCreateWithoutReviewInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MovieCreateOrConnectWithoutReviewInputSchema).optional(),
  connect: z.lazy(() => MovieWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.MovieCreateNestedOneWithoutReviewInput>;

export const ShowCreateNestedOneWithoutReviewInputSchema: z.ZodType<Prisma.ShowCreateNestedOneWithoutReviewInput> = z.object({
  create: z.union([ z.lazy(() => ShowCreateWithoutReviewInputSchema),z.lazy(() => ShowUncheckedCreateWithoutReviewInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ShowCreateOrConnectWithoutReviewInputSchema).optional(),
  connect: z.lazy(() => ShowWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.ShowCreateNestedOneWithoutReviewInput>;

export const UserCreateNestedOneWithoutReviewInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutReviewInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutReviewInputSchema),z.lazy(() => UserUncheckedCreateWithoutReviewInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutReviewInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserCreateNestedOneWithoutReviewInput>;

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict() as z.ZodType<Prisma.FloatFieldUpdateOperationsInput>;

export const MovieUpdateOneRequiredWithoutReviewNestedInputSchema: z.ZodType<Prisma.MovieUpdateOneRequiredWithoutReviewNestedInput> = z.object({
  create: z.union([ z.lazy(() => MovieCreateWithoutReviewInputSchema),z.lazy(() => MovieUncheckedCreateWithoutReviewInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MovieCreateOrConnectWithoutReviewInputSchema).optional(),
  upsert: z.lazy(() => MovieUpsertWithoutReviewInputSchema).optional(),
  connect: z.lazy(() => MovieWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => MovieUpdateToOneWithWhereWithoutReviewInputSchema),z.lazy(() => MovieUpdateWithoutReviewInputSchema),z.lazy(() => MovieUncheckedUpdateWithoutReviewInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.MovieUpdateOneRequiredWithoutReviewNestedInput>;

export const ShowUpdateOneRequiredWithoutReviewNestedInputSchema: z.ZodType<Prisma.ShowUpdateOneRequiredWithoutReviewNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShowCreateWithoutReviewInputSchema),z.lazy(() => ShowUncheckedCreateWithoutReviewInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ShowCreateOrConnectWithoutReviewInputSchema).optional(),
  upsert: z.lazy(() => ShowUpsertWithoutReviewInputSchema).optional(),
  connect: z.lazy(() => ShowWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ShowUpdateToOneWithWhereWithoutReviewInputSchema),z.lazy(() => ShowUpdateWithoutReviewInputSchema),z.lazy(() => ShowUncheckedUpdateWithoutReviewInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.ShowUpdateOneRequiredWithoutReviewNestedInput>;

export const UserUpdateOneRequiredWithoutReviewNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutReviewNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutReviewInputSchema),z.lazy(() => UserUncheckedCreateWithoutReviewInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutReviewInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutReviewInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutReviewInputSchema),z.lazy(() => UserUpdateWithoutReviewInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReviewInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.UserUpdateOneRequiredWithoutReviewNestedInput>;

export const MovieCreateNestedManyWithoutGenresInputSchema: z.ZodType<Prisma.MovieCreateNestedManyWithoutGenresInput> = z.object({
  create: z.union([ z.lazy(() => MovieCreateWithoutGenresInputSchema),z.lazy(() => MovieCreateWithoutGenresInputSchema).array(),z.lazy(() => MovieUncheckedCreateWithoutGenresInputSchema),z.lazy(() => MovieUncheckedCreateWithoutGenresInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MovieCreateOrConnectWithoutGenresInputSchema),z.lazy(() => MovieCreateOrConnectWithoutGenresInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MovieWhereUniqueInputSchema),z.lazy(() => MovieWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.MovieCreateNestedManyWithoutGenresInput>;

export const ShowCreateNestedManyWithoutGenresInputSchema: z.ZodType<Prisma.ShowCreateNestedManyWithoutGenresInput> = z.object({
  create: z.union([ z.lazy(() => ShowCreateWithoutGenresInputSchema),z.lazy(() => ShowCreateWithoutGenresInputSchema).array(),z.lazy(() => ShowUncheckedCreateWithoutGenresInputSchema),z.lazy(() => ShowUncheckedCreateWithoutGenresInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShowCreateOrConnectWithoutGenresInputSchema),z.lazy(() => ShowCreateOrConnectWithoutGenresInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.ShowCreateNestedManyWithoutGenresInput>;

export const MovieUncheckedCreateNestedManyWithoutGenresInputSchema: z.ZodType<Prisma.MovieUncheckedCreateNestedManyWithoutGenresInput> = z.object({
  create: z.union([ z.lazy(() => MovieCreateWithoutGenresInputSchema),z.lazy(() => MovieCreateWithoutGenresInputSchema).array(),z.lazy(() => MovieUncheckedCreateWithoutGenresInputSchema),z.lazy(() => MovieUncheckedCreateWithoutGenresInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MovieCreateOrConnectWithoutGenresInputSchema),z.lazy(() => MovieCreateOrConnectWithoutGenresInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MovieWhereUniqueInputSchema),z.lazy(() => MovieWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.MovieUncheckedCreateNestedManyWithoutGenresInput>;

export const ShowUncheckedCreateNestedManyWithoutGenresInputSchema: z.ZodType<Prisma.ShowUncheckedCreateNestedManyWithoutGenresInput> = z.object({
  create: z.union([ z.lazy(() => ShowCreateWithoutGenresInputSchema),z.lazy(() => ShowCreateWithoutGenresInputSchema).array(),z.lazy(() => ShowUncheckedCreateWithoutGenresInputSchema),z.lazy(() => ShowUncheckedCreateWithoutGenresInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShowCreateOrConnectWithoutGenresInputSchema),z.lazy(() => ShowCreateOrConnectWithoutGenresInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.ShowUncheckedCreateNestedManyWithoutGenresInput>;

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict() as z.ZodType<Prisma.IntFieldUpdateOperationsInput>;

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
}).strict() as z.ZodType<Prisma.MovieUpdateManyWithoutGenresNestedInput>;

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
}).strict() as z.ZodType<Prisma.ShowUpdateManyWithoutGenresNestedInput>;

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
}).strict() as z.ZodType<Prisma.MovieUncheckedUpdateManyWithoutGenresNestedInput>;

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
}).strict() as z.ZodType<Prisma.ShowUncheckedUpdateManyWithoutGenresNestedInput>;

export const NestedUuidFilterSchema: z.ZodType<Prisma.NestedUuidFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NestedUuidFilter>;

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
}).strict() as z.ZodType<Prisma.NestedStringFilter>;

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
}).strict() as z.ZodType<Prisma.NestedStringNullableFilter>;

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NestedDateTimeFilter>;

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.NestedDateTimeNullableFilter>;

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
}).strict() as z.ZodType<Prisma.NestedUuidWithAggregatesFilter>;

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NestedIntFilter>;

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
}).strict() as z.ZodType<Prisma.NestedStringWithAggregatesFilter>;

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
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
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter>;

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.NestedIntNullableFilter>;

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
}).strict() as z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter>;

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
}).strict() as z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter>;

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
}).strict() as z.ZodType<Prisma.NestedJsonNullableFilter>;

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.NestedFloatNullableFilter>;

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NestedBoolFilter>;

export const NestedUuidNullableFilterSchema: z.ZodType<Prisma.NestedUuidNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidNullableFilterSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.NestedUuidNullableFilter>;

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
}).strict() as z.ZodType<Prisma.NestedFloatNullableWithAggregatesFilter>;

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedBoolWithAggregatesFilter>;

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
}).strict() as z.ZodType<Prisma.NestedUuidNullableWithAggregatesFilter>;

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NestedFloatFilter>;

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
}).strict() as z.ZodType<Prisma.NestedFloatWithAggregatesFilter>;

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
}).strict() as z.ZodType<Prisma.NestedIntWithAggregatesFilter>;

export const ReviewCreateWithoutUserInputSchema: z.ZodType<Prisma.ReviewCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  rating: z.number(),
  comment: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  movie: z.lazy(() => MovieCreateNestedOneWithoutReviewInputSchema),
  show: z.lazy(() => ShowCreateNestedOneWithoutReviewInputSchema)
}).strict() as z.ZodType<Prisma.ReviewCreateWithoutUserInput>;

export const ReviewUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ReviewUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  rating: z.number(),
  comment: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  movieId: z.string(),
  showId: z.string()
}).strict() as z.ZodType<Prisma.ReviewUncheckedCreateWithoutUserInput>;

export const ReviewCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ReviewCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ReviewWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReviewCreateWithoutUserInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.ReviewCreateOrConnectWithoutUserInput>;

export const ReviewCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.ReviewCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ReviewCreateManyUserInputSchema),z.lazy(() => ReviewCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.ReviewCreateManyUserInputEnvelope>;

export const ReviewUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ReviewUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ReviewWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ReviewUpdateWithoutUserInputSchema),z.lazy(() => ReviewUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ReviewCreateWithoutUserInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.ReviewUpsertWithWhereUniqueWithoutUserInput>;

export const ReviewUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ReviewUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ReviewWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ReviewUpdateWithoutUserInputSchema),z.lazy(() => ReviewUncheckedUpdateWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.ReviewUpdateWithWhereUniqueWithoutUserInput>;

export const ReviewUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ReviewUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => ReviewScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ReviewUpdateManyMutationInputSchema),z.lazy(() => ReviewUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.ReviewUpdateManyWithWhereWithoutUserInput>;

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
}).strict() as z.ZodType<Prisma.ReviewScalarWhereInput>;

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
}).strict() as z.ZodType<Prisma.MovieCreateWithoutDirectorInput>;

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
}).strict() as z.ZodType<Prisma.MovieUncheckedCreateWithoutDirectorInput>;

export const MovieCreateOrConnectWithoutDirectorInputSchema: z.ZodType<Prisma.MovieCreateOrConnectWithoutDirectorInput> = z.object({
  where: z.lazy(() => MovieWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MovieCreateWithoutDirectorInputSchema),z.lazy(() => MovieUncheckedCreateWithoutDirectorInputSchema) ]),
}).strict() as z.ZodType<Prisma.MovieCreateOrConnectWithoutDirectorInput>;

export const MovieCreateManyDirectorInputEnvelopeSchema: z.ZodType<Prisma.MovieCreateManyDirectorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MovieCreateManyDirectorInputSchema),z.lazy(() => MovieCreateManyDirectorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.MovieCreateManyDirectorInputEnvelope>;

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
}).strict() as z.ZodType<Prisma.MovieCreateWithoutWritersInput>;

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
}).strict() as z.ZodType<Prisma.MovieUncheckedCreateWithoutWritersInput>;

export const MovieCreateOrConnectWithoutWritersInputSchema: z.ZodType<Prisma.MovieCreateOrConnectWithoutWritersInput> = z.object({
  where: z.lazy(() => MovieWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MovieCreateWithoutWritersInputSchema),z.lazy(() => MovieUncheckedCreateWithoutWritersInputSchema) ]),
}).strict() as z.ZodType<Prisma.MovieCreateOrConnectWithoutWritersInput>;

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
}).strict() as z.ZodType<Prisma.MovieCreateWithoutStarringInput>;

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
}).strict() as z.ZodType<Prisma.MovieUncheckedCreateWithoutStarringInput>;

export const MovieCreateOrConnectWithoutStarringInputSchema: z.ZodType<Prisma.MovieCreateOrConnectWithoutStarringInput> = z.object({
  where: z.lazy(() => MovieWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MovieCreateWithoutStarringInputSchema),z.lazy(() => MovieUncheckedCreateWithoutStarringInputSchema) ]),
}).strict() as z.ZodType<Prisma.MovieCreateOrConnectWithoutStarringInput>;

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
}).strict() as z.ZodType<Prisma.ShowCreateWithoutStarringInput>;

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
}).strict() as z.ZodType<Prisma.ShowUncheckedCreateWithoutStarringInput>;

export const ShowCreateOrConnectWithoutStarringInputSchema: z.ZodType<Prisma.ShowCreateOrConnectWithoutStarringInput> = z.object({
  where: z.lazy(() => ShowWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ShowCreateWithoutStarringInputSchema),z.lazy(() => ShowUncheckedCreateWithoutStarringInputSchema) ]),
}).strict() as z.ZodType<Prisma.ShowCreateOrConnectWithoutStarringInput>;

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
}).strict() as z.ZodType<Prisma.ShowCreateWithoutWritersInput>;

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
}).strict() as z.ZodType<Prisma.ShowUncheckedCreateWithoutWritersInput>;

export const ShowCreateOrConnectWithoutWritersInputSchema: z.ZodType<Prisma.ShowCreateOrConnectWithoutWritersInput> = z.object({
  where: z.lazy(() => ShowWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ShowCreateWithoutWritersInputSchema),z.lazy(() => ShowUncheckedCreateWithoutWritersInputSchema) ]),
}).strict() as z.ZodType<Prisma.ShowCreateOrConnectWithoutWritersInput>;

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
}).strict() as z.ZodType<Prisma.ShowCreateWithoutDirectorInput>;

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
}).strict() as z.ZodType<Prisma.ShowUncheckedCreateWithoutDirectorInput>;

export const ShowCreateOrConnectWithoutDirectorInputSchema: z.ZodType<Prisma.ShowCreateOrConnectWithoutDirectorInput> = z.object({
  where: z.lazy(() => ShowWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ShowCreateWithoutDirectorInputSchema),z.lazy(() => ShowUncheckedCreateWithoutDirectorInputSchema) ]),
}).strict() as z.ZodType<Prisma.ShowCreateOrConnectWithoutDirectorInput>;

export const ShowCreateManyDirectorInputEnvelopeSchema: z.ZodType<Prisma.ShowCreateManyDirectorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ShowCreateManyDirectorInputSchema),z.lazy(() => ShowCreateManyDirectorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.ShowCreateManyDirectorInputEnvelope>;

export const MovieUpsertWithWhereUniqueWithoutDirectorInputSchema: z.ZodType<Prisma.MovieUpsertWithWhereUniqueWithoutDirectorInput> = z.object({
  where: z.lazy(() => MovieWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MovieUpdateWithoutDirectorInputSchema),z.lazy(() => MovieUncheckedUpdateWithoutDirectorInputSchema) ]),
  create: z.union([ z.lazy(() => MovieCreateWithoutDirectorInputSchema),z.lazy(() => MovieUncheckedCreateWithoutDirectorInputSchema) ]),
}).strict() as z.ZodType<Prisma.MovieUpsertWithWhereUniqueWithoutDirectorInput>;

export const MovieUpdateWithWhereUniqueWithoutDirectorInputSchema: z.ZodType<Prisma.MovieUpdateWithWhereUniqueWithoutDirectorInput> = z.object({
  where: z.lazy(() => MovieWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MovieUpdateWithoutDirectorInputSchema),z.lazy(() => MovieUncheckedUpdateWithoutDirectorInputSchema) ]),
}).strict() as z.ZodType<Prisma.MovieUpdateWithWhereUniqueWithoutDirectorInput>;

export const MovieUpdateManyWithWhereWithoutDirectorInputSchema: z.ZodType<Prisma.MovieUpdateManyWithWhereWithoutDirectorInput> = z.object({
  where: z.lazy(() => MovieScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MovieUpdateManyMutationInputSchema),z.lazy(() => MovieUncheckedUpdateManyWithoutDirectorInputSchema) ]),
}).strict() as z.ZodType<Prisma.MovieUpdateManyWithWhereWithoutDirectorInput>;

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
}).strict() as z.ZodType<Prisma.MovieScalarWhereInput>;

export const MovieUpsertWithWhereUniqueWithoutWritersInputSchema: z.ZodType<Prisma.MovieUpsertWithWhereUniqueWithoutWritersInput> = z.object({
  where: z.lazy(() => MovieWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MovieUpdateWithoutWritersInputSchema),z.lazy(() => MovieUncheckedUpdateWithoutWritersInputSchema) ]),
  create: z.union([ z.lazy(() => MovieCreateWithoutWritersInputSchema),z.lazy(() => MovieUncheckedCreateWithoutWritersInputSchema) ]),
}).strict() as z.ZodType<Prisma.MovieUpsertWithWhereUniqueWithoutWritersInput>;

export const MovieUpdateWithWhereUniqueWithoutWritersInputSchema: z.ZodType<Prisma.MovieUpdateWithWhereUniqueWithoutWritersInput> = z.object({
  where: z.lazy(() => MovieWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MovieUpdateWithoutWritersInputSchema),z.lazy(() => MovieUncheckedUpdateWithoutWritersInputSchema) ]),
}).strict() as z.ZodType<Prisma.MovieUpdateWithWhereUniqueWithoutWritersInput>;

export const MovieUpdateManyWithWhereWithoutWritersInputSchema: z.ZodType<Prisma.MovieUpdateManyWithWhereWithoutWritersInput> = z.object({
  where: z.lazy(() => MovieScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MovieUpdateManyMutationInputSchema),z.lazy(() => MovieUncheckedUpdateManyWithoutWritersInputSchema) ]),
}).strict() as z.ZodType<Prisma.MovieUpdateManyWithWhereWithoutWritersInput>;

export const MovieUpsertWithWhereUniqueWithoutStarringInputSchema: z.ZodType<Prisma.MovieUpsertWithWhereUniqueWithoutStarringInput> = z.object({
  where: z.lazy(() => MovieWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MovieUpdateWithoutStarringInputSchema),z.lazy(() => MovieUncheckedUpdateWithoutStarringInputSchema) ]),
  create: z.union([ z.lazy(() => MovieCreateWithoutStarringInputSchema),z.lazy(() => MovieUncheckedCreateWithoutStarringInputSchema) ]),
}).strict() as z.ZodType<Prisma.MovieUpsertWithWhereUniqueWithoutStarringInput>;

export const MovieUpdateWithWhereUniqueWithoutStarringInputSchema: z.ZodType<Prisma.MovieUpdateWithWhereUniqueWithoutStarringInput> = z.object({
  where: z.lazy(() => MovieWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MovieUpdateWithoutStarringInputSchema),z.lazy(() => MovieUncheckedUpdateWithoutStarringInputSchema) ]),
}).strict() as z.ZodType<Prisma.MovieUpdateWithWhereUniqueWithoutStarringInput>;

export const MovieUpdateManyWithWhereWithoutStarringInputSchema: z.ZodType<Prisma.MovieUpdateManyWithWhereWithoutStarringInput> = z.object({
  where: z.lazy(() => MovieScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MovieUpdateManyMutationInputSchema),z.lazy(() => MovieUncheckedUpdateManyWithoutStarringInputSchema) ]),
}).strict() as z.ZodType<Prisma.MovieUpdateManyWithWhereWithoutStarringInput>;

export const ShowUpsertWithWhereUniqueWithoutStarringInputSchema: z.ZodType<Prisma.ShowUpsertWithWhereUniqueWithoutStarringInput> = z.object({
  where: z.lazy(() => ShowWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ShowUpdateWithoutStarringInputSchema),z.lazy(() => ShowUncheckedUpdateWithoutStarringInputSchema) ]),
  create: z.union([ z.lazy(() => ShowCreateWithoutStarringInputSchema),z.lazy(() => ShowUncheckedCreateWithoutStarringInputSchema) ]),
}).strict() as z.ZodType<Prisma.ShowUpsertWithWhereUniqueWithoutStarringInput>;

export const ShowUpdateWithWhereUniqueWithoutStarringInputSchema: z.ZodType<Prisma.ShowUpdateWithWhereUniqueWithoutStarringInput> = z.object({
  where: z.lazy(() => ShowWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ShowUpdateWithoutStarringInputSchema),z.lazy(() => ShowUncheckedUpdateWithoutStarringInputSchema) ]),
}).strict() as z.ZodType<Prisma.ShowUpdateWithWhereUniqueWithoutStarringInput>;

export const ShowUpdateManyWithWhereWithoutStarringInputSchema: z.ZodType<Prisma.ShowUpdateManyWithWhereWithoutStarringInput> = z.object({
  where: z.lazy(() => ShowScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ShowUpdateManyMutationInputSchema),z.lazy(() => ShowUncheckedUpdateManyWithoutStarringInputSchema) ]),
}).strict() as z.ZodType<Prisma.ShowUpdateManyWithWhereWithoutStarringInput>;

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
}).strict() as z.ZodType<Prisma.ShowScalarWhereInput>;

export const ShowUpsertWithWhereUniqueWithoutWritersInputSchema: z.ZodType<Prisma.ShowUpsertWithWhereUniqueWithoutWritersInput> = z.object({
  where: z.lazy(() => ShowWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ShowUpdateWithoutWritersInputSchema),z.lazy(() => ShowUncheckedUpdateWithoutWritersInputSchema) ]),
  create: z.union([ z.lazy(() => ShowCreateWithoutWritersInputSchema),z.lazy(() => ShowUncheckedCreateWithoutWritersInputSchema) ]),
}).strict() as z.ZodType<Prisma.ShowUpsertWithWhereUniqueWithoutWritersInput>;

export const ShowUpdateWithWhereUniqueWithoutWritersInputSchema: z.ZodType<Prisma.ShowUpdateWithWhereUniqueWithoutWritersInput> = z.object({
  where: z.lazy(() => ShowWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ShowUpdateWithoutWritersInputSchema),z.lazy(() => ShowUncheckedUpdateWithoutWritersInputSchema) ]),
}).strict() as z.ZodType<Prisma.ShowUpdateWithWhereUniqueWithoutWritersInput>;

export const ShowUpdateManyWithWhereWithoutWritersInputSchema: z.ZodType<Prisma.ShowUpdateManyWithWhereWithoutWritersInput> = z.object({
  where: z.lazy(() => ShowScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ShowUpdateManyMutationInputSchema),z.lazy(() => ShowUncheckedUpdateManyWithoutWritersInputSchema) ]),
}).strict() as z.ZodType<Prisma.ShowUpdateManyWithWhereWithoutWritersInput>;

export const ShowUpsertWithWhereUniqueWithoutDirectorInputSchema: z.ZodType<Prisma.ShowUpsertWithWhereUniqueWithoutDirectorInput> = z.object({
  where: z.lazy(() => ShowWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ShowUpdateWithoutDirectorInputSchema),z.lazy(() => ShowUncheckedUpdateWithoutDirectorInputSchema) ]),
  create: z.union([ z.lazy(() => ShowCreateWithoutDirectorInputSchema),z.lazy(() => ShowUncheckedCreateWithoutDirectorInputSchema) ]),
}).strict() as z.ZodType<Prisma.ShowUpsertWithWhereUniqueWithoutDirectorInput>;

export const ShowUpdateWithWhereUniqueWithoutDirectorInputSchema: z.ZodType<Prisma.ShowUpdateWithWhereUniqueWithoutDirectorInput> = z.object({
  where: z.lazy(() => ShowWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ShowUpdateWithoutDirectorInputSchema),z.lazy(() => ShowUncheckedUpdateWithoutDirectorInputSchema) ]),
}).strict() as z.ZodType<Prisma.ShowUpdateWithWhereUniqueWithoutDirectorInput>;

export const ShowUpdateManyWithWhereWithoutDirectorInputSchema: z.ZodType<Prisma.ShowUpdateManyWithWhereWithoutDirectorInput> = z.object({
  where: z.lazy(() => ShowScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ShowUpdateManyMutationInputSchema),z.lazy(() => ShowUncheckedUpdateManyWithoutDirectorInputSchema) ]),
}).strict() as z.ZodType<Prisma.ShowUpdateManyWithWhereWithoutDirectorInput>;

export const GenreCreateWithoutMoviesInputSchema: z.ZodType<Prisma.GenreCreateWithoutMoviesInput> = z.object({
  id: z.number().int(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  shows: z.lazy(() => ShowCreateNestedManyWithoutGenresInputSchema).optional()
}).strict() as z.ZodType<Prisma.GenreCreateWithoutMoviesInput>;

export const GenreUncheckedCreateWithoutMoviesInputSchema: z.ZodType<Prisma.GenreUncheckedCreateWithoutMoviesInput> = z.object({
  id: z.number().int(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  shows: z.lazy(() => ShowUncheckedCreateNestedManyWithoutGenresInputSchema).optional()
}).strict() as z.ZodType<Prisma.GenreUncheckedCreateWithoutMoviesInput>;

export const GenreCreateOrConnectWithoutMoviesInputSchema: z.ZodType<Prisma.GenreCreateOrConnectWithoutMoviesInput> = z.object({
  where: z.lazy(() => GenreWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => GenreCreateWithoutMoviesInputSchema),z.lazy(() => GenreUncheckedCreateWithoutMoviesInputSchema) ]),
}).strict() as z.ZodType<Prisma.GenreCreateOrConnectWithoutMoviesInput>;

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
}).strict() as z.ZodType<Prisma.CelebrityCreateWithoutDirectedMoviesInput>;

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
}).strict() as z.ZodType<Prisma.CelebrityUncheckedCreateWithoutDirectedMoviesInput>;

export const CelebrityCreateOrConnectWithoutDirectedMoviesInputSchema: z.ZodType<Prisma.CelebrityCreateOrConnectWithoutDirectedMoviesInput> = z.object({
  where: z.lazy(() => CelebrityWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CelebrityCreateWithoutDirectedMoviesInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutDirectedMoviesInputSchema) ]),
}).strict() as z.ZodType<Prisma.CelebrityCreateOrConnectWithoutDirectedMoviesInput>;

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
}).strict() as z.ZodType<Prisma.CelebrityCreateWithoutWrittenMoviesInput>;

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
}).strict() as z.ZodType<Prisma.CelebrityUncheckedCreateWithoutWrittenMoviesInput>;

export const CelebrityCreateOrConnectWithoutWrittenMoviesInputSchema: z.ZodType<Prisma.CelebrityCreateOrConnectWithoutWrittenMoviesInput> = z.object({
  where: z.lazy(() => CelebrityWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CelebrityCreateWithoutWrittenMoviesInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutWrittenMoviesInputSchema) ]),
}).strict() as z.ZodType<Prisma.CelebrityCreateOrConnectWithoutWrittenMoviesInput>;

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
}).strict() as z.ZodType<Prisma.CelebrityCreateWithoutStarredMoviesInput>;

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
}).strict() as z.ZodType<Prisma.CelebrityUncheckedCreateWithoutStarredMoviesInput>;

export const CelebrityCreateOrConnectWithoutStarredMoviesInputSchema: z.ZodType<Prisma.CelebrityCreateOrConnectWithoutStarredMoviesInput> = z.object({
  where: z.lazy(() => CelebrityWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CelebrityCreateWithoutStarredMoviesInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutStarredMoviesInputSchema) ]),
}).strict() as z.ZodType<Prisma.CelebrityCreateOrConnectWithoutStarredMoviesInput>;

export const ReviewCreateWithoutMovieInputSchema: z.ZodType<Prisma.ReviewCreateWithoutMovieInput> = z.object({
  id: z.string().optional(),
  rating: z.number(),
  comment: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  show: z.lazy(() => ShowCreateNestedOneWithoutReviewInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutReviewInputSchema)
}).strict() as z.ZodType<Prisma.ReviewCreateWithoutMovieInput>;

export const ReviewUncheckedCreateWithoutMovieInputSchema: z.ZodType<Prisma.ReviewUncheckedCreateWithoutMovieInput> = z.object({
  id: z.string().optional(),
  rating: z.number(),
  comment: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  showId: z.string(),
  userId: z.string()
}).strict() as z.ZodType<Prisma.ReviewUncheckedCreateWithoutMovieInput>;

export const ReviewCreateOrConnectWithoutMovieInputSchema: z.ZodType<Prisma.ReviewCreateOrConnectWithoutMovieInput> = z.object({
  where: z.lazy(() => ReviewWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReviewCreateWithoutMovieInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutMovieInputSchema) ]),
}).strict() as z.ZodType<Prisma.ReviewCreateOrConnectWithoutMovieInput>;

export const ReviewCreateManyMovieInputEnvelopeSchema: z.ZodType<Prisma.ReviewCreateManyMovieInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ReviewCreateManyMovieInputSchema),z.lazy(() => ReviewCreateManyMovieInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.ReviewCreateManyMovieInputEnvelope>;

export const GenreUpsertWithWhereUniqueWithoutMoviesInputSchema: z.ZodType<Prisma.GenreUpsertWithWhereUniqueWithoutMoviesInput> = z.object({
  where: z.lazy(() => GenreWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => GenreUpdateWithoutMoviesInputSchema),z.lazy(() => GenreUncheckedUpdateWithoutMoviesInputSchema) ]),
  create: z.union([ z.lazy(() => GenreCreateWithoutMoviesInputSchema),z.lazy(() => GenreUncheckedCreateWithoutMoviesInputSchema) ]),
}).strict() as z.ZodType<Prisma.GenreUpsertWithWhereUniqueWithoutMoviesInput>;

export const GenreUpdateWithWhereUniqueWithoutMoviesInputSchema: z.ZodType<Prisma.GenreUpdateWithWhereUniqueWithoutMoviesInput> = z.object({
  where: z.lazy(() => GenreWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => GenreUpdateWithoutMoviesInputSchema),z.lazy(() => GenreUncheckedUpdateWithoutMoviesInputSchema) ]),
}).strict() as z.ZodType<Prisma.GenreUpdateWithWhereUniqueWithoutMoviesInput>;

export const GenreUpdateManyWithWhereWithoutMoviesInputSchema: z.ZodType<Prisma.GenreUpdateManyWithWhereWithoutMoviesInput> = z.object({
  where: z.lazy(() => GenreScalarWhereInputSchema),
  data: z.union([ z.lazy(() => GenreUpdateManyMutationInputSchema),z.lazy(() => GenreUncheckedUpdateManyWithoutMoviesInputSchema) ]),
}).strict() as z.ZodType<Prisma.GenreUpdateManyWithWhereWithoutMoviesInput>;

export const GenreScalarWhereInputSchema: z.ZodType<Prisma.GenreScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => GenreScalarWhereInputSchema),z.lazy(() => GenreScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => GenreScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GenreScalarWhereInputSchema),z.lazy(() => GenreScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.GenreScalarWhereInput>;

export const CelebrityUpsertWithoutDirectedMoviesInputSchema: z.ZodType<Prisma.CelebrityUpsertWithoutDirectedMoviesInput> = z.object({
  update: z.union([ z.lazy(() => CelebrityUpdateWithoutDirectedMoviesInputSchema),z.lazy(() => CelebrityUncheckedUpdateWithoutDirectedMoviesInputSchema) ]),
  create: z.union([ z.lazy(() => CelebrityCreateWithoutDirectedMoviesInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutDirectedMoviesInputSchema) ]),
  where: z.lazy(() => CelebrityWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.CelebrityUpsertWithoutDirectedMoviesInput>;

export const CelebrityUpdateToOneWithWhereWithoutDirectedMoviesInputSchema: z.ZodType<Prisma.CelebrityUpdateToOneWithWhereWithoutDirectedMoviesInput> = z.object({
  where: z.lazy(() => CelebrityWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CelebrityUpdateWithoutDirectedMoviesInputSchema),z.lazy(() => CelebrityUncheckedUpdateWithoutDirectedMoviesInputSchema) ]),
}).strict() as z.ZodType<Prisma.CelebrityUpdateToOneWithWhereWithoutDirectedMoviesInput>;

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
}).strict() as z.ZodType<Prisma.CelebrityUpdateWithoutDirectedMoviesInput>;

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
}).strict() as z.ZodType<Prisma.CelebrityUncheckedUpdateWithoutDirectedMoviesInput>;

export const CelebrityUpsertWithWhereUniqueWithoutWrittenMoviesInputSchema: z.ZodType<Prisma.CelebrityUpsertWithWhereUniqueWithoutWrittenMoviesInput> = z.object({
  where: z.lazy(() => CelebrityWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CelebrityUpdateWithoutWrittenMoviesInputSchema),z.lazy(() => CelebrityUncheckedUpdateWithoutWrittenMoviesInputSchema) ]),
  create: z.union([ z.lazy(() => CelebrityCreateWithoutWrittenMoviesInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutWrittenMoviesInputSchema) ]),
}).strict() as z.ZodType<Prisma.CelebrityUpsertWithWhereUniqueWithoutWrittenMoviesInput>;

export const CelebrityUpdateWithWhereUniqueWithoutWrittenMoviesInputSchema: z.ZodType<Prisma.CelebrityUpdateWithWhereUniqueWithoutWrittenMoviesInput> = z.object({
  where: z.lazy(() => CelebrityWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CelebrityUpdateWithoutWrittenMoviesInputSchema),z.lazy(() => CelebrityUncheckedUpdateWithoutWrittenMoviesInputSchema) ]),
}).strict() as z.ZodType<Prisma.CelebrityUpdateWithWhereUniqueWithoutWrittenMoviesInput>;

export const CelebrityUpdateManyWithWhereWithoutWrittenMoviesInputSchema: z.ZodType<Prisma.CelebrityUpdateManyWithWhereWithoutWrittenMoviesInput> = z.object({
  where: z.lazy(() => CelebrityScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CelebrityUpdateManyMutationInputSchema),z.lazy(() => CelebrityUncheckedUpdateManyWithoutWrittenMoviesInputSchema) ]),
}).strict() as z.ZodType<Prisma.CelebrityUpdateManyWithWhereWithoutWrittenMoviesInput>;

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
}).strict() as z.ZodType<Prisma.CelebrityScalarWhereInput>;

export const CelebrityUpsertWithWhereUniqueWithoutStarredMoviesInputSchema: z.ZodType<Prisma.CelebrityUpsertWithWhereUniqueWithoutStarredMoviesInput> = z.object({
  where: z.lazy(() => CelebrityWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CelebrityUpdateWithoutStarredMoviesInputSchema),z.lazy(() => CelebrityUncheckedUpdateWithoutStarredMoviesInputSchema) ]),
  create: z.union([ z.lazy(() => CelebrityCreateWithoutStarredMoviesInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutStarredMoviesInputSchema) ]),
}).strict() as z.ZodType<Prisma.CelebrityUpsertWithWhereUniqueWithoutStarredMoviesInput>;

export const CelebrityUpdateWithWhereUniqueWithoutStarredMoviesInputSchema: z.ZodType<Prisma.CelebrityUpdateWithWhereUniqueWithoutStarredMoviesInput> = z.object({
  where: z.lazy(() => CelebrityWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CelebrityUpdateWithoutStarredMoviesInputSchema),z.lazy(() => CelebrityUncheckedUpdateWithoutStarredMoviesInputSchema) ]),
}).strict() as z.ZodType<Prisma.CelebrityUpdateWithWhereUniqueWithoutStarredMoviesInput>;

export const CelebrityUpdateManyWithWhereWithoutStarredMoviesInputSchema: z.ZodType<Prisma.CelebrityUpdateManyWithWhereWithoutStarredMoviesInput> = z.object({
  where: z.lazy(() => CelebrityScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CelebrityUpdateManyMutationInputSchema),z.lazy(() => CelebrityUncheckedUpdateManyWithoutStarredMoviesInputSchema) ]),
}).strict() as z.ZodType<Prisma.CelebrityUpdateManyWithWhereWithoutStarredMoviesInput>;

export const ReviewUpsertWithWhereUniqueWithoutMovieInputSchema: z.ZodType<Prisma.ReviewUpsertWithWhereUniqueWithoutMovieInput> = z.object({
  where: z.lazy(() => ReviewWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ReviewUpdateWithoutMovieInputSchema),z.lazy(() => ReviewUncheckedUpdateWithoutMovieInputSchema) ]),
  create: z.union([ z.lazy(() => ReviewCreateWithoutMovieInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutMovieInputSchema) ]),
}).strict() as z.ZodType<Prisma.ReviewUpsertWithWhereUniqueWithoutMovieInput>;

export const ReviewUpdateWithWhereUniqueWithoutMovieInputSchema: z.ZodType<Prisma.ReviewUpdateWithWhereUniqueWithoutMovieInput> = z.object({
  where: z.lazy(() => ReviewWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ReviewUpdateWithoutMovieInputSchema),z.lazy(() => ReviewUncheckedUpdateWithoutMovieInputSchema) ]),
}).strict() as z.ZodType<Prisma.ReviewUpdateWithWhereUniqueWithoutMovieInput>;

export const ReviewUpdateManyWithWhereWithoutMovieInputSchema: z.ZodType<Prisma.ReviewUpdateManyWithWhereWithoutMovieInput> = z.object({
  where: z.lazy(() => ReviewScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ReviewUpdateManyMutationInputSchema),z.lazy(() => ReviewUncheckedUpdateManyWithoutMovieInputSchema) ]),
}).strict() as z.ZodType<Prisma.ReviewUpdateManyWithWhereWithoutMovieInput>;

export const GenreCreateWithoutShowsInputSchema: z.ZodType<Prisma.GenreCreateWithoutShowsInput> = z.object({
  id: z.number().int(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  movies: z.lazy(() => MovieCreateNestedManyWithoutGenresInputSchema).optional()
}).strict() as z.ZodType<Prisma.GenreCreateWithoutShowsInput>;

export const GenreUncheckedCreateWithoutShowsInputSchema: z.ZodType<Prisma.GenreUncheckedCreateWithoutShowsInput> = z.object({
  id: z.number().int(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  movies: z.lazy(() => MovieUncheckedCreateNestedManyWithoutGenresInputSchema).optional()
}).strict() as z.ZodType<Prisma.GenreUncheckedCreateWithoutShowsInput>;

export const GenreCreateOrConnectWithoutShowsInputSchema: z.ZodType<Prisma.GenreCreateOrConnectWithoutShowsInput> = z.object({
  where: z.lazy(() => GenreWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => GenreCreateWithoutShowsInputSchema),z.lazy(() => GenreUncheckedCreateWithoutShowsInputSchema) ]),
}).strict() as z.ZodType<Prisma.GenreCreateOrConnectWithoutShowsInput>;

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
}).strict() as z.ZodType<Prisma.CelebrityCreateWithoutDirectedShowsInput>;

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
}).strict() as z.ZodType<Prisma.CelebrityUncheckedCreateWithoutDirectedShowsInput>;

export const CelebrityCreateOrConnectWithoutDirectedShowsInputSchema: z.ZodType<Prisma.CelebrityCreateOrConnectWithoutDirectedShowsInput> = z.object({
  where: z.lazy(() => CelebrityWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CelebrityCreateWithoutDirectedShowsInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutDirectedShowsInputSchema) ]),
}).strict() as z.ZodType<Prisma.CelebrityCreateOrConnectWithoutDirectedShowsInput>;

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
}).strict() as z.ZodType<Prisma.CelebrityCreateWithoutWrittenShowsInput>;

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
}).strict() as z.ZodType<Prisma.CelebrityUncheckedCreateWithoutWrittenShowsInput>;

export const CelebrityCreateOrConnectWithoutWrittenShowsInputSchema: z.ZodType<Prisma.CelebrityCreateOrConnectWithoutWrittenShowsInput> = z.object({
  where: z.lazy(() => CelebrityWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CelebrityCreateWithoutWrittenShowsInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutWrittenShowsInputSchema) ]),
}).strict() as z.ZodType<Prisma.CelebrityCreateOrConnectWithoutWrittenShowsInput>;

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
}).strict() as z.ZodType<Prisma.CelebrityCreateWithoutStarredShowsInput>;

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
}).strict() as z.ZodType<Prisma.CelebrityUncheckedCreateWithoutStarredShowsInput>;

export const CelebrityCreateOrConnectWithoutStarredShowsInputSchema: z.ZodType<Prisma.CelebrityCreateOrConnectWithoutStarredShowsInput> = z.object({
  where: z.lazy(() => CelebrityWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CelebrityCreateWithoutStarredShowsInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutStarredShowsInputSchema) ]),
}).strict() as z.ZodType<Prisma.CelebrityCreateOrConnectWithoutStarredShowsInput>;

export const ReviewCreateWithoutShowInputSchema: z.ZodType<Prisma.ReviewCreateWithoutShowInput> = z.object({
  id: z.string().optional(),
  rating: z.number(),
  comment: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  movie: z.lazy(() => MovieCreateNestedOneWithoutReviewInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutReviewInputSchema)
}).strict() as z.ZodType<Prisma.ReviewCreateWithoutShowInput>;

export const ReviewUncheckedCreateWithoutShowInputSchema: z.ZodType<Prisma.ReviewUncheckedCreateWithoutShowInput> = z.object({
  id: z.string().optional(),
  rating: z.number(),
  comment: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  movieId: z.string(),
  userId: z.string()
}).strict() as z.ZodType<Prisma.ReviewUncheckedCreateWithoutShowInput>;

export const ReviewCreateOrConnectWithoutShowInputSchema: z.ZodType<Prisma.ReviewCreateOrConnectWithoutShowInput> = z.object({
  where: z.lazy(() => ReviewWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReviewCreateWithoutShowInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutShowInputSchema) ]),
}).strict() as z.ZodType<Prisma.ReviewCreateOrConnectWithoutShowInput>;

export const ReviewCreateManyShowInputEnvelopeSchema: z.ZodType<Prisma.ReviewCreateManyShowInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ReviewCreateManyShowInputSchema),z.lazy(() => ReviewCreateManyShowInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.ReviewCreateManyShowInputEnvelope>;

export const GenreUpsertWithWhereUniqueWithoutShowsInputSchema: z.ZodType<Prisma.GenreUpsertWithWhereUniqueWithoutShowsInput> = z.object({
  where: z.lazy(() => GenreWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => GenreUpdateWithoutShowsInputSchema),z.lazy(() => GenreUncheckedUpdateWithoutShowsInputSchema) ]),
  create: z.union([ z.lazy(() => GenreCreateWithoutShowsInputSchema),z.lazy(() => GenreUncheckedCreateWithoutShowsInputSchema) ]),
}).strict() as z.ZodType<Prisma.GenreUpsertWithWhereUniqueWithoutShowsInput>;

export const GenreUpdateWithWhereUniqueWithoutShowsInputSchema: z.ZodType<Prisma.GenreUpdateWithWhereUniqueWithoutShowsInput> = z.object({
  where: z.lazy(() => GenreWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => GenreUpdateWithoutShowsInputSchema),z.lazy(() => GenreUncheckedUpdateWithoutShowsInputSchema) ]),
}).strict() as z.ZodType<Prisma.GenreUpdateWithWhereUniqueWithoutShowsInput>;

export const GenreUpdateManyWithWhereWithoutShowsInputSchema: z.ZodType<Prisma.GenreUpdateManyWithWhereWithoutShowsInput> = z.object({
  where: z.lazy(() => GenreScalarWhereInputSchema),
  data: z.union([ z.lazy(() => GenreUpdateManyMutationInputSchema),z.lazy(() => GenreUncheckedUpdateManyWithoutShowsInputSchema) ]),
}).strict() as z.ZodType<Prisma.GenreUpdateManyWithWhereWithoutShowsInput>;

export const CelebrityUpsertWithoutDirectedShowsInputSchema: z.ZodType<Prisma.CelebrityUpsertWithoutDirectedShowsInput> = z.object({
  update: z.union([ z.lazy(() => CelebrityUpdateWithoutDirectedShowsInputSchema),z.lazy(() => CelebrityUncheckedUpdateWithoutDirectedShowsInputSchema) ]),
  create: z.union([ z.lazy(() => CelebrityCreateWithoutDirectedShowsInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutDirectedShowsInputSchema) ]),
  where: z.lazy(() => CelebrityWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.CelebrityUpsertWithoutDirectedShowsInput>;

export const CelebrityUpdateToOneWithWhereWithoutDirectedShowsInputSchema: z.ZodType<Prisma.CelebrityUpdateToOneWithWhereWithoutDirectedShowsInput> = z.object({
  where: z.lazy(() => CelebrityWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CelebrityUpdateWithoutDirectedShowsInputSchema),z.lazy(() => CelebrityUncheckedUpdateWithoutDirectedShowsInputSchema) ]),
}).strict() as z.ZodType<Prisma.CelebrityUpdateToOneWithWhereWithoutDirectedShowsInput>;

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
}).strict() as z.ZodType<Prisma.CelebrityUpdateWithoutDirectedShowsInput>;

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
}).strict() as z.ZodType<Prisma.CelebrityUncheckedUpdateWithoutDirectedShowsInput>;

export const CelebrityUpsertWithWhereUniqueWithoutWrittenShowsInputSchema: z.ZodType<Prisma.CelebrityUpsertWithWhereUniqueWithoutWrittenShowsInput> = z.object({
  where: z.lazy(() => CelebrityWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CelebrityUpdateWithoutWrittenShowsInputSchema),z.lazy(() => CelebrityUncheckedUpdateWithoutWrittenShowsInputSchema) ]),
  create: z.union([ z.lazy(() => CelebrityCreateWithoutWrittenShowsInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutWrittenShowsInputSchema) ]),
}).strict() as z.ZodType<Prisma.CelebrityUpsertWithWhereUniqueWithoutWrittenShowsInput>;

export const CelebrityUpdateWithWhereUniqueWithoutWrittenShowsInputSchema: z.ZodType<Prisma.CelebrityUpdateWithWhereUniqueWithoutWrittenShowsInput> = z.object({
  where: z.lazy(() => CelebrityWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CelebrityUpdateWithoutWrittenShowsInputSchema),z.lazy(() => CelebrityUncheckedUpdateWithoutWrittenShowsInputSchema) ]),
}).strict() as z.ZodType<Prisma.CelebrityUpdateWithWhereUniqueWithoutWrittenShowsInput>;

export const CelebrityUpdateManyWithWhereWithoutWrittenShowsInputSchema: z.ZodType<Prisma.CelebrityUpdateManyWithWhereWithoutWrittenShowsInput> = z.object({
  where: z.lazy(() => CelebrityScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CelebrityUpdateManyMutationInputSchema),z.lazy(() => CelebrityUncheckedUpdateManyWithoutWrittenShowsInputSchema) ]),
}).strict() as z.ZodType<Prisma.CelebrityUpdateManyWithWhereWithoutWrittenShowsInput>;

export const CelebrityUpsertWithWhereUniqueWithoutStarredShowsInputSchema: z.ZodType<Prisma.CelebrityUpsertWithWhereUniqueWithoutStarredShowsInput> = z.object({
  where: z.lazy(() => CelebrityWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CelebrityUpdateWithoutStarredShowsInputSchema),z.lazy(() => CelebrityUncheckedUpdateWithoutStarredShowsInputSchema) ]),
  create: z.union([ z.lazy(() => CelebrityCreateWithoutStarredShowsInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutStarredShowsInputSchema) ]),
}).strict() as z.ZodType<Prisma.CelebrityUpsertWithWhereUniqueWithoutStarredShowsInput>;

export const CelebrityUpdateWithWhereUniqueWithoutStarredShowsInputSchema: z.ZodType<Prisma.CelebrityUpdateWithWhereUniqueWithoutStarredShowsInput> = z.object({
  where: z.lazy(() => CelebrityWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CelebrityUpdateWithoutStarredShowsInputSchema),z.lazy(() => CelebrityUncheckedUpdateWithoutStarredShowsInputSchema) ]),
}).strict() as z.ZodType<Prisma.CelebrityUpdateWithWhereUniqueWithoutStarredShowsInput>;

export const CelebrityUpdateManyWithWhereWithoutStarredShowsInputSchema: z.ZodType<Prisma.CelebrityUpdateManyWithWhereWithoutStarredShowsInput> = z.object({
  where: z.lazy(() => CelebrityScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CelebrityUpdateManyMutationInputSchema),z.lazy(() => CelebrityUncheckedUpdateManyWithoutStarredShowsInputSchema) ]),
}).strict() as z.ZodType<Prisma.CelebrityUpdateManyWithWhereWithoutStarredShowsInput>;

export const ReviewUpsertWithWhereUniqueWithoutShowInputSchema: z.ZodType<Prisma.ReviewUpsertWithWhereUniqueWithoutShowInput> = z.object({
  where: z.lazy(() => ReviewWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ReviewUpdateWithoutShowInputSchema),z.lazy(() => ReviewUncheckedUpdateWithoutShowInputSchema) ]),
  create: z.union([ z.lazy(() => ReviewCreateWithoutShowInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutShowInputSchema) ]),
}).strict() as z.ZodType<Prisma.ReviewUpsertWithWhereUniqueWithoutShowInput>;

export const ReviewUpdateWithWhereUniqueWithoutShowInputSchema: z.ZodType<Prisma.ReviewUpdateWithWhereUniqueWithoutShowInput> = z.object({
  where: z.lazy(() => ReviewWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ReviewUpdateWithoutShowInputSchema),z.lazy(() => ReviewUncheckedUpdateWithoutShowInputSchema) ]),
}).strict() as z.ZodType<Prisma.ReviewUpdateWithWhereUniqueWithoutShowInput>;

export const ReviewUpdateManyWithWhereWithoutShowInputSchema: z.ZodType<Prisma.ReviewUpdateManyWithWhereWithoutShowInput> = z.object({
  where: z.lazy(() => ReviewScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ReviewUpdateManyMutationInputSchema),z.lazy(() => ReviewUncheckedUpdateManyWithoutShowInputSchema) ]),
}).strict() as z.ZodType<Prisma.ReviewUpdateManyWithWhereWithoutShowInput>;

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
}).strict() as z.ZodType<Prisma.MovieCreateWithoutReviewInput>;

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
}).strict() as z.ZodType<Prisma.MovieUncheckedCreateWithoutReviewInput>;

export const MovieCreateOrConnectWithoutReviewInputSchema: z.ZodType<Prisma.MovieCreateOrConnectWithoutReviewInput> = z.object({
  where: z.lazy(() => MovieWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MovieCreateWithoutReviewInputSchema),z.lazy(() => MovieUncheckedCreateWithoutReviewInputSchema) ]),
}).strict() as z.ZodType<Prisma.MovieCreateOrConnectWithoutReviewInput>;

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
}).strict() as z.ZodType<Prisma.ShowCreateWithoutReviewInput>;

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
}).strict() as z.ZodType<Prisma.ShowUncheckedCreateWithoutReviewInput>;

export const ShowCreateOrConnectWithoutReviewInputSchema: z.ZodType<Prisma.ShowCreateOrConnectWithoutReviewInput> = z.object({
  where: z.lazy(() => ShowWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ShowCreateWithoutReviewInputSchema),z.lazy(() => ShowUncheckedCreateWithoutReviewInputSchema) ]),
}).strict() as z.ZodType<Prisma.ShowCreateOrConnectWithoutReviewInput>;

export const UserCreateWithoutReviewInputSchema: z.ZodType<Prisma.UserCreateWithoutReviewInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string(),
  realName: z.string().optional().nullable(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict() as z.ZodType<Prisma.UserCreateWithoutReviewInput>;

export const UserUncheckedCreateWithoutReviewInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutReviewInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string(),
  realName: z.string().optional().nullable(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict() as z.ZodType<Prisma.UserUncheckedCreateWithoutReviewInput>;

export const UserCreateOrConnectWithoutReviewInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutReviewInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutReviewInputSchema),z.lazy(() => UserUncheckedCreateWithoutReviewInputSchema) ]),
}).strict() as z.ZodType<Prisma.UserCreateOrConnectWithoutReviewInput>;

export const MovieUpsertWithoutReviewInputSchema: z.ZodType<Prisma.MovieUpsertWithoutReviewInput> = z.object({
  update: z.union([ z.lazy(() => MovieUpdateWithoutReviewInputSchema),z.lazy(() => MovieUncheckedUpdateWithoutReviewInputSchema) ]),
  create: z.union([ z.lazy(() => MovieCreateWithoutReviewInputSchema),z.lazy(() => MovieUncheckedCreateWithoutReviewInputSchema) ]),
  where: z.lazy(() => MovieWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.MovieUpsertWithoutReviewInput>;

export const MovieUpdateToOneWithWhereWithoutReviewInputSchema: z.ZodType<Prisma.MovieUpdateToOneWithWhereWithoutReviewInput> = z.object({
  where: z.lazy(() => MovieWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => MovieUpdateWithoutReviewInputSchema),z.lazy(() => MovieUncheckedUpdateWithoutReviewInputSchema) ]),
}).strict() as z.ZodType<Prisma.MovieUpdateToOneWithWhereWithoutReviewInput>;

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
}).strict() as z.ZodType<Prisma.MovieUpdateWithoutReviewInput>;

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
}).strict() as z.ZodType<Prisma.MovieUncheckedUpdateWithoutReviewInput>;

export const ShowUpsertWithoutReviewInputSchema: z.ZodType<Prisma.ShowUpsertWithoutReviewInput> = z.object({
  update: z.union([ z.lazy(() => ShowUpdateWithoutReviewInputSchema),z.lazy(() => ShowUncheckedUpdateWithoutReviewInputSchema) ]),
  create: z.union([ z.lazy(() => ShowCreateWithoutReviewInputSchema),z.lazy(() => ShowUncheckedCreateWithoutReviewInputSchema) ]),
  where: z.lazy(() => ShowWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.ShowUpsertWithoutReviewInput>;

export const ShowUpdateToOneWithWhereWithoutReviewInputSchema: z.ZodType<Prisma.ShowUpdateToOneWithWhereWithoutReviewInput> = z.object({
  where: z.lazy(() => ShowWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ShowUpdateWithoutReviewInputSchema),z.lazy(() => ShowUncheckedUpdateWithoutReviewInputSchema) ]),
}).strict() as z.ZodType<Prisma.ShowUpdateToOneWithWhereWithoutReviewInput>;

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
}).strict() as z.ZodType<Prisma.ShowUpdateWithoutReviewInput>;

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
}).strict() as z.ZodType<Prisma.ShowUncheckedUpdateWithoutReviewInput>;

export const UserUpsertWithoutReviewInputSchema: z.ZodType<Prisma.UserUpsertWithoutReviewInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutReviewInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReviewInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutReviewInputSchema),z.lazy(() => UserUncheckedCreateWithoutReviewInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUpsertWithoutReviewInput>;

export const UserUpdateToOneWithWhereWithoutReviewInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutReviewInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutReviewInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReviewInputSchema) ]),
}).strict() as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutReviewInput>;

export const UserUpdateWithoutReviewInputSchema: z.ZodType<Prisma.UserUpdateWithoutReviewInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  realName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.UserUpdateWithoutReviewInput>;

export const UserUncheckedUpdateWithoutReviewInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutReviewInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  realName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.UserUncheckedUpdateWithoutReviewInput>;

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
}).strict() as z.ZodType<Prisma.MovieCreateWithoutGenresInput>;

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
}).strict() as z.ZodType<Prisma.MovieUncheckedCreateWithoutGenresInput>;

export const MovieCreateOrConnectWithoutGenresInputSchema: z.ZodType<Prisma.MovieCreateOrConnectWithoutGenresInput> = z.object({
  where: z.lazy(() => MovieWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MovieCreateWithoutGenresInputSchema),z.lazy(() => MovieUncheckedCreateWithoutGenresInputSchema) ]),
}).strict() as z.ZodType<Prisma.MovieCreateOrConnectWithoutGenresInput>;

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
}).strict() as z.ZodType<Prisma.ShowCreateWithoutGenresInput>;

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
}).strict() as z.ZodType<Prisma.ShowUncheckedCreateWithoutGenresInput>;

export const ShowCreateOrConnectWithoutGenresInputSchema: z.ZodType<Prisma.ShowCreateOrConnectWithoutGenresInput> = z.object({
  where: z.lazy(() => ShowWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ShowCreateWithoutGenresInputSchema),z.lazy(() => ShowUncheckedCreateWithoutGenresInputSchema) ]),
}).strict() as z.ZodType<Prisma.ShowCreateOrConnectWithoutGenresInput>;

export const MovieUpsertWithWhereUniqueWithoutGenresInputSchema: z.ZodType<Prisma.MovieUpsertWithWhereUniqueWithoutGenresInput> = z.object({
  where: z.lazy(() => MovieWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MovieUpdateWithoutGenresInputSchema),z.lazy(() => MovieUncheckedUpdateWithoutGenresInputSchema) ]),
  create: z.union([ z.lazy(() => MovieCreateWithoutGenresInputSchema),z.lazy(() => MovieUncheckedCreateWithoutGenresInputSchema) ]),
}).strict() as z.ZodType<Prisma.MovieUpsertWithWhereUniqueWithoutGenresInput>;

export const MovieUpdateWithWhereUniqueWithoutGenresInputSchema: z.ZodType<Prisma.MovieUpdateWithWhereUniqueWithoutGenresInput> = z.object({
  where: z.lazy(() => MovieWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MovieUpdateWithoutGenresInputSchema),z.lazy(() => MovieUncheckedUpdateWithoutGenresInputSchema) ]),
}).strict() as z.ZodType<Prisma.MovieUpdateWithWhereUniqueWithoutGenresInput>;

export const MovieUpdateManyWithWhereWithoutGenresInputSchema: z.ZodType<Prisma.MovieUpdateManyWithWhereWithoutGenresInput> = z.object({
  where: z.lazy(() => MovieScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MovieUpdateManyMutationInputSchema),z.lazy(() => MovieUncheckedUpdateManyWithoutGenresInputSchema) ]),
}).strict() as z.ZodType<Prisma.MovieUpdateManyWithWhereWithoutGenresInput>;

export const ShowUpsertWithWhereUniqueWithoutGenresInputSchema: z.ZodType<Prisma.ShowUpsertWithWhereUniqueWithoutGenresInput> = z.object({
  where: z.lazy(() => ShowWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ShowUpdateWithoutGenresInputSchema),z.lazy(() => ShowUncheckedUpdateWithoutGenresInputSchema) ]),
  create: z.union([ z.lazy(() => ShowCreateWithoutGenresInputSchema),z.lazy(() => ShowUncheckedCreateWithoutGenresInputSchema) ]),
}).strict() as z.ZodType<Prisma.ShowUpsertWithWhereUniqueWithoutGenresInput>;

export const ShowUpdateWithWhereUniqueWithoutGenresInputSchema: z.ZodType<Prisma.ShowUpdateWithWhereUniqueWithoutGenresInput> = z.object({
  where: z.lazy(() => ShowWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ShowUpdateWithoutGenresInputSchema),z.lazy(() => ShowUncheckedUpdateWithoutGenresInputSchema) ]),
}).strict() as z.ZodType<Prisma.ShowUpdateWithWhereUniqueWithoutGenresInput>;

export const ShowUpdateManyWithWhereWithoutGenresInputSchema: z.ZodType<Prisma.ShowUpdateManyWithWhereWithoutGenresInput> = z.object({
  where: z.lazy(() => ShowScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ShowUpdateManyMutationInputSchema),z.lazy(() => ShowUncheckedUpdateManyWithoutGenresInputSchema) ]),
}).strict() as z.ZodType<Prisma.ShowUpdateManyWithWhereWithoutGenresInput>;

export const ReviewCreateManyUserInputSchema: z.ZodType<Prisma.ReviewCreateManyUserInput> = z.object({
  id: z.string().optional(),
  rating: z.number(),
  comment: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  movieId: z.string(),
  showId: z.string()
}).strict() as z.ZodType<Prisma.ReviewCreateManyUserInput>;

export const ReviewUpdateWithoutUserInputSchema: z.ZodType<Prisma.ReviewUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  movie: z.lazy(() => MovieUpdateOneRequiredWithoutReviewNestedInputSchema).optional(),
  show: z.lazy(() => ShowUpdateOneRequiredWithoutReviewNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.ReviewUpdateWithoutUserInput>;

export const ReviewUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  movieId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  showId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.ReviewUncheckedUpdateWithoutUserInput>;

export const ReviewUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  movieId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  showId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.ReviewUncheckedUpdateManyWithoutUserInput>;

export const MovieCreateManyDirectorInputSchema: z.ZodType<Prisma.MovieCreateManyDirectorInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict() as z.ZodType<Prisma.MovieCreateManyDirectorInput>;

export const ShowCreateManyDirectorInputSchema: z.ZodType<Prisma.ShowCreateManyDirectorInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict() as z.ZodType<Prisma.ShowCreateManyDirectorInput>;

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
}).strict() as z.ZodType<Prisma.MovieUpdateWithoutDirectorInput>;

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
}).strict() as z.ZodType<Prisma.MovieUncheckedUpdateWithoutDirectorInput>;

export const MovieUncheckedUpdateManyWithoutDirectorInputSchema: z.ZodType<Prisma.MovieUncheckedUpdateManyWithoutDirectorInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.MovieUncheckedUpdateManyWithoutDirectorInput>;

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
}).strict() as z.ZodType<Prisma.MovieUpdateWithoutWritersInput>;

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
}).strict() as z.ZodType<Prisma.MovieUncheckedUpdateWithoutWritersInput>;

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
}).strict() as z.ZodType<Prisma.MovieUncheckedUpdateManyWithoutWritersInput>;

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
}).strict() as z.ZodType<Prisma.MovieUpdateWithoutStarringInput>;

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
}).strict() as z.ZodType<Prisma.MovieUncheckedUpdateWithoutStarringInput>;

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
}).strict() as z.ZodType<Prisma.MovieUncheckedUpdateManyWithoutStarringInput>;

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
}).strict() as z.ZodType<Prisma.ShowUpdateWithoutStarringInput>;

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
}).strict() as z.ZodType<Prisma.ShowUncheckedUpdateWithoutStarringInput>;

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
}).strict() as z.ZodType<Prisma.ShowUncheckedUpdateManyWithoutStarringInput>;

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
}).strict() as z.ZodType<Prisma.ShowUpdateWithoutWritersInput>;

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
}).strict() as z.ZodType<Prisma.ShowUncheckedUpdateWithoutWritersInput>;

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
}).strict() as z.ZodType<Prisma.ShowUncheckedUpdateManyWithoutWritersInput>;

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
}).strict() as z.ZodType<Prisma.ShowUpdateWithoutDirectorInput>;

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
}).strict() as z.ZodType<Prisma.ShowUncheckedUpdateWithoutDirectorInput>;

export const ShowUncheckedUpdateManyWithoutDirectorInputSchema: z.ZodType<Prisma.ShowUncheckedUpdateManyWithoutDirectorInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.ShowUncheckedUpdateManyWithoutDirectorInput>;

export const ReviewCreateManyMovieInputSchema: z.ZodType<Prisma.ReviewCreateManyMovieInput> = z.object({
  id: z.string().optional(),
  rating: z.number(),
  comment: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  showId: z.string(),
  userId: z.string()
}).strict() as z.ZodType<Prisma.ReviewCreateManyMovieInput>;

export const GenreUpdateWithoutMoviesInputSchema: z.ZodType<Prisma.GenreUpdateWithoutMoviesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  shows: z.lazy(() => ShowUpdateManyWithoutGenresNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.GenreUpdateWithoutMoviesInput>;

export const GenreUncheckedUpdateWithoutMoviesInputSchema: z.ZodType<Prisma.GenreUncheckedUpdateWithoutMoviesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  shows: z.lazy(() => ShowUncheckedUpdateManyWithoutGenresNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.GenreUncheckedUpdateWithoutMoviesInput>;

export const GenreUncheckedUpdateManyWithoutMoviesInputSchema: z.ZodType<Prisma.GenreUncheckedUpdateManyWithoutMoviesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.GenreUncheckedUpdateManyWithoutMoviesInput>;

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
}).strict() as z.ZodType<Prisma.CelebrityUpdateWithoutWrittenMoviesInput>;

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
}).strict() as z.ZodType<Prisma.CelebrityUncheckedUpdateWithoutWrittenMoviesInput>;

export const CelebrityUncheckedUpdateManyWithoutWrittenMoviesInputSchema: z.ZodType<Prisma.CelebrityUncheckedUpdateManyWithoutWrittenMoviesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.CelebrityUncheckedUpdateManyWithoutWrittenMoviesInput>;

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
}).strict() as z.ZodType<Prisma.CelebrityUpdateWithoutStarredMoviesInput>;

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
}).strict() as z.ZodType<Prisma.CelebrityUncheckedUpdateWithoutStarredMoviesInput>;

export const CelebrityUncheckedUpdateManyWithoutStarredMoviesInputSchema: z.ZodType<Prisma.CelebrityUncheckedUpdateManyWithoutStarredMoviesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.CelebrityUncheckedUpdateManyWithoutStarredMoviesInput>;

export const ReviewUpdateWithoutMovieInputSchema: z.ZodType<Prisma.ReviewUpdateWithoutMovieInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  show: z.lazy(() => ShowUpdateOneRequiredWithoutReviewNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutReviewNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.ReviewUpdateWithoutMovieInput>;

export const ReviewUncheckedUpdateWithoutMovieInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateWithoutMovieInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  showId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.ReviewUncheckedUpdateWithoutMovieInput>;

export const ReviewUncheckedUpdateManyWithoutMovieInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateManyWithoutMovieInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  showId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.ReviewUncheckedUpdateManyWithoutMovieInput>;

export const ReviewCreateManyShowInputSchema: z.ZodType<Prisma.ReviewCreateManyShowInput> = z.object({
  id: z.string().optional(),
  rating: z.number(),
  comment: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  movieId: z.string(),
  userId: z.string()
}).strict() as z.ZodType<Prisma.ReviewCreateManyShowInput>;

export const GenreUpdateWithoutShowsInputSchema: z.ZodType<Prisma.GenreUpdateWithoutShowsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  movies: z.lazy(() => MovieUpdateManyWithoutGenresNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.GenreUpdateWithoutShowsInput>;

export const GenreUncheckedUpdateWithoutShowsInputSchema: z.ZodType<Prisma.GenreUncheckedUpdateWithoutShowsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  movies: z.lazy(() => MovieUncheckedUpdateManyWithoutGenresNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.GenreUncheckedUpdateWithoutShowsInput>;

export const GenreUncheckedUpdateManyWithoutShowsInputSchema: z.ZodType<Prisma.GenreUncheckedUpdateManyWithoutShowsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.GenreUncheckedUpdateManyWithoutShowsInput>;

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
}).strict() as z.ZodType<Prisma.CelebrityUpdateWithoutWrittenShowsInput>;

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
}).strict() as z.ZodType<Prisma.CelebrityUncheckedUpdateWithoutWrittenShowsInput>;

export const CelebrityUncheckedUpdateManyWithoutWrittenShowsInputSchema: z.ZodType<Prisma.CelebrityUncheckedUpdateManyWithoutWrittenShowsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.CelebrityUncheckedUpdateManyWithoutWrittenShowsInput>;

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
}).strict() as z.ZodType<Prisma.CelebrityUpdateWithoutStarredShowsInput>;

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
}).strict() as z.ZodType<Prisma.CelebrityUncheckedUpdateWithoutStarredShowsInput>;

export const CelebrityUncheckedUpdateManyWithoutStarredShowsInputSchema: z.ZodType<Prisma.CelebrityUncheckedUpdateManyWithoutStarredShowsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.CelebrityUncheckedUpdateManyWithoutStarredShowsInput>;

export const ReviewUpdateWithoutShowInputSchema: z.ZodType<Prisma.ReviewUpdateWithoutShowInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  movie: z.lazy(() => MovieUpdateOneRequiredWithoutReviewNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutReviewNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.ReviewUpdateWithoutShowInput>;

export const ReviewUncheckedUpdateWithoutShowInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateWithoutShowInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  movieId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.ReviewUncheckedUpdateWithoutShowInput>;

export const ReviewUncheckedUpdateManyWithoutShowInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateManyWithoutShowInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  movieId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.ReviewUncheckedUpdateManyWithoutShowInput>;

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
}).strict() as z.ZodType<Prisma.MovieUpdateWithoutGenresInput>;

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
}).strict() as z.ZodType<Prisma.MovieUncheckedUpdateWithoutGenresInput>;

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
}).strict() as z.ZodType<Prisma.MovieUncheckedUpdateManyWithoutGenresInput>;

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
}).strict() as z.ZodType<Prisma.ShowUpdateWithoutGenresInput>;

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
}).strict() as z.ZodType<Prisma.ShowUncheckedUpdateWithoutGenresInput>;

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
}).strict() as z.ZodType<Prisma.ShowUncheckedUpdateManyWithoutGenresInput>;

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
}).strict() as z.ZodType<Prisma.UserFindFirstArgs>;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.UserFindFirstOrThrowArgs>;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.UserFindManyArgs>;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.UserAggregateArgs>;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.UserGroupByArgs>;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.UserFindUniqueArgs>;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.UserFindUniqueOrThrowArgs>;

export const CelebrityFindFirstArgsSchema: z.ZodType<Prisma.CelebrityFindFirstArgs> = z.object({
  select: CelebritySelectSchema.optional(),
  include: CelebrityIncludeSchema.optional(),
  where: CelebrityWhereInputSchema.optional(),
  orderBy: z.union([ CelebrityOrderByWithRelationInputSchema.array(),CelebrityOrderByWithRelationInputSchema ]).optional(),
  cursor: CelebrityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CelebrityScalarFieldEnumSchema,CelebrityScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.CelebrityFindFirstArgs>;

export const CelebrityFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CelebrityFindFirstOrThrowArgs> = z.object({
  select: CelebritySelectSchema.optional(),
  include: CelebrityIncludeSchema.optional(),
  where: CelebrityWhereInputSchema.optional(),
  orderBy: z.union([ CelebrityOrderByWithRelationInputSchema.array(),CelebrityOrderByWithRelationInputSchema ]).optional(),
  cursor: CelebrityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CelebrityScalarFieldEnumSchema,CelebrityScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.CelebrityFindFirstOrThrowArgs>;

export const CelebrityFindManyArgsSchema: z.ZodType<Prisma.CelebrityFindManyArgs> = z.object({
  select: CelebritySelectSchema.optional(),
  include: CelebrityIncludeSchema.optional(),
  where: CelebrityWhereInputSchema.optional(),
  orderBy: z.union([ CelebrityOrderByWithRelationInputSchema.array(),CelebrityOrderByWithRelationInputSchema ]).optional(),
  cursor: CelebrityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CelebrityScalarFieldEnumSchema,CelebrityScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.CelebrityFindManyArgs>;

export const CelebrityAggregateArgsSchema: z.ZodType<Prisma.CelebrityAggregateArgs> = z.object({
  where: CelebrityWhereInputSchema.optional(),
  orderBy: z.union([ CelebrityOrderByWithRelationInputSchema.array(),CelebrityOrderByWithRelationInputSchema ]).optional(),
  cursor: CelebrityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.CelebrityAggregateArgs>;

export const CelebrityGroupByArgsSchema: z.ZodType<Prisma.CelebrityGroupByArgs> = z.object({
  where: CelebrityWhereInputSchema.optional(),
  orderBy: z.union([ CelebrityOrderByWithAggregationInputSchema.array(),CelebrityOrderByWithAggregationInputSchema ]).optional(),
  by: CelebrityScalarFieldEnumSchema.array(),
  having: CelebrityScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.CelebrityGroupByArgs>;

export const CelebrityFindUniqueArgsSchema: z.ZodType<Prisma.CelebrityFindUniqueArgs> = z.object({
  select: CelebritySelectSchema.optional(),
  include: CelebrityIncludeSchema.optional(),
  where: CelebrityWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CelebrityFindUniqueArgs>;

export const CelebrityFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CelebrityFindUniqueOrThrowArgs> = z.object({
  select: CelebritySelectSchema.optional(),
  include: CelebrityIncludeSchema.optional(),
  where: CelebrityWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CelebrityFindUniqueOrThrowArgs>;

export const MovieFindFirstArgsSchema: z.ZodType<Prisma.MovieFindFirstArgs> = z.object({
  select: MovieSelectSchema.optional(),
  include: MovieIncludeSchema.optional(),
  where: MovieWhereInputSchema.optional(),
  orderBy: z.union([ MovieOrderByWithRelationInputSchema.array(),MovieOrderByWithRelationInputSchema ]).optional(),
  cursor: MovieWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MovieScalarFieldEnumSchema,MovieScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.MovieFindFirstArgs>;

export const MovieFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MovieFindFirstOrThrowArgs> = z.object({
  select: MovieSelectSchema.optional(),
  include: MovieIncludeSchema.optional(),
  where: MovieWhereInputSchema.optional(),
  orderBy: z.union([ MovieOrderByWithRelationInputSchema.array(),MovieOrderByWithRelationInputSchema ]).optional(),
  cursor: MovieWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MovieScalarFieldEnumSchema,MovieScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.MovieFindFirstOrThrowArgs>;

export const MovieFindManyArgsSchema: z.ZodType<Prisma.MovieFindManyArgs> = z.object({
  select: MovieSelectSchema.optional(),
  include: MovieIncludeSchema.optional(),
  where: MovieWhereInputSchema.optional(),
  orderBy: z.union([ MovieOrderByWithRelationInputSchema.array(),MovieOrderByWithRelationInputSchema ]).optional(),
  cursor: MovieWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MovieScalarFieldEnumSchema,MovieScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.MovieFindManyArgs>;

export const MovieAggregateArgsSchema: z.ZodType<Prisma.MovieAggregateArgs> = z.object({
  where: MovieWhereInputSchema.optional(),
  orderBy: z.union([ MovieOrderByWithRelationInputSchema.array(),MovieOrderByWithRelationInputSchema ]).optional(),
  cursor: MovieWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.MovieAggregateArgs>;

export const MovieGroupByArgsSchema: z.ZodType<Prisma.MovieGroupByArgs> = z.object({
  where: MovieWhereInputSchema.optional(),
  orderBy: z.union([ MovieOrderByWithAggregationInputSchema.array(),MovieOrderByWithAggregationInputSchema ]).optional(),
  by: MovieScalarFieldEnumSchema.array(),
  having: MovieScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.MovieGroupByArgs>;

export const MovieFindUniqueArgsSchema: z.ZodType<Prisma.MovieFindUniqueArgs> = z.object({
  select: MovieSelectSchema.optional(),
  include: MovieIncludeSchema.optional(),
  where: MovieWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.MovieFindUniqueArgs>;

export const MovieFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MovieFindUniqueOrThrowArgs> = z.object({
  select: MovieSelectSchema.optional(),
  include: MovieIncludeSchema.optional(),
  where: MovieWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.MovieFindUniqueOrThrowArgs>;

export const ShowFindFirstArgsSchema: z.ZodType<Prisma.ShowFindFirstArgs> = z.object({
  select: ShowSelectSchema.optional(),
  include: ShowIncludeSchema.optional(),
  where: ShowWhereInputSchema.optional(),
  orderBy: z.union([ ShowOrderByWithRelationInputSchema.array(),ShowOrderByWithRelationInputSchema ]).optional(),
  cursor: ShowWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ShowScalarFieldEnumSchema,ShowScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.ShowFindFirstArgs>;

export const ShowFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ShowFindFirstOrThrowArgs> = z.object({
  select: ShowSelectSchema.optional(),
  include: ShowIncludeSchema.optional(),
  where: ShowWhereInputSchema.optional(),
  orderBy: z.union([ ShowOrderByWithRelationInputSchema.array(),ShowOrderByWithRelationInputSchema ]).optional(),
  cursor: ShowWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ShowScalarFieldEnumSchema,ShowScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.ShowFindFirstOrThrowArgs>;

export const ShowFindManyArgsSchema: z.ZodType<Prisma.ShowFindManyArgs> = z.object({
  select: ShowSelectSchema.optional(),
  include: ShowIncludeSchema.optional(),
  where: ShowWhereInputSchema.optional(),
  orderBy: z.union([ ShowOrderByWithRelationInputSchema.array(),ShowOrderByWithRelationInputSchema ]).optional(),
  cursor: ShowWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ShowScalarFieldEnumSchema,ShowScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.ShowFindManyArgs>;

export const ShowAggregateArgsSchema: z.ZodType<Prisma.ShowAggregateArgs> = z.object({
  where: ShowWhereInputSchema.optional(),
  orderBy: z.union([ ShowOrderByWithRelationInputSchema.array(),ShowOrderByWithRelationInputSchema ]).optional(),
  cursor: ShowWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.ShowAggregateArgs>;

export const ShowGroupByArgsSchema: z.ZodType<Prisma.ShowGroupByArgs> = z.object({
  where: ShowWhereInputSchema.optional(),
  orderBy: z.union([ ShowOrderByWithAggregationInputSchema.array(),ShowOrderByWithAggregationInputSchema ]).optional(),
  by: ShowScalarFieldEnumSchema.array(),
  having: ShowScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.ShowGroupByArgs>;

export const ShowFindUniqueArgsSchema: z.ZodType<Prisma.ShowFindUniqueArgs> = z.object({
  select: ShowSelectSchema.optional(),
  include: ShowIncludeSchema.optional(),
  where: ShowWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ShowFindUniqueArgs>;

export const ShowFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ShowFindUniqueOrThrowArgs> = z.object({
  select: ShowSelectSchema.optional(),
  include: ShowIncludeSchema.optional(),
  where: ShowWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ShowFindUniqueOrThrowArgs>;

export const ReviewFindFirstArgsSchema: z.ZodType<Prisma.ReviewFindFirstArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  include: ReviewIncludeSchema.optional(),
  where: ReviewWhereInputSchema.optional(),
  orderBy: z.union([ ReviewOrderByWithRelationInputSchema.array(),ReviewOrderByWithRelationInputSchema ]).optional(),
  cursor: ReviewWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReviewScalarFieldEnumSchema,ReviewScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.ReviewFindFirstArgs>;

export const ReviewFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ReviewFindFirstOrThrowArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  include: ReviewIncludeSchema.optional(),
  where: ReviewWhereInputSchema.optional(),
  orderBy: z.union([ ReviewOrderByWithRelationInputSchema.array(),ReviewOrderByWithRelationInputSchema ]).optional(),
  cursor: ReviewWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReviewScalarFieldEnumSchema,ReviewScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.ReviewFindFirstOrThrowArgs>;

export const ReviewFindManyArgsSchema: z.ZodType<Prisma.ReviewFindManyArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  include: ReviewIncludeSchema.optional(),
  where: ReviewWhereInputSchema.optional(),
  orderBy: z.union([ ReviewOrderByWithRelationInputSchema.array(),ReviewOrderByWithRelationInputSchema ]).optional(),
  cursor: ReviewWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReviewScalarFieldEnumSchema,ReviewScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.ReviewFindManyArgs>;

export const ReviewAggregateArgsSchema: z.ZodType<Prisma.ReviewAggregateArgs> = z.object({
  where: ReviewWhereInputSchema.optional(),
  orderBy: z.union([ ReviewOrderByWithRelationInputSchema.array(),ReviewOrderByWithRelationInputSchema ]).optional(),
  cursor: ReviewWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.ReviewAggregateArgs>;

export const ReviewGroupByArgsSchema: z.ZodType<Prisma.ReviewGroupByArgs> = z.object({
  where: ReviewWhereInputSchema.optional(),
  orderBy: z.union([ ReviewOrderByWithAggregationInputSchema.array(),ReviewOrderByWithAggregationInputSchema ]).optional(),
  by: ReviewScalarFieldEnumSchema.array(),
  having: ReviewScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.ReviewGroupByArgs>;

export const ReviewFindUniqueArgsSchema: z.ZodType<Prisma.ReviewFindUniqueArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  include: ReviewIncludeSchema.optional(),
  where: ReviewWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ReviewFindUniqueArgs>;

export const ReviewFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ReviewFindUniqueOrThrowArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  include: ReviewIncludeSchema.optional(),
  where: ReviewWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ReviewFindUniqueOrThrowArgs>;

export const GenreFindFirstArgsSchema: z.ZodType<Prisma.GenreFindFirstArgs> = z.object({
  select: GenreSelectSchema.optional(),
  include: GenreIncludeSchema.optional(),
  where: GenreWhereInputSchema.optional(),
  orderBy: z.union([ GenreOrderByWithRelationInputSchema.array(),GenreOrderByWithRelationInputSchema ]).optional(),
  cursor: GenreWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GenreScalarFieldEnumSchema,GenreScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.GenreFindFirstArgs>;

export const GenreFindFirstOrThrowArgsSchema: z.ZodType<Prisma.GenreFindFirstOrThrowArgs> = z.object({
  select: GenreSelectSchema.optional(),
  include: GenreIncludeSchema.optional(),
  where: GenreWhereInputSchema.optional(),
  orderBy: z.union([ GenreOrderByWithRelationInputSchema.array(),GenreOrderByWithRelationInputSchema ]).optional(),
  cursor: GenreWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GenreScalarFieldEnumSchema,GenreScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.GenreFindFirstOrThrowArgs>;

export const GenreFindManyArgsSchema: z.ZodType<Prisma.GenreFindManyArgs> = z.object({
  select: GenreSelectSchema.optional(),
  include: GenreIncludeSchema.optional(),
  where: GenreWhereInputSchema.optional(),
  orderBy: z.union([ GenreOrderByWithRelationInputSchema.array(),GenreOrderByWithRelationInputSchema ]).optional(),
  cursor: GenreWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GenreScalarFieldEnumSchema,GenreScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.GenreFindManyArgs>;

export const GenreAggregateArgsSchema: z.ZodType<Prisma.GenreAggregateArgs> = z.object({
  where: GenreWhereInputSchema.optional(),
  orderBy: z.union([ GenreOrderByWithRelationInputSchema.array(),GenreOrderByWithRelationInputSchema ]).optional(),
  cursor: GenreWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.GenreAggregateArgs>;

export const GenreGroupByArgsSchema: z.ZodType<Prisma.GenreGroupByArgs> = z.object({
  where: GenreWhereInputSchema.optional(),
  orderBy: z.union([ GenreOrderByWithAggregationInputSchema.array(),GenreOrderByWithAggregationInputSchema ]).optional(),
  by: GenreScalarFieldEnumSchema.array(),
  having: GenreScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.GenreGroupByArgs>;

export const GenreFindUniqueArgsSchema: z.ZodType<Prisma.GenreFindUniqueArgs> = z.object({
  select: GenreSelectSchema.optional(),
  include: GenreIncludeSchema.optional(),
  where: GenreWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.GenreFindUniqueArgs>;

export const GenreFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.GenreFindUniqueOrThrowArgs> = z.object({
  select: GenreSelectSchema.optional(),
  include: GenreIncludeSchema.optional(),
  where: GenreWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.GenreFindUniqueOrThrowArgs>;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.UserCreateArgs>;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.UserUpsertArgs>;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.UserCreateManyArgs>;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.UserCreateManyAndReturnArgs>;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.UserDeleteArgs>;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.UserUpdateArgs>;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.UserUpdateManyArgs>;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.UserDeleteManyArgs>;

export const CelebrityCreateArgsSchema: z.ZodType<Prisma.CelebrityCreateArgs> = z.object({
  select: CelebritySelectSchema.optional(),
  include: CelebrityIncludeSchema.optional(),
  data: z.union([ CelebrityCreateInputSchema,CelebrityUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.CelebrityCreateArgs>;

export const CelebrityUpsertArgsSchema: z.ZodType<Prisma.CelebrityUpsertArgs> = z.object({
  select: CelebritySelectSchema.optional(),
  include: CelebrityIncludeSchema.optional(),
  where: CelebrityWhereUniqueInputSchema,
  create: z.union([ CelebrityCreateInputSchema,CelebrityUncheckedCreateInputSchema ]),
  update: z.union([ CelebrityUpdateInputSchema,CelebrityUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.CelebrityUpsertArgs>;

export const CelebrityCreateManyArgsSchema: z.ZodType<Prisma.CelebrityCreateManyArgs> = z.object({
  data: z.union([ CelebrityCreateManyInputSchema,CelebrityCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.CelebrityCreateManyArgs>;

export const CelebrityCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CelebrityCreateManyAndReturnArgs> = z.object({
  data: z.union([ CelebrityCreateManyInputSchema,CelebrityCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.CelebrityCreateManyAndReturnArgs>;

export const CelebrityDeleteArgsSchema: z.ZodType<Prisma.CelebrityDeleteArgs> = z.object({
  select: CelebritySelectSchema.optional(),
  include: CelebrityIncludeSchema.optional(),
  where: CelebrityWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CelebrityDeleteArgs>;

export const CelebrityUpdateArgsSchema: z.ZodType<Prisma.CelebrityUpdateArgs> = z.object({
  select: CelebritySelectSchema.optional(),
  include: CelebrityIncludeSchema.optional(),
  data: z.union([ CelebrityUpdateInputSchema,CelebrityUncheckedUpdateInputSchema ]),
  where: CelebrityWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CelebrityUpdateArgs>;

export const CelebrityUpdateManyArgsSchema: z.ZodType<Prisma.CelebrityUpdateManyArgs> = z.object({
  data: z.union([ CelebrityUpdateManyMutationInputSchema,CelebrityUncheckedUpdateManyInputSchema ]),
  where: CelebrityWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.CelebrityUpdateManyArgs>;

export const CelebrityDeleteManyArgsSchema: z.ZodType<Prisma.CelebrityDeleteManyArgs> = z.object({
  where: CelebrityWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.CelebrityDeleteManyArgs>;

export const MovieCreateArgsSchema: z.ZodType<Prisma.MovieCreateArgs> = z.object({
  select: MovieSelectSchema.optional(),
  include: MovieIncludeSchema.optional(),
  data: z.union([ MovieCreateInputSchema,MovieUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.MovieCreateArgs>;

export const MovieUpsertArgsSchema: z.ZodType<Prisma.MovieUpsertArgs> = z.object({
  select: MovieSelectSchema.optional(),
  include: MovieIncludeSchema.optional(),
  where: MovieWhereUniqueInputSchema,
  create: z.union([ MovieCreateInputSchema,MovieUncheckedCreateInputSchema ]),
  update: z.union([ MovieUpdateInputSchema,MovieUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.MovieUpsertArgs>;

export const MovieCreateManyArgsSchema: z.ZodType<Prisma.MovieCreateManyArgs> = z.object({
  data: z.union([ MovieCreateManyInputSchema,MovieCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.MovieCreateManyArgs>;

export const MovieCreateManyAndReturnArgsSchema: z.ZodType<Prisma.MovieCreateManyAndReturnArgs> = z.object({
  data: z.union([ MovieCreateManyInputSchema,MovieCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.MovieCreateManyAndReturnArgs>;

export const MovieDeleteArgsSchema: z.ZodType<Prisma.MovieDeleteArgs> = z.object({
  select: MovieSelectSchema.optional(),
  include: MovieIncludeSchema.optional(),
  where: MovieWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.MovieDeleteArgs>;

export const MovieUpdateArgsSchema: z.ZodType<Prisma.MovieUpdateArgs> = z.object({
  select: MovieSelectSchema.optional(),
  include: MovieIncludeSchema.optional(),
  data: z.union([ MovieUpdateInputSchema,MovieUncheckedUpdateInputSchema ]),
  where: MovieWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.MovieUpdateArgs>;

export const MovieUpdateManyArgsSchema: z.ZodType<Prisma.MovieUpdateManyArgs> = z.object({
  data: z.union([ MovieUpdateManyMutationInputSchema,MovieUncheckedUpdateManyInputSchema ]),
  where: MovieWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.MovieUpdateManyArgs>;

export const MovieDeleteManyArgsSchema: z.ZodType<Prisma.MovieDeleteManyArgs> = z.object({
  where: MovieWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.MovieDeleteManyArgs>;

export const ShowCreateArgsSchema: z.ZodType<Prisma.ShowCreateArgs> = z.object({
  select: ShowSelectSchema.optional(),
  include: ShowIncludeSchema.optional(),
  data: z.union([ ShowCreateInputSchema,ShowUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.ShowCreateArgs>;

export const ShowUpsertArgsSchema: z.ZodType<Prisma.ShowUpsertArgs> = z.object({
  select: ShowSelectSchema.optional(),
  include: ShowIncludeSchema.optional(),
  where: ShowWhereUniqueInputSchema,
  create: z.union([ ShowCreateInputSchema,ShowUncheckedCreateInputSchema ]),
  update: z.union([ ShowUpdateInputSchema,ShowUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.ShowUpsertArgs>;

export const ShowCreateManyArgsSchema: z.ZodType<Prisma.ShowCreateManyArgs> = z.object({
  data: z.union([ ShowCreateManyInputSchema,ShowCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.ShowCreateManyArgs>;

export const ShowCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ShowCreateManyAndReturnArgs> = z.object({
  data: z.union([ ShowCreateManyInputSchema,ShowCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.ShowCreateManyAndReturnArgs>;

export const ShowDeleteArgsSchema: z.ZodType<Prisma.ShowDeleteArgs> = z.object({
  select: ShowSelectSchema.optional(),
  include: ShowIncludeSchema.optional(),
  where: ShowWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ShowDeleteArgs>;

export const ShowUpdateArgsSchema: z.ZodType<Prisma.ShowUpdateArgs> = z.object({
  select: ShowSelectSchema.optional(),
  include: ShowIncludeSchema.optional(),
  data: z.union([ ShowUpdateInputSchema,ShowUncheckedUpdateInputSchema ]),
  where: ShowWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ShowUpdateArgs>;

export const ShowUpdateManyArgsSchema: z.ZodType<Prisma.ShowUpdateManyArgs> = z.object({
  data: z.union([ ShowUpdateManyMutationInputSchema,ShowUncheckedUpdateManyInputSchema ]),
  where: ShowWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.ShowUpdateManyArgs>;

export const ShowDeleteManyArgsSchema: z.ZodType<Prisma.ShowDeleteManyArgs> = z.object({
  where: ShowWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.ShowDeleteManyArgs>;

export const ReviewCreateArgsSchema: z.ZodType<Prisma.ReviewCreateArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  include: ReviewIncludeSchema.optional(),
  data: z.union([ ReviewCreateInputSchema,ReviewUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.ReviewCreateArgs>;

export const ReviewUpsertArgsSchema: z.ZodType<Prisma.ReviewUpsertArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  include: ReviewIncludeSchema.optional(),
  where: ReviewWhereUniqueInputSchema,
  create: z.union([ ReviewCreateInputSchema,ReviewUncheckedCreateInputSchema ]),
  update: z.union([ ReviewUpdateInputSchema,ReviewUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.ReviewUpsertArgs>;

export const ReviewCreateManyArgsSchema: z.ZodType<Prisma.ReviewCreateManyArgs> = z.object({
  data: z.union([ ReviewCreateManyInputSchema,ReviewCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.ReviewCreateManyArgs>;

export const ReviewCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ReviewCreateManyAndReturnArgs> = z.object({
  data: z.union([ ReviewCreateManyInputSchema,ReviewCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.ReviewCreateManyAndReturnArgs>;

export const ReviewDeleteArgsSchema: z.ZodType<Prisma.ReviewDeleteArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  include: ReviewIncludeSchema.optional(),
  where: ReviewWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ReviewDeleteArgs>;

export const ReviewUpdateArgsSchema: z.ZodType<Prisma.ReviewUpdateArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  include: ReviewIncludeSchema.optional(),
  data: z.union([ ReviewUpdateInputSchema,ReviewUncheckedUpdateInputSchema ]),
  where: ReviewWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ReviewUpdateArgs>;

export const ReviewUpdateManyArgsSchema: z.ZodType<Prisma.ReviewUpdateManyArgs> = z.object({
  data: z.union([ ReviewUpdateManyMutationInputSchema,ReviewUncheckedUpdateManyInputSchema ]),
  where: ReviewWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.ReviewUpdateManyArgs>;

export const ReviewDeleteManyArgsSchema: z.ZodType<Prisma.ReviewDeleteManyArgs> = z.object({
  where: ReviewWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.ReviewDeleteManyArgs>;

export const GenreCreateArgsSchema: z.ZodType<Prisma.GenreCreateArgs> = z.object({
  select: GenreSelectSchema.optional(),
  include: GenreIncludeSchema.optional(),
  data: z.union([ GenreCreateInputSchema,GenreUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.GenreCreateArgs>;

export const GenreUpsertArgsSchema: z.ZodType<Prisma.GenreUpsertArgs> = z.object({
  select: GenreSelectSchema.optional(),
  include: GenreIncludeSchema.optional(),
  where: GenreWhereUniqueInputSchema,
  create: z.union([ GenreCreateInputSchema,GenreUncheckedCreateInputSchema ]),
  update: z.union([ GenreUpdateInputSchema,GenreUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.GenreUpsertArgs>;

export const GenreCreateManyArgsSchema: z.ZodType<Prisma.GenreCreateManyArgs> = z.object({
  data: z.union([ GenreCreateManyInputSchema,GenreCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.GenreCreateManyArgs>;

export const GenreCreateManyAndReturnArgsSchema: z.ZodType<Prisma.GenreCreateManyAndReturnArgs> = z.object({
  data: z.union([ GenreCreateManyInputSchema,GenreCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.GenreCreateManyAndReturnArgs>;

export const GenreDeleteArgsSchema: z.ZodType<Prisma.GenreDeleteArgs> = z.object({
  select: GenreSelectSchema.optional(),
  include: GenreIncludeSchema.optional(),
  where: GenreWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.GenreDeleteArgs>;

export const GenreUpdateArgsSchema: z.ZodType<Prisma.GenreUpdateArgs> = z.object({
  select: GenreSelectSchema.optional(),
  include: GenreIncludeSchema.optional(),
  data: z.union([ GenreUpdateInputSchema,GenreUncheckedUpdateInputSchema ]),
  where: GenreWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.GenreUpdateArgs>;

export const GenreUpdateManyArgsSchema: z.ZodType<Prisma.GenreUpdateManyArgs> = z.object({
  data: z.union([ GenreUpdateManyMutationInputSchema,GenreUncheckedUpdateManyInputSchema ]),
  where: GenreWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.GenreUpdateManyArgs>;

export const GenreDeleteManyArgsSchema: z.ZodType<Prisma.GenreDeleteManyArgs> = z.object({
  where: GenreWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.GenreDeleteManyArgs>;