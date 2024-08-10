import { NextRequest } from "next/server";

export type ParsedRequest<T> = NextRequest & {
  parsedBody: T;
  parsedSearchParams: T;
};
