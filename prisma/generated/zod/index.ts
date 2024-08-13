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

export const CelebrityScalarFieldEnumSchema = z.enum(['id','name','birthDate','popularity','highlighted','options','createdAt','updatedAt']);

export const MovieScalarFieldEnumSchema = z.enum(['id','title','releaseDate','rating','highlighted','options','createdAt','updatedAt','directorId']);

export const ShowScalarFieldEnumSchema = z.enum(['id','title','releaseDate','rating','highlighted','options','createdAt','updatedAt']);

export const RatingScalarFieldEnumSchema = z.enum(['id','rating','comment','createdAt','updatedAt','movieId','showId','userId']);

export const GenreScalarFieldEnumSchema = z.enum(['id','name','createdAt','updatedAt']);

export const CastedRoleScalarFieldEnumSchema = z.enum(['id','role','movieId','showId','celebrityId','createdAt','updatedAt']);

export const CrewScalarFieldEnumSchema = z.enum(['id','role','movieId','showId','celebrityId','createdAt','updatedAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullableJsonNullValueInputSchema = z.enum(['DbNull','JsonNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.DbNull : value);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.JsonNull : value === 'AnyNull' ? Prisma.AnyNull : value);

export const CrewRoleSchema = z.enum(['DIRECTOR','WRITER']);

export type CrewRoleType = `${z.infer<typeof CrewRoleSchema>}`

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
  id: z.number().int(),
  name: z.string(),
  birthDate: z.coerce.date().nullable(),
  popularity: z.number().nullable(),
  highlighted: z.boolean(),
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
  id: z.number().int(),
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
  directorId: z.number().int().nullable(),
})

export type Movie = z.infer<typeof MovieSchema>

/////////////////////////////////////////
// SHOW SCHEMA
/////////////////////////////////////////

export const ShowSchema = z.object({
  id: z.number().int(),
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
})

export type Show = z.infer<typeof ShowSchema>

/////////////////////////////////////////
// RATING SCHEMA
/////////////////////////////////////////

export const RatingSchema = z.object({
  id: z.number().int(),
  rating: z.number(),
  comment: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().nullable(),
  movieId: z.number().int().nullable(),
  showId: z.number().int().nullable(),
  userId: z.string(),
})

export type Rating = z.infer<typeof RatingSchema>

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
// CASTED ROLE SCHEMA
/////////////////////////////////////////

