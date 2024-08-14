import { CastedRole, Movie, Show } from "@prisma/client";

export type RoleWithMedia = CastedRole & { movie?: Movie; show?: Show };
