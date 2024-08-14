import { ErrorResponse } from "@/app/_shared/types/ErrorResponse";
import { NextResponse } from "next/server";

export class ServerResponse extends NextResponse {
  static err(error: unknown) {
    const parsedError = error as ErrorResponse;
    return NextResponse.json([parsedError], {
      status: parsedError.status ?? 400,
    });
  }
}
