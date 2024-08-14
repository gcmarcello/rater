import { Genre, Show } from "@prisma/client";

export type ShowWithGenres = Show & { genres: Genre[] };
