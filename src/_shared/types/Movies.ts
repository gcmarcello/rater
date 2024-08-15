import { Celebrity, Genre, Movie } from "@prisma/client";

export type MovieWithGenres = Movie & { genres: Genre[] };

export type MovieWithCelebrities = Movie & { celebrities: Celebrity[] };
