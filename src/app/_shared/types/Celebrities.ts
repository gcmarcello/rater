import { CastedRole, Celebrity, Crew } from "@prisma/client";
import { Cast } from "@prisma/client/runtime/library";

export type CrewWithCelebrity = Crew & { celebrity: Celebrity };

export type CastWithCelebrity = CastedRole & { celebrity: Celebrity };