export const CastedRoleSchema = z.object({
  id: z.number().int(),
  role: z.string(),
  movieId: z.number().int().nullable(),
  showId: z.number().int().nullable(),
  celebrityId: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type CastedRole = z.infer<typeof CastedRoleSchema>

/////////////////////////////////////////
// CREW SCHEMA
/////////////////////////////////////////

export const CrewSchema = z.object({
  id: z.number().int(),
  role: z.string(),
  movieId: z.number().int().nullable(),
  showId: z.number().int().nullable(),
  celebrityId: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Crew = z.infer<typeof CrewSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  Rating: z.union([z.boolean(),z.lazy(() => RatingFindManyArgsSchema)]).optional(),
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
  Rating: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  name: z.boolean().optional(),
  realName: z.boolean().optional(),
  password: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  Rating: z.union([z.boolean(),z.lazy(() => RatingFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CELEBRITY
//------------------------------------------------------

export const CelebrityIncludeSchema: z.ZodType<Prisma.CelebrityInclude> = z.object({
  castedRole: z.union([z.boolean(),z.lazy(() => CastedRoleFindManyArgsSchema)]).optional(),
  crew: z.union([z.boolean(),z.lazy(() => CrewFindManyArgsSchema)]).optional(),
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
  castedRole: z.boolean().optional(),
  crew: z.boolean().optional(),
}).strict();

export const CelebritySelectSchema: z.ZodType<Prisma.CelebritySelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  birthDate: z.boolean().optional(),
  popularity: z.boolean().optional(),
  highlighted: z.boolean().optional(),
  options: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  castedRole: z.union([z.boolean(),z.lazy(() => CastedRoleFindManyArgsSchema)]).optional(),
  crew: z.union([z.boolean(),z.lazy(() => CrewFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CelebrityCountOutputTypeArgsSchema)]).optional(),
}).strict()

// MOVIE
//------------------------------------------------------

export const MovieIncludeSchema: z.ZodType<Prisma.MovieInclude> = z.object({
  genres: z.union([z.boolean(),z.lazy(() => GenreFindManyArgsSchema)]).optional(),
  Rating: z.union([z.boolean(),z.lazy(() => RatingFindManyArgsSchema)]).optional(),
  castedRole: z.union([z.boolean(),z.lazy(() => CastedRoleFindManyArgsSchema)]).optional(),
  crew: z.union([z.boolean(),z.lazy(() => CrewFindManyArgsSchema)]).optional(),
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
  Rating: z.boolean().optional(),
  castedRole: z.boolean().optional(),
  crew: z.boolean().optional(),
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
  Rating: z.union([z.boolean(),z.lazy(() => RatingFindManyArgsSchema)]).optional(),
  castedRole: z.union([z.boolean(),z.lazy(() => CastedRoleFindManyArgsSchema)]).optional(),
  crew: z.union([z.boolean(),z.lazy(() => CrewFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => MovieCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SHOW
//------------------------------------------------------

export const ShowIncludeSchema: z.ZodType<Prisma.ShowInclude> = z.object({
  genres: z.union([z.boolean(),z.lazy(() => GenreFindManyArgsSchema)]).optional(),
  Rating: z.union([z.boolean(),z.lazy(() => RatingFindManyArgsSchema)]).optional(),
  Crew: z.union([z.boolean(),z.lazy(() => CrewFindManyArgsSchema)]).optional(),
  CastedRole: z.union([z.boolean(),z.lazy(() => CastedRoleFindManyArgsSchema)]).optional(),
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
  Rating: z.boolean().optional(),
  Crew: z.boolean().optional(),
  CastedRole: z.boolean().optional(),
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
  genres: z.union([z.boolean(),z.lazy(() => GenreFindManyArgsSchema)]).optional(),
  Rating: z.union([z.boolean(),z.lazy(() => RatingFindManyArgsSchema)]).optional(),
  Crew: z.union([z.boolean(),z.lazy(() => CrewFindManyArgsSchema)]).optional(),
  CastedRole: z.union([z.boolean(),z.lazy(() => CastedRoleFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ShowCountOutputTypeArgsSchema)]).optional(),
}).strict()

// RATING
//------------------------------------------------------

export const RatingIncludeSchema: z.ZodType<Prisma.RatingInclude> = z.object({
  movie: z.union([z.boolean(),z.lazy(() => MovieArgsSchema)]).optional(),
  show: z.union([z.boolean(),z.lazy(() => ShowArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const RatingArgsSchema: z.ZodType<Prisma.RatingDefaultArgs> = z.object({
  select: z.lazy(() => RatingSelectSchema).optional(),
  include: z.lazy(() => RatingIncludeSchema).optional(),
}).strict();

export const RatingSelectSchema: z.ZodType<Prisma.RatingSelect> = z.object({
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

// CASTED ROLE
//------------------------------------------------------

export const CastedRoleIncludeSchema: z.ZodType<Prisma.CastedRoleInclude> = z.object({
  movie: z.union([z.boolean(),z.lazy(() => MovieArgsSchema)]).optional(),
  show: z.union([z.boolean(),z.lazy(() => ShowArgsSchema)]).optional(),
  celebrity: z.union([z.boolean(),z.lazy(() => CelebrityArgsSchema)]).optional(),
}).strict()

export const CastedRoleArgsSchema: z.ZodType<Prisma.CastedRoleDefaultArgs> = z.object({
  select: z.lazy(() => CastedRoleSelectSchema).optional(),
  include: z.lazy(() => CastedRoleIncludeSchema).optional(),
}).strict();

export const CastedRoleSelectSchema: z.ZodType<Prisma.CastedRoleSelect> = z.object({
  id: z.boolean().optional(),
  role: z.boolean().optional(),
  movieId: z.boolean().optional(),
  showId: z.boolean().optional(),
  celebrityId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  movie: z.union([z.boolean(),z.lazy(() => MovieArgsSchema)]).optional(),
  show: z.union([z.boolean(),z.lazy(() => ShowArgsSchema)]).optional(),
  celebrity: z.union([z.boolean(),z.lazy(() => CelebrityArgsSchema)]).optional(),
}).strict()

// CREW
//------------------------------------------------------

export const CrewIncludeSchema: z.ZodType<Prisma.CrewInclude> = z.object({
  movie: z.union([z.boolean(),z.lazy(() => MovieArgsSchema)]).optional(),
  show: z.union([z.boolean(),z.lazy(() => ShowArgsSchema)]).optional(),
  celebrity: z.union([z.boolean(),z.lazy(() => CelebrityArgsSchema)]).optional(),
}).strict()

export const CrewArgsSchema: z.ZodType<Prisma.CrewDefaultArgs> = z.object({
  select: z.lazy(() => CrewSelectSchema).optional(),
  include: z.lazy(() => CrewIncludeSchema).optional(),
}).strict();

export const CrewSelectSchema: z.ZodType<Prisma.CrewSelect> = z.object({
  id: z.boolean().optional(),
  role: z.boolean().optional(),
  movieId: z.boolean().optional(),
  showId: z.boolean().optional(),
  celebrityId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  movie: z.union([z.boolean(),z.lazy(() => MovieArgsSchema)]).optional(),
  show: z.union([z.boolean(),z.lazy(() => ShowArgsSchema)]).optional(),
  celebrity: z.union([z.boolean(),z.lazy(() => CelebrityArgsSchema)]).optional(),
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
  Rating: z.lazy(() => RatingListRelationFilterSchema).optional()
}).strict() as z.ZodType<Prisma.UserWhereInput>;

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  realName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  Rating: z.lazy(() => RatingOrderByRelationAggregateInputSchema).optional()
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
  Rating: z.lazy(() => RatingListRelationFilterSchema).optional()
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
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  birthDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  popularity: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  highlighted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  options: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  castedRole: z.lazy(() => CastedRoleListRelationFilterSchema).optional(),
  crew: z.lazy(() => CrewListRelationFilterSchema).optional()
}).strict() as z.ZodType<Prisma.CelebrityWhereInput>;

export const CelebrityOrderByWithRelationInputSchema: z.ZodType<Prisma.CelebrityOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  birthDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  popularity: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  highlighted: z.lazy(() => SortOrderSchema).optional(),
  options: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  castedRole: z.lazy(() => CastedRoleOrderByRelationAggregateInputSchema).optional(),
  crew: z.lazy(() => CrewOrderByRelationAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.CelebrityOrderByWithRelationInput>;

export const CelebrityWhereUniqueInputSchema: z.ZodType<Prisma.CelebrityWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => CelebrityWhereInputSchema),z.lazy(() => CelebrityWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CelebrityWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CelebrityWhereInputSchema),z.lazy(() => CelebrityWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  birthDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  popularity: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  highlighted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  options: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  castedRole: z.lazy(() => CastedRoleListRelationFilterSchema).optional(),
  crew: z.lazy(() => CrewListRelationFilterSchema).optional()
}).strict()) as z.ZodType<Prisma.CelebrityWhereUniqueInput>;

export const CelebrityOrderByWithAggregationInputSchema: z.ZodType<Prisma.CelebrityOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  birthDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  popularity: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  highlighted: z.lazy(() => SortOrderSchema).optional(),
  options: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => CelebrityCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CelebrityAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CelebrityMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CelebrityMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CelebritySumOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.CelebrityOrderByWithAggregationInput>;

export const CelebrityScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CelebrityScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CelebrityScalarWhereWithAggregatesInputSchema),z.lazy(() => CelebrityScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CelebrityScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CelebrityScalarWhereWithAggregatesInputSchema),z.lazy(() => CelebrityScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  birthDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  popularity: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  highlighted: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  options: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.CelebrityScalarWhereWithAggregatesInput>;

export const MovieWhereInputSchema: z.ZodType<Prisma.MovieWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MovieWhereInputSchema),z.lazy(() => MovieWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MovieWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MovieWhereInputSchema),z.lazy(() => MovieWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  releaseDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  rating: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  highlighted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  options: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  directorId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  genres: z.lazy(() => GenreListRelationFilterSchema).optional(),
  Rating: z.lazy(() => RatingListRelationFilterSchema).optional(),
  castedRole: z.lazy(() => CastedRoleListRelationFilterSchema).optional(),
  crew: z.lazy(() => CrewListRelationFilterSchema).optional()
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
  Rating: z.lazy(() => RatingOrderByRelationAggregateInputSchema).optional(),
  castedRole: z.lazy(() => CastedRoleOrderByRelationAggregateInputSchema).optional(),
  crew: z.lazy(() => CrewOrderByRelationAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.MovieOrderByWithRelationInput>;

export const MovieWhereUniqueInputSchema: z.ZodType<Prisma.MovieWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
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
  directorId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  genres: z.lazy(() => GenreListRelationFilterSchema).optional(),
  Rating: z.lazy(() => RatingListRelationFilterSchema).optional(),
  castedRole: z.lazy(() => CastedRoleListRelationFilterSchema).optional(),
  crew: z.lazy(() => CrewListRelationFilterSchema).optional()
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
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  releaseDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  rating: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  highlighted: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  options: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  directorId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.MovieScalarWhereWithAggregatesInput>;

export const ShowWhereInputSchema: z.ZodType<Prisma.ShowWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ShowWhereInputSchema),z.lazy(() => ShowWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ShowWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ShowWhereInputSchema),z.lazy(() => ShowWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  releaseDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  rating: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  highlighted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  options: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  genres: z.lazy(() => GenreListRelationFilterSchema).optional(),
  Rating: z.lazy(() => RatingListRelationFilterSchema).optional(),
  Crew: z.lazy(() => CrewListRelationFilterSchema).optional(),
  CastedRole: z.lazy(() => CastedRoleListRelationFilterSchema).optional()
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
  genres: z.lazy(() => GenreOrderByRelationAggregateInputSchema).optional(),
  Rating: z.lazy(() => RatingOrderByRelationAggregateInputSchema).optional(),
  Crew: z.lazy(() => CrewOrderByRelationAggregateInputSchema).optional(),
  CastedRole: z.lazy(() => CastedRoleOrderByRelationAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.ShowOrderByWithRelationInput>;

export const ShowWhereUniqueInputSchema: z.ZodType<Prisma.ShowWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
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
  genres: z.lazy(() => GenreListRelationFilterSchema).optional(),
  Rating: z.lazy(() => RatingListRelationFilterSchema).optional(),
  Crew: z.lazy(() => CrewListRelationFilterSchema).optional(),
  CastedRole: z.lazy(() => CastedRoleListRelationFilterSchema).optional()
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
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  releaseDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  rating: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  highlighted: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  options: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.ShowScalarWhereWithAggregatesInput>;

export const RatingWhereInputSchema: z.ZodType<Prisma.RatingWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RatingWhereInputSchema),z.lazy(() => RatingWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RatingWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RatingWhereInputSchema),z.lazy(() => RatingWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  rating: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  comment: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  movieId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  showId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  movie: z.union([ z.lazy(() => MovieNullableRelationFilterSchema),z.lazy(() => MovieWhereInputSchema) ]).optional().nullable(),
  show: z.union([ z.lazy(() => ShowNullableRelationFilterSchema),z.lazy(() => ShowWhereInputSchema) ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.RatingWhereInput>;

export const RatingOrderByWithRelationInputSchema: z.ZodType<Prisma.RatingOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  comment: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  movieId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  showId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  movie: z.lazy(() => MovieOrderByWithRelationInputSchema).optional(),
  show: z.lazy(() => ShowOrderByWithRelationInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict() as z.ZodType<Prisma.RatingOrderByWithRelationInput>;

export const RatingWhereUniqueInputSchema: z.ZodType<Prisma.RatingWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    userId_showId: z.lazy(() => RatingUserIdShowIdCompoundUniqueInputSchema),
    userId_movieId: z.lazy(() => RatingUserIdMovieIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.number().int(),
    userId_showId: z.lazy(() => RatingUserIdShowIdCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.number().int(),
    userId_movieId: z.lazy(() => RatingUserIdMovieIdCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    userId_showId: z.lazy(() => RatingUserIdShowIdCompoundUniqueInputSchema),
    userId_movieId: z.lazy(() => RatingUserIdMovieIdCompoundUniqueInputSchema),
  }),
  z.object({
    userId_showId: z.lazy(() => RatingUserIdShowIdCompoundUniqueInputSchema),
  }),
  z.object({
    userId_movieId: z.lazy(() => RatingUserIdMovieIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  userId_showId: z.lazy(() => RatingUserIdShowIdCompoundUniqueInputSchema).optional(),
  userId_movieId: z.lazy(() => RatingUserIdMovieIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => RatingWhereInputSchema),z.lazy(() => RatingWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RatingWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RatingWhereInputSchema),z.lazy(() => RatingWhereInputSchema).array() ]).optional(),
  rating: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  comment: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  movieId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  showId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  movie: z.union([ z.lazy(() => MovieNullableRelationFilterSchema),z.lazy(() => MovieWhereInputSchema) ]).optional().nullable(),
  show: z.union([ z.lazy(() => ShowNullableRelationFilterSchema),z.lazy(() => ShowWhereInputSchema) ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict()) as z.ZodType<Prisma.RatingWhereUniqueInput>;

export const RatingOrderByWithAggregationInputSchema: z.ZodType<Prisma.RatingOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  comment: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  movieId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  showId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RatingCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RatingAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RatingMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RatingMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RatingSumOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.RatingOrderByWithAggregationInput>;

export const RatingScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RatingScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RatingScalarWhereWithAggregatesInputSchema),z.lazy(() => RatingScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RatingScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RatingScalarWhereWithAggregatesInputSchema),z.lazy(() => RatingScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  rating: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  comment: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  movieId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  showId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict() as z.ZodType<Prisma.RatingScalarWhereWithAggregatesInput>;

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

export const CastedRoleWhereInputSchema: z.ZodType<Prisma.CastedRoleWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CastedRoleWhereInputSchema),z.lazy(() => CastedRoleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CastedRoleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CastedRoleWhereInputSchema),z.lazy(() => CastedRoleWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  role: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  movieId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  showId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  celebrityId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  movie: z.union([ z.lazy(() => MovieNullableRelationFilterSchema),z.lazy(() => MovieWhereInputSchema) ]).optional().nullable(),
  show: z.union([ z.lazy(() => ShowNullableRelationFilterSchema),z.lazy(() => ShowWhereInputSchema) ]).optional().nullable(),
  celebrity: z.union([ z.lazy(() => CelebrityRelationFilterSchema),z.lazy(() => CelebrityWhereInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CastedRoleWhereInput>;

export const CastedRoleOrderByWithRelationInputSchema: z.ZodType<Prisma.CastedRoleOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  movieId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  showId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  celebrityId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  movie: z.lazy(() => MovieOrderByWithRelationInputSchema).optional(),
  show: z.lazy(() => ShowOrderByWithRelationInputSchema).optional(),
  celebrity: z.lazy(() => CelebrityOrderByWithRelationInputSchema).optional()
}).strict() as z.ZodType<Prisma.CastedRoleOrderByWithRelationInput>;

export const CastedRoleWhereUniqueInputSchema: z.ZodType<Prisma.CastedRoleWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    movieId_celebrityId_role: z.lazy(() => CastedRoleMovieIdCelebrityIdRoleCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    movieId_celebrityId_role: z.lazy(() => CastedRoleMovieIdCelebrityIdRoleCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  movieId_celebrityId_role: z.lazy(() => CastedRoleMovieIdCelebrityIdRoleCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => CastedRoleWhereInputSchema),z.lazy(() => CastedRoleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CastedRoleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CastedRoleWhereInputSchema),z.lazy(() => CastedRoleWhereInputSchema).array() ]).optional(),
  role: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  movieId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  showId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  celebrityId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  movie: z.union([ z.lazy(() => MovieNullableRelationFilterSchema),z.lazy(() => MovieWhereInputSchema) ]).optional().nullable(),
  show: z.union([ z.lazy(() => ShowNullableRelationFilterSchema),z.lazy(() => ShowWhereInputSchema) ]).optional().nullable(),
  celebrity: z.union([ z.lazy(() => CelebrityRelationFilterSchema),z.lazy(() => CelebrityWhereInputSchema) ]).optional(),
}).strict()) as z.ZodType<Prisma.CastedRoleWhereUniqueInput>;

export const CastedRoleOrderByWithAggregationInputSchema: z.ZodType<Prisma.CastedRoleOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  movieId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  showId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  celebrityId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CastedRoleCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CastedRoleAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CastedRoleMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CastedRoleMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CastedRoleSumOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.CastedRoleOrderByWithAggregationInput>;

export const CastedRoleScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CastedRoleScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CastedRoleScalarWhereWithAggregatesInputSchema),z.lazy(() => CastedRoleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CastedRoleScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CastedRoleScalarWhereWithAggregatesInputSchema),z.lazy(() => CastedRoleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  role: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  movieId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  showId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  celebrityId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict() as z.ZodType<Prisma.CastedRoleScalarWhereWithAggregatesInput>;

export const CrewWhereInputSchema: z.ZodType<Prisma.CrewWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CrewWhereInputSchema),z.lazy(() => CrewWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CrewWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CrewWhereInputSchema),z.lazy(() => CrewWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  role: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  movieId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  showId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  celebrityId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  movie: z.union([ z.lazy(() => MovieNullableRelationFilterSchema),z.lazy(() => MovieWhereInputSchema) ]).optional().nullable(),
  show: z.union([ z.lazy(() => ShowNullableRelationFilterSchema),z.lazy(() => ShowWhereInputSchema) ]).optional().nullable(),
  celebrity: z.union([ z.lazy(() => CelebrityRelationFilterSchema),z.lazy(() => CelebrityWhereInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CrewWhereInput>;

export const CrewOrderByWithRelationInputSchema: z.ZodType<Prisma.CrewOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  movieId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  showId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  celebrityId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  movie: z.lazy(() => MovieOrderByWithRelationInputSchema).optional(),
  show: z.lazy(() => ShowOrderByWithRelationInputSchema).optional(),
  celebrity: z.lazy(() => CelebrityOrderByWithRelationInputSchema).optional()
}).strict() as z.ZodType<Prisma.CrewOrderByWithRelationInput>;

export const CrewWhereUniqueInputSchema: z.ZodType<Prisma.CrewWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => CrewWhereInputSchema),z.lazy(() => CrewWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CrewWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CrewWhereInputSchema),z.lazy(() => CrewWhereInputSchema).array() ]).optional(),
  role: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  movieId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  showId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  celebrityId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  movie: z.union([ z.lazy(() => MovieNullableRelationFilterSchema),z.lazy(() => MovieWhereInputSchema) ]).optional().nullable(),
  show: z.union([ z.lazy(() => ShowNullableRelationFilterSchema),z.lazy(() => ShowWhereInputSchema) ]).optional().nullable(),
  celebrity: z.union([ z.lazy(() => CelebrityRelationFilterSchema),z.lazy(() => CelebrityWhereInputSchema) ]).optional(),
}).strict()) as z.ZodType<Prisma.CrewWhereUniqueInput>;

export const CrewOrderByWithAggregationInputSchema: z.ZodType<Prisma.CrewOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  movieId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  showId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  celebrityId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CrewCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CrewAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CrewMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CrewMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CrewSumOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.CrewOrderByWithAggregationInput>;

export const CrewScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CrewScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CrewScalarWhereWithAggregatesInputSchema),z.lazy(() => CrewScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CrewScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CrewScalarWhereWithAggregatesInputSchema),z.lazy(() => CrewScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  role: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  movieId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  showId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  celebrityId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict() as z.ZodType<Prisma.CrewScalarWhereWithAggregatesInput>;

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string(),
  realName: z.string().optional().nullable(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  Rating: z.lazy(() => RatingCreateNestedManyWithoutUserInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserCreateInput>;

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string(),
  realName: z.string().optional().nullable(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  Rating: z.lazy(() => RatingUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUncheckedCreateInput>;

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  realName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Rating: z.lazy(() => RatingUpdateManyWithoutUserNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUpdateInput>;

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  realName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Rating: z.lazy(() => RatingUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
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
  name: z.string(),
  birthDate: z.coerce.date().optional().nullable(),
  popularity: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  castedRole: z.lazy(() => CastedRoleCreateNestedManyWithoutCelebrityInputSchema).optional(),
  crew: z.lazy(() => CrewCreateNestedManyWithoutCelebrityInputSchema).optional()
}).strict() as z.ZodType<Prisma.CelebrityCreateInput>;

export const CelebrityUncheckedCreateInputSchema: z.ZodType<Prisma.CelebrityUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  birthDate: z.coerce.date().optional().nullable(),
  popularity: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  castedRole: z.lazy(() => CastedRoleUncheckedCreateNestedManyWithoutCelebrityInputSchema).optional(),
  crew: z.lazy(() => CrewUncheckedCreateNestedManyWithoutCelebrityInputSchema).optional()
}).strict() as z.ZodType<Prisma.CelebrityUncheckedCreateInput>;

export const CelebrityUpdateInputSchema: z.ZodType<Prisma.CelebrityUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  popularity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  castedRole: z.lazy(() => CastedRoleUpdateManyWithoutCelebrityNestedInputSchema).optional(),
  crew: z.lazy(() => CrewUpdateManyWithoutCelebrityNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CelebrityUpdateInput>;

export const CelebrityUncheckedUpdateInputSchema: z.ZodType<Prisma.CelebrityUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  popularity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  castedRole: z.lazy(() => CastedRoleUncheckedUpdateManyWithoutCelebrityNestedInputSchema).optional(),
  crew: z.lazy(() => CrewUncheckedUpdateManyWithoutCelebrityNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CelebrityUncheckedUpdateInput>;

export const CelebrityCreateManyInputSchema: z.ZodType<Prisma.CelebrityCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  birthDate: z.coerce.date().optional().nullable(),
  popularity: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict() as z.ZodType<Prisma.CelebrityCreateManyInput>;

export const CelebrityUpdateManyMutationInputSchema: z.ZodType<Prisma.CelebrityUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  popularity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.CelebrityUpdateManyMutationInput>;

export const CelebrityUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CelebrityUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  popularity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.CelebrityUncheckedUpdateManyInput>;

export const MovieCreateInputSchema: z.ZodType<Prisma.MovieCreateInput> = z.object({
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  directorId: z.number().int().optional().nullable(),
  genres: z.lazy(() => GenreCreateNestedManyWithoutMoviesInputSchema).optional(),
  Rating: z.lazy(() => RatingCreateNestedManyWithoutMovieInputSchema).optional(),
  castedRole: z.lazy(() => CastedRoleCreateNestedManyWithoutMovieInputSchema).optional(),
  crew: z.lazy(() => CrewCreateNestedManyWithoutMovieInputSchema).optional()
}).strict() as z.ZodType<Prisma.MovieCreateInput>;

export const MovieUncheckedCreateInputSchema: z.ZodType<Prisma.MovieUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  directorId: z.number().int().optional().nullable(),
  genres: z.lazy(() => GenreUncheckedCreateNestedManyWithoutMoviesInputSchema).optional(),
  Rating: z.lazy(() => RatingUncheckedCreateNestedManyWithoutMovieInputSchema).optional(),
  castedRole: z.lazy(() => CastedRoleUncheckedCreateNestedManyWithoutMovieInputSchema).optional(),
  crew: z.lazy(() => CrewUncheckedCreateNestedManyWithoutMovieInputSchema).optional()
}).strict() as z.ZodType<Prisma.MovieUncheckedCreateInput>;

export const MovieUpdateInputSchema: z.ZodType<Prisma.MovieUpdateInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  directorId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genres: z.lazy(() => GenreUpdateManyWithoutMoviesNestedInputSchema).optional(),
  Rating: z.lazy(() => RatingUpdateManyWithoutMovieNestedInputSchema).optional(),
  castedRole: z.lazy(() => CastedRoleUpdateManyWithoutMovieNestedInputSchema).optional(),
  crew: z.lazy(() => CrewUpdateManyWithoutMovieNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.MovieUpdateInput>;

export const MovieUncheckedUpdateInputSchema: z.ZodType<Prisma.MovieUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  directorId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genres: z.lazy(() => GenreUncheckedUpdateManyWithoutMoviesNestedInputSchema).optional(),
  Rating: z.lazy(() => RatingUncheckedUpdateManyWithoutMovieNestedInputSchema).optional(),
  castedRole: z.lazy(() => CastedRoleUncheckedUpdateManyWithoutMovieNestedInputSchema).optional(),
  crew: z.lazy(() => CrewUncheckedUpdateManyWithoutMovieNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.MovieUncheckedUpdateInput>;

export const MovieCreateManyInputSchema: z.ZodType<Prisma.MovieCreateManyInput> = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  directorId: z.number().int().optional().nullable()
}).strict() as z.ZodType<Prisma.MovieCreateManyInput>;

export const MovieUpdateManyMutationInputSchema: z.ZodType<Prisma.MovieUpdateManyMutationInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  directorId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.MovieUpdateManyMutationInput>;

export const MovieUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MovieUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  directorId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.MovieUncheckedUpdateManyInput>;

export const ShowCreateInputSchema: z.ZodType<Prisma.ShowCreateInput> = z.object({
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  genres: z.lazy(() => GenreCreateNestedManyWithoutShowsInputSchema).optional(),
  Rating: z.lazy(() => RatingCreateNestedManyWithoutShowInputSchema).optional(),
  Crew: z.lazy(() => CrewCreateNestedManyWithoutShowInputSchema).optional(),
  CastedRole: z.lazy(() => CastedRoleCreateNestedManyWithoutShowInputSchema).optional()
}).strict() as z.ZodType<Prisma.ShowCreateInput>;

export const ShowUncheckedCreateInputSchema: z.ZodType<Prisma.ShowUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  genres: z.lazy(() => GenreUncheckedCreateNestedManyWithoutShowsInputSchema).optional(),
  Rating: z.lazy(() => RatingUncheckedCreateNestedManyWithoutShowInputSchema).optional(),
  Crew: z.lazy(() => CrewUncheckedCreateNestedManyWithoutShowInputSchema).optional(),
  CastedRole: z.lazy(() => CastedRoleUncheckedCreateNestedManyWithoutShowInputSchema).optional()
}).strict() as z.ZodType<Prisma.ShowUncheckedCreateInput>;

export const ShowUpdateInputSchema: z.ZodType<Prisma.ShowUpdateInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genres: z.lazy(() => GenreUpdateManyWithoutShowsNestedInputSchema).optional(),
  Rating: z.lazy(() => RatingUpdateManyWithoutShowNestedInputSchema).optional(),
  Crew: z.lazy(() => CrewUpdateManyWithoutShowNestedInputSchema).optional(),
  CastedRole: z.lazy(() => CastedRoleUpdateManyWithoutShowNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.ShowUpdateInput>;

export const ShowUncheckedUpdateInputSchema: z.ZodType<Prisma.ShowUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genres: z.lazy(() => GenreUncheckedUpdateManyWithoutShowsNestedInputSchema).optional(),
  Rating: z.lazy(() => RatingUncheckedUpdateManyWithoutShowNestedInputSchema).optional(),
  Crew: z.lazy(() => CrewUncheckedUpdateManyWithoutShowNestedInputSchema).optional(),
  CastedRole: z.lazy(() => CastedRoleUncheckedUpdateManyWithoutShowNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.ShowUncheckedUpdateInput>;

export const ShowCreateManyInputSchema: z.ZodType<Prisma.ShowCreateManyInput> = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict() as z.ZodType<Prisma.ShowCreateManyInput>;

export const ShowUpdateManyMutationInputSchema: z.ZodType<Prisma.ShowUpdateManyMutationInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.ShowUpdateManyMutationInput>;

export const ShowUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ShowUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.ShowUncheckedUpdateManyInput>;

export const RatingCreateInputSchema: z.ZodType<Prisma.RatingCreateInput> = z.object({
  rating: z.number(),
  comment: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  movie: z.lazy(() => MovieCreateNestedOneWithoutRatingInputSchema).optional(),
  show: z.lazy(() => ShowCreateNestedOneWithoutRatingInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutRatingInputSchema)
}).strict() as z.ZodType<Prisma.RatingCreateInput>;

export const RatingUncheckedCreateInputSchema: z.ZodType<Prisma.RatingUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  rating: z.number(),
  comment: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  movieId: z.number().int().optional().nullable(),
  showId: z.number().int().optional().nullable(),
  userId: z.string()
}).strict() as z.ZodType<Prisma.RatingUncheckedCreateInput>;

export const RatingUpdateInputSchema: z.ZodType<Prisma.RatingUpdateInput> = z.object({
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  movie: z.lazy(() => MovieUpdateOneWithoutRatingNestedInputSchema).optional(),
  show: z.lazy(() => ShowUpdateOneWithoutRatingNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutRatingNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.RatingUpdateInput>;

export const RatingUncheckedUpdateInputSchema: z.ZodType<Prisma.RatingUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  movieId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  showId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.RatingUncheckedUpdateInput>;

export const RatingCreateManyInputSchema: z.ZodType<Prisma.RatingCreateManyInput> = z.object({
  id: z.number().int().optional(),
  rating: z.number(),
  comment: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  movieId: z.number().int().optional().nullable(),
  showId: z.number().int().optional().nullable(),
  userId: z.string()
}).strict() as z.ZodType<Prisma.RatingCreateManyInput>;

export const RatingUpdateManyMutationInputSchema: z.ZodType<Prisma.RatingUpdateManyMutationInput> = z.object({
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.RatingUpdateManyMutationInput>;

export const RatingUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RatingUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  movieId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  showId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.RatingUncheckedUpdateManyInput>;

export const GenreCreateInputSchema: z.ZodType<Prisma.GenreCreateInput> = z.object({
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  movies: z.lazy(() => MovieCreateNestedManyWithoutGenresInputSchema).optional(),
  shows: z.lazy(() => ShowCreateNestedManyWithoutGenresInputSchema).optional()
}).strict() as z.ZodType<Prisma.GenreCreateInput>;

export const GenreUncheckedCreateInputSchema: z.ZodType<Prisma.GenreUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  movies: z.lazy(() => MovieUncheckedCreateNestedManyWithoutGenresInputSchema).optional(),
  shows: z.lazy(() => ShowUncheckedCreateNestedManyWithoutGenresInputSchema).optional()
}).strict() as z.ZodType<Prisma.GenreUncheckedCreateInput>;

export const GenreUpdateInputSchema: z.ZodType<Prisma.GenreUpdateInput> = z.object({
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
  id: z.number().int().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict() as z.ZodType<Prisma.GenreCreateManyInput>;

export const GenreUpdateManyMutationInputSchema: z.ZodType<Prisma.GenreUpdateManyMutationInput> = z.object({
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

export const CastedRoleCreateInputSchema: z.ZodType<Prisma.CastedRoleCreateInput> = z.object({
  role: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  movie: z.lazy(() => MovieCreateNestedOneWithoutCastedRoleInputSchema).optional(),
  show: z.lazy(() => ShowCreateNestedOneWithoutCastedRoleInputSchema).optional(),
  celebrity: z.lazy(() => CelebrityCreateNestedOneWithoutCastedRoleInputSchema)
}).strict() as z.ZodType<Prisma.CastedRoleCreateInput>;

export const CastedRoleUncheckedCreateInputSchema: z.ZodType<Prisma.CastedRoleUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  role: z.string(),
  movieId: z.number().int().optional().nullable(),
  showId: z.number().int().optional().nullable(),
  celebrityId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.CastedRoleUncheckedCreateInput>;

export const CastedRoleUpdateInputSchema: z.ZodType<Prisma.CastedRoleUpdateInput> = z.object({
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  movie: z.lazy(() => MovieUpdateOneWithoutCastedRoleNestedInputSchema).optional(),
  show: z.lazy(() => ShowUpdateOneWithoutCastedRoleNestedInputSchema).optional(),
  celebrity: z.lazy(() => CelebrityUpdateOneRequiredWithoutCastedRoleNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CastedRoleUpdateInput>;

export const CastedRoleUncheckedUpdateInputSchema: z.ZodType<Prisma.CastedRoleUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  movieId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  showId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  celebrityId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CastedRoleUncheckedUpdateInput>;

export const CastedRoleCreateManyInputSchema: z.ZodType<Prisma.CastedRoleCreateManyInput> = z.object({
  id: z.number().int().optional(),
  role: z.string(),
  movieId: z.number().int().optional().nullable(),
  showId: z.number().int().optional().nullable(),
  celebrityId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.CastedRoleCreateManyInput>;

export const CastedRoleUpdateManyMutationInputSchema: z.ZodType<Prisma.CastedRoleUpdateManyMutationInput> = z.object({
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CastedRoleUpdateManyMutationInput>;

export const CastedRoleUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CastedRoleUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  movieId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  showId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  celebrityId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CastedRoleUncheckedUpdateManyInput>;

export const CrewCreateInputSchema: z.ZodType<Prisma.CrewCreateInput> = z.object({
  role: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  movie: z.lazy(() => MovieCreateNestedOneWithoutCrewInputSchema).optional(),
  show: z.lazy(() => ShowCreateNestedOneWithoutCrewInputSchema).optional(),
  celebrity: z.lazy(() => CelebrityCreateNestedOneWithoutCrewInputSchema)
}).strict() as z.ZodType<Prisma.CrewCreateInput>;

export const CrewUncheckedCreateInputSchema: z.ZodType<Prisma.CrewUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  role: z.string(),
  movieId: z.number().int().optional().nullable(),
  showId: z.number().int().optional().nullable(),
  celebrityId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.CrewUncheckedCreateInput>;

export const CrewUpdateInputSchema: z.ZodType<Prisma.CrewUpdateInput> = z.object({
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  movie: z.lazy(() => MovieUpdateOneWithoutCrewNestedInputSchema).optional(),
  show: z.lazy(() => ShowUpdateOneWithoutCrewNestedInputSchema).optional(),
  celebrity: z.lazy(() => CelebrityUpdateOneRequiredWithoutCrewNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CrewUpdateInput>;

export const CrewUncheckedUpdateInputSchema: z.ZodType<Prisma.CrewUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  movieId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  showId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  celebrityId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CrewUncheckedUpdateInput>;

export const CrewCreateManyInputSchema: z.ZodType<Prisma.CrewCreateManyInput> = z.object({
  id: z.number().int().optional(),
  role: z.string(),
  movieId: z.number().int().optional().nullable(),
  showId: z.number().int().optional().nullable(),
  celebrityId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.CrewCreateManyInput>;

export const CrewUpdateManyMutationInputSchema: z.ZodType<Prisma.CrewUpdateManyMutationInput> = z.object({
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CrewUpdateManyMutationInput>;

export const CrewUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CrewUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  movieId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  showId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  celebrityId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CrewUncheckedUpdateManyInput>;

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

export const RatingListRelationFilterSchema: z.ZodType<Prisma.RatingListRelationFilter> = z.object({
  every: z.lazy(() => RatingWhereInputSchema).optional(),
  some: z.lazy(() => RatingWhereInputSchema).optional(),
  none: z.lazy(() => RatingWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.RatingListRelationFilter>;

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict() as z.ZodType<Prisma.SortOrderInput>;

export const RatingOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RatingOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.RatingOrderByRelationAggregateInput>;

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

export const CastedRoleListRelationFilterSchema: z.ZodType<Prisma.CastedRoleListRelationFilter> = z.object({
  every: z.lazy(() => CastedRoleWhereInputSchema).optional(),
  some: z.lazy(() => CastedRoleWhereInputSchema).optional(),
  none: z.lazy(() => CastedRoleWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.CastedRoleListRelationFilter>;

export const CrewListRelationFilterSchema: z.ZodType<Prisma.CrewListRelationFilter> = z.object({
  every: z.lazy(() => CrewWhereInputSchema).optional(),
  some: z.lazy(() => CrewWhereInputSchema).optional(),
  none: z.lazy(() => CrewWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.CrewListRelationFilter>;

export const CastedRoleOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CastedRoleOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CastedRoleOrderByRelationAggregateInput>;

export const CrewOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CrewOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CrewOrderByRelationAggregateInput>;

export const CelebrityCountOrderByAggregateInputSchema: z.ZodType<Prisma.CelebrityCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  birthDate: z.lazy(() => SortOrderSchema).optional(),
  popularity: z.lazy(() => SortOrderSchema).optional(),
  highlighted: z.lazy(() => SortOrderSchema).optional(),
  options: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CelebrityCountOrderByAggregateInput>;

export const CelebrityAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CelebrityAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  popularity: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CelebrityAvgOrderByAggregateInput>;

export const CelebrityMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CelebrityMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  birthDate: z.lazy(() => SortOrderSchema).optional(),
  popularity: z.lazy(() => SortOrderSchema).optional(),
  highlighted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CelebrityMaxOrderByAggregateInput>;

export const CelebrityMinOrderByAggregateInputSchema: z.ZodType<Prisma.CelebrityMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  birthDate: z.lazy(() => SortOrderSchema).optional(),
  popularity: z.lazy(() => SortOrderSchema).optional(),
  highlighted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CelebrityMinOrderByAggregateInput>;

export const CelebritySumOrderByAggregateInputSchema: z.ZodType<Prisma.CelebritySumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  popularity: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CelebritySumOrderByAggregateInput>;

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

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.IntNullableFilter>;

export const GenreListRelationFilterSchema: z.ZodType<Prisma.GenreListRelationFilter> = z.object({
  every: z.lazy(() => GenreWhereInputSchema).optional(),
  some: z.lazy(() => GenreWhereInputSchema).optional(),
  none: z.lazy(() => GenreWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.GenreListRelationFilter>;

export const GenreOrderByRelationAggregateInputSchema: z.ZodType<Prisma.GenreOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.GenreOrderByRelationAggregateInput>;

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
  id: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  directorId: z.lazy(() => SortOrderSchema).optional()
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
  id: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  directorId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.MovieSumOrderByAggregateInput>;

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict() as z.ZodType<Prisma.IntNullableWithAggregatesFilter>;

export const ShowCountOrderByAggregateInputSchema: z.ZodType<Prisma.ShowCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  releaseDate: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  highlighted: z.lazy(() => SortOrderSchema).optional(),
  options: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.ShowCountOrderByAggregateInput>;

export const ShowAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ShowAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.ShowAvgOrderByAggregateInput>;

export const ShowMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ShowMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  releaseDate: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  highlighted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.ShowMaxOrderByAggregateInput>;

export const ShowMinOrderByAggregateInputSchema: z.ZodType<Prisma.ShowMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  releaseDate: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  highlighted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.ShowMinOrderByAggregateInput>;

export const ShowSumOrderByAggregateInputSchema: z.ZodType<Prisma.ShowSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
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

export const MovieNullableRelationFilterSchema: z.ZodType<Prisma.MovieNullableRelationFilter> = z.object({
  is: z.lazy(() => MovieWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => MovieWhereInputSchema).optional().nullable()
}).strict() as z.ZodType<Prisma.MovieNullableRelationFilter>;

export const ShowNullableRelationFilterSchema: z.ZodType<Prisma.ShowNullableRelationFilter> = z.object({
  is: z.lazy(() => ShowWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ShowWhereInputSchema).optional().nullable()
}).strict() as z.ZodType<Prisma.ShowNullableRelationFilter>;

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserRelationFilter>;

export const RatingUserIdShowIdCompoundUniqueInputSchema: z.ZodType<Prisma.RatingUserIdShowIdCompoundUniqueInput> = z.object({
  userId: z.string(),
  showId: z.number()
}).strict() as z.ZodType<Prisma.RatingUserIdShowIdCompoundUniqueInput>;

export const RatingUserIdMovieIdCompoundUniqueInputSchema: z.ZodType<Prisma.RatingUserIdMovieIdCompoundUniqueInput> = z.object({
  userId: z.string(),
  movieId: z.number()
}).strict() as z.ZodType<Prisma.RatingUserIdMovieIdCompoundUniqueInput>;

export const RatingCountOrderByAggregateInputSchema: z.ZodType<Prisma.RatingCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  movieId: z.lazy(() => SortOrderSchema).optional(),
  showId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.RatingCountOrderByAggregateInput>;

export const RatingAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RatingAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  movieId: z.lazy(() => SortOrderSchema).optional(),
  showId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.RatingAvgOrderByAggregateInput>;

export const RatingMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RatingMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  movieId: z.lazy(() => SortOrderSchema).optional(),
  showId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.RatingMaxOrderByAggregateInput>;

export const RatingMinOrderByAggregateInputSchema: z.ZodType<Prisma.RatingMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  movieId: z.lazy(() => SortOrderSchema).optional(),
  showId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.RatingMinOrderByAggregateInput>;

export const RatingSumOrderByAggregateInputSchema: z.ZodType<Prisma.RatingSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  movieId: z.lazy(() => SortOrderSchema).optional(),
  showId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.RatingSumOrderByAggregateInput>;

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

export const CelebrityRelationFilterSchema: z.ZodType<Prisma.CelebrityRelationFilter> = z.object({
  is: z.lazy(() => CelebrityWhereInputSchema).optional(),
  isNot: z.lazy(() => CelebrityWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.CelebrityRelationFilter>;

export const CastedRoleMovieIdCelebrityIdRoleCompoundUniqueInputSchema: z.ZodType<Prisma.CastedRoleMovieIdCelebrityIdRoleCompoundUniqueInput> = z.object({
  movieId: z.number(),
  celebrityId: z.number(),
  role: z.string()
}).strict() as z.ZodType<Prisma.CastedRoleMovieIdCelebrityIdRoleCompoundUniqueInput>;

export const CastedRoleCountOrderByAggregateInputSchema: z.ZodType<Prisma.CastedRoleCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  movieId: z.lazy(() => SortOrderSchema).optional(),
  showId: z.lazy(() => SortOrderSchema).optional(),
  celebrityId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CastedRoleCountOrderByAggregateInput>;

export const CastedRoleAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CastedRoleAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  movieId: z.lazy(() => SortOrderSchema).optional(),
  showId: z.lazy(() => SortOrderSchema).optional(),
  celebrityId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CastedRoleAvgOrderByAggregateInput>;

export const CastedRoleMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CastedRoleMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  movieId: z.lazy(() => SortOrderSchema).optional(),
  showId: z.lazy(() => SortOrderSchema).optional(),
  celebrityId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CastedRoleMaxOrderByAggregateInput>;

export const CastedRoleMinOrderByAggregateInputSchema: z.ZodType<Prisma.CastedRoleMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  movieId: z.lazy(() => SortOrderSchema).optional(),
  showId: z.lazy(() => SortOrderSchema).optional(),
  celebrityId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CastedRoleMinOrderByAggregateInput>;

export const CastedRoleSumOrderByAggregateInputSchema: z.ZodType<Prisma.CastedRoleSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  movieId: z.lazy(() => SortOrderSchema).optional(),
  showId: z.lazy(() => SortOrderSchema).optional(),
  celebrityId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CastedRoleSumOrderByAggregateInput>;

export const CrewCountOrderByAggregateInputSchema: z.ZodType<Prisma.CrewCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  movieId: z.lazy(() => SortOrderSchema).optional(),
  showId: z.lazy(() => SortOrderSchema).optional(),
  celebrityId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CrewCountOrderByAggregateInput>;

export const CrewAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CrewAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  movieId: z.lazy(() => SortOrderSchema).optional(),
  showId: z.lazy(() => SortOrderSchema).optional(),
  celebrityId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CrewAvgOrderByAggregateInput>;

export const CrewMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CrewMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  movieId: z.lazy(() => SortOrderSchema).optional(),
  showId: z.lazy(() => SortOrderSchema).optional(),
  celebrityId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CrewMaxOrderByAggregateInput>;

export const CrewMinOrderByAggregateInputSchema: z.ZodType<Prisma.CrewMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  movieId: z.lazy(() => SortOrderSchema).optional(),
  showId: z.lazy(() => SortOrderSchema).optional(),
  celebrityId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CrewMinOrderByAggregateInput>;

export const CrewSumOrderByAggregateInputSchema: z.ZodType<Prisma.CrewSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  movieId: z.lazy(() => SortOrderSchema).optional(),
  showId: z.lazy(() => SortOrderSchema).optional(),
  celebrityId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CrewSumOrderByAggregateInput>;

export const RatingCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.RatingCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => RatingCreateWithoutUserInputSchema),z.lazy(() => RatingCreateWithoutUserInputSchema).array(),z.lazy(() => RatingUncheckedCreateWithoutUserInputSchema),z.lazy(() => RatingUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RatingCreateOrConnectWithoutUserInputSchema),z.lazy(() => RatingCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RatingCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.RatingCreateNestedManyWithoutUserInput>;

export const RatingUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.RatingUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => RatingCreateWithoutUserInputSchema),z.lazy(() => RatingCreateWithoutUserInputSchema).array(),z.lazy(() => RatingUncheckedCreateWithoutUserInputSchema),z.lazy(() => RatingUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RatingCreateOrConnectWithoutUserInputSchema),z.lazy(() => RatingCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RatingCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.RatingUncheckedCreateNestedManyWithoutUserInput>;

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

export const RatingUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.RatingUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => RatingCreateWithoutUserInputSchema),z.lazy(() => RatingCreateWithoutUserInputSchema).array(),z.lazy(() => RatingUncheckedCreateWithoutUserInputSchema),z.lazy(() => RatingUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RatingCreateOrConnectWithoutUserInputSchema),z.lazy(() => RatingCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RatingUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RatingUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RatingCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RatingUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RatingUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RatingUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => RatingUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RatingScalarWhereInputSchema),z.lazy(() => RatingScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.RatingUpdateManyWithoutUserNestedInput>;

export const RatingUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.RatingUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => RatingCreateWithoutUserInputSchema),z.lazy(() => RatingCreateWithoutUserInputSchema).array(),z.lazy(() => RatingUncheckedCreateWithoutUserInputSchema),z.lazy(() => RatingUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RatingCreateOrConnectWithoutUserInputSchema),z.lazy(() => RatingCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RatingUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RatingUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RatingCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RatingUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RatingUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RatingUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => RatingUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RatingScalarWhereInputSchema),z.lazy(() => RatingScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.RatingUncheckedUpdateManyWithoutUserNestedInput>;

export const CastedRoleCreateNestedManyWithoutCelebrityInputSchema: z.ZodType<Prisma.CastedRoleCreateNestedManyWithoutCelebrityInput> = z.object({
  create: z.union([ z.lazy(() => CastedRoleCreateWithoutCelebrityInputSchema),z.lazy(() => CastedRoleCreateWithoutCelebrityInputSchema).array(),z.lazy(() => CastedRoleUncheckedCreateWithoutCelebrityInputSchema),z.lazy(() => CastedRoleUncheckedCreateWithoutCelebrityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CastedRoleCreateOrConnectWithoutCelebrityInputSchema),z.lazy(() => CastedRoleCreateOrConnectWithoutCelebrityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CastedRoleCreateManyCelebrityInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CastedRoleWhereUniqueInputSchema),z.lazy(() => CastedRoleWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CastedRoleCreateNestedManyWithoutCelebrityInput>;

export const CrewCreateNestedManyWithoutCelebrityInputSchema: z.ZodType<Prisma.CrewCreateNestedManyWithoutCelebrityInput> = z.object({
  create: z.union([ z.lazy(() => CrewCreateWithoutCelebrityInputSchema),z.lazy(() => CrewCreateWithoutCelebrityInputSchema).array(),z.lazy(() => CrewUncheckedCreateWithoutCelebrityInputSchema),z.lazy(() => CrewUncheckedCreateWithoutCelebrityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CrewCreateOrConnectWithoutCelebrityInputSchema),z.lazy(() => CrewCreateOrConnectWithoutCelebrityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CrewCreateManyCelebrityInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CrewWhereUniqueInputSchema),z.lazy(() => CrewWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CrewCreateNestedManyWithoutCelebrityInput>;

export const CastedRoleUncheckedCreateNestedManyWithoutCelebrityInputSchema: z.ZodType<Prisma.CastedRoleUncheckedCreateNestedManyWithoutCelebrityInput> = z.object({
  create: z.union([ z.lazy(() => CastedRoleCreateWithoutCelebrityInputSchema),z.lazy(() => CastedRoleCreateWithoutCelebrityInputSchema).array(),z.lazy(() => CastedRoleUncheckedCreateWithoutCelebrityInputSchema),z.lazy(() => CastedRoleUncheckedCreateWithoutCelebrityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CastedRoleCreateOrConnectWithoutCelebrityInputSchema),z.lazy(() => CastedRoleCreateOrConnectWithoutCelebrityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CastedRoleCreateManyCelebrityInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CastedRoleWhereUniqueInputSchema),z.lazy(() => CastedRoleWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CastedRoleUncheckedCreateNestedManyWithoutCelebrityInput>;

export const CrewUncheckedCreateNestedManyWithoutCelebrityInputSchema: z.ZodType<Prisma.CrewUncheckedCreateNestedManyWithoutCelebrityInput> = z.object({
  create: z.union([ z.lazy(() => CrewCreateWithoutCelebrityInputSchema),z.lazy(() => CrewCreateWithoutCelebrityInputSchema).array(),z.lazy(() => CrewUncheckedCreateWithoutCelebrityInputSchema),z.lazy(() => CrewUncheckedCreateWithoutCelebrityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CrewCreateOrConnectWithoutCelebrityInputSchema),z.lazy(() => CrewCreateOrConnectWithoutCelebrityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CrewCreateManyCelebrityInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CrewWhereUniqueInputSchema),z.lazy(() => CrewWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CrewUncheckedCreateNestedManyWithoutCelebrityInput>;

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

export const CastedRoleUpdateManyWithoutCelebrityNestedInputSchema: z.ZodType<Prisma.CastedRoleUpdateManyWithoutCelebrityNestedInput> = z.object({
  create: z.union([ z.lazy(() => CastedRoleCreateWithoutCelebrityInputSchema),z.lazy(() => CastedRoleCreateWithoutCelebrityInputSchema).array(),z.lazy(() => CastedRoleUncheckedCreateWithoutCelebrityInputSchema),z.lazy(() => CastedRoleUncheckedCreateWithoutCelebrityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CastedRoleCreateOrConnectWithoutCelebrityInputSchema),z.lazy(() => CastedRoleCreateOrConnectWithoutCelebrityInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CastedRoleUpsertWithWhereUniqueWithoutCelebrityInputSchema),z.lazy(() => CastedRoleUpsertWithWhereUniqueWithoutCelebrityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CastedRoleCreateManyCelebrityInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CastedRoleWhereUniqueInputSchema),z.lazy(() => CastedRoleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CastedRoleWhereUniqueInputSchema),z.lazy(() => CastedRoleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CastedRoleWhereUniqueInputSchema),z.lazy(() => CastedRoleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CastedRoleWhereUniqueInputSchema),z.lazy(() => CastedRoleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CastedRoleUpdateWithWhereUniqueWithoutCelebrityInputSchema),z.lazy(() => CastedRoleUpdateWithWhereUniqueWithoutCelebrityInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CastedRoleUpdateManyWithWhereWithoutCelebrityInputSchema),z.lazy(() => CastedRoleUpdateManyWithWhereWithoutCelebrityInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CastedRoleScalarWhereInputSchema),z.lazy(() => CastedRoleScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CastedRoleUpdateManyWithoutCelebrityNestedInput>;

export const CrewUpdateManyWithoutCelebrityNestedInputSchema: z.ZodType<Prisma.CrewUpdateManyWithoutCelebrityNestedInput> = z.object({
  create: z.union([ z.lazy(() => CrewCreateWithoutCelebrityInputSchema),z.lazy(() => CrewCreateWithoutCelebrityInputSchema).array(),z.lazy(() => CrewUncheckedCreateWithoutCelebrityInputSchema),z.lazy(() => CrewUncheckedCreateWithoutCelebrityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CrewCreateOrConnectWithoutCelebrityInputSchema),z.lazy(() => CrewCreateOrConnectWithoutCelebrityInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CrewUpsertWithWhereUniqueWithoutCelebrityInputSchema),z.lazy(() => CrewUpsertWithWhereUniqueWithoutCelebrityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CrewCreateManyCelebrityInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CrewWhereUniqueInputSchema),z.lazy(() => CrewWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CrewWhereUniqueInputSchema),z.lazy(() => CrewWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CrewWhereUniqueInputSchema),z.lazy(() => CrewWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CrewWhereUniqueInputSchema),z.lazy(() => CrewWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CrewUpdateWithWhereUniqueWithoutCelebrityInputSchema),z.lazy(() => CrewUpdateWithWhereUniqueWithoutCelebrityInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CrewUpdateManyWithWhereWithoutCelebrityInputSchema),z.lazy(() => CrewUpdateManyWithWhereWithoutCelebrityInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CrewScalarWhereInputSchema),z.lazy(() => CrewScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CrewUpdateManyWithoutCelebrityNestedInput>;

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict() as z.ZodType<Prisma.IntFieldUpdateOperationsInput>;

export const CastedRoleUncheckedUpdateManyWithoutCelebrityNestedInputSchema: z.ZodType<Prisma.CastedRoleUncheckedUpdateManyWithoutCelebrityNestedInput> = z.object({
  create: z.union([ z.lazy(() => CastedRoleCreateWithoutCelebrityInputSchema),z.lazy(() => CastedRoleCreateWithoutCelebrityInputSchema).array(),z.lazy(() => CastedRoleUncheckedCreateWithoutCelebrityInputSchema),z.lazy(() => CastedRoleUncheckedCreateWithoutCelebrityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CastedRoleCreateOrConnectWithoutCelebrityInputSchema),z.lazy(() => CastedRoleCreateOrConnectWithoutCelebrityInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CastedRoleUpsertWithWhereUniqueWithoutCelebrityInputSchema),z.lazy(() => CastedRoleUpsertWithWhereUniqueWithoutCelebrityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CastedRoleCreateManyCelebrityInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CastedRoleWhereUniqueInputSchema),z.lazy(() => CastedRoleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CastedRoleWhereUniqueInputSchema),z.lazy(() => CastedRoleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CastedRoleWhereUniqueInputSchema),z.lazy(() => CastedRoleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CastedRoleWhereUniqueInputSchema),z.lazy(() => CastedRoleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CastedRoleUpdateWithWhereUniqueWithoutCelebrityInputSchema),z.lazy(() => CastedRoleUpdateWithWhereUniqueWithoutCelebrityInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CastedRoleUpdateManyWithWhereWithoutCelebrityInputSchema),z.lazy(() => CastedRoleUpdateManyWithWhereWithoutCelebrityInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CastedRoleScalarWhereInputSchema),z.lazy(() => CastedRoleScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CastedRoleUncheckedUpdateManyWithoutCelebrityNestedInput>;

export const CrewUncheckedUpdateManyWithoutCelebrityNestedInputSchema: z.ZodType<Prisma.CrewUncheckedUpdateManyWithoutCelebrityNestedInput> = z.object({
  create: z.union([ z.lazy(() => CrewCreateWithoutCelebrityInputSchema),z.lazy(() => CrewCreateWithoutCelebrityInputSchema).array(),z.lazy(() => CrewUncheckedCreateWithoutCelebrityInputSchema),z.lazy(() => CrewUncheckedCreateWithoutCelebrityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CrewCreateOrConnectWithoutCelebrityInputSchema),z.lazy(() => CrewCreateOrConnectWithoutCelebrityInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CrewUpsertWithWhereUniqueWithoutCelebrityInputSchema),z.lazy(() => CrewUpsertWithWhereUniqueWithoutCelebrityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CrewCreateManyCelebrityInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CrewWhereUniqueInputSchema),z.lazy(() => CrewWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CrewWhereUniqueInputSchema),z.lazy(() => CrewWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CrewWhereUniqueInputSchema),z.lazy(() => CrewWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CrewWhereUniqueInputSchema),z.lazy(() => CrewWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CrewUpdateWithWhereUniqueWithoutCelebrityInputSchema),z.lazy(() => CrewUpdateWithWhereUniqueWithoutCelebrityInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CrewUpdateManyWithWhereWithoutCelebrityInputSchema),z.lazy(() => CrewUpdateManyWithWhereWithoutCelebrityInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CrewScalarWhereInputSchema),z.lazy(() => CrewScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CrewUncheckedUpdateManyWithoutCelebrityNestedInput>;

export const GenreCreateNestedManyWithoutMoviesInputSchema: z.ZodType<Prisma.GenreCreateNestedManyWithoutMoviesInput> = z.object({
  create: z.union([ z.lazy(() => GenreCreateWithoutMoviesInputSchema),z.lazy(() => GenreCreateWithoutMoviesInputSchema).array(),z.lazy(() => GenreUncheckedCreateWithoutMoviesInputSchema),z.lazy(() => GenreUncheckedCreateWithoutMoviesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GenreCreateOrConnectWithoutMoviesInputSchema),z.lazy(() => GenreCreateOrConnectWithoutMoviesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GenreWhereUniqueInputSchema),z.lazy(() => GenreWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.GenreCreateNestedManyWithoutMoviesInput>;

export const RatingCreateNestedManyWithoutMovieInputSchema: z.ZodType<Prisma.RatingCreateNestedManyWithoutMovieInput> = z.object({
  create: z.union([ z.lazy(() => RatingCreateWithoutMovieInputSchema),z.lazy(() => RatingCreateWithoutMovieInputSchema).array(),z.lazy(() => RatingUncheckedCreateWithoutMovieInputSchema),z.lazy(() => RatingUncheckedCreateWithoutMovieInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RatingCreateOrConnectWithoutMovieInputSchema),z.lazy(() => RatingCreateOrConnectWithoutMovieInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RatingCreateManyMovieInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.RatingCreateNestedManyWithoutMovieInput>;

export const CastedRoleCreateNestedManyWithoutMovieInputSchema: z.ZodType<Prisma.CastedRoleCreateNestedManyWithoutMovieInput> = z.object({
  create: z.union([ z.lazy(() => CastedRoleCreateWithoutMovieInputSchema),z.lazy(() => CastedRoleCreateWithoutMovieInputSchema).array(),z.lazy(() => CastedRoleUncheckedCreateWithoutMovieInputSchema),z.lazy(() => CastedRoleUncheckedCreateWithoutMovieInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CastedRoleCreateOrConnectWithoutMovieInputSchema),z.lazy(() => CastedRoleCreateOrConnectWithoutMovieInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CastedRoleCreateManyMovieInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CastedRoleWhereUniqueInputSchema),z.lazy(() => CastedRoleWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CastedRoleCreateNestedManyWithoutMovieInput>;

export const CrewCreateNestedManyWithoutMovieInputSchema: z.ZodType<Prisma.CrewCreateNestedManyWithoutMovieInput> = z.object({
  create: z.union([ z.lazy(() => CrewCreateWithoutMovieInputSchema),z.lazy(() => CrewCreateWithoutMovieInputSchema).array(),z.lazy(() => CrewUncheckedCreateWithoutMovieInputSchema),z.lazy(() => CrewUncheckedCreateWithoutMovieInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CrewCreateOrConnectWithoutMovieInputSchema),z.lazy(() => CrewCreateOrConnectWithoutMovieInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CrewCreateManyMovieInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CrewWhereUniqueInputSchema),z.lazy(() => CrewWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CrewCreateNestedManyWithoutMovieInput>;

export const GenreUncheckedCreateNestedManyWithoutMoviesInputSchema: z.ZodType<Prisma.GenreUncheckedCreateNestedManyWithoutMoviesInput> = z.object({
  create: z.union([ z.lazy(() => GenreCreateWithoutMoviesInputSchema),z.lazy(() => GenreCreateWithoutMoviesInputSchema).array(),z.lazy(() => GenreUncheckedCreateWithoutMoviesInputSchema),z.lazy(() => GenreUncheckedCreateWithoutMoviesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GenreCreateOrConnectWithoutMoviesInputSchema),z.lazy(() => GenreCreateOrConnectWithoutMoviesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GenreWhereUniqueInputSchema),z.lazy(() => GenreWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.GenreUncheckedCreateNestedManyWithoutMoviesInput>;

export const RatingUncheckedCreateNestedManyWithoutMovieInputSchema: z.ZodType<Prisma.RatingUncheckedCreateNestedManyWithoutMovieInput> = z.object({
  create: z.union([ z.lazy(() => RatingCreateWithoutMovieInputSchema),z.lazy(() => RatingCreateWithoutMovieInputSchema).array(),z.lazy(() => RatingUncheckedCreateWithoutMovieInputSchema),z.lazy(() => RatingUncheckedCreateWithoutMovieInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RatingCreateOrConnectWithoutMovieInputSchema),z.lazy(() => RatingCreateOrConnectWithoutMovieInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RatingCreateManyMovieInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.RatingUncheckedCreateNestedManyWithoutMovieInput>;

export const CastedRoleUncheckedCreateNestedManyWithoutMovieInputSchema: z.ZodType<Prisma.CastedRoleUncheckedCreateNestedManyWithoutMovieInput> = z.object({
  create: z.union([ z.lazy(() => CastedRoleCreateWithoutMovieInputSchema),z.lazy(() => CastedRoleCreateWithoutMovieInputSchema).array(),z.lazy(() => CastedRoleUncheckedCreateWithoutMovieInputSchema),z.lazy(() => CastedRoleUncheckedCreateWithoutMovieInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CastedRoleCreateOrConnectWithoutMovieInputSchema),z.lazy(() => CastedRoleCreateOrConnectWithoutMovieInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CastedRoleCreateManyMovieInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CastedRoleWhereUniqueInputSchema),z.lazy(() => CastedRoleWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CastedRoleUncheckedCreateNestedManyWithoutMovieInput>;

export const CrewUncheckedCreateNestedManyWithoutMovieInputSchema: z.ZodType<Prisma.CrewUncheckedCreateNestedManyWithoutMovieInput> = z.object({
  create: z.union([ z.lazy(() => CrewCreateWithoutMovieInputSchema),z.lazy(() => CrewCreateWithoutMovieInputSchema).array(),z.lazy(() => CrewUncheckedCreateWithoutMovieInputSchema),z.lazy(() => CrewUncheckedCreateWithoutMovieInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CrewCreateOrConnectWithoutMovieInputSchema),z.lazy(() => CrewCreateOrConnectWithoutMovieInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CrewCreateManyMovieInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CrewWhereUniqueInputSchema),z.lazy(() => CrewWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CrewUncheckedCreateNestedManyWithoutMovieInput>;

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict() as z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput>;

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

export const RatingUpdateManyWithoutMovieNestedInputSchema: z.ZodType<Prisma.RatingUpdateManyWithoutMovieNestedInput> = z.object({
  create: z.union([ z.lazy(() => RatingCreateWithoutMovieInputSchema),z.lazy(() => RatingCreateWithoutMovieInputSchema).array(),z.lazy(() => RatingUncheckedCreateWithoutMovieInputSchema),z.lazy(() => RatingUncheckedCreateWithoutMovieInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RatingCreateOrConnectWithoutMovieInputSchema),z.lazy(() => RatingCreateOrConnectWithoutMovieInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RatingUpsertWithWhereUniqueWithoutMovieInputSchema),z.lazy(() => RatingUpsertWithWhereUniqueWithoutMovieInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RatingCreateManyMovieInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RatingUpdateWithWhereUniqueWithoutMovieInputSchema),z.lazy(() => RatingUpdateWithWhereUniqueWithoutMovieInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RatingUpdateManyWithWhereWithoutMovieInputSchema),z.lazy(() => RatingUpdateManyWithWhereWithoutMovieInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RatingScalarWhereInputSchema),z.lazy(() => RatingScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.RatingUpdateManyWithoutMovieNestedInput>;

export const CastedRoleUpdateManyWithoutMovieNestedInputSchema: z.ZodType<Prisma.CastedRoleUpdateManyWithoutMovieNestedInput> = z.object({
  create: z.union([ z.lazy(() => CastedRoleCreateWithoutMovieInputSchema),z.lazy(() => CastedRoleCreateWithoutMovieInputSchema).array(),z.lazy(() => CastedRoleUncheckedCreateWithoutMovieInputSchema),z.lazy(() => CastedRoleUncheckedCreateWithoutMovieInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CastedRoleCreateOrConnectWithoutMovieInputSchema),z.lazy(() => CastedRoleCreateOrConnectWithoutMovieInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CastedRoleUpsertWithWhereUniqueWithoutMovieInputSchema),z.lazy(() => CastedRoleUpsertWithWhereUniqueWithoutMovieInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CastedRoleCreateManyMovieInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CastedRoleWhereUniqueInputSchema),z.lazy(() => CastedRoleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CastedRoleWhereUniqueInputSchema),z.lazy(() => CastedRoleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CastedRoleWhereUniqueInputSchema),z.lazy(() => CastedRoleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CastedRoleWhereUniqueInputSchema),z.lazy(() => CastedRoleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CastedRoleUpdateWithWhereUniqueWithoutMovieInputSchema),z.lazy(() => CastedRoleUpdateWithWhereUniqueWithoutMovieInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CastedRoleUpdateManyWithWhereWithoutMovieInputSchema),z.lazy(() => CastedRoleUpdateManyWithWhereWithoutMovieInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CastedRoleScalarWhereInputSchema),z.lazy(() => CastedRoleScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CastedRoleUpdateManyWithoutMovieNestedInput>;

export const CrewUpdateManyWithoutMovieNestedInputSchema: z.ZodType<Prisma.CrewUpdateManyWithoutMovieNestedInput> = z.object({
  create: z.union([ z.lazy(() => CrewCreateWithoutMovieInputSchema),z.lazy(() => CrewCreateWithoutMovieInputSchema).array(),z.lazy(() => CrewUncheckedCreateWithoutMovieInputSchema),z.lazy(() => CrewUncheckedCreateWithoutMovieInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CrewCreateOrConnectWithoutMovieInputSchema),z.lazy(() => CrewCreateOrConnectWithoutMovieInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CrewUpsertWithWhereUniqueWithoutMovieInputSchema),z.lazy(() => CrewUpsertWithWhereUniqueWithoutMovieInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CrewCreateManyMovieInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CrewWhereUniqueInputSchema),z.lazy(() => CrewWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CrewWhereUniqueInputSchema),z.lazy(() => CrewWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CrewWhereUniqueInputSchema),z.lazy(() => CrewWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CrewWhereUniqueInputSchema),z.lazy(() => CrewWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CrewUpdateWithWhereUniqueWithoutMovieInputSchema),z.lazy(() => CrewUpdateWithWhereUniqueWithoutMovieInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CrewUpdateManyWithWhereWithoutMovieInputSchema),z.lazy(() => CrewUpdateManyWithWhereWithoutMovieInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CrewScalarWhereInputSchema),z.lazy(() => CrewScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CrewUpdateManyWithoutMovieNestedInput>;

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

export const RatingUncheckedUpdateManyWithoutMovieNestedInputSchema: z.ZodType<Prisma.RatingUncheckedUpdateManyWithoutMovieNestedInput> = z.object({
  create: z.union([ z.lazy(() => RatingCreateWithoutMovieInputSchema),z.lazy(() => RatingCreateWithoutMovieInputSchema).array(),z.lazy(() => RatingUncheckedCreateWithoutMovieInputSchema),z.lazy(() => RatingUncheckedCreateWithoutMovieInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RatingCreateOrConnectWithoutMovieInputSchema),z.lazy(() => RatingCreateOrConnectWithoutMovieInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RatingUpsertWithWhereUniqueWithoutMovieInputSchema),z.lazy(() => RatingUpsertWithWhereUniqueWithoutMovieInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RatingCreateManyMovieInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RatingUpdateWithWhereUniqueWithoutMovieInputSchema),z.lazy(() => RatingUpdateWithWhereUniqueWithoutMovieInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RatingUpdateManyWithWhereWithoutMovieInputSchema),z.lazy(() => RatingUpdateManyWithWhereWithoutMovieInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RatingScalarWhereInputSchema),z.lazy(() => RatingScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.RatingUncheckedUpdateManyWithoutMovieNestedInput>;

export const CastedRoleUncheckedUpdateManyWithoutMovieNestedInputSchema: z.ZodType<Prisma.CastedRoleUncheckedUpdateManyWithoutMovieNestedInput> = z.object({
  create: z.union([ z.lazy(() => CastedRoleCreateWithoutMovieInputSchema),z.lazy(() => CastedRoleCreateWithoutMovieInputSchema).array(),z.lazy(() => CastedRoleUncheckedCreateWithoutMovieInputSchema),z.lazy(() => CastedRoleUncheckedCreateWithoutMovieInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CastedRoleCreateOrConnectWithoutMovieInputSchema),z.lazy(() => CastedRoleCreateOrConnectWithoutMovieInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CastedRoleUpsertWithWhereUniqueWithoutMovieInputSchema),z.lazy(() => CastedRoleUpsertWithWhereUniqueWithoutMovieInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CastedRoleCreateManyMovieInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CastedRoleWhereUniqueInputSchema),z.lazy(() => CastedRoleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CastedRoleWhereUniqueInputSchema),z.lazy(() => CastedRoleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CastedRoleWhereUniqueInputSchema),z.lazy(() => CastedRoleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CastedRoleWhereUniqueInputSchema),z.lazy(() => CastedRoleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CastedRoleUpdateWithWhereUniqueWithoutMovieInputSchema),z.lazy(() => CastedRoleUpdateWithWhereUniqueWithoutMovieInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CastedRoleUpdateManyWithWhereWithoutMovieInputSchema),z.lazy(() => CastedRoleUpdateManyWithWhereWithoutMovieInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CastedRoleScalarWhereInputSchema),z.lazy(() => CastedRoleScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CastedRoleUncheckedUpdateManyWithoutMovieNestedInput>;

export const CrewUncheckedUpdateManyWithoutMovieNestedInputSchema: z.ZodType<Prisma.CrewUncheckedUpdateManyWithoutMovieNestedInput> = z.object({
  create: z.union([ z.lazy(() => CrewCreateWithoutMovieInputSchema),z.lazy(() => CrewCreateWithoutMovieInputSchema).array(),z.lazy(() => CrewUncheckedCreateWithoutMovieInputSchema),z.lazy(() => CrewUncheckedCreateWithoutMovieInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CrewCreateOrConnectWithoutMovieInputSchema),z.lazy(() => CrewCreateOrConnectWithoutMovieInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CrewUpsertWithWhereUniqueWithoutMovieInputSchema),z.lazy(() => CrewUpsertWithWhereUniqueWithoutMovieInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CrewCreateManyMovieInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CrewWhereUniqueInputSchema),z.lazy(() => CrewWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CrewWhereUniqueInputSchema),z.lazy(() => CrewWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CrewWhereUniqueInputSchema),z.lazy(() => CrewWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CrewWhereUniqueInputSchema),z.lazy(() => CrewWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CrewUpdateWithWhereUniqueWithoutMovieInputSchema),z.lazy(() => CrewUpdateWithWhereUniqueWithoutMovieInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CrewUpdateManyWithWhereWithoutMovieInputSchema),z.lazy(() => CrewUpdateManyWithWhereWithoutMovieInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CrewScalarWhereInputSchema),z.lazy(() => CrewScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CrewUncheckedUpdateManyWithoutMovieNestedInput>;

export const GenreCreateNestedManyWithoutShowsInputSchema: z.ZodType<Prisma.GenreCreateNestedManyWithoutShowsInput> = z.object({
  create: z.union([ z.lazy(() => GenreCreateWithoutShowsInputSchema),z.lazy(() => GenreCreateWithoutShowsInputSchema).array(),z.lazy(() => GenreUncheckedCreateWithoutShowsInputSchema),z.lazy(() => GenreUncheckedCreateWithoutShowsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GenreCreateOrConnectWithoutShowsInputSchema),z.lazy(() => GenreCreateOrConnectWithoutShowsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GenreWhereUniqueInputSchema),z.lazy(() => GenreWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.GenreCreateNestedManyWithoutShowsInput>;

export const RatingCreateNestedManyWithoutShowInputSchema: z.ZodType<Prisma.RatingCreateNestedManyWithoutShowInput> = z.object({
  create: z.union([ z.lazy(() => RatingCreateWithoutShowInputSchema),z.lazy(() => RatingCreateWithoutShowInputSchema).array(),z.lazy(() => RatingUncheckedCreateWithoutShowInputSchema),z.lazy(() => RatingUncheckedCreateWithoutShowInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RatingCreateOrConnectWithoutShowInputSchema),z.lazy(() => RatingCreateOrConnectWithoutShowInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RatingCreateManyShowInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.RatingCreateNestedManyWithoutShowInput>;

export const CrewCreateNestedManyWithoutShowInputSchema: z.ZodType<Prisma.CrewCreateNestedManyWithoutShowInput> = z.object({
  create: z.union([ z.lazy(() => CrewCreateWithoutShowInputSchema),z.lazy(() => CrewCreateWithoutShowInputSchema).array(),z.lazy(() => CrewUncheckedCreateWithoutShowInputSchema),z.lazy(() => CrewUncheckedCreateWithoutShowInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CrewCreateOrConnectWithoutShowInputSchema),z.lazy(() => CrewCreateOrConnectWithoutShowInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CrewCreateManyShowInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CrewWhereUniqueInputSchema),z.lazy(() => CrewWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CrewCreateNestedManyWithoutShowInput>;

export const CastedRoleCreateNestedManyWithoutShowInputSchema: z.ZodType<Prisma.CastedRoleCreateNestedManyWithoutShowInput> = z.object({
  create: z.union([ z.lazy(() => CastedRoleCreateWithoutShowInputSchema),z.lazy(() => CastedRoleCreateWithoutShowInputSchema).array(),z.lazy(() => CastedRoleUncheckedCreateWithoutShowInputSchema),z.lazy(() => CastedRoleUncheckedCreateWithoutShowInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CastedRoleCreateOrConnectWithoutShowInputSchema),z.lazy(() => CastedRoleCreateOrConnectWithoutShowInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CastedRoleCreateManyShowInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CastedRoleWhereUniqueInputSchema),z.lazy(() => CastedRoleWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CastedRoleCreateNestedManyWithoutShowInput>;

export const GenreUncheckedCreateNestedManyWithoutShowsInputSchema: z.ZodType<Prisma.GenreUncheckedCreateNestedManyWithoutShowsInput> = z.object({
  create: z.union([ z.lazy(() => GenreCreateWithoutShowsInputSchema),z.lazy(() => GenreCreateWithoutShowsInputSchema).array(),z.lazy(() => GenreUncheckedCreateWithoutShowsInputSchema),z.lazy(() => GenreUncheckedCreateWithoutShowsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GenreCreateOrConnectWithoutShowsInputSchema),z.lazy(() => GenreCreateOrConnectWithoutShowsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GenreWhereUniqueInputSchema),z.lazy(() => GenreWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.GenreUncheckedCreateNestedManyWithoutShowsInput>;

export const RatingUncheckedCreateNestedManyWithoutShowInputSchema: z.ZodType<Prisma.RatingUncheckedCreateNestedManyWithoutShowInput> = z.object({
  create: z.union([ z.lazy(() => RatingCreateWithoutShowInputSchema),z.lazy(() => RatingCreateWithoutShowInputSchema).array(),z.lazy(() => RatingUncheckedCreateWithoutShowInputSchema),z.lazy(() => RatingUncheckedCreateWithoutShowInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RatingCreateOrConnectWithoutShowInputSchema),z.lazy(() => RatingCreateOrConnectWithoutShowInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RatingCreateManyShowInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.RatingUncheckedCreateNestedManyWithoutShowInput>;

export const CrewUncheckedCreateNestedManyWithoutShowInputSchema: z.ZodType<Prisma.CrewUncheckedCreateNestedManyWithoutShowInput> = z.object({
  create: z.union([ z.lazy(() => CrewCreateWithoutShowInputSchema),z.lazy(() => CrewCreateWithoutShowInputSchema).array(),z.lazy(() => CrewUncheckedCreateWithoutShowInputSchema),z.lazy(() => CrewUncheckedCreateWithoutShowInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CrewCreateOrConnectWithoutShowInputSchema),z.lazy(() => CrewCreateOrConnectWithoutShowInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CrewCreateManyShowInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CrewWhereUniqueInputSchema),z.lazy(() => CrewWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CrewUncheckedCreateNestedManyWithoutShowInput>;

export const CastedRoleUncheckedCreateNestedManyWithoutShowInputSchema: z.ZodType<Prisma.CastedRoleUncheckedCreateNestedManyWithoutShowInput> = z.object({
  create: z.union([ z.lazy(() => CastedRoleCreateWithoutShowInputSchema),z.lazy(() => CastedRoleCreateWithoutShowInputSchema).array(),z.lazy(() => CastedRoleUncheckedCreateWithoutShowInputSchema),z.lazy(() => CastedRoleUncheckedCreateWithoutShowInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CastedRoleCreateOrConnectWithoutShowInputSchema),z.lazy(() => CastedRoleCreateOrConnectWithoutShowInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CastedRoleCreateManyShowInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CastedRoleWhereUniqueInputSchema),z.lazy(() => CastedRoleWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CastedRoleUncheckedCreateNestedManyWithoutShowInput>;

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

export const RatingUpdateManyWithoutShowNestedInputSchema: z.ZodType<Prisma.RatingUpdateManyWithoutShowNestedInput> = z.object({
  create: z.union([ z.lazy(() => RatingCreateWithoutShowInputSchema),z.lazy(() => RatingCreateWithoutShowInputSchema).array(),z.lazy(() => RatingUncheckedCreateWithoutShowInputSchema),z.lazy(() => RatingUncheckedCreateWithoutShowInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RatingCreateOrConnectWithoutShowInputSchema),z.lazy(() => RatingCreateOrConnectWithoutShowInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RatingUpsertWithWhereUniqueWithoutShowInputSchema),z.lazy(() => RatingUpsertWithWhereUniqueWithoutShowInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RatingCreateManyShowInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RatingUpdateWithWhereUniqueWithoutShowInputSchema),z.lazy(() => RatingUpdateWithWhereUniqueWithoutShowInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RatingUpdateManyWithWhereWithoutShowInputSchema),z.lazy(() => RatingUpdateManyWithWhereWithoutShowInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RatingScalarWhereInputSchema),z.lazy(() => RatingScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.RatingUpdateManyWithoutShowNestedInput>;

export const CrewUpdateManyWithoutShowNestedInputSchema: z.ZodType<Prisma.CrewUpdateManyWithoutShowNestedInput> = z.object({
  create: z.union([ z.lazy(() => CrewCreateWithoutShowInputSchema),z.lazy(() => CrewCreateWithoutShowInputSchema).array(),z.lazy(() => CrewUncheckedCreateWithoutShowInputSchema),z.lazy(() => CrewUncheckedCreateWithoutShowInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CrewCreateOrConnectWithoutShowInputSchema),z.lazy(() => CrewCreateOrConnectWithoutShowInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CrewUpsertWithWhereUniqueWithoutShowInputSchema),z.lazy(() => CrewUpsertWithWhereUniqueWithoutShowInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CrewCreateManyShowInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CrewWhereUniqueInputSchema),z.lazy(() => CrewWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CrewWhereUniqueInputSchema),z.lazy(() => CrewWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CrewWhereUniqueInputSchema),z.lazy(() => CrewWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CrewWhereUniqueInputSchema),z.lazy(() => CrewWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CrewUpdateWithWhereUniqueWithoutShowInputSchema),z.lazy(() => CrewUpdateWithWhereUniqueWithoutShowInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CrewUpdateManyWithWhereWithoutShowInputSchema),z.lazy(() => CrewUpdateManyWithWhereWithoutShowInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CrewScalarWhereInputSchema),z.lazy(() => CrewScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CrewUpdateManyWithoutShowNestedInput>;

export const CastedRoleUpdateManyWithoutShowNestedInputSchema: z.ZodType<Prisma.CastedRoleUpdateManyWithoutShowNestedInput> = z.object({
  create: z.union([ z.lazy(() => CastedRoleCreateWithoutShowInputSchema),z.lazy(() => CastedRoleCreateWithoutShowInputSchema).array(),z.lazy(() => CastedRoleUncheckedCreateWithoutShowInputSchema),z.lazy(() => CastedRoleUncheckedCreateWithoutShowInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CastedRoleCreateOrConnectWithoutShowInputSchema),z.lazy(() => CastedRoleCreateOrConnectWithoutShowInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CastedRoleUpsertWithWhereUniqueWithoutShowInputSchema),z.lazy(() => CastedRoleUpsertWithWhereUniqueWithoutShowInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CastedRoleCreateManyShowInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CastedRoleWhereUniqueInputSchema),z.lazy(() => CastedRoleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CastedRoleWhereUniqueInputSchema),z.lazy(() => CastedRoleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CastedRoleWhereUniqueInputSchema),z.lazy(() => CastedRoleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CastedRoleWhereUniqueInputSchema),z.lazy(() => CastedRoleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CastedRoleUpdateWithWhereUniqueWithoutShowInputSchema),z.lazy(() => CastedRoleUpdateWithWhereUniqueWithoutShowInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CastedRoleUpdateManyWithWhereWithoutShowInputSchema),z.lazy(() => CastedRoleUpdateManyWithWhereWithoutShowInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CastedRoleScalarWhereInputSchema),z.lazy(() => CastedRoleScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CastedRoleUpdateManyWithoutShowNestedInput>;

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

export const RatingUncheckedUpdateManyWithoutShowNestedInputSchema: z.ZodType<Prisma.RatingUncheckedUpdateManyWithoutShowNestedInput> = z.object({
  create: z.union([ z.lazy(() => RatingCreateWithoutShowInputSchema),z.lazy(() => RatingCreateWithoutShowInputSchema).array(),z.lazy(() => RatingUncheckedCreateWithoutShowInputSchema),z.lazy(() => RatingUncheckedCreateWithoutShowInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RatingCreateOrConnectWithoutShowInputSchema),z.lazy(() => RatingCreateOrConnectWithoutShowInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RatingUpsertWithWhereUniqueWithoutShowInputSchema),z.lazy(() => RatingUpsertWithWhereUniqueWithoutShowInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RatingCreateManyShowInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RatingUpdateWithWhereUniqueWithoutShowInputSchema),z.lazy(() => RatingUpdateWithWhereUniqueWithoutShowInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RatingUpdateManyWithWhereWithoutShowInputSchema),z.lazy(() => RatingUpdateManyWithWhereWithoutShowInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RatingScalarWhereInputSchema),z.lazy(() => RatingScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.RatingUncheckedUpdateManyWithoutShowNestedInput>;

export const CrewUncheckedUpdateManyWithoutShowNestedInputSchema: z.ZodType<Prisma.CrewUncheckedUpdateManyWithoutShowNestedInput> = z.object({
  create: z.union([ z.lazy(() => CrewCreateWithoutShowInputSchema),z.lazy(() => CrewCreateWithoutShowInputSchema).array(),z.lazy(() => CrewUncheckedCreateWithoutShowInputSchema),z.lazy(() => CrewUncheckedCreateWithoutShowInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CrewCreateOrConnectWithoutShowInputSchema),z.lazy(() => CrewCreateOrConnectWithoutShowInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CrewUpsertWithWhereUniqueWithoutShowInputSchema),z.lazy(() => CrewUpsertWithWhereUniqueWithoutShowInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CrewCreateManyShowInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CrewWhereUniqueInputSchema),z.lazy(() => CrewWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CrewWhereUniqueInputSchema),z.lazy(() => CrewWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CrewWhereUniqueInputSchema),z.lazy(() => CrewWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CrewWhereUniqueInputSchema),z.lazy(() => CrewWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CrewUpdateWithWhereUniqueWithoutShowInputSchema),z.lazy(() => CrewUpdateWithWhereUniqueWithoutShowInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CrewUpdateManyWithWhereWithoutShowInputSchema),z.lazy(() => CrewUpdateManyWithWhereWithoutShowInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CrewScalarWhereInputSchema),z.lazy(() => CrewScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CrewUncheckedUpdateManyWithoutShowNestedInput>;

export const CastedRoleUncheckedUpdateManyWithoutShowNestedInputSchema: z.ZodType<Prisma.CastedRoleUncheckedUpdateManyWithoutShowNestedInput> = z.object({
  create: z.union([ z.lazy(() => CastedRoleCreateWithoutShowInputSchema),z.lazy(() => CastedRoleCreateWithoutShowInputSchema).array(),z.lazy(() => CastedRoleUncheckedCreateWithoutShowInputSchema),z.lazy(() => CastedRoleUncheckedCreateWithoutShowInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CastedRoleCreateOrConnectWithoutShowInputSchema),z.lazy(() => CastedRoleCreateOrConnectWithoutShowInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CastedRoleUpsertWithWhereUniqueWithoutShowInputSchema),z.lazy(() => CastedRoleUpsertWithWhereUniqueWithoutShowInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CastedRoleCreateManyShowInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CastedRoleWhereUniqueInputSchema),z.lazy(() => CastedRoleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CastedRoleWhereUniqueInputSchema),z.lazy(() => CastedRoleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CastedRoleWhereUniqueInputSchema),z.lazy(() => CastedRoleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CastedRoleWhereUniqueInputSchema),z.lazy(() => CastedRoleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CastedRoleUpdateWithWhereUniqueWithoutShowInputSchema),z.lazy(() => CastedRoleUpdateWithWhereUniqueWithoutShowInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CastedRoleUpdateManyWithWhereWithoutShowInputSchema),z.lazy(() => CastedRoleUpdateManyWithWhereWithoutShowInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CastedRoleScalarWhereInputSchema),z.lazy(() => CastedRoleScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CastedRoleUncheckedUpdateManyWithoutShowNestedInput>;

export const MovieCreateNestedOneWithoutRatingInputSchema: z.ZodType<Prisma.MovieCreateNestedOneWithoutRatingInput> = z.object({
  create: z.union([ z.lazy(() => MovieCreateWithoutRatingInputSchema),z.lazy(() => MovieUncheckedCreateWithoutRatingInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MovieCreateOrConnectWithoutRatingInputSchema).optional(),
  connect: z.lazy(() => MovieWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.MovieCreateNestedOneWithoutRatingInput>;

export const ShowCreateNestedOneWithoutRatingInputSchema: z.ZodType<Prisma.ShowCreateNestedOneWithoutRatingInput> = z.object({
  create: z.union([ z.lazy(() => ShowCreateWithoutRatingInputSchema),z.lazy(() => ShowUncheckedCreateWithoutRatingInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ShowCreateOrConnectWithoutRatingInputSchema).optional(),
  connect: z.lazy(() => ShowWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.ShowCreateNestedOneWithoutRatingInput>;

export const UserCreateNestedOneWithoutRatingInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutRatingInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRatingInputSchema),z.lazy(() => UserUncheckedCreateWithoutRatingInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRatingInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserCreateNestedOneWithoutRatingInput>;

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict() as z.ZodType<Prisma.FloatFieldUpdateOperationsInput>;

export const MovieUpdateOneWithoutRatingNestedInputSchema: z.ZodType<Prisma.MovieUpdateOneWithoutRatingNestedInput> = z.object({
  create: z.union([ z.lazy(() => MovieCreateWithoutRatingInputSchema),z.lazy(() => MovieUncheckedCreateWithoutRatingInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MovieCreateOrConnectWithoutRatingInputSchema).optional(),
  upsert: z.lazy(() => MovieUpsertWithoutRatingInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => MovieWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => MovieWhereInputSchema) ]).optional(),
  connect: z.lazy(() => MovieWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => MovieUpdateToOneWithWhereWithoutRatingInputSchema),z.lazy(() => MovieUpdateWithoutRatingInputSchema),z.lazy(() => MovieUncheckedUpdateWithoutRatingInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.MovieUpdateOneWithoutRatingNestedInput>;

export const ShowUpdateOneWithoutRatingNestedInputSchema: z.ZodType<Prisma.ShowUpdateOneWithoutRatingNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShowCreateWithoutRatingInputSchema),z.lazy(() => ShowUncheckedCreateWithoutRatingInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ShowCreateOrConnectWithoutRatingInputSchema).optional(),
  upsert: z.lazy(() => ShowUpsertWithoutRatingInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ShowWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ShowWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ShowWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ShowUpdateToOneWithWhereWithoutRatingInputSchema),z.lazy(() => ShowUpdateWithoutRatingInputSchema),z.lazy(() => ShowUncheckedUpdateWithoutRatingInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.ShowUpdateOneWithoutRatingNestedInput>;

export const UserUpdateOneRequiredWithoutRatingNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutRatingNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRatingInputSchema),z.lazy(() => UserUncheckedCreateWithoutRatingInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRatingInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutRatingInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutRatingInputSchema),z.lazy(() => UserUpdateWithoutRatingInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRatingInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.UserUpdateOneRequiredWithoutRatingNestedInput>;

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

export const MovieCreateNestedOneWithoutCastedRoleInputSchema: z.ZodType<Prisma.MovieCreateNestedOneWithoutCastedRoleInput> = z.object({
  create: z.union([ z.lazy(() => MovieCreateWithoutCastedRoleInputSchema),z.lazy(() => MovieUncheckedCreateWithoutCastedRoleInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MovieCreateOrConnectWithoutCastedRoleInputSchema).optional(),
  connect: z.lazy(() => MovieWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.MovieCreateNestedOneWithoutCastedRoleInput>;

export const ShowCreateNestedOneWithoutCastedRoleInputSchema: z.ZodType<Prisma.ShowCreateNestedOneWithoutCastedRoleInput> = z.object({
  create: z.union([ z.lazy(() => ShowCreateWithoutCastedRoleInputSchema),z.lazy(() => ShowUncheckedCreateWithoutCastedRoleInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ShowCreateOrConnectWithoutCastedRoleInputSchema).optional(),
  connect: z.lazy(() => ShowWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.ShowCreateNestedOneWithoutCastedRoleInput>;

export const CelebrityCreateNestedOneWithoutCastedRoleInputSchema: z.ZodType<Prisma.CelebrityCreateNestedOneWithoutCastedRoleInput> = z.object({
  create: z.union([ z.lazy(() => CelebrityCreateWithoutCastedRoleInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutCastedRoleInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CelebrityCreateOrConnectWithoutCastedRoleInputSchema).optional(),
  connect: z.lazy(() => CelebrityWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.CelebrityCreateNestedOneWithoutCastedRoleInput>;

export const MovieUpdateOneWithoutCastedRoleNestedInputSchema: z.ZodType<Prisma.MovieUpdateOneWithoutCastedRoleNestedInput> = z.object({
  create: z.union([ z.lazy(() => MovieCreateWithoutCastedRoleInputSchema),z.lazy(() => MovieUncheckedCreateWithoutCastedRoleInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MovieCreateOrConnectWithoutCastedRoleInputSchema).optional(),
  upsert: z.lazy(() => MovieUpsertWithoutCastedRoleInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => MovieWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => MovieWhereInputSchema) ]).optional(),
  connect: z.lazy(() => MovieWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => MovieUpdateToOneWithWhereWithoutCastedRoleInputSchema),z.lazy(() => MovieUpdateWithoutCastedRoleInputSchema),z.lazy(() => MovieUncheckedUpdateWithoutCastedRoleInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.MovieUpdateOneWithoutCastedRoleNestedInput>;

export const ShowUpdateOneWithoutCastedRoleNestedInputSchema: z.ZodType<Prisma.ShowUpdateOneWithoutCastedRoleNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShowCreateWithoutCastedRoleInputSchema),z.lazy(() => ShowUncheckedCreateWithoutCastedRoleInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ShowCreateOrConnectWithoutCastedRoleInputSchema).optional(),
  upsert: z.lazy(() => ShowUpsertWithoutCastedRoleInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ShowWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ShowWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ShowWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ShowUpdateToOneWithWhereWithoutCastedRoleInputSchema),z.lazy(() => ShowUpdateWithoutCastedRoleInputSchema),z.lazy(() => ShowUncheckedUpdateWithoutCastedRoleInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.ShowUpdateOneWithoutCastedRoleNestedInput>;

export const CelebrityUpdateOneRequiredWithoutCastedRoleNestedInputSchema: z.ZodType<Prisma.CelebrityUpdateOneRequiredWithoutCastedRoleNestedInput> = z.object({
  create: z.union([ z.lazy(() => CelebrityCreateWithoutCastedRoleInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutCastedRoleInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CelebrityCreateOrConnectWithoutCastedRoleInputSchema).optional(),
  upsert: z.lazy(() => CelebrityUpsertWithoutCastedRoleInputSchema).optional(),
  connect: z.lazy(() => CelebrityWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CelebrityUpdateToOneWithWhereWithoutCastedRoleInputSchema),z.lazy(() => CelebrityUpdateWithoutCastedRoleInputSchema),z.lazy(() => CelebrityUncheckedUpdateWithoutCastedRoleInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CelebrityUpdateOneRequiredWithoutCastedRoleNestedInput>;

export const MovieCreateNestedOneWithoutCrewInputSchema: z.ZodType<Prisma.MovieCreateNestedOneWithoutCrewInput> = z.object({
  create: z.union([ z.lazy(() => MovieCreateWithoutCrewInputSchema),z.lazy(() => MovieUncheckedCreateWithoutCrewInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MovieCreateOrConnectWithoutCrewInputSchema).optional(),
  connect: z.lazy(() => MovieWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.MovieCreateNestedOneWithoutCrewInput>;

export const ShowCreateNestedOneWithoutCrewInputSchema: z.ZodType<Prisma.ShowCreateNestedOneWithoutCrewInput> = z.object({
  create: z.union([ z.lazy(() => ShowCreateWithoutCrewInputSchema),z.lazy(() => ShowUncheckedCreateWithoutCrewInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ShowCreateOrConnectWithoutCrewInputSchema).optional(),
  connect: z.lazy(() => ShowWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.ShowCreateNestedOneWithoutCrewInput>;

export const CelebrityCreateNestedOneWithoutCrewInputSchema: z.ZodType<Prisma.CelebrityCreateNestedOneWithoutCrewInput> = z.object({
  create: z.union([ z.lazy(() => CelebrityCreateWithoutCrewInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutCrewInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CelebrityCreateOrConnectWithoutCrewInputSchema).optional(),
  connect: z.lazy(() => CelebrityWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.CelebrityCreateNestedOneWithoutCrewInput>;

export const MovieUpdateOneWithoutCrewNestedInputSchema: z.ZodType<Prisma.MovieUpdateOneWithoutCrewNestedInput> = z.object({
  create: z.union([ z.lazy(() => MovieCreateWithoutCrewInputSchema),z.lazy(() => MovieUncheckedCreateWithoutCrewInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MovieCreateOrConnectWithoutCrewInputSchema).optional(),
  upsert: z.lazy(() => MovieUpsertWithoutCrewInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => MovieWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => MovieWhereInputSchema) ]).optional(),
  connect: z.lazy(() => MovieWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => MovieUpdateToOneWithWhereWithoutCrewInputSchema),z.lazy(() => MovieUpdateWithoutCrewInputSchema),z.lazy(() => MovieUncheckedUpdateWithoutCrewInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.MovieUpdateOneWithoutCrewNestedInput>;

export const ShowUpdateOneWithoutCrewNestedInputSchema: z.ZodType<Prisma.ShowUpdateOneWithoutCrewNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShowCreateWithoutCrewInputSchema),z.lazy(() => ShowUncheckedCreateWithoutCrewInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ShowCreateOrConnectWithoutCrewInputSchema).optional(),
  upsert: z.lazy(() => ShowUpsertWithoutCrewInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ShowWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ShowWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ShowWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ShowUpdateToOneWithWhereWithoutCrewInputSchema),z.lazy(() => ShowUpdateWithoutCrewInputSchema),z.lazy(() => ShowUncheckedUpdateWithoutCrewInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.ShowUpdateOneWithoutCrewNestedInput>;

export const CelebrityUpdateOneRequiredWithoutCrewNestedInputSchema: z.ZodType<Prisma.CelebrityUpdateOneRequiredWithoutCrewNestedInput> = z.object({
  create: z.union([ z.lazy(() => CelebrityCreateWithoutCrewInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutCrewInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CelebrityCreateOrConnectWithoutCrewInputSchema).optional(),
  upsert: z.lazy(() => CelebrityUpsertWithoutCrewInputSchema).optional(),
  connect: z.lazy(() => CelebrityWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CelebrityUpdateToOneWithWhereWithoutCrewInputSchema),z.lazy(() => CelebrityUpdateWithoutCrewInputSchema),z.lazy(() => CelebrityUncheckedUpdateWithoutCrewInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CelebrityUpdateOneRequiredWithoutCrewNestedInput>;

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

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter>;

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

export const RatingCreateWithoutUserInputSchema: z.ZodType<Prisma.RatingCreateWithoutUserInput> = z.object({
  rating: z.number(),
  comment: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  movie: z.lazy(() => MovieCreateNestedOneWithoutRatingInputSchema).optional(),
  show: z.lazy(() => ShowCreateNestedOneWithoutRatingInputSchema).optional()
}).strict() as z.ZodType<Prisma.RatingCreateWithoutUserInput>;

export const RatingUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.RatingUncheckedCreateWithoutUserInput> = z.object({
  id: z.number().int().optional(),
  rating: z.number(),
  comment: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  movieId: z.number().int().optional().nullable(),
  showId: z.number().int().optional().nullable()
}).strict() as z.ZodType<Prisma.RatingUncheckedCreateWithoutUserInput>;

export const RatingCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.RatingCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => RatingWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RatingCreateWithoutUserInputSchema),z.lazy(() => RatingUncheckedCreateWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.RatingCreateOrConnectWithoutUserInput>;

export const RatingCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.RatingCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RatingCreateManyUserInputSchema),z.lazy(() => RatingCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.RatingCreateManyUserInputEnvelope>;

export const RatingUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.RatingUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => RatingWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RatingUpdateWithoutUserInputSchema),z.lazy(() => RatingUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => RatingCreateWithoutUserInputSchema),z.lazy(() => RatingUncheckedCreateWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.RatingUpsertWithWhereUniqueWithoutUserInput>;

export const RatingUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.RatingUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => RatingWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RatingUpdateWithoutUserInputSchema),z.lazy(() => RatingUncheckedUpdateWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.RatingUpdateWithWhereUniqueWithoutUserInput>;

export const RatingUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.RatingUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => RatingScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RatingUpdateManyMutationInputSchema),z.lazy(() => RatingUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.RatingUpdateManyWithWhereWithoutUserInput>;

export const RatingScalarWhereInputSchema: z.ZodType<Prisma.RatingScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RatingScalarWhereInputSchema),z.lazy(() => RatingScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RatingScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RatingScalarWhereInputSchema),z.lazy(() => RatingScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  rating: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  comment: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  movieId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  showId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
}).strict() as z.ZodType<Prisma.RatingScalarWhereInput>;

export const CastedRoleCreateWithoutCelebrityInputSchema: z.ZodType<Prisma.CastedRoleCreateWithoutCelebrityInput> = z.object({
  role: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  movie: z.lazy(() => MovieCreateNestedOneWithoutCastedRoleInputSchema).optional(),
  show: z.lazy(() => ShowCreateNestedOneWithoutCastedRoleInputSchema).optional()
}).strict() as z.ZodType<Prisma.CastedRoleCreateWithoutCelebrityInput>;

export const CastedRoleUncheckedCreateWithoutCelebrityInputSchema: z.ZodType<Prisma.CastedRoleUncheckedCreateWithoutCelebrityInput> = z.object({
  id: z.number().int().optional(),
  role: z.string(),
  movieId: z.number().int().optional().nullable(),
  showId: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.CastedRoleUncheckedCreateWithoutCelebrityInput>;

export const CastedRoleCreateOrConnectWithoutCelebrityInputSchema: z.ZodType<Prisma.CastedRoleCreateOrConnectWithoutCelebrityInput> = z.object({
  where: z.lazy(() => CastedRoleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CastedRoleCreateWithoutCelebrityInputSchema),z.lazy(() => CastedRoleUncheckedCreateWithoutCelebrityInputSchema) ]),
}).strict() as z.ZodType<Prisma.CastedRoleCreateOrConnectWithoutCelebrityInput>;

export const CastedRoleCreateManyCelebrityInputEnvelopeSchema: z.ZodType<Prisma.CastedRoleCreateManyCelebrityInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CastedRoleCreateManyCelebrityInputSchema),z.lazy(() => CastedRoleCreateManyCelebrityInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.CastedRoleCreateManyCelebrityInputEnvelope>;

export const CrewCreateWithoutCelebrityInputSchema: z.ZodType<Prisma.CrewCreateWithoutCelebrityInput> = z.object({
  role: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  movie: z.lazy(() => MovieCreateNestedOneWithoutCrewInputSchema).optional(),
  show: z.lazy(() => ShowCreateNestedOneWithoutCrewInputSchema).optional()
}).strict() as z.ZodType<Prisma.CrewCreateWithoutCelebrityInput>;

export const CrewUncheckedCreateWithoutCelebrityInputSchema: z.ZodType<Prisma.CrewUncheckedCreateWithoutCelebrityInput> = z.object({
  id: z.number().int().optional(),
  role: z.string(),
  movieId: z.number().int().optional().nullable(),
  showId: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.CrewUncheckedCreateWithoutCelebrityInput>;

export const CrewCreateOrConnectWithoutCelebrityInputSchema: z.ZodType<Prisma.CrewCreateOrConnectWithoutCelebrityInput> = z.object({
  where: z.lazy(() => CrewWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CrewCreateWithoutCelebrityInputSchema),z.lazy(() => CrewUncheckedCreateWithoutCelebrityInputSchema) ]),
}).strict() as z.ZodType<Prisma.CrewCreateOrConnectWithoutCelebrityInput>;

export const CrewCreateManyCelebrityInputEnvelopeSchema: z.ZodType<Prisma.CrewCreateManyCelebrityInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CrewCreateManyCelebrityInputSchema),z.lazy(() => CrewCreateManyCelebrityInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.CrewCreateManyCelebrityInputEnvelope>;

export const CastedRoleUpsertWithWhereUniqueWithoutCelebrityInputSchema: z.ZodType<Prisma.CastedRoleUpsertWithWhereUniqueWithoutCelebrityInput> = z.object({
  where: z.lazy(() => CastedRoleWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CastedRoleUpdateWithoutCelebrityInputSchema),z.lazy(() => CastedRoleUncheckedUpdateWithoutCelebrityInputSchema) ]),
  create: z.union([ z.lazy(() => CastedRoleCreateWithoutCelebrityInputSchema),z.lazy(() => CastedRoleUncheckedCreateWithoutCelebrityInputSchema) ]),
}).strict() as z.ZodType<Prisma.CastedRoleUpsertWithWhereUniqueWithoutCelebrityInput>;

export const CastedRoleUpdateWithWhereUniqueWithoutCelebrityInputSchema: z.ZodType<Prisma.CastedRoleUpdateWithWhereUniqueWithoutCelebrityInput> = z.object({
  where: z.lazy(() => CastedRoleWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CastedRoleUpdateWithoutCelebrityInputSchema),z.lazy(() => CastedRoleUncheckedUpdateWithoutCelebrityInputSchema) ]),
}).strict() as z.ZodType<Prisma.CastedRoleUpdateWithWhereUniqueWithoutCelebrityInput>;

export const CastedRoleUpdateManyWithWhereWithoutCelebrityInputSchema: z.ZodType<Prisma.CastedRoleUpdateManyWithWhereWithoutCelebrityInput> = z.object({
  where: z.lazy(() => CastedRoleScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CastedRoleUpdateManyMutationInputSchema),z.lazy(() => CastedRoleUncheckedUpdateManyWithoutCelebrityInputSchema) ]),
}).strict() as z.ZodType<Prisma.CastedRoleUpdateManyWithWhereWithoutCelebrityInput>;

export const CastedRoleScalarWhereInputSchema: z.ZodType<Prisma.CastedRoleScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CastedRoleScalarWhereInputSchema),z.lazy(() => CastedRoleScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CastedRoleScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CastedRoleScalarWhereInputSchema),z.lazy(() => CastedRoleScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  role: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  movieId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  showId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  celebrityId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict() as z.ZodType<Prisma.CastedRoleScalarWhereInput>;

export const CrewUpsertWithWhereUniqueWithoutCelebrityInputSchema: z.ZodType<Prisma.CrewUpsertWithWhereUniqueWithoutCelebrityInput> = z.object({
  where: z.lazy(() => CrewWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CrewUpdateWithoutCelebrityInputSchema),z.lazy(() => CrewUncheckedUpdateWithoutCelebrityInputSchema) ]),
  create: z.union([ z.lazy(() => CrewCreateWithoutCelebrityInputSchema),z.lazy(() => CrewUncheckedCreateWithoutCelebrityInputSchema) ]),
}).strict() as z.ZodType<Prisma.CrewUpsertWithWhereUniqueWithoutCelebrityInput>;

export const CrewUpdateWithWhereUniqueWithoutCelebrityInputSchema: z.ZodType<Prisma.CrewUpdateWithWhereUniqueWithoutCelebrityInput> = z.object({
  where: z.lazy(() => CrewWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CrewUpdateWithoutCelebrityInputSchema),z.lazy(() => CrewUncheckedUpdateWithoutCelebrityInputSchema) ]),
}).strict() as z.ZodType<Prisma.CrewUpdateWithWhereUniqueWithoutCelebrityInput>;

export const CrewUpdateManyWithWhereWithoutCelebrityInputSchema: z.ZodType<Prisma.CrewUpdateManyWithWhereWithoutCelebrityInput> = z.object({
  where: z.lazy(() => CrewScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CrewUpdateManyMutationInputSchema),z.lazy(() => CrewUncheckedUpdateManyWithoutCelebrityInputSchema) ]),
}).strict() as z.ZodType<Prisma.CrewUpdateManyWithWhereWithoutCelebrityInput>;

export const CrewScalarWhereInputSchema: z.ZodType<Prisma.CrewScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CrewScalarWhereInputSchema),z.lazy(() => CrewScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CrewScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CrewScalarWhereInputSchema),z.lazy(() => CrewScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  role: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  movieId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  showId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  celebrityId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict() as z.ZodType<Prisma.CrewScalarWhereInput>;

export const GenreCreateWithoutMoviesInputSchema: z.ZodType<Prisma.GenreCreateWithoutMoviesInput> = z.object({
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  shows: z.lazy(() => ShowCreateNestedManyWithoutGenresInputSchema).optional()
}).strict() as z.ZodType<Prisma.GenreCreateWithoutMoviesInput>;

export const GenreUncheckedCreateWithoutMoviesInputSchema: z.ZodType<Prisma.GenreUncheckedCreateWithoutMoviesInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  shows: z.lazy(() => ShowUncheckedCreateNestedManyWithoutGenresInputSchema).optional()
}).strict() as z.ZodType<Prisma.GenreUncheckedCreateWithoutMoviesInput>;

export const GenreCreateOrConnectWithoutMoviesInputSchema: z.ZodType<Prisma.GenreCreateOrConnectWithoutMoviesInput> = z.object({
  where: z.lazy(() => GenreWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => GenreCreateWithoutMoviesInputSchema),z.lazy(() => GenreUncheckedCreateWithoutMoviesInputSchema) ]),
}).strict() as z.ZodType<Prisma.GenreCreateOrConnectWithoutMoviesInput>;

export const RatingCreateWithoutMovieInputSchema: z.ZodType<Prisma.RatingCreateWithoutMovieInput> = z.object({
  rating: z.number(),
  comment: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  show: z.lazy(() => ShowCreateNestedOneWithoutRatingInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutRatingInputSchema)
}).strict() as z.ZodType<Prisma.RatingCreateWithoutMovieInput>;

export const RatingUncheckedCreateWithoutMovieInputSchema: z.ZodType<Prisma.RatingUncheckedCreateWithoutMovieInput> = z.object({
  id: z.number().int().optional(),
  rating: z.number(),
  comment: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  showId: z.number().int().optional().nullable(),
  userId: z.string()
}).strict() as z.ZodType<Prisma.RatingUncheckedCreateWithoutMovieInput>;

export const RatingCreateOrConnectWithoutMovieInputSchema: z.ZodType<Prisma.RatingCreateOrConnectWithoutMovieInput> = z.object({
  where: z.lazy(() => RatingWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RatingCreateWithoutMovieInputSchema),z.lazy(() => RatingUncheckedCreateWithoutMovieInputSchema) ]),
}).strict() as z.ZodType<Prisma.RatingCreateOrConnectWithoutMovieInput>;

export const RatingCreateManyMovieInputEnvelopeSchema: z.ZodType<Prisma.RatingCreateManyMovieInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RatingCreateManyMovieInputSchema),z.lazy(() => RatingCreateManyMovieInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.RatingCreateManyMovieInputEnvelope>;

export const CastedRoleCreateWithoutMovieInputSchema: z.ZodType<Prisma.CastedRoleCreateWithoutMovieInput> = z.object({
  role: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  show: z.lazy(() => ShowCreateNestedOneWithoutCastedRoleInputSchema).optional(),
  celebrity: z.lazy(() => CelebrityCreateNestedOneWithoutCastedRoleInputSchema)
}).strict() as z.ZodType<Prisma.CastedRoleCreateWithoutMovieInput>;

export const CastedRoleUncheckedCreateWithoutMovieInputSchema: z.ZodType<Prisma.CastedRoleUncheckedCreateWithoutMovieInput> = z.object({
  id: z.number().int().optional(),
  role: z.string(),
  showId: z.number().int().optional().nullable(),
  celebrityId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.CastedRoleUncheckedCreateWithoutMovieInput>;

export const CastedRoleCreateOrConnectWithoutMovieInputSchema: z.ZodType<Prisma.CastedRoleCreateOrConnectWithoutMovieInput> = z.object({
  where: z.lazy(() => CastedRoleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CastedRoleCreateWithoutMovieInputSchema),z.lazy(() => CastedRoleUncheckedCreateWithoutMovieInputSchema) ]),
}).strict() as z.ZodType<Prisma.CastedRoleCreateOrConnectWithoutMovieInput>;

export const CastedRoleCreateManyMovieInputEnvelopeSchema: z.ZodType<Prisma.CastedRoleCreateManyMovieInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CastedRoleCreateManyMovieInputSchema),z.lazy(() => CastedRoleCreateManyMovieInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.CastedRoleCreateManyMovieInputEnvelope>;

export const CrewCreateWithoutMovieInputSchema: z.ZodType<Prisma.CrewCreateWithoutMovieInput> = z.object({
  role: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  show: z.lazy(() => ShowCreateNestedOneWithoutCrewInputSchema).optional(),
  celebrity: z.lazy(() => CelebrityCreateNestedOneWithoutCrewInputSchema)
}).strict() as z.ZodType<Prisma.CrewCreateWithoutMovieInput>;

export const CrewUncheckedCreateWithoutMovieInputSchema: z.ZodType<Prisma.CrewUncheckedCreateWithoutMovieInput> = z.object({
  id: z.number().int().optional(),
  role: z.string(),
  showId: z.number().int().optional().nullable(),
  celebrityId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.CrewUncheckedCreateWithoutMovieInput>;

export const CrewCreateOrConnectWithoutMovieInputSchema: z.ZodType<Prisma.CrewCreateOrConnectWithoutMovieInput> = z.object({
  where: z.lazy(() => CrewWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CrewCreateWithoutMovieInputSchema),z.lazy(() => CrewUncheckedCreateWithoutMovieInputSchema) ]),
}).strict() as z.ZodType<Prisma.CrewCreateOrConnectWithoutMovieInput>;

export const CrewCreateManyMovieInputEnvelopeSchema: z.ZodType<Prisma.CrewCreateManyMovieInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CrewCreateManyMovieInputSchema),z.lazy(() => CrewCreateManyMovieInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.CrewCreateManyMovieInputEnvelope>;

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

export const RatingUpsertWithWhereUniqueWithoutMovieInputSchema: z.ZodType<Prisma.RatingUpsertWithWhereUniqueWithoutMovieInput> = z.object({
  where: z.lazy(() => RatingWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RatingUpdateWithoutMovieInputSchema),z.lazy(() => RatingUncheckedUpdateWithoutMovieInputSchema) ]),
  create: z.union([ z.lazy(() => RatingCreateWithoutMovieInputSchema),z.lazy(() => RatingUncheckedCreateWithoutMovieInputSchema) ]),
}).strict() as z.ZodType<Prisma.RatingUpsertWithWhereUniqueWithoutMovieInput>;

export const RatingUpdateWithWhereUniqueWithoutMovieInputSchema: z.ZodType<Prisma.RatingUpdateWithWhereUniqueWithoutMovieInput> = z.object({
  where: z.lazy(() => RatingWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RatingUpdateWithoutMovieInputSchema),z.lazy(() => RatingUncheckedUpdateWithoutMovieInputSchema) ]),
}).strict() as z.ZodType<Prisma.RatingUpdateWithWhereUniqueWithoutMovieInput>;

export const RatingUpdateManyWithWhereWithoutMovieInputSchema: z.ZodType<Prisma.RatingUpdateManyWithWhereWithoutMovieInput> = z.object({
  where: z.lazy(() => RatingScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RatingUpdateManyMutationInputSchema),z.lazy(() => RatingUncheckedUpdateManyWithoutMovieInputSchema) ]),
}).strict() as z.ZodType<Prisma.RatingUpdateManyWithWhereWithoutMovieInput>;

export const CastedRoleUpsertWithWhereUniqueWithoutMovieInputSchema: z.ZodType<Prisma.CastedRoleUpsertWithWhereUniqueWithoutMovieInput> = z.object({
  where: z.lazy(() => CastedRoleWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CastedRoleUpdateWithoutMovieInputSchema),z.lazy(() => CastedRoleUncheckedUpdateWithoutMovieInputSchema) ]),
  create: z.union([ z.lazy(() => CastedRoleCreateWithoutMovieInputSchema),z.lazy(() => CastedRoleUncheckedCreateWithoutMovieInputSchema) ]),
}).strict() as z.ZodType<Prisma.CastedRoleUpsertWithWhereUniqueWithoutMovieInput>;

export const CastedRoleUpdateWithWhereUniqueWithoutMovieInputSchema: z.ZodType<Prisma.CastedRoleUpdateWithWhereUniqueWithoutMovieInput> = z.object({
  where: z.lazy(() => CastedRoleWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CastedRoleUpdateWithoutMovieInputSchema),z.lazy(() => CastedRoleUncheckedUpdateWithoutMovieInputSchema) ]),
}).strict() as z.ZodType<Prisma.CastedRoleUpdateWithWhereUniqueWithoutMovieInput>;

export const CastedRoleUpdateManyWithWhereWithoutMovieInputSchema: z.ZodType<Prisma.CastedRoleUpdateManyWithWhereWithoutMovieInput> = z.object({
  where: z.lazy(() => CastedRoleScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CastedRoleUpdateManyMutationInputSchema),z.lazy(() => CastedRoleUncheckedUpdateManyWithoutMovieInputSchema) ]),
}).strict() as z.ZodType<Prisma.CastedRoleUpdateManyWithWhereWithoutMovieInput>;

export const CrewUpsertWithWhereUniqueWithoutMovieInputSchema: z.ZodType<Prisma.CrewUpsertWithWhereUniqueWithoutMovieInput> = z.object({
  where: z.lazy(() => CrewWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CrewUpdateWithoutMovieInputSchema),z.lazy(() => CrewUncheckedUpdateWithoutMovieInputSchema) ]),
  create: z.union([ z.lazy(() => CrewCreateWithoutMovieInputSchema),z.lazy(() => CrewUncheckedCreateWithoutMovieInputSchema) ]),
}).strict() as z.ZodType<Prisma.CrewUpsertWithWhereUniqueWithoutMovieInput>;

export const CrewUpdateWithWhereUniqueWithoutMovieInputSchema: z.ZodType<Prisma.CrewUpdateWithWhereUniqueWithoutMovieInput> = z.object({
  where: z.lazy(() => CrewWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CrewUpdateWithoutMovieInputSchema),z.lazy(() => CrewUncheckedUpdateWithoutMovieInputSchema) ]),
}).strict() as z.ZodType<Prisma.CrewUpdateWithWhereUniqueWithoutMovieInput>;

export const CrewUpdateManyWithWhereWithoutMovieInputSchema: z.ZodType<Prisma.CrewUpdateManyWithWhereWithoutMovieInput> = z.object({
  where: z.lazy(() => CrewScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CrewUpdateManyMutationInputSchema),z.lazy(() => CrewUncheckedUpdateManyWithoutMovieInputSchema) ]),
}).strict() as z.ZodType<Prisma.CrewUpdateManyWithWhereWithoutMovieInput>;

export const GenreCreateWithoutShowsInputSchema: z.ZodType<Prisma.GenreCreateWithoutShowsInput> = z.object({
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  movies: z.lazy(() => MovieCreateNestedManyWithoutGenresInputSchema).optional()
}).strict() as z.ZodType<Prisma.GenreCreateWithoutShowsInput>;

export const GenreUncheckedCreateWithoutShowsInputSchema: z.ZodType<Prisma.GenreUncheckedCreateWithoutShowsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  movies: z.lazy(() => MovieUncheckedCreateNestedManyWithoutGenresInputSchema).optional()
}).strict() as z.ZodType<Prisma.GenreUncheckedCreateWithoutShowsInput>;

export const GenreCreateOrConnectWithoutShowsInputSchema: z.ZodType<Prisma.GenreCreateOrConnectWithoutShowsInput> = z.object({
  where: z.lazy(() => GenreWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => GenreCreateWithoutShowsInputSchema),z.lazy(() => GenreUncheckedCreateWithoutShowsInputSchema) ]),
}).strict() as z.ZodType<Prisma.GenreCreateOrConnectWithoutShowsInput>;

export const RatingCreateWithoutShowInputSchema: z.ZodType<Prisma.RatingCreateWithoutShowInput> = z.object({
  rating: z.number(),
  comment: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  movie: z.lazy(() => MovieCreateNestedOneWithoutRatingInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutRatingInputSchema)
}).strict() as z.ZodType<Prisma.RatingCreateWithoutShowInput>;

export const RatingUncheckedCreateWithoutShowInputSchema: z.ZodType<Prisma.RatingUncheckedCreateWithoutShowInput> = z.object({
  id: z.number().int().optional(),
  rating: z.number(),
  comment: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  movieId: z.number().int().optional().nullable(),
  userId: z.string()
}).strict() as z.ZodType<Prisma.RatingUncheckedCreateWithoutShowInput>;

export const RatingCreateOrConnectWithoutShowInputSchema: z.ZodType<Prisma.RatingCreateOrConnectWithoutShowInput> = z.object({
  where: z.lazy(() => RatingWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RatingCreateWithoutShowInputSchema),z.lazy(() => RatingUncheckedCreateWithoutShowInputSchema) ]),
}).strict() as z.ZodType<Prisma.RatingCreateOrConnectWithoutShowInput>;

export const RatingCreateManyShowInputEnvelopeSchema: z.ZodType<Prisma.RatingCreateManyShowInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RatingCreateManyShowInputSchema),z.lazy(() => RatingCreateManyShowInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.RatingCreateManyShowInputEnvelope>;

export const CrewCreateWithoutShowInputSchema: z.ZodType<Prisma.CrewCreateWithoutShowInput> = z.object({
  role: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  movie: z.lazy(() => MovieCreateNestedOneWithoutCrewInputSchema).optional(),
  celebrity: z.lazy(() => CelebrityCreateNestedOneWithoutCrewInputSchema)
}).strict() as z.ZodType<Prisma.CrewCreateWithoutShowInput>;

export const CrewUncheckedCreateWithoutShowInputSchema: z.ZodType<Prisma.CrewUncheckedCreateWithoutShowInput> = z.object({
  id: z.number().int().optional(),
  role: z.string(),
  movieId: z.number().int().optional().nullable(),
  celebrityId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.CrewUncheckedCreateWithoutShowInput>;

export const CrewCreateOrConnectWithoutShowInputSchema: z.ZodType<Prisma.CrewCreateOrConnectWithoutShowInput> = z.object({
  where: z.lazy(() => CrewWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CrewCreateWithoutShowInputSchema),z.lazy(() => CrewUncheckedCreateWithoutShowInputSchema) ]),
}).strict() as z.ZodType<Prisma.CrewCreateOrConnectWithoutShowInput>;

export const CrewCreateManyShowInputEnvelopeSchema: z.ZodType<Prisma.CrewCreateManyShowInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CrewCreateManyShowInputSchema),z.lazy(() => CrewCreateManyShowInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.CrewCreateManyShowInputEnvelope>;

export const CastedRoleCreateWithoutShowInputSchema: z.ZodType<Prisma.CastedRoleCreateWithoutShowInput> = z.object({
  role: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  movie: z.lazy(() => MovieCreateNestedOneWithoutCastedRoleInputSchema).optional(),
  celebrity: z.lazy(() => CelebrityCreateNestedOneWithoutCastedRoleInputSchema)
}).strict() as z.ZodType<Prisma.CastedRoleCreateWithoutShowInput>;

export const CastedRoleUncheckedCreateWithoutShowInputSchema: z.ZodType<Prisma.CastedRoleUncheckedCreateWithoutShowInput> = z.object({
  id: z.number().int().optional(),
  role: z.string(),
  movieId: z.number().int().optional().nullable(),
  celebrityId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.CastedRoleUncheckedCreateWithoutShowInput>;

export const CastedRoleCreateOrConnectWithoutShowInputSchema: z.ZodType<Prisma.CastedRoleCreateOrConnectWithoutShowInput> = z.object({
  where: z.lazy(() => CastedRoleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CastedRoleCreateWithoutShowInputSchema),z.lazy(() => CastedRoleUncheckedCreateWithoutShowInputSchema) ]),
}).strict() as z.ZodType<Prisma.CastedRoleCreateOrConnectWithoutShowInput>;

export const CastedRoleCreateManyShowInputEnvelopeSchema: z.ZodType<Prisma.CastedRoleCreateManyShowInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CastedRoleCreateManyShowInputSchema),z.lazy(() => CastedRoleCreateManyShowInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.CastedRoleCreateManyShowInputEnvelope>;

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

export const RatingUpsertWithWhereUniqueWithoutShowInputSchema: z.ZodType<Prisma.RatingUpsertWithWhereUniqueWithoutShowInput> = z.object({
  where: z.lazy(() => RatingWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RatingUpdateWithoutShowInputSchema),z.lazy(() => RatingUncheckedUpdateWithoutShowInputSchema) ]),
  create: z.union([ z.lazy(() => RatingCreateWithoutShowInputSchema),z.lazy(() => RatingUncheckedCreateWithoutShowInputSchema) ]),
}).strict() as z.ZodType<Prisma.RatingUpsertWithWhereUniqueWithoutShowInput>;

export const RatingUpdateWithWhereUniqueWithoutShowInputSchema: z.ZodType<Prisma.RatingUpdateWithWhereUniqueWithoutShowInput> = z.object({
  where: z.lazy(() => RatingWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RatingUpdateWithoutShowInputSchema),z.lazy(() => RatingUncheckedUpdateWithoutShowInputSchema) ]),
}).strict() as z.ZodType<Prisma.RatingUpdateWithWhereUniqueWithoutShowInput>;

export const RatingUpdateManyWithWhereWithoutShowInputSchema: z.ZodType<Prisma.RatingUpdateManyWithWhereWithoutShowInput> = z.object({
  where: z.lazy(() => RatingScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RatingUpdateManyMutationInputSchema),z.lazy(() => RatingUncheckedUpdateManyWithoutShowInputSchema) ]),
}).strict() as z.ZodType<Prisma.RatingUpdateManyWithWhereWithoutShowInput>;

export const CrewUpsertWithWhereUniqueWithoutShowInputSchema: z.ZodType<Prisma.CrewUpsertWithWhereUniqueWithoutShowInput> = z.object({
  where: z.lazy(() => CrewWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CrewUpdateWithoutShowInputSchema),z.lazy(() => CrewUncheckedUpdateWithoutShowInputSchema) ]),
  create: z.union([ z.lazy(() => CrewCreateWithoutShowInputSchema),z.lazy(() => CrewUncheckedCreateWithoutShowInputSchema) ]),
}).strict() as z.ZodType<Prisma.CrewUpsertWithWhereUniqueWithoutShowInput>;

export const CrewUpdateWithWhereUniqueWithoutShowInputSchema: z.ZodType<Prisma.CrewUpdateWithWhereUniqueWithoutShowInput> = z.object({
  where: z.lazy(() => CrewWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CrewUpdateWithoutShowInputSchema),z.lazy(() => CrewUncheckedUpdateWithoutShowInputSchema) ]),
}).strict() as z.ZodType<Prisma.CrewUpdateWithWhereUniqueWithoutShowInput>;

export const CrewUpdateManyWithWhereWithoutShowInputSchema: z.ZodType<Prisma.CrewUpdateManyWithWhereWithoutShowInput> = z.object({
  where: z.lazy(() => CrewScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CrewUpdateManyMutationInputSchema),z.lazy(() => CrewUncheckedUpdateManyWithoutShowInputSchema) ]),
}).strict() as z.ZodType<Prisma.CrewUpdateManyWithWhereWithoutShowInput>;

export const CastedRoleUpsertWithWhereUniqueWithoutShowInputSchema: z.ZodType<Prisma.CastedRoleUpsertWithWhereUniqueWithoutShowInput> = z.object({
  where: z.lazy(() => CastedRoleWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CastedRoleUpdateWithoutShowInputSchema),z.lazy(() => CastedRoleUncheckedUpdateWithoutShowInputSchema) ]),
  create: z.union([ z.lazy(() => CastedRoleCreateWithoutShowInputSchema),z.lazy(() => CastedRoleUncheckedCreateWithoutShowInputSchema) ]),
}).strict() as z.ZodType<Prisma.CastedRoleUpsertWithWhereUniqueWithoutShowInput>;

export const CastedRoleUpdateWithWhereUniqueWithoutShowInputSchema: z.ZodType<Prisma.CastedRoleUpdateWithWhereUniqueWithoutShowInput> = z.object({
  where: z.lazy(() => CastedRoleWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CastedRoleUpdateWithoutShowInputSchema),z.lazy(() => CastedRoleUncheckedUpdateWithoutShowInputSchema) ]),
}).strict() as z.ZodType<Prisma.CastedRoleUpdateWithWhereUniqueWithoutShowInput>;

export const CastedRoleUpdateManyWithWhereWithoutShowInputSchema: z.ZodType<Prisma.CastedRoleUpdateManyWithWhereWithoutShowInput> = z.object({
  where: z.lazy(() => CastedRoleScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CastedRoleUpdateManyMutationInputSchema),z.lazy(() => CastedRoleUncheckedUpdateManyWithoutShowInputSchema) ]),
}).strict() as z.ZodType<Prisma.CastedRoleUpdateManyWithWhereWithoutShowInput>;

export const MovieCreateWithoutRatingInputSchema: z.ZodType<Prisma.MovieCreateWithoutRatingInput> = z.object({
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  directorId: z.number().int().optional().nullable(),
  genres: z.lazy(() => GenreCreateNestedManyWithoutMoviesInputSchema).optional(),
  castedRole: z.lazy(() => CastedRoleCreateNestedManyWithoutMovieInputSchema).optional(),
  crew: z.lazy(() => CrewCreateNestedManyWithoutMovieInputSchema).optional()
}).strict() as z.ZodType<Prisma.MovieCreateWithoutRatingInput>;

export const MovieUncheckedCreateWithoutRatingInputSchema: z.ZodType<Prisma.MovieUncheckedCreateWithoutRatingInput> = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  directorId: z.number().int().optional().nullable(),
  genres: z.lazy(() => GenreUncheckedCreateNestedManyWithoutMoviesInputSchema).optional(),
  castedRole: z.lazy(() => CastedRoleUncheckedCreateNestedManyWithoutMovieInputSchema).optional(),
  crew: z.lazy(() => CrewUncheckedCreateNestedManyWithoutMovieInputSchema).optional()
}).strict() as z.ZodType<Prisma.MovieUncheckedCreateWithoutRatingInput>;

export const MovieCreateOrConnectWithoutRatingInputSchema: z.ZodType<Prisma.MovieCreateOrConnectWithoutRatingInput> = z.object({
  where: z.lazy(() => MovieWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MovieCreateWithoutRatingInputSchema),z.lazy(() => MovieUncheckedCreateWithoutRatingInputSchema) ]),
}).strict() as z.ZodType<Prisma.MovieCreateOrConnectWithoutRatingInput>;

export const ShowCreateWithoutRatingInputSchema: z.ZodType<Prisma.ShowCreateWithoutRatingInput> = z.object({
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  genres: z.lazy(() => GenreCreateNestedManyWithoutShowsInputSchema).optional(),
  Crew: z.lazy(() => CrewCreateNestedManyWithoutShowInputSchema).optional(),
  CastedRole: z.lazy(() => CastedRoleCreateNestedManyWithoutShowInputSchema).optional()
}).strict() as z.ZodType<Prisma.ShowCreateWithoutRatingInput>;

export const ShowUncheckedCreateWithoutRatingInputSchema: z.ZodType<Prisma.ShowUncheckedCreateWithoutRatingInput> = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  genres: z.lazy(() => GenreUncheckedCreateNestedManyWithoutShowsInputSchema).optional(),
  Crew: z.lazy(() => CrewUncheckedCreateNestedManyWithoutShowInputSchema).optional(),
  CastedRole: z.lazy(() => CastedRoleUncheckedCreateNestedManyWithoutShowInputSchema).optional()
}).strict() as z.ZodType<Prisma.ShowUncheckedCreateWithoutRatingInput>;

export const ShowCreateOrConnectWithoutRatingInputSchema: z.ZodType<Prisma.ShowCreateOrConnectWithoutRatingInput> = z.object({
  where: z.lazy(() => ShowWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ShowCreateWithoutRatingInputSchema),z.lazy(() => ShowUncheckedCreateWithoutRatingInputSchema) ]),
}).strict() as z.ZodType<Prisma.ShowCreateOrConnectWithoutRatingInput>;

export const UserCreateWithoutRatingInputSchema: z.ZodType<Prisma.UserCreateWithoutRatingInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string(),
  realName: z.string().optional().nullable(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict() as z.ZodType<Prisma.UserCreateWithoutRatingInput>;

export const UserUncheckedCreateWithoutRatingInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutRatingInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string(),
  realName: z.string().optional().nullable(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict() as z.ZodType<Prisma.UserUncheckedCreateWithoutRatingInput>;

export const UserCreateOrConnectWithoutRatingInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutRatingInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutRatingInputSchema),z.lazy(() => UserUncheckedCreateWithoutRatingInputSchema) ]),
}).strict() as z.ZodType<Prisma.UserCreateOrConnectWithoutRatingInput>;

export const MovieUpsertWithoutRatingInputSchema: z.ZodType<Prisma.MovieUpsertWithoutRatingInput> = z.object({
  update: z.union([ z.lazy(() => MovieUpdateWithoutRatingInputSchema),z.lazy(() => MovieUncheckedUpdateWithoutRatingInputSchema) ]),
  create: z.union([ z.lazy(() => MovieCreateWithoutRatingInputSchema),z.lazy(() => MovieUncheckedCreateWithoutRatingInputSchema) ]),
  where: z.lazy(() => MovieWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.MovieUpsertWithoutRatingInput>;

export const MovieUpdateToOneWithWhereWithoutRatingInputSchema: z.ZodType<Prisma.MovieUpdateToOneWithWhereWithoutRatingInput> = z.object({
  where: z.lazy(() => MovieWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => MovieUpdateWithoutRatingInputSchema),z.lazy(() => MovieUncheckedUpdateWithoutRatingInputSchema) ]),
}).strict() as z.ZodType<Prisma.MovieUpdateToOneWithWhereWithoutRatingInput>;

export const MovieUpdateWithoutRatingInputSchema: z.ZodType<Prisma.MovieUpdateWithoutRatingInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  directorId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genres: z.lazy(() => GenreUpdateManyWithoutMoviesNestedInputSchema).optional(),
  castedRole: z.lazy(() => CastedRoleUpdateManyWithoutMovieNestedInputSchema).optional(),
  crew: z.lazy(() => CrewUpdateManyWithoutMovieNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.MovieUpdateWithoutRatingInput>;

export const MovieUncheckedUpdateWithoutRatingInputSchema: z.ZodType<Prisma.MovieUncheckedUpdateWithoutRatingInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  directorId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genres: z.lazy(() => GenreUncheckedUpdateManyWithoutMoviesNestedInputSchema).optional(),
  castedRole: z.lazy(() => CastedRoleUncheckedUpdateManyWithoutMovieNestedInputSchema).optional(),
  crew: z.lazy(() => CrewUncheckedUpdateManyWithoutMovieNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.MovieUncheckedUpdateWithoutRatingInput>;

export const ShowUpsertWithoutRatingInputSchema: z.ZodType<Prisma.ShowUpsertWithoutRatingInput> = z.object({
  update: z.union([ z.lazy(() => ShowUpdateWithoutRatingInputSchema),z.lazy(() => ShowUncheckedUpdateWithoutRatingInputSchema) ]),
  create: z.union([ z.lazy(() => ShowCreateWithoutRatingInputSchema),z.lazy(() => ShowUncheckedCreateWithoutRatingInputSchema) ]),
  where: z.lazy(() => ShowWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.ShowUpsertWithoutRatingInput>;

export const ShowUpdateToOneWithWhereWithoutRatingInputSchema: z.ZodType<Prisma.ShowUpdateToOneWithWhereWithoutRatingInput> = z.object({
  where: z.lazy(() => ShowWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ShowUpdateWithoutRatingInputSchema),z.lazy(() => ShowUncheckedUpdateWithoutRatingInputSchema) ]),
}).strict() as z.ZodType<Prisma.ShowUpdateToOneWithWhereWithoutRatingInput>;

export const ShowUpdateWithoutRatingInputSchema: z.ZodType<Prisma.ShowUpdateWithoutRatingInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genres: z.lazy(() => GenreUpdateManyWithoutShowsNestedInputSchema).optional(),
  Crew: z.lazy(() => CrewUpdateManyWithoutShowNestedInputSchema).optional(),
  CastedRole: z.lazy(() => CastedRoleUpdateManyWithoutShowNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.ShowUpdateWithoutRatingInput>;

export const ShowUncheckedUpdateWithoutRatingInputSchema: z.ZodType<Prisma.ShowUncheckedUpdateWithoutRatingInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genres: z.lazy(() => GenreUncheckedUpdateManyWithoutShowsNestedInputSchema).optional(),
  Crew: z.lazy(() => CrewUncheckedUpdateManyWithoutShowNestedInputSchema).optional(),
  CastedRole: z.lazy(() => CastedRoleUncheckedUpdateManyWithoutShowNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.ShowUncheckedUpdateWithoutRatingInput>;

export const UserUpsertWithoutRatingInputSchema: z.ZodType<Prisma.UserUpsertWithoutRatingInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutRatingInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRatingInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutRatingInputSchema),z.lazy(() => UserUncheckedCreateWithoutRatingInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUpsertWithoutRatingInput>;

export const UserUpdateToOneWithWhereWithoutRatingInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutRatingInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutRatingInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRatingInputSchema) ]),
}).strict() as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutRatingInput>;

export const UserUpdateWithoutRatingInputSchema: z.ZodType<Prisma.UserUpdateWithoutRatingInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  realName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.UserUpdateWithoutRatingInput>;

export const UserUncheckedUpdateWithoutRatingInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutRatingInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  realName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.UserUncheckedUpdateWithoutRatingInput>;

export const MovieCreateWithoutGenresInputSchema: z.ZodType<Prisma.MovieCreateWithoutGenresInput> = z.object({
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  directorId: z.number().int().optional().nullable(),
  Rating: z.lazy(() => RatingCreateNestedManyWithoutMovieInputSchema).optional(),
  castedRole: z.lazy(() => CastedRoleCreateNestedManyWithoutMovieInputSchema).optional(),
  crew: z.lazy(() => CrewCreateNestedManyWithoutMovieInputSchema).optional()
}).strict() as z.ZodType<Prisma.MovieCreateWithoutGenresInput>;

export const MovieUncheckedCreateWithoutGenresInputSchema: z.ZodType<Prisma.MovieUncheckedCreateWithoutGenresInput> = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  directorId: z.number().int().optional().nullable(),
  Rating: z.lazy(() => RatingUncheckedCreateNestedManyWithoutMovieInputSchema).optional(),
  castedRole: z.lazy(() => CastedRoleUncheckedCreateNestedManyWithoutMovieInputSchema).optional(),
  crew: z.lazy(() => CrewUncheckedCreateNestedManyWithoutMovieInputSchema).optional()
}).strict() as z.ZodType<Prisma.MovieUncheckedCreateWithoutGenresInput>;

export const MovieCreateOrConnectWithoutGenresInputSchema: z.ZodType<Prisma.MovieCreateOrConnectWithoutGenresInput> = z.object({
  where: z.lazy(() => MovieWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MovieCreateWithoutGenresInputSchema),z.lazy(() => MovieUncheckedCreateWithoutGenresInputSchema) ]),
}).strict() as z.ZodType<Prisma.MovieCreateOrConnectWithoutGenresInput>;

export const ShowCreateWithoutGenresInputSchema: z.ZodType<Prisma.ShowCreateWithoutGenresInput> = z.object({
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  Rating: z.lazy(() => RatingCreateNestedManyWithoutShowInputSchema).optional(),
  Crew: z.lazy(() => CrewCreateNestedManyWithoutShowInputSchema).optional(),
  CastedRole: z.lazy(() => CastedRoleCreateNestedManyWithoutShowInputSchema).optional()
}).strict() as z.ZodType<Prisma.ShowCreateWithoutGenresInput>;

export const ShowUncheckedCreateWithoutGenresInputSchema: z.ZodType<Prisma.ShowUncheckedCreateWithoutGenresInput> = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  Rating: z.lazy(() => RatingUncheckedCreateNestedManyWithoutShowInputSchema).optional(),
  Crew: z.lazy(() => CrewUncheckedCreateNestedManyWithoutShowInputSchema).optional(),
  CastedRole: z.lazy(() => CastedRoleUncheckedCreateNestedManyWithoutShowInputSchema).optional()
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

export const MovieScalarWhereInputSchema: z.ZodType<Prisma.MovieScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MovieScalarWhereInputSchema),z.lazy(() => MovieScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MovieScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MovieScalarWhereInputSchema),z.lazy(() => MovieScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  releaseDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  rating: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  highlighted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  options: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  directorId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.MovieScalarWhereInput>;

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

export const ShowScalarWhereInputSchema: z.ZodType<Prisma.ShowScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ShowScalarWhereInputSchema),z.lazy(() => ShowScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ShowScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ShowScalarWhereInputSchema),z.lazy(() => ShowScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  releaseDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  rating: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  highlighted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  options: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.ShowScalarWhereInput>;

export const MovieCreateWithoutCastedRoleInputSchema: z.ZodType<Prisma.MovieCreateWithoutCastedRoleInput> = z.object({
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  directorId: z.number().int().optional().nullable(),
  genres: z.lazy(() => GenreCreateNestedManyWithoutMoviesInputSchema).optional(),
  Rating: z.lazy(() => RatingCreateNestedManyWithoutMovieInputSchema).optional(),
  crew: z.lazy(() => CrewCreateNestedManyWithoutMovieInputSchema).optional()
}).strict() as z.ZodType<Prisma.MovieCreateWithoutCastedRoleInput>;

export const MovieUncheckedCreateWithoutCastedRoleInputSchema: z.ZodType<Prisma.MovieUncheckedCreateWithoutCastedRoleInput> = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  directorId: z.number().int().optional().nullable(),
  genres: z.lazy(() => GenreUncheckedCreateNestedManyWithoutMoviesInputSchema).optional(),
  Rating: z.lazy(() => RatingUncheckedCreateNestedManyWithoutMovieInputSchema).optional(),
  crew: z.lazy(() => CrewUncheckedCreateNestedManyWithoutMovieInputSchema).optional()
}).strict() as z.ZodType<Prisma.MovieUncheckedCreateWithoutCastedRoleInput>;

export const MovieCreateOrConnectWithoutCastedRoleInputSchema: z.ZodType<Prisma.MovieCreateOrConnectWithoutCastedRoleInput> = z.object({
  where: z.lazy(() => MovieWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MovieCreateWithoutCastedRoleInputSchema),z.lazy(() => MovieUncheckedCreateWithoutCastedRoleInputSchema) ]),
}).strict() as z.ZodType<Prisma.MovieCreateOrConnectWithoutCastedRoleInput>;

export const ShowCreateWithoutCastedRoleInputSchema: z.ZodType<Prisma.ShowCreateWithoutCastedRoleInput> = z.object({
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  genres: z.lazy(() => GenreCreateNestedManyWithoutShowsInputSchema).optional(),
  Rating: z.lazy(() => RatingCreateNestedManyWithoutShowInputSchema).optional(),
  Crew: z.lazy(() => CrewCreateNestedManyWithoutShowInputSchema).optional()
}).strict() as z.ZodType<Prisma.ShowCreateWithoutCastedRoleInput>;

export const ShowUncheckedCreateWithoutCastedRoleInputSchema: z.ZodType<Prisma.ShowUncheckedCreateWithoutCastedRoleInput> = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  genres: z.lazy(() => GenreUncheckedCreateNestedManyWithoutShowsInputSchema).optional(),
  Rating: z.lazy(() => RatingUncheckedCreateNestedManyWithoutShowInputSchema).optional(),
  Crew: z.lazy(() => CrewUncheckedCreateNestedManyWithoutShowInputSchema).optional()
}).strict() as z.ZodType<Prisma.ShowUncheckedCreateWithoutCastedRoleInput>;

export const ShowCreateOrConnectWithoutCastedRoleInputSchema: z.ZodType<Prisma.ShowCreateOrConnectWithoutCastedRoleInput> = z.object({
  where: z.lazy(() => ShowWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ShowCreateWithoutCastedRoleInputSchema),z.lazy(() => ShowUncheckedCreateWithoutCastedRoleInputSchema) ]),
}).strict() as z.ZodType<Prisma.ShowCreateOrConnectWithoutCastedRoleInput>;

export const CelebrityCreateWithoutCastedRoleInputSchema: z.ZodType<Prisma.CelebrityCreateWithoutCastedRoleInput> = z.object({
  name: z.string(),
  birthDate: z.coerce.date().optional().nullable(),
  popularity: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  crew: z.lazy(() => CrewCreateNestedManyWithoutCelebrityInputSchema).optional()
}).strict() as z.ZodType<Prisma.CelebrityCreateWithoutCastedRoleInput>;

export const CelebrityUncheckedCreateWithoutCastedRoleInputSchema: z.ZodType<Prisma.CelebrityUncheckedCreateWithoutCastedRoleInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  birthDate: z.coerce.date().optional().nullable(),
  popularity: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  crew: z.lazy(() => CrewUncheckedCreateNestedManyWithoutCelebrityInputSchema).optional()
}).strict() as z.ZodType<Prisma.CelebrityUncheckedCreateWithoutCastedRoleInput>;

export const CelebrityCreateOrConnectWithoutCastedRoleInputSchema: z.ZodType<Prisma.CelebrityCreateOrConnectWithoutCastedRoleInput> = z.object({
  where: z.lazy(() => CelebrityWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CelebrityCreateWithoutCastedRoleInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutCastedRoleInputSchema) ]),
}).strict() as z.ZodType<Prisma.CelebrityCreateOrConnectWithoutCastedRoleInput>;

export const MovieUpsertWithoutCastedRoleInputSchema: z.ZodType<Prisma.MovieUpsertWithoutCastedRoleInput> = z.object({
  update: z.union([ z.lazy(() => MovieUpdateWithoutCastedRoleInputSchema),z.lazy(() => MovieUncheckedUpdateWithoutCastedRoleInputSchema) ]),
  create: z.union([ z.lazy(() => MovieCreateWithoutCastedRoleInputSchema),z.lazy(() => MovieUncheckedCreateWithoutCastedRoleInputSchema) ]),
  where: z.lazy(() => MovieWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.MovieUpsertWithoutCastedRoleInput>;

export const MovieUpdateToOneWithWhereWithoutCastedRoleInputSchema: z.ZodType<Prisma.MovieUpdateToOneWithWhereWithoutCastedRoleInput> = z.object({
  where: z.lazy(() => MovieWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => MovieUpdateWithoutCastedRoleInputSchema),z.lazy(() => MovieUncheckedUpdateWithoutCastedRoleInputSchema) ]),
}).strict() as z.ZodType<Prisma.MovieUpdateToOneWithWhereWithoutCastedRoleInput>;

export const MovieUpdateWithoutCastedRoleInputSchema: z.ZodType<Prisma.MovieUpdateWithoutCastedRoleInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  directorId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genres: z.lazy(() => GenreUpdateManyWithoutMoviesNestedInputSchema).optional(),
  Rating: z.lazy(() => RatingUpdateManyWithoutMovieNestedInputSchema).optional(),
  crew: z.lazy(() => CrewUpdateManyWithoutMovieNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.MovieUpdateWithoutCastedRoleInput>;

export const MovieUncheckedUpdateWithoutCastedRoleInputSchema: z.ZodType<Prisma.MovieUncheckedUpdateWithoutCastedRoleInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  directorId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genres: z.lazy(() => GenreUncheckedUpdateManyWithoutMoviesNestedInputSchema).optional(),
  Rating: z.lazy(() => RatingUncheckedUpdateManyWithoutMovieNestedInputSchema).optional(),
  crew: z.lazy(() => CrewUncheckedUpdateManyWithoutMovieNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.MovieUncheckedUpdateWithoutCastedRoleInput>;

export const ShowUpsertWithoutCastedRoleInputSchema: z.ZodType<Prisma.ShowUpsertWithoutCastedRoleInput> = z.object({
  update: z.union([ z.lazy(() => ShowUpdateWithoutCastedRoleInputSchema),z.lazy(() => ShowUncheckedUpdateWithoutCastedRoleInputSchema) ]),
  create: z.union([ z.lazy(() => ShowCreateWithoutCastedRoleInputSchema),z.lazy(() => ShowUncheckedCreateWithoutCastedRoleInputSchema) ]),
  where: z.lazy(() => ShowWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.ShowUpsertWithoutCastedRoleInput>;

export const ShowUpdateToOneWithWhereWithoutCastedRoleInputSchema: z.ZodType<Prisma.ShowUpdateToOneWithWhereWithoutCastedRoleInput> = z.object({
  where: z.lazy(() => ShowWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ShowUpdateWithoutCastedRoleInputSchema),z.lazy(() => ShowUncheckedUpdateWithoutCastedRoleInputSchema) ]),
}).strict() as z.ZodType<Prisma.ShowUpdateToOneWithWhereWithoutCastedRoleInput>;

export const ShowUpdateWithoutCastedRoleInputSchema: z.ZodType<Prisma.ShowUpdateWithoutCastedRoleInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genres: z.lazy(() => GenreUpdateManyWithoutShowsNestedInputSchema).optional(),
  Rating: z.lazy(() => RatingUpdateManyWithoutShowNestedInputSchema).optional(),
  Crew: z.lazy(() => CrewUpdateManyWithoutShowNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.ShowUpdateWithoutCastedRoleInput>;

export const ShowUncheckedUpdateWithoutCastedRoleInputSchema: z.ZodType<Prisma.ShowUncheckedUpdateWithoutCastedRoleInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genres: z.lazy(() => GenreUncheckedUpdateManyWithoutShowsNestedInputSchema).optional(),
  Rating: z.lazy(() => RatingUncheckedUpdateManyWithoutShowNestedInputSchema).optional(),
  Crew: z.lazy(() => CrewUncheckedUpdateManyWithoutShowNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.ShowUncheckedUpdateWithoutCastedRoleInput>;

export const CelebrityUpsertWithoutCastedRoleInputSchema: z.ZodType<Prisma.CelebrityUpsertWithoutCastedRoleInput> = z.object({
  update: z.union([ z.lazy(() => CelebrityUpdateWithoutCastedRoleInputSchema),z.lazy(() => CelebrityUncheckedUpdateWithoutCastedRoleInputSchema) ]),
  create: z.union([ z.lazy(() => CelebrityCreateWithoutCastedRoleInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutCastedRoleInputSchema) ]),
  where: z.lazy(() => CelebrityWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.CelebrityUpsertWithoutCastedRoleInput>;

export const CelebrityUpdateToOneWithWhereWithoutCastedRoleInputSchema: z.ZodType<Prisma.CelebrityUpdateToOneWithWhereWithoutCastedRoleInput> = z.object({
  where: z.lazy(() => CelebrityWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CelebrityUpdateWithoutCastedRoleInputSchema),z.lazy(() => CelebrityUncheckedUpdateWithoutCastedRoleInputSchema) ]),
}).strict() as z.ZodType<Prisma.CelebrityUpdateToOneWithWhereWithoutCastedRoleInput>;

export const CelebrityUpdateWithoutCastedRoleInputSchema: z.ZodType<Prisma.CelebrityUpdateWithoutCastedRoleInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  popularity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  crew: z.lazy(() => CrewUpdateManyWithoutCelebrityNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CelebrityUpdateWithoutCastedRoleInput>;

export const CelebrityUncheckedUpdateWithoutCastedRoleInputSchema: z.ZodType<Prisma.CelebrityUncheckedUpdateWithoutCastedRoleInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  popularity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  crew: z.lazy(() => CrewUncheckedUpdateManyWithoutCelebrityNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CelebrityUncheckedUpdateWithoutCastedRoleInput>;

export const MovieCreateWithoutCrewInputSchema: z.ZodType<Prisma.MovieCreateWithoutCrewInput> = z.object({
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  directorId: z.number().int().optional().nullable(),
  genres: z.lazy(() => GenreCreateNestedManyWithoutMoviesInputSchema).optional(),
  Rating: z.lazy(() => RatingCreateNestedManyWithoutMovieInputSchema).optional(),
  castedRole: z.lazy(() => CastedRoleCreateNestedManyWithoutMovieInputSchema).optional()
}).strict() as z.ZodType<Prisma.MovieCreateWithoutCrewInput>;

export const MovieUncheckedCreateWithoutCrewInputSchema: z.ZodType<Prisma.MovieUncheckedCreateWithoutCrewInput> = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  directorId: z.number().int().optional().nullable(),
  genres: z.lazy(() => GenreUncheckedCreateNestedManyWithoutMoviesInputSchema).optional(),
  Rating: z.lazy(() => RatingUncheckedCreateNestedManyWithoutMovieInputSchema).optional(),
  castedRole: z.lazy(() => CastedRoleUncheckedCreateNestedManyWithoutMovieInputSchema).optional()
}).strict() as z.ZodType<Prisma.MovieUncheckedCreateWithoutCrewInput>;

export const MovieCreateOrConnectWithoutCrewInputSchema: z.ZodType<Prisma.MovieCreateOrConnectWithoutCrewInput> = z.object({
  where: z.lazy(() => MovieWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MovieCreateWithoutCrewInputSchema),z.lazy(() => MovieUncheckedCreateWithoutCrewInputSchema) ]),
}).strict() as z.ZodType<Prisma.MovieCreateOrConnectWithoutCrewInput>;

export const ShowCreateWithoutCrewInputSchema: z.ZodType<Prisma.ShowCreateWithoutCrewInput> = z.object({
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  genres: z.lazy(() => GenreCreateNestedManyWithoutShowsInputSchema).optional(),
  Rating: z.lazy(() => RatingCreateNestedManyWithoutShowInputSchema).optional(),
  CastedRole: z.lazy(() => CastedRoleCreateNestedManyWithoutShowInputSchema).optional()
}).strict() as z.ZodType<Prisma.ShowCreateWithoutCrewInput>;

export const ShowUncheckedCreateWithoutCrewInputSchema: z.ZodType<Prisma.ShowUncheckedCreateWithoutCrewInput> = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  rating: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  genres: z.lazy(() => GenreUncheckedCreateNestedManyWithoutShowsInputSchema).optional(),
  Rating: z.lazy(() => RatingUncheckedCreateNestedManyWithoutShowInputSchema).optional(),
  CastedRole: z.lazy(() => CastedRoleUncheckedCreateNestedManyWithoutShowInputSchema).optional()
}).strict() as z.ZodType<Prisma.ShowUncheckedCreateWithoutCrewInput>;

export const ShowCreateOrConnectWithoutCrewInputSchema: z.ZodType<Prisma.ShowCreateOrConnectWithoutCrewInput> = z.object({
  where: z.lazy(() => ShowWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ShowCreateWithoutCrewInputSchema),z.lazy(() => ShowUncheckedCreateWithoutCrewInputSchema) ]),
}).strict() as z.ZodType<Prisma.ShowCreateOrConnectWithoutCrewInput>;

export const CelebrityCreateWithoutCrewInputSchema: z.ZodType<Prisma.CelebrityCreateWithoutCrewInput> = z.object({
  name: z.string(),
  birthDate: z.coerce.date().optional().nullable(),
  popularity: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  castedRole: z.lazy(() => CastedRoleCreateNestedManyWithoutCelebrityInputSchema).optional()
}).strict() as z.ZodType<Prisma.CelebrityCreateWithoutCrewInput>;

export const CelebrityUncheckedCreateWithoutCrewInputSchema: z.ZodType<Prisma.CelebrityUncheckedCreateWithoutCrewInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  birthDate: z.coerce.date().optional().nullable(),
  popularity: z.number().optional().nullable(),
  highlighted: z.boolean().optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  castedRole: z.lazy(() => CastedRoleUncheckedCreateNestedManyWithoutCelebrityInputSchema).optional()
}).strict() as z.ZodType<Prisma.CelebrityUncheckedCreateWithoutCrewInput>;

export const CelebrityCreateOrConnectWithoutCrewInputSchema: z.ZodType<Prisma.CelebrityCreateOrConnectWithoutCrewInput> = z.object({
  where: z.lazy(() => CelebrityWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CelebrityCreateWithoutCrewInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutCrewInputSchema) ]),
}).strict() as z.ZodType<Prisma.CelebrityCreateOrConnectWithoutCrewInput>;

export const MovieUpsertWithoutCrewInputSchema: z.ZodType<Prisma.MovieUpsertWithoutCrewInput> = z.object({
  update: z.union([ z.lazy(() => MovieUpdateWithoutCrewInputSchema),z.lazy(() => MovieUncheckedUpdateWithoutCrewInputSchema) ]),
  create: z.union([ z.lazy(() => MovieCreateWithoutCrewInputSchema),z.lazy(() => MovieUncheckedCreateWithoutCrewInputSchema) ]),
  where: z.lazy(() => MovieWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.MovieUpsertWithoutCrewInput>;

export const MovieUpdateToOneWithWhereWithoutCrewInputSchema: z.ZodType<Prisma.MovieUpdateToOneWithWhereWithoutCrewInput> = z.object({
  where: z.lazy(() => MovieWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => MovieUpdateWithoutCrewInputSchema),z.lazy(() => MovieUncheckedUpdateWithoutCrewInputSchema) ]),
}).strict() as z.ZodType<Prisma.MovieUpdateToOneWithWhereWithoutCrewInput>;

export const MovieUpdateWithoutCrewInputSchema: z.ZodType<Prisma.MovieUpdateWithoutCrewInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  directorId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genres: z.lazy(() => GenreUpdateManyWithoutMoviesNestedInputSchema).optional(),
  Rating: z.lazy(() => RatingUpdateManyWithoutMovieNestedInputSchema).optional(),
  castedRole: z.lazy(() => CastedRoleUpdateManyWithoutMovieNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.MovieUpdateWithoutCrewInput>;

export const MovieUncheckedUpdateWithoutCrewInputSchema: z.ZodType<Prisma.MovieUncheckedUpdateWithoutCrewInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  directorId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genres: z.lazy(() => GenreUncheckedUpdateManyWithoutMoviesNestedInputSchema).optional(),
  Rating: z.lazy(() => RatingUncheckedUpdateManyWithoutMovieNestedInputSchema).optional(),
  castedRole: z.lazy(() => CastedRoleUncheckedUpdateManyWithoutMovieNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.MovieUncheckedUpdateWithoutCrewInput>;

export const ShowUpsertWithoutCrewInputSchema: z.ZodType<Prisma.ShowUpsertWithoutCrewInput> = z.object({
  update: z.union([ z.lazy(() => ShowUpdateWithoutCrewInputSchema),z.lazy(() => ShowUncheckedUpdateWithoutCrewInputSchema) ]),
  create: z.union([ z.lazy(() => ShowCreateWithoutCrewInputSchema),z.lazy(() => ShowUncheckedCreateWithoutCrewInputSchema) ]),
  where: z.lazy(() => ShowWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.ShowUpsertWithoutCrewInput>;

export const ShowUpdateToOneWithWhereWithoutCrewInputSchema: z.ZodType<Prisma.ShowUpdateToOneWithWhereWithoutCrewInput> = z.object({
  where: z.lazy(() => ShowWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ShowUpdateWithoutCrewInputSchema),z.lazy(() => ShowUncheckedUpdateWithoutCrewInputSchema) ]),
}).strict() as z.ZodType<Prisma.ShowUpdateToOneWithWhereWithoutCrewInput>;

export const ShowUpdateWithoutCrewInputSchema: z.ZodType<Prisma.ShowUpdateWithoutCrewInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genres: z.lazy(() => GenreUpdateManyWithoutShowsNestedInputSchema).optional(),
  Rating: z.lazy(() => RatingUpdateManyWithoutShowNestedInputSchema).optional(),
  CastedRole: z.lazy(() => CastedRoleUpdateManyWithoutShowNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.ShowUpdateWithoutCrewInput>;

export const ShowUncheckedUpdateWithoutCrewInputSchema: z.ZodType<Prisma.ShowUncheckedUpdateWithoutCrewInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genres: z.lazy(() => GenreUncheckedUpdateManyWithoutShowsNestedInputSchema).optional(),
  Rating: z.lazy(() => RatingUncheckedUpdateManyWithoutShowNestedInputSchema).optional(),
  CastedRole: z.lazy(() => CastedRoleUncheckedUpdateManyWithoutShowNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.ShowUncheckedUpdateWithoutCrewInput>;

export const CelebrityUpsertWithoutCrewInputSchema: z.ZodType<Prisma.CelebrityUpsertWithoutCrewInput> = z.object({
  update: z.union([ z.lazy(() => CelebrityUpdateWithoutCrewInputSchema),z.lazy(() => CelebrityUncheckedUpdateWithoutCrewInputSchema) ]),
  create: z.union([ z.lazy(() => CelebrityCreateWithoutCrewInputSchema),z.lazy(() => CelebrityUncheckedCreateWithoutCrewInputSchema) ]),
  where: z.lazy(() => CelebrityWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.CelebrityUpsertWithoutCrewInput>;

export const CelebrityUpdateToOneWithWhereWithoutCrewInputSchema: z.ZodType<Prisma.CelebrityUpdateToOneWithWhereWithoutCrewInput> = z.object({
  where: z.lazy(() => CelebrityWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CelebrityUpdateWithoutCrewInputSchema),z.lazy(() => CelebrityUncheckedUpdateWithoutCrewInputSchema) ]),
}).strict() as z.ZodType<Prisma.CelebrityUpdateToOneWithWhereWithoutCrewInput>;

export const CelebrityUpdateWithoutCrewInputSchema: z.ZodType<Prisma.CelebrityUpdateWithoutCrewInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  popularity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  castedRole: z.lazy(() => CastedRoleUpdateManyWithoutCelebrityNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CelebrityUpdateWithoutCrewInput>;

export const CelebrityUncheckedUpdateWithoutCrewInputSchema: z.ZodType<Prisma.CelebrityUncheckedUpdateWithoutCrewInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  popularity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  castedRole: z.lazy(() => CastedRoleUncheckedUpdateManyWithoutCelebrityNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CelebrityUncheckedUpdateWithoutCrewInput>;

export const RatingCreateManyUserInputSchema: z.ZodType<Prisma.RatingCreateManyUserInput> = z.object({
  id: z.number().int().optional(),
  rating: z.number(),
  comment: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  movieId: z.number().int().optional().nullable(),
  showId: z.number().int().optional().nullable()
}).strict() as z.ZodType<Prisma.RatingCreateManyUserInput>;

export const RatingUpdateWithoutUserInputSchema: z.ZodType<Prisma.RatingUpdateWithoutUserInput> = z.object({
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  movie: z.lazy(() => MovieUpdateOneWithoutRatingNestedInputSchema).optional(),
  show: z.lazy(() => ShowUpdateOneWithoutRatingNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.RatingUpdateWithoutUserInput>;

export const RatingUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.RatingUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  movieId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  showId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.RatingUncheckedUpdateWithoutUserInput>;

export const RatingUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.RatingUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  movieId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  showId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.RatingUncheckedUpdateManyWithoutUserInput>;

export const CastedRoleCreateManyCelebrityInputSchema: z.ZodType<Prisma.CastedRoleCreateManyCelebrityInput> = z.object({
  id: z.number().int().optional(),
  role: z.string(),
  movieId: z.number().int().optional().nullable(),
  showId: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.CastedRoleCreateManyCelebrityInput>;

export const CrewCreateManyCelebrityInputSchema: z.ZodType<Prisma.CrewCreateManyCelebrityInput> = z.object({
  id: z.number().int().optional(),
  role: z.string(),
  movieId: z.number().int().optional().nullable(),
  showId: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.CrewCreateManyCelebrityInput>;

export const CastedRoleUpdateWithoutCelebrityInputSchema: z.ZodType<Prisma.CastedRoleUpdateWithoutCelebrityInput> = z.object({
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  movie: z.lazy(() => MovieUpdateOneWithoutCastedRoleNestedInputSchema).optional(),
  show: z.lazy(() => ShowUpdateOneWithoutCastedRoleNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CastedRoleUpdateWithoutCelebrityInput>;

export const CastedRoleUncheckedUpdateWithoutCelebrityInputSchema: z.ZodType<Prisma.CastedRoleUncheckedUpdateWithoutCelebrityInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  movieId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  showId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CastedRoleUncheckedUpdateWithoutCelebrityInput>;

export const CastedRoleUncheckedUpdateManyWithoutCelebrityInputSchema: z.ZodType<Prisma.CastedRoleUncheckedUpdateManyWithoutCelebrityInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  movieId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  showId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CastedRoleUncheckedUpdateManyWithoutCelebrityInput>;

export const CrewUpdateWithoutCelebrityInputSchema: z.ZodType<Prisma.CrewUpdateWithoutCelebrityInput> = z.object({
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  movie: z.lazy(() => MovieUpdateOneWithoutCrewNestedInputSchema).optional(),
  show: z.lazy(() => ShowUpdateOneWithoutCrewNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CrewUpdateWithoutCelebrityInput>;

export const CrewUncheckedUpdateWithoutCelebrityInputSchema: z.ZodType<Prisma.CrewUncheckedUpdateWithoutCelebrityInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  movieId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  showId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CrewUncheckedUpdateWithoutCelebrityInput>;

export const CrewUncheckedUpdateManyWithoutCelebrityInputSchema: z.ZodType<Prisma.CrewUncheckedUpdateManyWithoutCelebrityInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  movieId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  showId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CrewUncheckedUpdateManyWithoutCelebrityInput>;

export const RatingCreateManyMovieInputSchema: z.ZodType<Prisma.RatingCreateManyMovieInput> = z.object({
  id: z.number().int().optional(),
  rating: z.number(),
  comment: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  showId: z.number().int().optional().nullable(),
  userId: z.string()
}).strict() as z.ZodType<Prisma.RatingCreateManyMovieInput>;

export const CastedRoleCreateManyMovieInputSchema: z.ZodType<Prisma.CastedRoleCreateManyMovieInput> = z.object({
  id: z.number().int().optional(),
  role: z.string(),
  showId: z.number().int().optional().nullable(),
  celebrityId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.CastedRoleCreateManyMovieInput>;

export const CrewCreateManyMovieInputSchema: z.ZodType<Prisma.CrewCreateManyMovieInput> = z.object({
  id: z.number().int().optional(),
  role: z.string(),
  showId: z.number().int().optional().nullable(),
  celebrityId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.CrewCreateManyMovieInput>;

export const GenreUpdateWithoutMoviesInputSchema: z.ZodType<Prisma.GenreUpdateWithoutMoviesInput> = z.object({
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

export const RatingUpdateWithoutMovieInputSchema: z.ZodType<Prisma.RatingUpdateWithoutMovieInput> = z.object({
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  show: z.lazy(() => ShowUpdateOneWithoutRatingNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutRatingNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.RatingUpdateWithoutMovieInput>;

export const RatingUncheckedUpdateWithoutMovieInputSchema: z.ZodType<Prisma.RatingUncheckedUpdateWithoutMovieInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  showId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.RatingUncheckedUpdateWithoutMovieInput>;

export const RatingUncheckedUpdateManyWithoutMovieInputSchema: z.ZodType<Prisma.RatingUncheckedUpdateManyWithoutMovieInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  showId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.RatingUncheckedUpdateManyWithoutMovieInput>;

export const CastedRoleUpdateWithoutMovieInputSchema: z.ZodType<Prisma.CastedRoleUpdateWithoutMovieInput> = z.object({
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  show: z.lazy(() => ShowUpdateOneWithoutCastedRoleNestedInputSchema).optional(),
  celebrity: z.lazy(() => CelebrityUpdateOneRequiredWithoutCastedRoleNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CastedRoleUpdateWithoutMovieInput>;

export const CastedRoleUncheckedUpdateWithoutMovieInputSchema: z.ZodType<Prisma.CastedRoleUncheckedUpdateWithoutMovieInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  showId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  celebrityId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CastedRoleUncheckedUpdateWithoutMovieInput>;

export const CastedRoleUncheckedUpdateManyWithoutMovieInputSchema: z.ZodType<Prisma.CastedRoleUncheckedUpdateManyWithoutMovieInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  showId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  celebrityId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CastedRoleUncheckedUpdateManyWithoutMovieInput>;

export const CrewUpdateWithoutMovieInputSchema: z.ZodType<Prisma.CrewUpdateWithoutMovieInput> = z.object({
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  show: z.lazy(() => ShowUpdateOneWithoutCrewNestedInputSchema).optional(),
  celebrity: z.lazy(() => CelebrityUpdateOneRequiredWithoutCrewNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CrewUpdateWithoutMovieInput>;

export const CrewUncheckedUpdateWithoutMovieInputSchema: z.ZodType<Prisma.CrewUncheckedUpdateWithoutMovieInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  showId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  celebrityId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CrewUncheckedUpdateWithoutMovieInput>;

export const CrewUncheckedUpdateManyWithoutMovieInputSchema: z.ZodType<Prisma.CrewUncheckedUpdateManyWithoutMovieInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  showId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  celebrityId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CrewUncheckedUpdateManyWithoutMovieInput>;

export const RatingCreateManyShowInputSchema: z.ZodType<Prisma.RatingCreateManyShowInput> = z.object({
  id: z.number().int().optional(),
  rating: z.number(),
  comment: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  movieId: z.number().int().optional().nullable(),
  userId: z.string()
}).strict() as z.ZodType<Prisma.RatingCreateManyShowInput>;

export const CrewCreateManyShowInputSchema: z.ZodType<Prisma.CrewCreateManyShowInput> = z.object({
  id: z.number().int().optional(),
  role: z.string(),
  movieId: z.number().int().optional().nullable(),
  celebrityId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.CrewCreateManyShowInput>;

export const CastedRoleCreateManyShowInputSchema: z.ZodType<Prisma.CastedRoleCreateManyShowInput> = z.object({
  id: z.number().int().optional(),
  role: z.string(),
  movieId: z.number().int().optional().nullable(),
  celebrityId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.CastedRoleCreateManyShowInput>;

export const GenreUpdateWithoutShowsInputSchema: z.ZodType<Prisma.GenreUpdateWithoutShowsInput> = z.object({
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

export const RatingUpdateWithoutShowInputSchema: z.ZodType<Prisma.RatingUpdateWithoutShowInput> = z.object({
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  movie: z.lazy(() => MovieUpdateOneWithoutRatingNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutRatingNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.RatingUpdateWithoutShowInput>;

export const RatingUncheckedUpdateWithoutShowInputSchema: z.ZodType<Prisma.RatingUncheckedUpdateWithoutShowInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  movieId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.RatingUncheckedUpdateWithoutShowInput>;

export const RatingUncheckedUpdateManyWithoutShowInputSchema: z.ZodType<Prisma.RatingUncheckedUpdateManyWithoutShowInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  movieId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.RatingUncheckedUpdateManyWithoutShowInput>;

export const CrewUpdateWithoutShowInputSchema: z.ZodType<Prisma.CrewUpdateWithoutShowInput> = z.object({
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  movie: z.lazy(() => MovieUpdateOneWithoutCrewNestedInputSchema).optional(),
  celebrity: z.lazy(() => CelebrityUpdateOneRequiredWithoutCrewNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CrewUpdateWithoutShowInput>;

export const CrewUncheckedUpdateWithoutShowInputSchema: z.ZodType<Prisma.CrewUncheckedUpdateWithoutShowInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  movieId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  celebrityId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CrewUncheckedUpdateWithoutShowInput>;

export const CrewUncheckedUpdateManyWithoutShowInputSchema: z.ZodType<Prisma.CrewUncheckedUpdateManyWithoutShowInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  movieId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  celebrityId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CrewUncheckedUpdateManyWithoutShowInput>;

export const CastedRoleUpdateWithoutShowInputSchema: z.ZodType<Prisma.CastedRoleUpdateWithoutShowInput> = z.object({
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  movie: z.lazy(() => MovieUpdateOneWithoutCastedRoleNestedInputSchema).optional(),
  celebrity: z.lazy(() => CelebrityUpdateOneRequiredWithoutCastedRoleNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CastedRoleUpdateWithoutShowInput>;

export const CastedRoleUncheckedUpdateWithoutShowInputSchema: z.ZodType<Prisma.CastedRoleUncheckedUpdateWithoutShowInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  movieId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  celebrityId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CastedRoleUncheckedUpdateWithoutShowInput>;

export const CastedRoleUncheckedUpdateManyWithoutShowInputSchema: z.ZodType<Prisma.CastedRoleUncheckedUpdateManyWithoutShowInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  movieId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  celebrityId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CastedRoleUncheckedUpdateManyWithoutShowInput>;

export const MovieUpdateWithoutGenresInputSchema: z.ZodType<Prisma.MovieUpdateWithoutGenresInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  directorId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Rating: z.lazy(() => RatingUpdateManyWithoutMovieNestedInputSchema).optional(),
  castedRole: z.lazy(() => CastedRoleUpdateManyWithoutMovieNestedInputSchema).optional(),
  crew: z.lazy(() => CrewUpdateManyWithoutMovieNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.MovieUpdateWithoutGenresInput>;

export const MovieUncheckedUpdateWithoutGenresInputSchema: z.ZodType<Prisma.MovieUncheckedUpdateWithoutGenresInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  directorId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Rating: z.lazy(() => RatingUncheckedUpdateManyWithoutMovieNestedInputSchema).optional(),
  castedRole: z.lazy(() => CastedRoleUncheckedUpdateManyWithoutMovieNestedInputSchema).optional(),
  crew: z.lazy(() => CrewUncheckedUpdateManyWithoutMovieNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.MovieUncheckedUpdateWithoutGenresInput>;

export const MovieUncheckedUpdateManyWithoutGenresInputSchema: z.ZodType<Prisma.MovieUncheckedUpdateManyWithoutGenresInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  directorId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.MovieUncheckedUpdateManyWithoutGenresInput>;

export const ShowUpdateWithoutGenresInputSchema: z.ZodType<Prisma.ShowUpdateWithoutGenresInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Rating: z.lazy(() => RatingUpdateManyWithoutShowNestedInputSchema).optional(),
  Crew: z.lazy(() => CrewUpdateManyWithoutShowNestedInputSchema).optional(),
  CastedRole: z.lazy(() => CastedRoleUpdateManyWithoutShowNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.ShowUpdateWithoutGenresInput>;

export const ShowUncheckedUpdateWithoutGenresInputSchema: z.ZodType<Prisma.ShowUncheckedUpdateWithoutGenresInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Rating: z.lazy(() => RatingUncheckedUpdateManyWithoutShowNestedInputSchema).optional(),
  Crew: z.lazy(() => CrewUncheckedUpdateManyWithoutShowNestedInputSchema).optional(),
  CastedRole: z.lazy(() => CastedRoleUncheckedUpdateManyWithoutShowNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.ShowUncheckedUpdateWithoutGenresInput>;

export const ShowUncheckedUpdateManyWithoutGenresInputSchema: z.ZodType<Prisma.ShowUncheckedUpdateManyWithoutGenresInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highlighted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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

export const RatingFindFirstArgsSchema: z.ZodType<Prisma.RatingFindFirstArgs> = z.object({
  select: RatingSelectSchema.optional(),
  include: RatingIncludeSchema.optional(),
  where: RatingWhereInputSchema.optional(),
  orderBy: z.union([ RatingOrderByWithRelationInputSchema.array(),RatingOrderByWithRelationInputSchema ]).optional(),
  cursor: RatingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RatingScalarFieldEnumSchema,RatingScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.RatingFindFirstArgs>;

export const RatingFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RatingFindFirstOrThrowArgs> = z.object({
  select: RatingSelectSchema.optional(),
  include: RatingIncludeSchema.optional(),
  where: RatingWhereInputSchema.optional(),
  orderBy: z.union([ RatingOrderByWithRelationInputSchema.array(),RatingOrderByWithRelationInputSchema ]).optional(),
  cursor: RatingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RatingScalarFieldEnumSchema,RatingScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.RatingFindFirstOrThrowArgs>;

export const RatingFindManyArgsSchema: z.ZodType<Prisma.RatingFindManyArgs> = z.object({
  select: RatingSelectSchema.optional(),
  include: RatingIncludeSchema.optional(),
  where: RatingWhereInputSchema.optional(),
  orderBy: z.union([ RatingOrderByWithRelationInputSchema.array(),RatingOrderByWithRelationInputSchema ]).optional(),
  cursor: RatingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RatingScalarFieldEnumSchema,RatingScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.RatingFindManyArgs>;

export const RatingAggregateArgsSchema: z.ZodType<Prisma.RatingAggregateArgs> = z.object({
  where: RatingWhereInputSchema.optional(),
  orderBy: z.union([ RatingOrderByWithRelationInputSchema.array(),RatingOrderByWithRelationInputSchema ]).optional(),
  cursor: RatingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.RatingAggregateArgs>;

export const RatingGroupByArgsSchema: z.ZodType<Prisma.RatingGroupByArgs> = z.object({
  where: RatingWhereInputSchema.optional(),
  orderBy: z.union([ RatingOrderByWithAggregationInputSchema.array(),RatingOrderByWithAggregationInputSchema ]).optional(),
  by: RatingScalarFieldEnumSchema.array(),
  having: RatingScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.RatingGroupByArgs>;

export const RatingFindUniqueArgsSchema: z.ZodType<Prisma.RatingFindUniqueArgs> = z.object({
  select: RatingSelectSchema.optional(),
  include: RatingIncludeSchema.optional(),
  where: RatingWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.RatingFindUniqueArgs>;

export const RatingFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RatingFindUniqueOrThrowArgs> = z.object({
  select: RatingSelectSchema.optional(),
  include: RatingIncludeSchema.optional(),
  where: RatingWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.RatingFindUniqueOrThrowArgs>;

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

export const CastedRoleFindFirstArgsSchema: z.ZodType<Prisma.CastedRoleFindFirstArgs> = z.object({
  select: CastedRoleSelectSchema.optional(),
  include: CastedRoleIncludeSchema.optional(),
  where: CastedRoleWhereInputSchema.optional(),
  orderBy: z.union([ CastedRoleOrderByWithRelationInputSchema.array(),CastedRoleOrderByWithRelationInputSchema ]).optional(),
  cursor: CastedRoleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CastedRoleScalarFieldEnumSchema,CastedRoleScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.CastedRoleFindFirstArgs>;

export const CastedRoleFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CastedRoleFindFirstOrThrowArgs> = z.object({
  select: CastedRoleSelectSchema.optional(),
  include: CastedRoleIncludeSchema.optional(),
  where: CastedRoleWhereInputSchema.optional(),
  orderBy: z.union([ CastedRoleOrderByWithRelationInputSchema.array(),CastedRoleOrderByWithRelationInputSchema ]).optional(),
  cursor: CastedRoleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CastedRoleScalarFieldEnumSchema,CastedRoleScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.CastedRoleFindFirstOrThrowArgs>;

export const CastedRoleFindManyArgsSchema: z.ZodType<Prisma.CastedRoleFindManyArgs> = z.object({
  select: CastedRoleSelectSchema.optional(),
  include: CastedRoleIncludeSchema.optional(),
  where: CastedRoleWhereInputSchema.optional(),
  orderBy: z.union([ CastedRoleOrderByWithRelationInputSchema.array(),CastedRoleOrderByWithRelationInputSchema ]).optional(),
  cursor: CastedRoleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CastedRoleScalarFieldEnumSchema,CastedRoleScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.CastedRoleFindManyArgs>;

export const CastedRoleAggregateArgsSchema: z.ZodType<Prisma.CastedRoleAggregateArgs> = z.object({
  where: CastedRoleWhereInputSchema.optional(),
  orderBy: z.union([ CastedRoleOrderByWithRelationInputSchema.array(),CastedRoleOrderByWithRelationInputSchema ]).optional(),
  cursor: CastedRoleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.CastedRoleAggregateArgs>;

export const CastedRoleGroupByArgsSchema: z.ZodType<Prisma.CastedRoleGroupByArgs> = z.object({
  where: CastedRoleWhereInputSchema.optional(),
  orderBy: z.union([ CastedRoleOrderByWithAggregationInputSchema.array(),CastedRoleOrderByWithAggregationInputSchema ]).optional(),
  by: CastedRoleScalarFieldEnumSchema.array(),
  having: CastedRoleScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.CastedRoleGroupByArgs>;

export const CastedRoleFindUniqueArgsSchema: z.ZodType<Prisma.CastedRoleFindUniqueArgs> = z.object({
  select: CastedRoleSelectSchema.optional(),
  include: CastedRoleIncludeSchema.optional(),
  where: CastedRoleWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CastedRoleFindUniqueArgs>;

export const CastedRoleFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CastedRoleFindUniqueOrThrowArgs> = z.object({
  select: CastedRoleSelectSchema.optional(),
  include: CastedRoleIncludeSchema.optional(),
  where: CastedRoleWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CastedRoleFindUniqueOrThrowArgs>;

export const CrewFindFirstArgsSchema: z.ZodType<Prisma.CrewFindFirstArgs> = z.object({
  select: CrewSelectSchema.optional(),
  include: CrewIncludeSchema.optional(),
  where: CrewWhereInputSchema.optional(),
  orderBy: z.union([ CrewOrderByWithRelationInputSchema.array(),CrewOrderByWithRelationInputSchema ]).optional(),
  cursor: CrewWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CrewScalarFieldEnumSchema,CrewScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.CrewFindFirstArgs>;

export const CrewFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CrewFindFirstOrThrowArgs> = z.object({
  select: CrewSelectSchema.optional(),
  include: CrewIncludeSchema.optional(),
  where: CrewWhereInputSchema.optional(),
  orderBy: z.union([ CrewOrderByWithRelationInputSchema.array(),CrewOrderByWithRelationInputSchema ]).optional(),
  cursor: CrewWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CrewScalarFieldEnumSchema,CrewScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.CrewFindFirstOrThrowArgs>;

export const CrewFindManyArgsSchema: z.ZodType<Prisma.CrewFindManyArgs> = z.object({
  select: CrewSelectSchema.optional(),
  include: CrewIncludeSchema.optional(),
  where: CrewWhereInputSchema.optional(),
  orderBy: z.union([ CrewOrderByWithRelationInputSchema.array(),CrewOrderByWithRelationInputSchema ]).optional(),
  cursor: CrewWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CrewScalarFieldEnumSchema,CrewScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.CrewFindManyArgs>;

export const CrewAggregateArgsSchema: z.ZodType<Prisma.CrewAggregateArgs> = z.object({
  where: CrewWhereInputSchema.optional(),
  orderBy: z.union([ CrewOrderByWithRelationInputSchema.array(),CrewOrderByWithRelationInputSchema ]).optional(),
  cursor: CrewWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.CrewAggregateArgs>;

export const CrewGroupByArgsSchema: z.ZodType<Prisma.CrewGroupByArgs> = z.object({
  where: CrewWhereInputSchema.optional(),
  orderBy: z.union([ CrewOrderByWithAggregationInputSchema.array(),CrewOrderByWithAggregationInputSchema ]).optional(),
  by: CrewScalarFieldEnumSchema.array(),
  having: CrewScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.CrewGroupByArgs>;

export const CrewFindUniqueArgsSchema: z.ZodType<Prisma.CrewFindUniqueArgs> = z.object({
  select: CrewSelectSchema.optional(),
  include: CrewIncludeSchema.optional(),
  where: CrewWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CrewFindUniqueArgs>;

export const CrewFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CrewFindUniqueOrThrowArgs> = z.object({
  select: CrewSelectSchema.optional(),
  include: CrewIncludeSchema.optional(),
  where: CrewWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CrewFindUniqueOrThrowArgs>;

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

export const RatingCreateArgsSchema: z.ZodType<Prisma.RatingCreateArgs> = z.object({
  select: RatingSelectSchema.optional(),
  include: RatingIncludeSchema.optional(),
  data: z.union([ RatingCreateInputSchema,RatingUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.RatingCreateArgs>;

export const RatingUpsertArgsSchema: z.ZodType<Prisma.RatingUpsertArgs> = z.object({
  select: RatingSelectSchema.optional(),
  include: RatingIncludeSchema.optional(),
  where: RatingWhereUniqueInputSchema,
  create: z.union([ RatingCreateInputSchema,RatingUncheckedCreateInputSchema ]),
  update: z.union([ RatingUpdateInputSchema,RatingUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.RatingUpsertArgs>;

export const RatingCreateManyArgsSchema: z.ZodType<Prisma.RatingCreateManyArgs> = z.object({
  data: z.union([ RatingCreateManyInputSchema,RatingCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.RatingCreateManyArgs>;

export const RatingCreateManyAndReturnArgsSchema: z.ZodType<Prisma.RatingCreateManyAndReturnArgs> = z.object({
  data: z.union([ RatingCreateManyInputSchema,RatingCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.RatingCreateManyAndReturnArgs>;

export const RatingDeleteArgsSchema: z.ZodType<Prisma.RatingDeleteArgs> = z.object({
  select: RatingSelectSchema.optional(),
  include: RatingIncludeSchema.optional(),
  where: RatingWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.RatingDeleteArgs>;

export const RatingUpdateArgsSchema: z.ZodType<Prisma.RatingUpdateArgs> = z.object({
  select: RatingSelectSchema.optional(),
  include: RatingIncludeSchema.optional(),
  data: z.union([ RatingUpdateInputSchema,RatingUncheckedUpdateInputSchema ]),
  where: RatingWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.RatingUpdateArgs>;

export const RatingUpdateManyArgsSchema: z.ZodType<Prisma.RatingUpdateManyArgs> = z.object({
  data: z.union([ RatingUpdateManyMutationInputSchema,RatingUncheckedUpdateManyInputSchema ]),
  where: RatingWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.RatingUpdateManyArgs>;

export const RatingDeleteManyArgsSchema: z.ZodType<Prisma.RatingDeleteManyArgs> = z.object({
  where: RatingWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.RatingDeleteManyArgs>;

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

export const CastedRoleCreateArgsSchema: z.ZodType<Prisma.CastedRoleCreateArgs> = z.object({
  select: CastedRoleSelectSchema.optional(),
  include: CastedRoleIncludeSchema.optional(),
  data: z.union([ CastedRoleCreateInputSchema,CastedRoleUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.CastedRoleCreateArgs>;

export const CastedRoleUpsertArgsSchema: z.ZodType<Prisma.CastedRoleUpsertArgs> = z.object({
  select: CastedRoleSelectSchema.optional(),
  include: CastedRoleIncludeSchema.optional(),
  where: CastedRoleWhereUniqueInputSchema,
  create: z.union([ CastedRoleCreateInputSchema,CastedRoleUncheckedCreateInputSchema ]),
  update: z.union([ CastedRoleUpdateInputSchema,CastedRoleUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.CastedRoleUpsertArgs>;

export const CastedRoleCreateManyArgsSchema: z.ZodType<Prisma.CastedRoleCreateManyArgs> = z.object({
  data: z.union([ CastedRoleCreateManyInputSchema,CastedRoleCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.CastedRoleCreateManyArgs>;

export const CastedRoleCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CastedRoleCreateManyAndReturnArgs> = z.object({
  data: z.union([ CastedRoleCreateManyInputSchema,CastedRoleCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.CastedRoleCreateManyAndReturnArgs>;

export const CastedRoleDeleteArgsSchema: z.ZodType<Prisma.CastedRoleDeleteArgs> = z.object({
  select: CastedRoleSelectSchema.optional(),
  include: CastedRoleIncludeSchema.optional(),
  where: CastedRoleWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CastedRoleDeleteArgs>;

export const CastedRoleUpdateArgsSchema: z.ZodType<Prisma.CastedRoleUpdateArgs> = z.object({
  select: CastedRoleSelectSchema.optional(),
  include: CastedRoleIncludeSchema.optional(),
  data: z.union([ CastedRoleUpdateInputSchema,CastedRoleUncheckedUpdateInputSchema ]),
  where: CastedRoleWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CastedRoleUpdateArgs>;

export const CastedRoleUpdateManyArgsSchema: z.ZodType<Prisma.CastedRoleUpdateManyArgs> = z.object({
  data: z.union([ CastedRoleUpdateManyMutationInputSchema,CastedRoleUncheckedUpdateManyInputSchema ]),
  where: CastedRoleWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.CastedRoleUpdateManyArgs>;

export const CastedRoleDeleteManyArgsSchema: z.ZodType<Prisma.CastedRoleDeleteManyArgs> = z.object({
  where: CastedRoleWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.CastedRoleDeleteManyArgs>;

export const CrewCreateArgsSchema: z.ZodType<Prisma.CrewCreateArgs> = z.object({
  select: CrewSelectSchema.optional(),
  include: CrewIncludeSchema.optional(),
  data: z.union([ CrewCreateInputSchema,CrewUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.CrewCreateArgs>;

export const CrewUpsertArgsSchema: z.ZodType<Prisma.CrewUpsertArgs> = z.object({
  select: CrewSelectSchema.optional(),
  include: CrewIncludeSchema.optional(),
  where: CrewWhereUniqueInputSchema,
  create: z.union([ CrewCreateInputSchema,CrewUncheckedCreateInputSchema ]),
  update: z.union([ CrewUpdateInputSchema,CrewUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.CrewUpsertArgs>;

export const CrewCreateManyArgsSchema: z.ZodType<Prisma.CrewCreateManyArgs> = z.object({
  data: z.union([ CrewCreateManyInputSchema,CrewCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.CrewCreateManyArgs>;

export const CrewCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CrewCreateManyAndReturnArgs> = z.object({
  data: z.union([ CrewCreateManyInputSchema,CrewCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.CrewCreateManyAndReturnArgs>;

export const CrewDeleteArgsSchema: z.ZodType<Prisma.CrewDeleteArgs> = z.object({
  select: CrewSelectSchema.optional(),
  include: CrewIncludeSchema.optional(),
  where: CrewWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CrewDeleteArgs>;

export const CrewUpdateArgsSchema: z.ZodType<Prisma.CrewUpdateArgs> = z.object({
  select: CrewSelectSchema.optional(),
  include: CrewIncludeSchema.optional(),
  data: z.union([ CrewUpdateInputSchema,CrewUncheckedUpdateInputSchema ]),
  where: CrewWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CrewUpdateArgs>;

export const CrewUpdateManyArgsSchema: z.ZodType<Prisma.CrewUpdateManyArgs> = z.object({
  data: z.union([ CrewUpdateManyMutationInputSchema,CrewUncheckedUpdateManyInputSchema ]),
  where: CrewWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.CrewUpdateManyArgs>;

export const CrewDeleteManyArgsSchema: z.ZodType<Prisma.CrewDeleteManyArgs> = z.object({
  where: CrewWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.CrewDeleteManyArgs>;