import { NextRequest } from "next/server";
import { Session } from "./Session";

export type ParsedRequest<T> = NextRequest & {
  parsedBody: T;
  parsedSearchParams: T;
  user?: Session;
};

export interface ParsedRequestWithUser<T> extends ParsedRequest<T> {
  user: Session;
}
