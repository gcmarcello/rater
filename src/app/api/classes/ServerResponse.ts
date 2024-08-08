import { NextResponse } from "next/server";
import { ErrorResponse } from "@/app/api/types/ErrorResponse";

export class ServerResponse extends NextResponse {
  static err(error: unknown) {
    const parsedError = error as ErrorResponse;
    return NextResponse.json(parsedError, {
      status: parsedError.status ?? 400,
    });
  }
}
